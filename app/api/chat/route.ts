import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    console.log('📨 Mensajes recibidos:', messages?.length || 0);

    if (!messages || messages.length === 0) {
      return new Response('No messages', { status: 400 });
    }

    const result = streamText({
      model: xai('grok-3-latest'),     // ← Cambiado a 'grok-3-latest' (más estable en 2026)
      messages,
      temperature: 0.7,
      maxTokens: 1200,
    });

    console.log('✅ Stream creado correctamente');

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error('❌ Error en /api/chat:', error.message || error);

    return new Response(
      JSON.stringify({
        error: 'Error al conectar con Grok',
        message: error?.message || 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}