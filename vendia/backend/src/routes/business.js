import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

export const businessRouter = Router()

businessRouter.post('/', async (req, res) => {
  const { name, ownerEmail, ownerName } = req.body
  try {
    let business = await prisma.business.findUnique({
      where: { ownerEmail },
      include: { botConfig: true }
    })
    if (!business) {
      business = await prisma.business.create({
        data: {
          name: name || 'Mi Negocio',
          ownerEmail,
          ownerName: ownerName || 'Dueño',
          botConfig: {
            create: {
              botName: 'Asistente',
              businessContext: 'Negocio de ventas en WhatsApp',
              welcomeMessage: '¡Hola! ¿En qué te puedo ayudar hoy? 😊',
            }
          }
        },
        include: { botConfig: true }
      })
    }
    res.json(business)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

businessRouter.get('/email/:email', async (req, res) => {
  try {
    const business = await prisma.business.findUnique({
      where: { ownerEmail: req.params.email },
      include: { botConfig: true }
    })
    if (!business) return res.status(404).json({ error: 'Negocio no encontrado' })
    res.json(business)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

businessRouter.get('/:id/stats', async (req, res) => {
  try {
    const businessId = req.params.id
    const totalConversations = await prisma.conversation.count({
      where: { businessId }
    })
    const activeConversations = await prisma.conversation.count({
      where: {
        businessId,
        status: { in: ['BOT_ACTIVE', 'HUMAN_TAKEOVER'] }
      }
    })
    const totalMessages = await prisma.message.count({
      where: {
        conversation: { businessId }
      }
    })
    const humanConversations = await prisma.conversation.count({
      where: {
        businessId,
        status: 'HUMAN_TAKEOVER'
      }
    })
    const botHandledRate = totalConversations > 0
      ? Math.round(((totalConversations - humanConversations) / totalConversations) * 100)
      : 100
    res.json({
      totalConversations,
      activeConversations,
      totalMessages,
      botHandledRate
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

businessRouter.put('/:id/bot-config', async (req, res) => {
  const { botName, businessContext, catalog, faq } = req.body
  try {
    const botConfig = await prisma.botConfig.upsert({
      where: { businessId: req.params.id },
      create: {
        businessId: req.params.id,
        botName: botName || 'Asistente',
        businessContext: businessContext || '',
        catalog: catalog || '',
        faq: faq || '',
        welcomeMessage: '¡Hola! ¿En qué te puedo ayudar hoy? 😊',
      },
      update: {
        botName,
        businessContext,
        catalog,
        faq,
      }
    })
    res.json(botConfig)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

businessRouter.get('/:id/conversations', async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { businessId: req.params.id },
      include: {
        contact: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { lastMsgAt: 'desc' },
    })
    res.json(conversations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

businessRouter.get('/:id/conversations/:conversationId/messages', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: req.params.conversationId },
      orderBy: { createdAt: 'asc' },
    })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})