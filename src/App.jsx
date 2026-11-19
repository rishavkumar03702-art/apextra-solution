import AIRA from './AIRA'
import { useState, useEffect } from 'react'
import './App.css'
import ResumeMatch from './ResumeMatch'
import AICareerAssistant from './AICareerAssistant'
import { supabase } from './supabase'
import {
  Home,
  Building2,
  LayoutGrid,
  BookOpen,
  Briefcase,
  Search,
  ChevronDown,
  Sparkles,
  X
} from 'lucide-react'

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

const searchItems = [
  ...services.map((item) => ({
    title: item.name,
    category: 'Services',
    link: '#services'
  })),

  { title: 'Technical Training', category: 'Training', link: '#training' },
  { title: 'Corporate Training', category: 'Training', link: '#training' },
  { title: 'AI & Machine Learning', category: 'Training', link: '#training' },
  { title: 'Microsoft Fabric', category: 'Training', link: '#training' },
  { title: 'Power BI & Analytics', category: 'Training', link: '#training' },
  { title: 'SQL & Python', category: 'Training', link: '#training' },

  { title: 'Company Overview', category: 'Company', link: '#about' },
  { title: 'Our Mission', category: 'Company', link: '#about' },
  { title: 'Our Vision', category: 'Company', link: '#about' },
  { title: 'Our Team', category: 'Company', link: '#about' },

  { title: 'Resume Match', category: 'Careers', link: '#resume-match' },
  { title: 'Current Openings', category: 'Careers', link: '#careers' },
  { title: 'Internship Programs', category: 'Careers', link: '#careers' },
  { title: 'ATS Resume Analyzer', category: 'Careers', link: '#ats-analyzer' }
]

const navMenus = [
  {
    label: 'Home',
    href: '#home',
    Icon: Home,
    title: 'Welcome to APEXTRA SOLUTION',
    sub: 'Discover • Connect • Grow',
    links: [
      ['#home', '🏠 Home Overview'],
      ['#services', '💡 Our Solutions'],
      ['#services', '🌐 Industries We Serve'],
      ['#about', '⭐ Why APEXTRA'],
      ['#contact', '📰 Latest Updates'],
      ['#contact', '🤝 Connect With Us']
    ]
  },
  {
    label: 'Company',
    href: '#about',
    Icon: Building2,
    title: 'About APEXTRA SOLUTION',
    sub: 'Who We Are • What We Do • Our Values',
    links: [
      ['#about', 'Company Overview'],
      ['#about', 'Our Mission'],
      ['#about', 'Our Vision'],
      ['#about', 'Our Values'],
      ['#about', 'Our Team'],
      ['#about', 'Why Choose Us']
    ]
  },
  {
    label: 'Services',
    href: '#services',
    Icon: LayoutGrid,
    title: 'Explore Our Services',
    sub: 'Technology • Talent • Transformation',
    links: [
      ['#services', 'AI & Data Science'],
      ['#services', 'BI & Analytics'],
      ['#services', 'Data Engineering'],
      ['#services', 'Cloud Solutions'],
      ['#services', 'Web Development'],
      ['#services', 'Business Consulting']
    ]
  },
  {
    label: 'Training',
    href: '#training',
    Icon: BookOpen,
    title: 'Training & Learning',
    sub: 'Learn • Build • Grow',
    links: [
      ['#training', 'Technical Training'],
      ['#training', 'Corporate Training'],
      ['#training', 'AI & Machine Learning'],
      ['#training', 'Microsoft Fabric'],
      ['#training', 'Power BI & Analytics'],
      ['#training', 'SQL & Python']
    ]
  },
  {
    label: 'Careers',
    href: '#careers',
    Icon: Briefcase,
    title: 'Build Your Career With Us',
    sub: 'Opportunities • Growth • Success',
    links: [
      ['#resume-match', 'Resume Match', 'featured'],
      ['#careers', 'Current Openings'],
      ['#careers', 'Apply for Jobs'],
      ['#careers', 'Internship Programs'],
      ['#careers', 'Remote Opportunities'],
      ['#ats-analyzer', 'ATS Resume Analyzer'],
      ['#ai-career-assistant', 'AI Career Assistant', 'ai-featured'],
      ['#careers', 'Career Support']
    ]
  }
]

const emptyAuth = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+91',
  phone: '',
  gender: '',
  password: '',
  otp: ''
}

const countryCodes = [
  ['IN', '+91'], ['US', '+1'], ['GB', '+44'], ['AE', '+971'],
  ['SA', '+966'], ['AU', '+61'], ['CA', '+1'], ['SG', '+65'],
  ['DE', '+49'], ['NP', '+977'], ['BD', '+880'], ['LK', '+94']
]

const emptyForm = {
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
}

function App() {
  const heroSlides = [
    '/rishav.jpg',
    '/2.png',
    '/Apextra_1.png'
  ]
const [currentSlide, setCurrentSlide] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, 3000)

  return () => clearInterval(timer)
}, [])
  const [showForm, setShowForm] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [form, setForm] = useState(emptyForm)

  // ---------- AUTH ----------
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState('signin') // 'signin' | 'signup'
  const [loginMode, setLoginMode] = useState('password') // 'password' | 'otp'
  const [otpSent, setOtpSent] = useState(false)
  const [authForm, setAuthForm] = useState(emptyAuth)
  const [authMsg, setAuthMsg] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [user, setUser] = useState(null)

  // ---------- SIMPLE HASH ROUTING (#resume-match = Resume Match page) ----------
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isResumePage = route === '#resume-match' || route === '#ats-analyzer'
  const isAICareerPage = route === '#ai-career-assistant'

  useEffect(() => {
    if (route === '#resume-match' || route === '#ats-analyzer') {
      window.scrollTo(0, 0)
      return
    }
    if (route) {
      const el = document.getElementById(route.slice(1))
      if (el) el.scrollIntoView()
    }
  }, [route])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Account dropdown: bahar click karne par band ho jaye
  useEffect(() => {
    const closeMenu = (e) => {
      document.querySelectorAll('.account-menu[open]').forEach((m) => {
        if (!m.contains(e.target)) m.removeAttribute('open')
      })
    }
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [])

  const displayName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    ''

  // Pura naam + initials (RK jaisa) account dropdown ke liye
  const accountFullName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''

  const initials = accountFullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  const openAuth = (tab = 'signin') => {
    setAuthTab(tab)
    setLoginMode('password')
    setOtpSent(false)
    setAuthMsg(null)
    setShowAuth(true)
  }

  const closeAuth = () => {
    setShowAuth(false)
    setAuthMsg(null)
    setOtpSent(false)
    setAuthForm(emptyAuth)
  }

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value })
  }

  const sendSignupCode = async () => {
    const fullName = `${authForm.firstName} ${authForm.lastName}`.trim()

    const { error } = await supabase.auth.signInWithOtp({
      email: authForm.email,
      options: {
        shouldCreateUser: true,
        data: {
          full_name: fullName,
          first_name: authForm.firstName,
          last_name: authForm.lastName,
          gender: authForm.gender,
          phone: authForm.phone ? `${authForm.countryCode} ${authForm.phone}` : ''
        }
      }
    })
    if (error) throw error

    setOtpSent(true)
    setAuthMsg({ type: 'success', text: 'Verification code sent to your email.' })
  }

  const handleResend = async () => {
    setAuthMsg(null)
    setAuthLoading(true)
    try {
      await sendSignupCode()
    } catch (err) {
      setAuthMsg({ type: 'error', text: err.message || 'Could not resend the code.' })
    } finally {
      setAuthLoading(false)
    }
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthMsg(null)
    setAuthLoading(true)

    try {
      if (authTab === 'signup') {
        if (!otpSent) {
          await sendSignupCode()
        } else {
          const { error } = await supabase.auth.verifyOtp({
            email: authForm.email,
            token: authForm.otp,
            type: 'email'
          })
          if (error) throw error
          closeAuth()
        }
      } else if (loginMode === 'password') {
        const { error } = await supabase.auth.signInWithPassword({
          email: authForm.email,
          password: authForm.password
        })
        if (error) throw error
        closeAuth()
      } else if (!otpSent) {
        const { error } = await supabase.auth.signInWithOtp({
          email: authForm.email,
          options: { shouldCreateUser: false }
        })
        if (error) throw error
        setOtpSent(true)
        setAuthMsg({ type: 'success', text: 'OTP sent to your email.' })
      } else {
        const { error } = await supabase.auth.verifyOtp({
          email: authForm.email,
          token: authForm.otp,
          type: 'email'
        })
        if (error) throw error
        closeAuth()
      }
    } catch (err) {
      setAuthMsg({ type: 'error', text: err.message || 'Something went wrong. Please try again.' })
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGoogle = async () => {
    setAuthMsg(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) setAuthMsg({ type: 'error', text: error.message })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const filteredResults = searchText.trim()
    ? searchItems.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : []

  const openForm = () => setShowForm(true)
  const closeForm = () => setShowForm(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from('client_requests').insert([
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
      alert('Request could not be submitted. Please try again.')
      return
    }

    alert('Thank you! Your request has been submitted successfully.')
    setForm(emptyForm)
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
          {navMenus.map((menu) => (
            <div className="nav-dropdown" key={menu.label}>
              <a href={menu.href} className="nav-dropdown-link">
                <menu.Icon size={20} strokeWidth={1.8} className="nav-icon" />
                <span>{menu.label}</span>
                <ChevronDown size={16} strokeWidth={2} className="nav-chevron" />
              </a>

              <div className="mega-menu">
                <div className="mega-menu-title">
                  <h3>{menu.title}</h3>
                  <p>{menu.sub}</p>
                </div>

                <div className="mega-menu-grid">
                  {menu.links.map(([href, text, flag], i) => (
                    <a href={href} key={i} className={`mega-menu-link ${flag || ''}`}>
                      {flag === 'ai-featured' ? (
                        <>
                          <span className="ai-menu-icon">🤖</span>
                          <span>{text}</span>
                          <span className="ai-menu-sparkle">✦</span>
                        </>
                      ) : text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            className="search-btn"
            aria-label="Search"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={22} />
          </button>
        </nav>

        {showSearch && (
          <div className="navbar-search">
            <div className="search-input-row">
              <input
                type="text"
                placeholder="Search APEXTRA..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />

              <button
                onClick={() => {
                  setShowSearch(false)
                  setSearchText('')
                }}
              >
                ✕
              </button>
            </div>

            {searchText.trim() && (
              <div className="search-results">
                <p className="search-results-count">
                  {filteredResults.length} RESULTS FOR "{searchText}"
                </p>

                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <a
                      href={item.link}
                      className="search-result-item"
                      key={index}
                      onClick={() => setShowSearch(false)}
                    >
                      <div>
                        <strong>{item.title}</strong>
                        <small>{item.category}</small>
                      </div>
                      <span>›</span>
                    </a>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="nav-auth">
          {user ? (
            <details className="account-menu">
              <summary className="account-trigger">
                <span className="account-avatar">{initials || 'U'}</span>
                <span>{accountFullName}</span>
                <ChevronDown size={16} strokeWidth={2} className="account-arrow" />
              </summary>

              <div className="account-dropdown">
                <div className="account-info">
                  <small>Signed in as</small>
                  <span>{user.email}</span>
                </div>

                <button type="button">My Services</button>
                <button type="button">My Applications</button>
                <button type="button">Certificates</button>
                <button type="button">My Profile</button>
                <button type="button">Payments</button>
                <button type="button">Change Password</button>

                <button
                  type="button"
                  className="account-logout"
                  onClick={handleSignOut}
                >
                  Log out
                </button>
              </div>
            </details>
          ) : (
            <button
              className="sign-in-btn"
              type="button"
              onClick={() => openAuth('signin')}
            >
              SIGN IN
            </button>
          )}
        </div>
      </header>

      {isResumePage ? (
        <ResumeMatch
          onGetHelp={() => {}}
          user={user}
          onRequireLogin={() => openAuth('signin')}
          mode={route === '#ats-analyzer' ? 'ats' : 'match'}
        />
      ) : isAICareerPage ? (
        <AICareerAssistant user={user} />
      ) : (
        <>

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

        <div
  className="hero-card"
  style={{
    backgroundImage:
      `linear-gradient(rgba(5, 25, 55, 0.55), rgba(5, 25, 55, 0.75)), url('${heroSlides[currentSlide]}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 25%',
    backgroundRepeat: 'no-repeat'
  }}
>
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

      {/* TRAINING */}
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
            <button onClick={openForm}>Join Our Network →</button>
          </div>

          <div className="career-card">
            <div className="career-icon">💼</div>
            <h3>Freelance Opportunities</h3>
            <p>
              Work on exciting projects and connect with clients
              across different industries.
            </p>
            <button onClick={openForm}>Explore Opportunities →</button>
          </div>

          <div className="career-card">
            <div className="career-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>
              Improve your skills, gain experience and discover
              new professional opportunities.
            </p>
            <button onClick={openForm}>Get Started →</button>
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

      </>
      )}

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


      {/* SIGN IN / CREATE ACCOUNT POPUP */}
      {showAuth && (
        <div className="auth-overlay" onClick={closeAuth}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>

            <div className="auth-left">
              <img src="/signin-banner.png" alt="" className="auth-bg" />
              <div className="auth-left-overlay" />
              <div className="auth-hero-wrap">
                <img
                  src="/signin-banner.png"
                  alt="Apextra Solution"
                  className="auth-hero-img"
                />
              </div>
              <div className="auth-left-content">
                <div className="auth-badge">
                  <Sparkles size={26} />
                </div>
                <h2>
                  Start Your <span>Tech Journey</span> Today
                </h2>
                <p>
                  Connect with skilled professionals, technology experts and
                  trusted service providers. One network, every solution.
                </p>
              </div>
            </div>

            <div className="auth-right">
              <button className="auth-close" onClick={closeAuth} aria-label="Close">
                <X size={22} />
              </button>

              <div className="auth-tabs">
                <button
                  type="button"
                  className={authTab === 'signin' ? 'active' : ''}
                  onClick={() => { setAuthTab('signin'); setAuthMsg(null) }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={authTab === 'signup' ? 'active' : ''}
                  onClick={() => { setAuthTab('signup'); setAuthMsg(null) }}
                >
                  Create Account
                </button>
              </div>

              <h3 className="auth-title">
                {authTab === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="auth-sub">
                {authTab === 'signin'
                  ? 'Sign in to continue your APEXTRA journey.'
                  : 'Start your journey with APEXTRA SOLUTION.'}
              </p>

              {authTab === 'signin' && (
                <div className="auth-mode">
                  <button
                    type="button"
                    className={loginMode === 'password' ? 'active' : ''}
                    onClick={() => { setLoginMode('password'); setOtpSent(false); setAuthMsg(null) }}
                  >
                    Password
                  </button>
                  <button
                    type="button"
                    className={loginMode === 'otp' ? 'active' : ''}
                    onClick={() => { setLoginMode('otp'); setAuthMsg(null) }}
                  >
                    Email OTP
                  </button>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="auth-form">
                {authTab === 'signup' && (
                  <div className="auth-row">
                    <div>
                      <label>First name <b>*</b></label>
                      <input
                        type="text"
                        name="firstName"
                        value={authForm.firstName}
                        onChange={handleAuthChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Last name <b>*</b></label>
                      <input
                        type="text"
                        name="lastName"
                        value={authForm.lastName}
                        onChange={handleAuthChange}
                        required
                      />
                    </div>
                  </div>
                )}

                <label>Email <b>*</b></label>
                <input
                  type="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleAuthChange}
                  required
                />

                {authTab === 'signup' && (
                  <>
                    <label>Contact (optional)</label>
                    <div className="auth-phone">
                      <select
                        name="countryCode"
                        value={authForm.countryCode}
                        onChange={handleAuthChange}
                      >
                        {countryCodes.map(([code, dial]) => (
                          <option key={code} value={dial}>
                            {code} {dial}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={authForm.phone}
                        onChange={handleAuthChange}
                      />
                    </div>

                    <label>Gender <b>*</b></label>
                    <select
                      name="gender"
                      className="auth-select"
                      value={authForm.gender}
                      onChange={handleAuthChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </>
                )}

                {authTab === 'signin' && loginMode === 'password' && (
                  <>
                    <label>Password <b>*</b></label>
                    <input
                      type="password"
                      name="password"
                      value={authForm.password}
                      onChange={handleAuthChange}
                      minLength={6}
                      required
                    />
                  </>
                )}

                {otpSent && (authTab === 'signup' || loginMode === 'otp') && (
                  <>
                    <label>
                      {authTab === 'signup' ? 'Verification code' : 'Enter OTP'} <b>*</b>
                    </label>
                    <input
                      type="text"
                      name="otp"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={authForm.otp}
                      onChange={handleAuthChange}
                      required
                    />
                  </>
                )}

                {authMsg && (
                  <p className={`auth-msg ${authMsg.type}`}>{authMsg.text}</p>
                )}

                <button type="submit" className="auth-submit" disabled={authLoading}>
                  {authLoading
                    ? 'Please wait...'
                    : authTab === 'signup'
                      ? (otpSent ? 'Verify & Create Account' : 'Send Verification Code')
                      : loginMode === 'otp'
                        ? (otpSent ? 'Verify OTP' : 'Send OTP')
                        : 'Sign In'}
                </button>

                {authTab === 'signup' && otpSent && (
                  <button
                    type="button"
                    className="auth-link"
                    onClick={handleResend}
                    disabled={authLoading}
                  >
                    Resend code
                  </button>
                )}
              </form>

              {authTab === 'signin' && (
                <>
                  <div className="auth-or"><span>OR</span></div>

                  <button type="button" className="auth-google" onClick={handleGoogle}>
                    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/>
                      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/>
                      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
      <AIRA />

    </div>
  )
}

export default App
