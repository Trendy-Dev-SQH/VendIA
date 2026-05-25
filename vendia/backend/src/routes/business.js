import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

export const businessRouter = Router()

// Crear o recuperar un negocio
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

// Obtener negocio por email
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

// Obtener estadísticas del dashboard
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

// Actualizar configuración del bot
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