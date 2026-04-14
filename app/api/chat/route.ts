import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response("No messages provided", { status: 400 });
    }

    const result = streamText({
      model: xai('grok-3'),           // Cambia a 'grok-4.20-reasoning' si quieres más poder
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error: any) {
    console.error('Error en API chat:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error al conectar con Grok',
        details: error?.message 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}