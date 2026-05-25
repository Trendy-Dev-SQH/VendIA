import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  from: String,
  text: String,
  suggestions: [String],
  timestamp: { type: Date, default: Date.now },
  replied: { type: Boolean, default: false },
});

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find({ replied: false })
      .sort({ timestamp: -1 })
      .limit(20);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}