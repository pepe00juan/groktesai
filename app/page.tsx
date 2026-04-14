'use client';

import { useChat } from '@ai-sdk/react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#0a0a0a',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #333',
        padding: '16px',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        🚀 Grok Chatbot (xAI Direct)
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '80px'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>👋</div>
            <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>
              Hola, ¿en qué te ayudo hoy?
            </h2>
            <p style={{ color: '#888' }}>Estoy usando Grok-3 directamente</p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '14px 18px',
                borderRadius: '18px',
                backgroundColor: m.role === 'user' ? '#2563eb' : '#1f1f1f',
                color: m.role === 'user' ? 'white' : '#e5e5e5'
              }}
            >
              <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{m.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '14px 18px',
              backgroundColor: '#1f1f1f',
              borderRadius: '18px',
              color: '#aaa'
            }}>
              Grok está pensando...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit} 
        style={{
          padding: '16px',
          borderTop: '1px solid #333',
          backgroundColor: '#0a0a0a'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          <input
            style={{
              flex: 1,
              backgroundColor: '#111',
              border: '1px solid #444',
              borderRadius: '9999px',
              padding: '16px 24px',
              fontSize: '17px',
              outline: 'none',
              color: 'white'
            }}
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              padding: '0 28px',
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading || !input.trim() ? 0.6 : 1
            }}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}