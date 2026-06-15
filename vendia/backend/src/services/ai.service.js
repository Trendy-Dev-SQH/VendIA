export async function generateBotReply({ botConfig, history, userMessage }) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
  })

  const historyFormatted = history.slice(-20).map(msg => ({
    role: msg.role === 'USER' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }))

  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: buildSystemPrompt(botConfig) }] },
      { role: 'model', parts: [{ text: 'Entendido, seguiré estas instrucciones.' }] },
      ...historyFormatted,
    ],
  })

  // Retry hasta 3 veces si hay 503
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const result = await chat.sendMessage(userMessage)
      return result.response.text()
    } catch (error) {
      if (error.status === 503 && intento < 3) {
        console.warn(`⚠️ Gemini 503, reintentando (${intento}/3)...`)
        await new Promise(r => setTimeout(r, 2000 * intento))
      } else {
        throw error
      }
    }
  }
}