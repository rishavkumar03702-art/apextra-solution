import { useState } from 'react'
import './App.css'
import { supabase } from "./supabase";

const services = [
  { icon: '🤖', name: 'Artificial Intelligence', skills: 'Generative AI, AI Agents, AI Automation' },
  { icon: '🧠', name: 'Machine Learning', skills: 'ML, AutoML, Predictive Analytics' },
  { icon: '💬', name: 'Generative AI & LLM', skills: 'LLM, Prompt Engineering, Fine-tuning' },
  { icon: '🔍', name: 'RAG Solutions', skills: 'RAG, Embeddings, Vector Databases' },
  { icon: '☁️', name: 'Microsoft Fabric', skills: 'Lakehouse, Data Warehouse, Data Factory' },
  { icon: '📊', name: 'Power BI', skills: 'DAX, Power Query, Dashboard Development' },
  { icon: '🗄️', name: 'SQL Server', skills: 'T-SQL, Database Administration' },
  { icon: '💻', name: 'SQL Development', skills: 'SQL, Query Optimization, Stored Procedures' },
  { icon: '🐍', name: 'Python Development', skills: 'Python, Django, Flask, FastAPI' },
  { icon: '⚙️', name: 'Data Engineering', skills: 'ETL, ELT, Data Pipelines, PySpark' },
  { icon: '📈', name: 'Data Analytics', skills: 'Data Analysis, Reporting, Visualization' },
  { icon: '🔬', name: 'Data Science', skills: 'Statistics, Modeling, Data Mining' },
  { icon: '📉', name: 'Tableau', skills: 'Tableau Dashboard, Data Visualization' },
  { icon: '🔷', name: 'Qlik Sense', skills: 'Qlik Sense, QlikView, Set Analysis' },
  { icon: '☁️', name: 'Microsoft Azure', skills: 'Azure Cloud, Azure Data Services' },
  { icon: '🌐', name: 'AWS & Google Cloud', skills: 'Cloud Computing, Cloud Architecture' },
  { icon: '⚡', name: 'Apache Spark', skills: 'Spark, PySpark, Big Data' },
  { icon: '🔄', name: 'Data Integration', skills: 'API Integration, ETL, Data Migration' },
  { icon: '🌍', name: 'Web Development', skills: 'React, Angular, JavaScript, Node.js' },
  { icon: '📱', name: 'App Development', skills: 'Android, iOS, Mobile Applications' },
  { icon: '🔐', name: 'Cybersecurity', skills: 'Security Auditing, Application Security' },
  { icon: '🖥️', name: 'IT Infrastructure', skills: 'Servers, Networking, IT Support' },
  { icon: '📡', name: 'API Development', skills: 'REST API, Integration, Automation' },
  { icon: '📦', name: 'DevOps', skills: 'Docker, Kubernetes, CI/CD' },
  { icon: '🗃️', name: 'Database Management', skills: 'MySQL, PostgreSQL, MongoDB, Oracle' },
  { icon: '📢', name: 'Digital Marketing', skills: 'SEO, SEM, Social Media Marketing' },
  { icon: '🎨', name: 'UI/UX Design', skills: 'Figma, Website & App Design' },
  { icon: '🏢', name: 'Business Consulting', skills: 'Business Analysis, Process Consulting' },
  { icon: '👨‍💻', name: 'Professional Staffing', skills: 'IT Hiring, Technical Recruitment' },
  { icon: '🎓', name: 'Corporate Training', skills: 'Technical Training, Upskilling' }
]

function App() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
state: '',
    company: '',
    service: '',
    type: '',
    budget: '',
    details: '',
    comment: ''
  })

  const openForm = () => setShowForm(true)

  const closeForm = () => setShowForm(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  const { error } = await supabase
    .from('client_requests')
    .insert([
      {
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        state: form.state,
        company: form.company,
        service: form.service,
        requirement_type: form.type,
        budget: form.budget,
        details: form.details,
       comment: form.comment,
        status: 'New'
      }
    ])

  if (error) {
    console.error('Submission Error:', error)
    alert('Request submit nahi hui. Please try again.')
    return
  }

  alert('Thank you! Your request has been submitted successfully.')

  setForm({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    company: '',
    service: '',
    type: '',
    budget: '',
    details: '',
    comment: ''
  })

  closeForm()
}

  return (
    <div className="website">

      {/* HEADER */}
      <header className="navbar">
        <a href="#home" className="logo">
  <img
    src="/APXtra.png"
    alt="Apextra Solution"
    className="logo-img"
  />
</a>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#training">Training</a>
          <a href="#careers">Careers</a>
        </nav>

        <button className="nav-btn" onClick={openForm}>
          Contact Us ↗
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-text">
          <span className="tag">YOUR PARTNER FOR GROWTH</span>

          <h1>
            Connecting Skills,<br />
            <span>People & Businesses.</span>
          </h1>

          <p>
            APEXTRA SOLUTION connects businesses with the right
            professionals, technology experts and service providers.
            From IT solutions to business support, we help you find
            the right expertise.
          </p>

          <div className="hero-buttons">
            <a href="#services" className="primary-btn">
              Explore Services →
            </a>

            <button className="outline-btn" onClick={openForm}>
              Get Support
            </button>
          </div>

          <div className="trust">
            ✓ Professional Support &nbsp;
            ✓ Multiple Skills &nbsp;
            ✓ Business Solutions
          </div>
        </div>

       <div className="hero-card">

  <div className="card-logo">
    <img src="/Apextra_1.png" alt="Apextra Icon" />
  </div>

  <h2 className="card-title">APEXTRA SOLUTION</h2>

  <h3>
    One Network.<br />
    Every Solution.
  </h3>

  <p>Technology • Talent • Transformation</p>

</div>

  
      </section>

      {/* ABOUT */}
<section className="about" id="about">

  <div className="about-heading">
    <span>WHO WE ARE</span>
    <h2>Your One-Stop Professional Support Network</h2>
    <p>
      We connect businesses, organizations and individuals
      with skilled professionals, technology experts and
      trusted service providers across multiple industries.
    </p>
  </div>

  <div className="about-cards">

    <div className="about-card">
      <div className="about-icon">🌐</div>
      <h3>Who We Are</h3>
      <p>
        APEXTRA SOLUTION is a professional network connecting
        businesses with technology experts, skilled professionals
        and trusted service providers.
      </p>
    </div>

    <div className="about-card">
      <div className="about-icon">🎯</div>
      <h3>Our Mission</h3>
      <p>
        Our mission is to deliver reliable technology,
        professional support and business solutions
        that help organizations grow.
      </p>
    </div>

    <div className="about-card">
      <div className="about-icon">🚀</div>
      <h3>Our Vision</h3>
      <p>
        Our vision is to build a trusted professional
        network where skills, technology and businesses
        come together for a better future.
      </p>
    </div>

  </div>

</section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="heading">
          <span>OUR EXPERTISE</span>
          <h2>Explore All Services</h2>
          <p>
            Find the right technology, skill and professional
            support for your business requirements.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>

              <h3>{service.name}</h3>

              <p>{service.skills}</p>

              <button
                className="service-link"
                onClick={() => {
                  setForm({ ...form, service: service.name })
                  openForm()
                }}
              >
                Get Expert Support →
              </button>
            </div>
          ))}
        </div>

        <div className="service-cta">
          <h2>Need a Different Skill or Technology?</h2>
          <p>Tell us your requirement. We will help you find the right expert.</p>
          <button className="primary-btn" onClick={openForm}>
            Submit Your Requirement →
          </button>
        </div>
      </section>

      
{/* HOW WE WORK */}
<section className="process" id="process">

  <div className="process-heading">
    <span>HOW WE WORK</span>
    <h2>Simple Steps. Powerful Solutions.</h2>
    <p>
      Our simple and transparent process helps you
      connect with the right professionals and get
      the best business solutions.
    </p>
  </div>

  <div className="process-cards">

    <div className="process-card">
      <div className="process-number">01</div>
      <div className="process-icon">📝</div>
      <h3>Share Your Requirements</h3>
      <p>Tell us about your business needs and expectations.</p>
    </div>

    <div className="process-card">
      <div className="process-number">02</div>
      <div className="process-icon">🤝</div>
      <h3>Connect with Experts</h3>
      <p>We connect you with skilled professionals and experts.</p>
    </div>

    <div className="process-card">
      <div className="process-number">03</div>
      <div className="process-icon">⚙️</div>
      <h3>Get the Right Solution</h3>
      <p>Get reliable services according to your requirements.</p>
    </div>

    <div className="process-card">
      <div className="process-number">04</div>
      <div className="process-icon">🚀</div>
      <h3>Grow Your Business</h3>
      <p>Achieve your goals and grow your business with confidence.</p>
    </div>

  </div>

</section>


{/* TRAINING SECTION */}
<section className="training" id="training">

  <div className="training-heading">
    <span>LEARN & GROW</span>
    <h2>Professional Training Programs</h2>
    <p>
      Upgrade your skills with industry-focused training
      programs designed for students and professionals.
    </p>
  </div>

  <div className="training-cards">

    <div className="training-card">
      <div className="training-icon">💻</div>
      <h3>IT & Software Training</h3>
      <p>Learn practical IT skills and software technologies.</p>
      <button onClick={openForm}>Explore Training →</button>
    </div>

    <div className="training-card">
      <div className="training-icon">🤖</div>
      <h3>AI & Machine Learning</h3>
      <p>Learn Artificial Intelligence, ML and AI Automation.</p>
      <button onClick={openForm}>Explore Training →</button>
    </div>

    <div className="training-card">
      <div className="training-icon">🐍</div>
      <h3>Python & SQL</h3>
      <p>Master Python programming, SQL and database skills.</p>
      <button onClick={openForm}>Explore Training →</button>
    </div>

    <div className="training-card">
      <div className="training-icon">📊</div>
      <h3>Power BI & Data Analytics</h3>
      <p>Learn Power BI, DAX, SQL and Data Visualization.</p>
      <button onClick={openForm}>Explore Training →</button>
    </div>

    <div className="training-card">
      <div className="training-icon">🌐</div>
      <h3>Web Development</h3>
      <p>Learn HTML, CSS, JavaScript, React and Web Development.</p>
      <button onClick={openForm}>Explore Training →</button>
    </div>

    <div className="training-card">
      <div className="training-icon">🏢</div>
      <h3>Corporate Training</h3>
      <p>Industry-oriented training for teams and organizations.</p>
      <button onClick={openForm}>Explore Training →</button>
    </div>

  </div>

</section>


{/* CAREERS */}
{/* CAREERS SECTION */}
<section className="careers" id="careers">

  <div className="careers-heading">
    <span>BUILD YOUR FUTURE WITH US</span>
    <h2>Grow Your Career with APEXTRA</h2>
    <p>
      Connect with opportunities, showcase your skills
      and become part of our growing professional network.
    </p>
  </div>

  <div className="careers-cards">

    <div className="career-card">
      <div className="career-icon">👨‍💻</div>
      <h3>Join as a Professional</h3>
      <p>
        Showcase your expertise and connect with businesses
        looking for skilled professionals.
      </p>
      <button onClick={openForm}>
        Join Our Network →
      </button>
    </div>

    <div className="career-card">
      <div className="career-icon">💼</div>
      <h3>Freelance Opportunities</h3>
      <p>
        Work on exciting projects and connect with clients
        across different industries.
      </p>
      <button onClick={openForm}>
        Explore Opportunities →
      </button>
    </div>

    <div className="career-card">
      <div className="career-icon">🚀</div>
      <h3>Career Growth</h3>
      <p>
        Improve your skills, gain experience and discover
        new professional opportunities.
      </p>
      <button onClick={openForm}>
        Get Started →
      </button>
    </div>

  </div>

  <div className="careers-cta">
    <h2>Ready to Take the Next Step?</h2>
    <p>Let's build your professional future together.</p>
    <button className="primary-btn" onClick={openForm}>
      Submit Your Profile →
    </button>
  </div>

</section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <span>LET'S CONNECT</span>
        <h2>How Can We Help You?</h2>
        <p>Tell us your requirement. Let's find the right solution.</p>

        <button className="primary-btn" onClick={openForm}>
          Contact APEXTRA →
        </button>

        <p className="contact-email">
          Email: contact@apextrasolution.com
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <h2>APEXTRA SOLUTION</h2>
        <p>Connecting Skills. Empowering Businesses.</p>
        <p>© 2026 APEXTRA SOLUTION. All Rights Reserved.</p>
      </footer>

      {/* REQUIREMENT POPUP */}
      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div
            className="requirement-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={closeForm}>
              ×
            </button>

            <span>LET'S WORK TOGETHER</span>
            <h2>Submit Your Requirement</h2>
            <p>Tell us what support you are looking for.</p>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">
                <input
                  name="name"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  name="company"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={handleChange}
                />
<div className="form-group">
  <input
    type="text"
    name="country"
    placeholder="Country *"
    value={form.country}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <input
    type="text"
    name="state"
    placeholder="State *"
    value={form.state}
    onChange={handleChange}
    required
  />
</div>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Required Service *</option>
                  {services.map((s, i) => (
                    <option key={i} value={s.name}>{s.name}</option>
                  ))}
                  <option value="Other">Other Services</option>
                </select>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Requirement Type *</option>
                  <option>Technical Support</option>
                  <option>Project Development</option>
                  <option>Hire a Professional</option>
                  <option>Corporate Training</option>
                  <option>Business Consulting</option>
                  <option>Other</option>
                </select>

                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="">Expected Budget</option>
                  <option>Below ₹10,000</option>
                  <option>₹10,000 - ₹50,000</option>
                  <option>₹50,000 - ₹1,00,000</option>
                  <option>₹1,00,000 - ₹5,00,000</option>
                  <option>Above ₹5,00,000</option>
                  <option>To be discussed</option>
                </select>
              </div>

              <textarea
                name="details"
                placeholder="Describe your requirement in detail..."
                value={form.details}
                onChange={handleChange}
                rows="4"
                required
              />
              <div className="form-group">
  <label>Additional Comments</label>
  <textarea
    name="comment"
    placeholder="Any additional comments..."
    value={form.comment}
    onChange={handleChange}
    rows="3"
  />
</div>

              <button type="submit" className="primary-btn submit-btn">
                Submit Requirement →
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default App