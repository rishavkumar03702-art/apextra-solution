import { useState } from 'react'
import './AIRA.css'

export default function AIRA() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [count, setCount] = useState(
    Number(localStorage.getItem('aira_questions') || 0)
  )
  const [messages, setMessages] = useState([
    {
      from: 'aira',
      text: "Hi! I'm AIRA 🤖, your AI assistant at APEXTRA SOLUTION. How can I help you today?"
    }
  ])

  const sendMessage = () => {
    if (!question.trim()) return

    if (count >= 5) {
      setMessages(prev => [...prev, {
        from: 'aira',
        text: "You've used your 5 free questions. Thank you for visiting APEXTRA SOLUTION!"
      }])
      return
    }

    const userQuestion = question.trim()

    setMessages(prev => [
      ...prev,
      { from: 'user', text: userQuestion },
      {
        from: 'aira',
        text: "Thanks for your question! I'm AIRA. Our team at APEXTRA SOLUTION can help you with IT services, training, recruitment and career support. Please explore our relevant services for more details."
      }
    ])

    const newCount = count + 1
    setCount(newCount)
    localStorage.setItem('aira_questions', newCount.toString())
    setQuestion('')
  }

  return (
    <div className="aira-widget">
      <button className="aira-float" onClick={() => setIsOpen(!isOpen)}>
        🤖
        <span className="aira-name">AIRA</span>
      </button>

      {isOpen && (
        <div className="aira-window">
          <div className="aira-header">
            <div>
              <strong>🤖 AIRA</strong>
              <small>APEXTRA AI Assistant</small>
            </div>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="aira-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`aira-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="aira-footer">
            <small>{count}/5 free questions used</small>
            <div className="aira-input">
              <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask AIRA..."
                disabled={count >= 5}
              />
              <button onClick={sendMessage} disabled={count >= 5}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}