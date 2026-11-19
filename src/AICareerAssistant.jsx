import './AICareerAssistant.css'
export default function AICareerAssistant({ user }) {
    const isTester =
  user?.email?.toLowerCase() === 'techrishav@gmail.com'
      const services = [
  {
    title: 'AI Resume Expert',
    description: 'Improve your resume with AI-powered suggestions.',
    price: '₹99'
  },
  {
    title: 'ATS Resume Analysis',
    description: 'Check your resume against a job description.',
    price: '2 Checks Free | ₹99 for 5 Checks'
  },
  {
    title: 'Interview Preparation',
    description: 'Prepare for interviews with AI guidance.',
    price: '₹599'
  },
  {
    title: 'Career Guidance',
    description: 'Get guidance for your career growth.',
    price: '₹599'
  },
  {
    title: 'LinkedIn Profile Optimization',
    description: 'Improve your professional LinkedIn profile.',
    price: '₹499'
  },
  {
    title: 'Professional Resume Writing',
    description: 'Get help creating a professional resume.',
    price: '₹399'
  }
  ]

  return (
    <div className="ai-career-page">
      <h1>APEXTRA AI Career Assistant</h1>

      <p>
        Your AI-powered partner for resumes, interviews and career growth.
      </p>

      <div className="ai-career-services">
        {services.map((service, index) => (
          <div className="ai-career-card" key={index}>
    
  <h2>{service.title}</h2>

  <p>{service.description}</p>

  <div className="ai-career-price">
    {service.title === 'ATS Resume Analysis' && (
      <span className="free-badge">2 CHECKS FREE</span>
    )}
    {isTester ? (
  <strong>FREE FOR YOU 🎉</strong>
) : (
  <strong>{service.price}</strong>
)}
  </div>

  <button
    onClick={() => {
      if (service.title === 'ATS Resume Analysis') {
        window.location.hash = '#ats-analyzer'
      }
    }}
  >
    View & Apply →
  </button>
</div>
        ))}
      </div>
    </div>
  )
}
