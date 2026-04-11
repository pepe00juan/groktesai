import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: xai('grok-3'),           // Cambia a 'grok-4.20-reasoning' si quieres más potencia
    messages,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}