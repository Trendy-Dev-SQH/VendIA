import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { whatsappRouter } from './routes/whatsapp.js'
import { businessRouter } from './routes/business.js'
import { subscriptionRouter } from './routes/subscription.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: '*',
  credentials: false,
}))

app.use(express.json())

app.use('/api/whatsapp', whatsappRouter)
app.use('/api/business', businessRouter)
app.use('/api/subscription', express.raw({ type: 'application/json', limit: '10mb' }))
app.use('/api/subscription', subscriptionRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'VendIA API', ts: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🤖 VendIA backend corriendo en http://localhost:${PORT}`)
  console.log(`📋 Health: http://localhost:${PORT}/health\n`)
})

export default app
