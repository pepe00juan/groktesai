'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const [isFirstMessage, setIsFirstMessage] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 p-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          Grok Chatbot (xAI)
        </h1>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.length === 0 && isFirstMessage && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">👋</div>
            <h2 className="text-2xl font-medium">Hola, ¿en qué te ayudo hoy?</h2>
            <p className="text-zinc-400 mt-2">Estoy usando Grok directamente</p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-100 rounded-2xl px-5 py-3">
              Pensando...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
        <div className="flex gap-3">
          <input
            className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-blue-500 rounded-2xl px-6 py-4 outline-none text-lg"
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black px-8 rounded-2xl font-medium hover:bg-zinc-200 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}