import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateBotReply({ botConfig, history, userMessage }) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: buildSystemPrompt(botConfig),
  })

  const historyFormatted = history.slice(-20).map(msg => ({
    role: msg.role === 'USER' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }))

  const chat = model.startChat({
    history: historyFormatted,
  })

  const result = await chat.sendMessage(userMessage)
  return result.response.text()
}

function buildSystemPrompt(botConfig) {
  return `Eres ${botConfig.botName}, el asistente virtual de WhatsApp de este negocio.

## Información del negocio
${botConfig.businessContext}

${botConfig.catalog ? `## Productos y servicios\n${botConfig.catalog}` : ''}

${botConfig.faq ? `## Preguntas frecuentes\n${botConfig.faq}` : ''}

## Instrucciones
- Responde en el mismo idioma que el cliente
- Respuestas cortas, máx 3-4 líneas
- No inventes precios ni información que no esté en tu contexto
- Si el cliente escribe "${botConfig.humanHandoffKeyword}", dile que lo conectarás con una persona
- Tu objetivo es ayudar y facilitar la venta`
}

export function wantsHumanHandoff(message, keyword = 'humano') {
  return message.toLowerCase().includes(keyword.toLowerCase())
}