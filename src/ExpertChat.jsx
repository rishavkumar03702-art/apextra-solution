import { useState } from 'react'
import './ExpertChat.css'

export default function ExpertChat({ onClose }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! Welcome to APEXTRA SOLUTION. I am your AI Resume Expert. I can help you improve your resume, skills, professional summary and job profile. How can I help you today?'
    }
  ])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages(prev => [
      ...prev,
      { role: 'user', text: message }
    ])

    setMessage('')
  }

  return (
    <div className="expert-chat-overlay">
      <div className="expert-chat-window">

        <div className="expert-chat-header">
          <div>
            <h3>APEXTRA AI Resume Expert</h3>
            <span>● Online Support</span>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="expert-chat-messages">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`expert-message ${item.role}`}
            >
              {item.text}
            </div>
          ))}
        </div>

        <div className="expert-chat-input">
          <input
            type="text"
            placeholder="Ask about your resume..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend()
            }}
          />

          <button onClick={handleSend}>
            Send
          </button>
        </div>

        <div className="expert-chat-footer">
          Powered by APEXTRA SOLUTION
        </div>

      </div>
    </div>
  )
}