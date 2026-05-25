import OpenAI from 'openai';

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Define OPENAI_API_KEY en .env.local');
  }
  return new OpenAI({ apiKey });
}

export async function generateSuggestions(customerMessage, businessInfo) {
  const response = await getClient().chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Eres un asistente experto en ventas por WhatsApp para este negocio:

${businessInfo}

El cliente escribió:
"${customerMessage}"

Genera exactamente 3 sugerencias de respuesta. Devuelve SOLO este JSON sin texto adicional:
{
  "suggestions": [
    "respuesta 1",
    "respuesta 2",
    "respuesta 3"
  ]
}

Reglas: máximo 2 oraciones por respuesta, tono amable y persuasivo.`,
      },
    ],
  });

  const text = response.choices[0].message.content;
  const parsed = JSON.parse(text);
  return parsed.suggestions;
}