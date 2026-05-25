import { Router } from 'express'
import Stripe from 'stripe'
import { prisma } from '../lib/prisma.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const subscriptionRouter = Router()

// Crear sesión de pago para plan Pro
subscriptionRouter.post('/checkout/:businessId', async (req, res) => {
  try {
    const business = await prisma.business.findUnique({
      where: { id: req.params.businessId }
    })

    if (!business) return res.status(404).json({ error: 'Negocio no encontrado' })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: business.ownerEmail,
      line_items: [{
        price: process.env.STRIPE_PRO_PRICE_ID,
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: { businessId: business.id }
    })

    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Webhook de Stripe - escucha pagos exitosos
subscriptionRouter.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const businessId = session.metadata.businessId

    await prisma.business.update({
      where: { id: businessId },
      data: { plan: 'PRO' }
    })

    await prisma.subscription.upsert({
      where: { businessId },
      create: {
        businessId,
        stripeCustomerId: session.customer,
        status: 'ACTIVE',
        plan: 'PRO',
      },
      update: {
        stripeCustomerId: session.customer,
        status: 'ACTIVE',
        plan: 'PRO',
      }
    })
  }

  res.json({ received: true })
})

// Ver estado de suscripción
subscriptionRouter.get('/:businessId', async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { businessId: req.params.businessId }
    })
    res.json(subscription ?? { plan: 'BETA', status: 'ACTIVE' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
