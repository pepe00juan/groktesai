import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: xai('grok-4.20-non-reasoning'),   // ← Modelo recomendado (rápido y bueno)
    // Otras opciones buenas:
    // xai('grok-4.20-reasoning')     ← más inteligente
    // xai('grok-3')                   ← muy bueno también
    messages,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}