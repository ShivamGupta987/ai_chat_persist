import React from 'react'

interface MessageBubbleProps {
  role: 'user' | 'ai'
  content: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] px-5 py-3 rounded-2xl transition-all duration-300 ${
          isUser
            ? 'bg-gradient-to-r from-accent to-primary text-white rounded-br-md shadow-glow'
            : 'glass-dark text-white rounded-bl-md'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  )
}

export default MessageBubble
