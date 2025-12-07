import React, { useState, useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import { sendMessage, fetchHistory, Message } from '../services/api'

const LoadingDots: React.FC = () => (
  <div className="flex justify-start mb-4">
    <div className="px-5 py-3 glass-dark rounded-2xl rounded-bl-md">
      <div className="flex space-x-2">
        <div 
          className="w-2 h-2 rounded-full bg-white/60 animate-bounce" 
          style={{ animationDelay: '0ms' }} 
        />
        <div 
          className="w-2 h-2 rounded-full bg-white/60 animate-bounce" 
          style={{ animationDelay: '150ms' }} 
        />
        <div 
          className="w-2 h-2 rounded-full bg-white/60 animate-bounce" 
          style={{ animationDelay: '300ms' }} 
        />
      </div>
    </div>
  </div>
)

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setError(null)
      const history = await fetchHistory()
      setMessages(history)
    } catch (err) {
      setError("Unable to connect to server. Please try again later.")
      console.error('Failed to fetch history:', err)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendMessage(input.trim())
      const aiMessage: Message = { role: 'ai', content: response.reply }
      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      setError('Failed to get response. Please check if the backend is running.')
      const errorMessage: Message = {
        role: 'ai',
        content: 'Sorry, I encountered an error. Please make sure the backend server is running.',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full max-w-3xl h-[90vh] glass rounded-3xl shadow-glass flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-center text-white">
          ✨ AI Chat Assistant
        </h1>
        <p className="mt-1 text-sm text-center text-white/60">
          Powered by Google Gemini
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3 mx-6 mt-4 border rounded-lg bg-red-500/20 border-red-500/30">
          <p className="text-sm text-center text-red-300">{error}</p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {messages.length === 0 && !error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-white/40">
              Start a conversation with AI...
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble
            key={msg._id || index}
            role={msg.role}
            content={msg.content}
          />
        ))}

        {isLoading && <LoadingDots />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-5 py-4 text-white transition-all border bg-white/10 border-white/20 rounded-2xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-accent to-primary hover:from-accent-light hover:to-primary-light disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl hover:shadow-glow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox

