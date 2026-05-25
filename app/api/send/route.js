import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import axios from 'axios';

const MessageSchema = new mongoose.Schema({
  from: String,
  text: String,
  suggestions: [String],
  timestamp: { type: Date, default: Date.now },
  replied: { type: Boolean, default: false },
});

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);

export async function POST(request) {
  try {
    await connectDB();

    const { messageId, text, to } = await request.json();

    // Envía el mensaje por WhatsApp
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Marca el mensaje como respondido en MongoDB
    await Message.findByIdAndUpdate(messageId, { replied: true });

    return NextResponse.json({ status: 'enviado' });
  } catch (error) {
    console.error('Error al enviar:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}