import { NextResponse } from 'next/server';
import { generateSuggestions } from '@/lib/claude';

export async function POST(request) {
  try {
    const { message, businessInfo } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Falta el mensaje' }, { status: 400 });
    }

    const suggestions = await generateSuggestions(
      message,
      businessInfo || 'Negocio general'
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}