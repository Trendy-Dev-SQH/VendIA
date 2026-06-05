import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { generateBotReply, wantsHumanHandoff } from '../services/ai.service.js'
import { sendWhatsAppMessage, markMessageAsRead } from '../services/whatsapp.service.js'

export const whatsappRouter = Router()

whatsappRouter.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode']
  const token     = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    console.log('✅ Webhook verificado')
    return res.status(200).send(challenge)
  }
  res.sendStatus(403)
})

whatsappRouter.post('/webhook', async (req, res) => {
  console.log('📨 Mensaje recibido:', JSON.stringify(req.body, null, 2))
  res.sendStatus(200)

  try {
    const body = req.body
    if (body.object !== 'whatsapp_business_account') return

    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value
        if (!value?.messages?.length) continue
        const phoneNumberId = value.metadata.phone_number_id
        for (const msg of value.messages) {
          if (msg.type !== 'text') continue
          await handleIncomingMessage({ phoneNumberId, msg, contacts: value.contacts })
        }
      }
    }
  } catch (error) {
    console.error('❌ Error en webhook:', error)
  }
})

async function handleIncomingMessage({ phoneNumberId, msg, contacts }) {
  const waId        = msg.from
  const messageId   = msg.id
  const userText    = msg.text.body
  const contactName = contacts?.[0]?.profile?.name ?? 'Cliente'

  console.log(`💬 Mensaje de ${waId}: ${userText}`)

  const business = await prisma.business.findUnique({
    where: { waPhoneId: phoneNumberId },
    include: { botConfig: true },
  })

  if (!business) { console.log('❌ No se encontró negocio con waPhoneId:', phoneNumberId); return }
  if (!business.isActive) { console.log('❌ Negocio inactivo'); return }
  if (!business.botConfig) { console.log('❌ Sin botConfig'); return }

  const contact = await prisma.contact.upsert({
    where: { businessId_waId: { businessId: business.id, waId } },
    create: { businessId: business.id, waId, phone: waId, name: contactName },
    update: { name: contactName },
  })

  let conversation = await prisma.conversation.findFirst({
    where: {
      businessId: business.id,
      contactId: contact.id,
      status: { in: ['BOT_ACTIVE', 'HUMAN_TAKEOVER'] },
    },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  })

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { businessId: business.id, contactId: contact.id, status: 'BOT_ACTIVE' },
      include: { messages: true },
    })
  }

  await prisma.message.create({
    data: { conversationId: conversation.id, role: 'USER', content: userText, waMessageId: messageId },
  })

  await prisma.conversation.update({
    where: { id: conversation.id },
    data: { lastMsgAt: new Date() },
  })

  if (conversation.status === 'HUMAN_TAKEOVER') return

  if (wantsHumanHandoff(userText, business.botConfig.humanHandoffKeyword)) {
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { status: 'HUMAN_TAKEOVER' },
    })
    const reply = '¡Entendido! 👋 En un momento te atenderá una persona de nuestro equipo.'
    await sendWhatsAppMessage({ phoneNumberId, to: waId, message: reply })
    await prisma.message.create({
      data: { conversationId: conversation.id, role: 'ASSISTANT', content: reply },
    })
    return
  }

  await markMessageAsRead({ phoneNumberId, messageId })

  const replyText = await generateBotReply({
    botConfig: business.botConfig,
    history: conversation.messages,
    userMessage: userText,
  })

  console.log(`🤖 Respuesta: ${replyText}`)

  await sendWhatsAppMessage({ phoneNumberId, to: waId, message: replyText })
  await prisma.message.create({
    data: { conversationId: conversation.id, role: 'ASSISTANT', content: replyText },
  })
}
