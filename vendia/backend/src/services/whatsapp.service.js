import axios from 'axios'

const WA_API_URL = 'https://graph.facebook.com/v19.0'

export async function sendWhatsAppMessage({ phoneNumberId, to, message }) {
  const response = await axios.post(
    `${WA_API_URL}/${phoneNumberId}/messages`,
    {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body: message },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

export async function markMessageAsRead({ phoneNumberId, messageId }) {
  await axios.post(
    `${WA_API_URL}/${phoneNumberId}/messages`,
    {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
}