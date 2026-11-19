import { useEffect, useRef, useState } from 'react'
import { supabase } from './supabase'
import {
  Sparkles,
  Upload,
  FileText,
  Download,
  RotateCcw,
  Check,
  X,
  Lightbulb,
  ArrowLeft,
  ShieldCheck,
  Lock
} from 'lucide-react'
import './ResumeMatch.css'

import ExpertChat from './ExpertChat'
/* ------------------------------------------------------------------
   SKILL LIST  [display name, [aliases to look for]]
   Naye skills add karne ho to bas yahan line add kar dein.
------------------------------------------------------------------- */
const SKILLS = [
  ['Python', ['python']],
  ['SQL', ['sql', 't-sql', 'tsql', 'pl/sql']],
  ['Power BI', ['power bi', 'powerbi']],
  ['DAX', ['dax']],
  ['Power Query', ['power query']],
  ['Tableau', ['tableau']],
  ['Qlik', ['qlik', 'qlik sense', 'qlikview']],
  ['Excel', ['excel', 'advanced excel']],
  ['Microsoft Fabric', ['microsoft fabric']],
  ['Azure', ['azure']],
  ['AWS', ['aws', 'amazon web services']],
  ['Google Cloud', ['gcp', 'google cloud']],
  ['Apache Spark', ['spark', 'pyspark']],
  ['Databricks', ['databricks']],
  ['Snowflake', ['snowflake']],
  ['Airflow', ['airflow']],
  ['Kafka', ['kafka']],
  ['ETL', ['etl', 'elt', 'data pipeline', 'data pipelines']],
  ['Data Warehousing', ['data warehouse', 'data warehousing', 'data warehouses']],
  ['Data Modeling', ['data modeling', 'data modelling']],
  ['Data Analysis', ['data analysis', 'data analytics', 'data analyst']],
  ['Data Visualization', ['data visualization', 'data visualisation', 'dashboard', 'dashboards']],
  ['Data Engineering', ['data engineering', 'data engineer']],
  ['Data Science', ['data science', 'data scientist']],
  ['Statistics', ['statistics', 'statistical']],
  ['Machine Learning', ['machine learning', 'ml']],
  ['Deep Learning', ['deep learning']],
  ['NLP', ['nlp', 'natural language processing']],
  ['Generative AI', ['generative ai', 'genai', 'gen ai']],
  ['LLM', ['llm', 'llms', 'large language model', 'large language models']],
  ['Prompt Engineering', ['prompt engineering']],
  ['RAG', ['rag', 'retrieval augmented generation']],
  ['Vector Databases', ['vector database', 'vector databases', 'embeddings']],
  ['TensorFlow', ['tensorflow']],
  ['PyTorch', ['pytorch']],
  ['scikit-learn', ['scikit-learn', 'sklearn']],
  ['Pandas', ['pandas']],
  ['NumPy', ['numpy']],
  ['MySQL', ['mysql']],
  ['PostgreSQL', ['postgresql', 'postgres']],
  ['MongoDB', ['mongodb']],
  ['Oracle', ['oracle']],
  ['SQL Server', ['sql server', 'ssms', 'ssis', 'ssrs']],
  ['JavaScript', ['javascript']],
  ['TypeScript', ['typescript']],
  ['React', ['react', 'reactjs', 'react.js']],
  ['Angular', ['angular']],
  ['Vue', ['vue', 'vue.js']],
  ['Node.js', ['node.js', 'nodejs']],
  ['HTML', ['html', 'html5']],
  ['CSS', ['css', 'css3']],
  ['Java', ['java']],
  ['C#', ['c#']],
  ['.NET', ['.net', 'dotnet']],
  ['C++', ['c++']],
  ['PHP', ['php']],
  ['Go', ['golang']],
  ['REST API', ['rest api', 'rest apis', 'restful']],
  ['GraphQL', ['graphql']],
  ['Django', ['django']],
  ['Flask', ['flask']],
  ['FastAPI', ['fastapi']],
  ['Spring Boot', ['spring boot']],
  ['Docker', ['docker']],
  ['Kubernetes', ['kubernetes', 'k8s']],
  ['CI/CD', ['ci/cd', 'cicd']],
  ['Git', ['git', 'github', 'gitlab']],
  ['Linux', ['linux']],
  ['Terraform', ['terraform']],
  ['DevOps', ['devops']],
  ['Selenium', ['selenium']],
  ['Testing', ['unit testing', 'test automation', 'manual testing', 'qa']],
  ['Android', ['android']],
  ['iOS', ['ios']],
  ['Flutter', ['flutter']],
  ['Kotlin', ['kotlin']],
  ['Swift', ['swift']],
  ['Figma', ['figma']],
  ['UI/UX', ['ui/ux', 'ux design', 'ui design']],
  ['Agile', ['agile', 'scrum', 'kanban']],
  ['Jira', ['jira']],
  ['Cybersecurity', ['cybersecurity', 'cyber security', 'information security']],
  ['SEO', ['seo']],
  ['Digital Marketing', ['digital marketing']],
  ['Communication', ['communication', 'communication skills']],
  ['Leadership', ['leadership']],
  ['Project Management', ['project management', 'stakeholder management']],
  ['Business Analysis', ['business analysis', 'business analyst', 'requirements gathering']]
]

const ACTION_VERBS = [
  'developed', 'built', 'designed', 'led', 'managed', 'created', 'implemented',
  'improved', 'optimized', 'optimised', 'analyzed', 'analysed', 'delivered',
  'automated', 'launched', 'reduced', 'increased', 'achieved', 'collaborated',
  'deployed', 'maintained', 'migrated', 'integrated', 'engineered', 'coordinated',
  'streamlined', 'established', 'mentored', 'resolved', 'executed', 'configured',
  'organized', 'trained', 'generated'
]

const STOP = new Set(
  (
    'with that this from your their they them such also other more than what when where which into over about ' +
    'will must should would could have has had are were been being the and for you our any all can may not but ' +
    'experience years year work working team teams skills skill ability abilities strong knowledge required ' +
    'preferred responsibilities responsibility requirements requirement qualifications qualification including ' +
    'include includes role roles candidate position job company looking etc good excellent understanding using ' +
    'used use across within related new able plus nice join help build building ensure support provide providing ' +
    'based well high level environment business seeking opportunity apply description minimum degree bachelor ' +
    'master equivalent'
  ).split(' ')
)

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const norm = (t) => t.toLowerCase().replace(/[\u2018\u2019]/g, "'")
const scoreColor = (s) => (s >= 75 ? '#1a9d55' : s >= 50 ? '#e99a26' : '#d94343')

function findSkills(text) {
  const t = norm(text)
  return SKILLS.filter(([, aliases]) =>
    aliases.some((a) =>
      new RegExp(`(?<![a-z0-9+#.])${esc(a)}(?![a-z0-9+#])`).test(t)
    )
  ).map(([name]) => name)
}

function wordsOf(text) {
  return norm(text).match(/[a-z][a-z+#]{3,}/g) || []
}

function topKeywords(text, n = 25) {
  const counts = {}
  const words = wordsOf(text)
  words.forEach((w) => {
    if (!STOP.has(w)) counts[w] = (counts[w] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([w]) => w)
}

/* ------------------------------------------------------------------
   RESUME MATCH (free)
------------------------------------------------------------------- */
function analyze(resume, jd) {
  const jdSkills = findSkills(jd)
  const resumeSkills = new Set(findSkills(resume))

  const matched = jdSkills.filter((s) => resumeSkills.has(s))
  const missing = jdSkills.filter((s) => !resumeSkills.has(s))

  const resumeWords = new Set(wordsOf(resume))
  const has = (w) =>
    resumeWords.has(w) || resumeWords.has(w.replace(/s$/, '')) || resumeWords.has(w + 's')

  const keywords = topKeywords(jd)
  const kwHit = keywords.filter(has)
  const kwMiss = keywords.filter((w) => !has(w))

  const skillScore = jdSkills.length ? matched.length / jdSkills.length : 0
  const kwScore = keywords.length ? kwHit.length / keywords.length : 0
  const raw = jdSkills.length >= 3 ? 0.7 * skillScore + 0.3 * kwScore : kwScore
  const score = Math.max(0, Math.min(100, Math.round(raw * 100)))

  let verdict = 'Low match'
  if (score >= 75) verdict = 'Strong match'
  else if (score >= 50) verdict = 'Good match, with room to improve'
  else if (score >= 30) verdict = 'Partial match'

  const tips = []

  if (missing.length) {
    tips.push(
      `The job asks for ${missing.slice(0, 6).join(', ')}${
        missing.length > 6 ? ' and more' : ''
      }, but your resume does not mention ${missing.length === 1 ? 'it' : 'them'}. ` +
        'If you have this experience, add it to your skills section and show where you used it.'
    )
  }

  if (kwMiss.length) {
    tips.push(
      `Use the employer's own wording wherever it is true for you. Words from the posting that are missing in your resume: ${kwMiss
        .slice(0, 6)
        .join(', ')}.`
    )
  }

  const yearsAsked = jd.match(/(\d+)\s*\+?\s*(?:years|yrs)/i)
  if (yearsAsked) {
    tips.push(
      `The job mentions ${yearsAsked[1]}+ years of experience. Make sure your resume clearly shows your total experience and the dates of each role.`
    )
  }

  const metrics = (
    resume.match(/\d+(\.\d+)?\s?(%|\+|k\b|lakh|crore|million|users|clients|projects)/gi) || []
  ).length
  if (metrics < 3) {
    tips.push(
      'Add measurable results (for example: cut report time by 40%, handled 25+ clients). Numbers show impact, not just duties.'
    )
  }

  const missingSections = []
  if (!/experience/i.test(resume)) missingSections.push('Experience')
  if (!/education/i.test(resume)) missingSections.push('Education')
  if (!/skills/i.test(resume)) missingSections.push('Skills')
  if (missingSections.length) {
    tips.push(`Add clear section headings for: ${missingSections.join(', ')}. They help recruiters and screening tools read your resume.`)
  }

  const wordCount = resume.trim().split(/\s+/).length
  if (wordCount < 150) {
    tips.push('Your resume looks short. Add more detail about your projects, tools used and results.')
  } else if (wordCount > 1000) {
    tips.push('Your resume is long. Try to keep it focused on the most relevant work for this job.')
  }

  if (!/[\w.+-]+@[\w-]+\.[\w.]+/.test(resume)) {
    tips.push('No email address was found. Add your contact details at the top.')
  }

  if (!tips.length) {
    tips.push(
      'Your resume covers this job well. Tailor your summary to mention the job title and your strongest matching skills.'
    )
  }

  return {
    score,
    verdict,
    matched,
    missing,
    jdSkillsCount: jdSkills.length,
    kwMiss: kwMiss.slice(0, 10),
    tips,
    wordCount
  }
}

/* ------------------------------------------------------------------
   ATS CHECK (2 free, phir Rs 99 / 5 checks)
------------------------------------------------------------------- */
function analyzeATS(resume, jd) {
  const text = resume
  const lower = norm(resume)
  const hasJD = jd.trim().length >= 80
  const rows = []

  const push = (cat, title, max, got, okMsg, badMsg, fix) => {
    const ok = got >= max * 0.8
    rows.push({
      cat,
      title,
      max,
      got,
      ok,
      partial: !ok && got > 0,
      detail: ok ? okMsg : badMsg,
      fix
    })
  }

  /* ---- Contact details (10) ---- */
  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]+/.test(text)
  push(
    'Contact details', 'Email address', 5, hasEmail ? 5 : 0,
    'Email address found.', 'No email address found.',
    'Add a professional email address at the top of your resume.'
  )

  const phoneHits = text.match(/\+?\d[\d\s().-]{8,16}\d/g) || []
  const hasPhone = phoneHits.some((p) => {
    const d = p.replace(/\D/g, '')
    return d.length >= 10 && d.length <= 13
  })
  push(
    'Contact details', 'Phone number', 3, hasPhone ? 3 : 0,
    'Phone number found.', 'No phone number found.',
    'Add your phone number next to your email address.'
  )

  const hasLink = /linkedin\.com|github\.com|behance\.net|portfolio/i.test(text)
  push(
    'Contact details', 'LinkedIn or portfolio link', 2, hasLink ? 2 : 0,
    'Profile link found.', 'No LinkedIn / GitHub / portfolio link found.',
    'Add your LinkedIn or GitHub link in the header.'
  )

  /* ---- Sections (20) ---- */
  const sections = [
    ['Work experience', 6, /experience|employment/],
    ['Education', 5, /education|academic|qualification/],
    ['Skills', 5, /skills|technologies|technical proficiency/],
    ['Summary or profile', 2, /summary|objective|profile|about me/],
    ['Projects or certifications', 2, /projects?|certifications?|certificates?/]
  ]
  sections.forEach(([title, max, re]) => {
    const found = re.test(lower)
    push(
      'Sections', `${title} section`, max, found ? max : 0,
      `${title} section found.`, `${title} section not found.`,
      `Add a clearly labelled "${title}" heading so ATS can find it.`
    )
  })

  /* ---- Keyword match (30, only if job description given) ---- */
  let keyword = null
  if (hasJD) {
    const m = analyze(resume, jd)
    keyword = { score: m.score, matched: m.matched, missing: m.missing, kwMiss: m.kwMiss }
    push(
      'Keyword match', 'Keywords from the job description', 30,
      Math.round((30 * m.score) / 100),
      `Strong keyword match (${m.score}%).`,
      `Only ${m.score}% of the job's keywords and skills appear in your resume.`,
      m.missing.length
        ? `Add the missing skills where they are true for you: ${m.missing.slice(0, 8).join(', ')}.`
        : 'Use more wording from the job posting in your skills and experience.'
    )
  }

  /* ---- Content quality (25) ---- */
  const verbsFound = ACTION_VERBS.filter((v) => new RegExp(`\\b${v}\\b`, 'i').test(text))
  push(
    'Content quality', 'Action verbs', 8,
    verbsFound.length >= 5 ? 8 : verbsFound.length >= 3 ? 4 : 0,
    `Good use of action verbs (${verbsFound.slice(0, 4).join(', ')}).`,
    'Very few action verbs found.',
    'Start bullet points with action verbs such as developed, built, led, improved or automated.'
  )

  const metrics = (
    text.match(/\d+(\.\d+)?\s?(%|\+|k\b|lakh|crore|million|users|clients|projects)/gi) || []
  ).length
  push(
    'Content quality', 'Measurable results', 8,
    metrics >= 3 ? 8 : metrics >= 1 ? 4 : 0,
    `Numbers and results found (${metrics}).`,
    'Few or no measurable results found.',
    'Add numbers to your achievements (for example: reduced load time by 30%, managed 15+ clients).'
  )

  const bulletCount =
    (text.match(/^\s*[-–*]\s+\S/gm) || []).length + (text.match(/[•▪◦●·]/g) || []).length
  push(
    'Content quality', 'Bullet points', 5, bulletCount >= 5 ? 5 : 0,
    'Bullet points found.', 'Not enough bullet points found.',
    'Use short bullet points under each job instead of long paragraphs.'
  )

  const words = text.trim().split(/\s+/).length
  push(
    'Content quality', 'Resume length', 4, words >= 150 && words <= 1000 ? 4 : 0,
    `Length looks good (${words} words).`,
    words < 150 ? `Resume is short (${words} words).` : `Resume is long (${words} words).`,
    words < 150
      ? 'Add more detail about your work, projects and tools.'
      : 'Trim your resume to the most relevant experience, ideally 1 to 2 pages.'
  )

  /* ---- Formatting (15) ---- */
  const odd = (text.match(/[^\w\s.,;:()\-+#&/@%'"•▪◦●·–—|!?[\]{}=<>$₹*]/g) || []).length
  const ratio = odd / Math.max(1, text.length)
  push(
    'Formatting', 'Clean text (no odd symbols)', 5, ratio < 0.01 ? 5 : 0,
    'Text reads cleanly.', 'Many unusual symbols or icons found.',
    'Remove icons, emojis and decorative symbols. ATS often cannot read them.'
  )

  const yearRanges = (
    text.match(/(19|20)\d{2}\s*(?:-|–|—|to)\s*(?:(?:19|20)\d{2}|present|current|till date|ongoing)/gi) || []
  ).length
  const monthYears = (
    text.match(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?,?\s+(?:19|20)\d{2}/gi) || []
  ).length
  push(
    'Formatting', 'Clear employment dates', 5, yearRanges >= 1 || monthYears >= 2 ? 5 : 0,
    'Dates are easy to read.', 'Clear date ranges not found.',
    'Write dates for each role like "Jan 2022 - Present" or "2019 - 2021".'
  )

  const firstPerson = (text.match(/\b(i|my|me)\b/gi) || []).length
  push(
    'Formatting', 'Professional tone', 5, firstPerson < 6 ? 5 : 0,
    'No heavy use of "I" or "my".', 'Too many "I / my / me" words.',
    'Avoid "I" and "my". Write bullets like "Built a sales dashboard" instead.'
  )

  /* ---- Totals ---- */
  const order = ['Contact details', 'Sections', 'Keyword match', 'Content quality', 'Formatting']
  const categories = order
    .map((name) => {
      const r = rows.filter((x) => x.cat === name)
      return {
        name,
        got: r.reduce((a, x) => a + x.got, 0),
        max: r.reduce((a, x) => a + x.max, 0)
      }
    })
    .filter((c) => c.max > 0)

  const totalMax = rows.reduce((a, x) => a + x.max, 0)
  const totalGot = rows.reduce((a, x) => a + x.got, 0)
  const score = Math.round((totalGot / totalMax) * 100)

  let verdict = 'Likely to be filtered out'
  if (score >= 80) verdict = 'ATS-friendly'
  else if (score >= 60) verdict = 'Mostly ATS-friendly'
  else if (score >= 40) verdict = 'Needs work'

  const fixes = rows
    .filter((r) => !r.ok)
    .sort((a, b) => b.max - b.got - (a.max - a.got))
    .map((r) => r.fix)
    .slice(0, 8)

  if (!fixes.length) {
    fixes.push('Great work. No major ATS problems found. Keep your resume in a simple, single-column layout.')
  }

  return {
    score,
    verdict,
    categories,
    checks: rows,
    fixes,
    keyword,
    hasJD,
    passed: rows.filter((r) => r.ok).length,
    total: rows.length
  }
}

/* ------------------------------------------------------------------
   FILE READING (PDF / DOCX / TXT) - libraries CDN se load hoti hain,
   isliye npm install ki zarurat nahi.
------------------------------------------------------------------- */
const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
const MAMMOTH = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'
const RAZORPAY = 'https://checkout.razorpay.com/v1/checkout.js'

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing && existing.dataset.loaded === 'true') return resolve()

    const el = existing || document.createElement('script')
    el.addEventListener('load', () => {
      el.dataset.loaded = 'true'
      resolve()
    })
    el.addEventListener('error', () =>
      reject(new Error('Could not load a required script. Check your internet connection.'))
    )
    if (!existing) {
      el.src = src
      document.head.appendChild(el)
    }
  })

async function readResumeFile(file) {
  const ext = file.name.split('.').pop().toLowerCase()

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File is too large. Please upload a file under 5 MB.')
  }

  if (ext === 'txt') {
    return file.text()
  }

  if (ext === 'pdf') {
    await loadScript(PDFJS)
    const pdfjs = window.pdfjsLib
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise

    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item) => item.str + (item.hasEOL ? '\n' : ' ')).join('') + '\n'
    }
    return text
  }

  if (ext === 'docx') {
    await loadScript(MAMMOTH)
    const result = await window.mammoth.extractRawText({
      arrayBuffer: await file.arrayBuffer()
    })
    return result.value
  }

  throw new Error('Please upload a PDF, DOCX or TXT file.')
}

async function fnErrorMessage(error, data) {
  if (data && data.error) return data.error
  try {
    const body = await error.context.json()
    if (body && body.error) return body.error
  } catch (e) {
    /* ignore */
  }
  return (error && error.message) || 'Something went wrong. Please try again.'
}

function ScoreRing({ score }) {
  const R = 54
  const C = 2 * Math.PI * R
  return (
    <svg viewBox="0 0 140 140" className="rm-ring-svg">
      <circle cx="70" cy="70" r={R} className="rm-ring-bg" />
      <circle
        cx="70"
        cy="70"
        r={R}
        className="rm-ring"
        stroke={scoreColor(score)}
        strokeDasharray={C}
        strokeDashoffset={C * (1 - score / 100)}
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="80" textAnchor="middle" className="rm-ring-text">
        {score}%
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------- */
export default function ResumeMatch({ onGetHelp, user, onRequireLogin, mode = 'match' }) {
  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState('')
  const [jd, setJd] = useState('')
  const [error, setError] = useState('')
  const [reading, setReading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const [result, setResult] = useState(null) // Resume Match result
  const [atsResult, setAtsResult] = useState(null) // ATS Check result
  const [showExpertChat, setShowExpertChat] = useState(false)

  const [usage, setUsage] = useState(null) // { free_checks_used, paid_checks }
  const [checking, setChecking] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [payLoading, setPayLoading] = useState(false)
  const [payError, setPayError] = useState('')

  const fileRef = useRef(null)
  const resultRef = useRef(null)

  const freeLeft = Math.max(0, 2 - (usage?.free_checks_used ?? 0))
  const paidLeft = usage?.paid_checks ?? 0

  // ATS balance load karo
  useEffect(() => {
    if (!user) {
      setUsage(null)
      return
    }
    supabase.rpc('get_ats_usage').then(({ data, error: rpcError }) => {
      if (!rpcError && data) setUsage(data)
    })
  }, [user?.id])

  const scrollToResult = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const handleFile = async (file) => {
    if (!file) return
    setError('')
    setReading(true)

    try {
      const text = await readResumeFile(file)
      if (text.trim().length < 50) {
        throw new Error(
          'We could not read any text from this file. If it is a scanned PDF, please paste the text below instead.'
        )
      }
      setResumeText(text.trim())
      setFileName(file.name)
    } catch (err) {
      setFileName('')
      setError(err.message || 'Could not read this file.')
    } finally {
      setReading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  /* ---------- CHECK MY MATCH (free, login nahi chahiye) ---------- */
  const handleMatch = (e) => {
    e.preventDefault()
    setError('')

    if (resumeText.trim().length < 80) {
      setError('Please upload your resume or paste at least a few lines of it.')
      return
    }
    if (jd.trim().length < 80) {
      setError('Please paste the full job description (at least a few lines).')
      return
    }

    setAtsResult(null)
    setResult(analyze(resumeText, jd))
    scrollToResult()
  }

  /* ---------- ATS CHECK (2 free, phir paid) ---------- */
  const runATS = () => {
    setResult(null)
    setAtsResult(analyzeATS(resumeText, jd))
    scrollToResult()
  }

  const handleATS = async () => {
    setError('')

    if (resumeText.trim().length < 80) {
      setError('Please upload your resume or paste at least a few lines of it.')
      return
    }

    if (!user) {
      setError('Please sign in to use the ATS Check. You get 2 free checks.')
      onRequireLogin?.()
      return
    }

    setChecking(true)
    try {
      const { data, error: rpcError } = await supabase.rpc('use_ats_check')
      if (rpcError) throw rpcError

      setUsage({
        free_checks_used: data.free_checks_used,
        paid_checks: data.paid_checks
      })

      if (!data.allowed) {
        setPayError('')
        setShowPay(true)
        return
      }

      runATS()
    } catch (err) {
      console.error('ATS error:', err)
      setError('Could not check your ATS balance. Please try again.')
    } finally {
      setChecking(false)
    }
  }

  /* ---------- PAYMENT (Razorpay) ---------- */
  const verifyPayment = async (resp) => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('ats-payment', {
        body: { action: 'verify', ...resp }
      })
      if (fnError || data?.error) throw new Error(await fnErrorMessage(fnError, data))

      setUsage(data.usage)
      setShowPay(false)

      // payment ho gaya, ab ek check use karke result dikhao
      const { data: use, error: useError } = await supabase.rpc('use_ats_check')
      if (useError) throw useError

      setUsage({
        free_checks_used: use.free_checks_used,
        paid_checks: use.paid_checks
      })
      if (use.allowed) runATS()
    } catch (err) {
      setPayError(
        `${err.message || 'Verification failed.'} If money was deducted, contact us with payment ID ${resp.razorpay_payment_id}.`
      )
    } finally {
      setPayLoading(false)
    }
  }

  const startPayment = async () => {
    setPayError('')
    setPayLoading(true)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('ats-payment', {
        body: { action: 'create' }
      })
      if (fnError || data?.error) throw new Error(await fnErrorMessage(fnError, data))

      await loadScript(RAZORPAY)

      const rzp = new window.Razorpay({
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: 'APEXTRA SOLUTION',
        description: '5 ATS Resume Checks',
        prefill: {
          email: user?.email || '',
          name: user?.user_metadata?.full_name || ''
        },
        theme: { color: '#0b4f85' },
        handler: (resp) => verifyPayment(resp),
        modal: { ondismiss: () => setPayLoading(false) }
      })

      rzp.on('payment.failed', (r) => {
        setPayError(r?.error?.description || 'Payment failed. Please try again.')
        setPayLoading(false)
      })

      rzp.open()
    } catch (err) {
      setPayError(err.message || 'Could not start the payment.')
      setPayLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setAtsResult(null)
    setResumeText('')
    setFileName('')
    setJd('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isATS = mode === 'ats'

  return (
    <div className="rm-page">

      {/* HERO */}
      <section className="rm-hero">
        <a href="#careers" className="rm-back">
          <ArrowLeft size={16} /> Back to Careers
        </a>

        <span className="rm-pill">
          {isATS ? <ShieldCheck size={16} /> : <Sparkles size={16} />}
          {isATS ? ' ATS RESUME ANALYZER' : ' FREE RESUME TOOL'}
        </span>

        {isATS ? (
          <>
            <h1>
              Will your resume <span>pass the ATS</span> screening?
            </h1>
            <p>
              See how applicant tracking systems read your resume: contact
              details, sections, keywords, formatting and content quality.
              2 free checks, then 5 more checks for just ₹99.
            </p>
          </>
        ) : (
          <>
            <h1>
              See exactly how well your <span>resume matches</span> a job
            </h1>
            <p>
              Upload your resume and paste a job description. Get an instant match
              score, a skill gap breakdown, and concrete pointers to improve it,
              free, with a downloadable PDF report.
            </p>
          </>
        )}
      </section>

      {/* FORM */}
      <section className="rm-main">
        <form className="rm-grid" onSubmit={handleMatch}>

          <div className="rm-card">
            <h3><FileText size={20} /> Your resume</h3>

            <div
              className={`rm-drop ${dragging ? 'dragging' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <Upload size={34} strokeWidth={1.4} />
              <strong>
                {reading
                  ? 'Reading your file...'
                  : fileName
                    ? fileName
                    : 'Click to upload PDF, DOCX, or TXT'}
              </strong>
              <small>
                {fileName ? 'Click to choose a different file' : 'or paste your resume text below'}
              </small>

              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>

            <textarea
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={7}
            />
          </div>

          <div className="rm-card">
            <h3><FileText size={20} /> Job description</h3>
            <p className="rm-hint">
              Paste the full job posting. Required for Check my match. Optional
              for ATS Check, but it adds a keyword score.
            </p>

            <textarea
              className="rm-jd"
              placeholder="Paste the job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              rows={14}
            />
          </div>

          <div className="rm-submit-row">
            {error && <p className="rm-error">{error}</p>}

            <div className="rm-btn-row">
              <button type="submit" className="rm-submit" disabled={reading || checking}>
                <Sparkles size={18} /> Check my match
              </button>

              <button
                type="button"
                className="rm-submit ats"
                onClick={handleATS}
                disabled={reading || checking || payLoading}
              >
                <ShieldCheck size={18} /> {checking ? 'Checking...' : 'ATS Check'}
              </button>
            </div>

            <p className="rm-usage">
              {user ? (
                <>
                  ATS Check: <b>{freeLeft}</b> free left
                  {paidLeft > 0 && <> + <b>{paidLeft}</b> paid</>}
                  {freeLeft === 0 && paidLeft === 0 && <> (₹99 for 5 more checks)</>}
                </>
              ) : (
                <>Sign in to use ATS Check. 2 free checks, then ₹99 for 5 checks.</>
              )}
            </p>

            <p className="rm-privacy">
              Your resume is analysed in your browser and is never uploaded or
              stored. Only your ATS check count is saved to your account.
            </p>
          </div>
        </form>

        {/* RESUME MATCH RESULT */}
        {result && (
          <div className="rm-result" ref={resultRef}>
            <div className="rm-report">

              <div className="rm-print-head">
                <strong>APEXTRA SOLUTION - Resume Match Report</strong>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              <div className="rm-score-card">
                <ScoreRing score={result.score} />

                <div>
                  <h2>{result.verdict}</h2>
                  <p>
                    {result.jdSkillsCount > 0
                      ? `Your resume covers ${result.matched.length} of the ${result.jdSkillsCount} skills we found in this job description.`
                      : 'We could not find many known skills in this job description, so the score is based on matching keywords.'}
                  </p>
                </div>
              </div>

              <div className="rm-two">
                <div className="rm-box">
                  <h4 className="ok"><Check size={18} /> Skills you have ({result.matched.length})</h4>
                  <div className="rm-chips">
                    {result.matched.length
                      ? result.matched.map((s) => <span className="chip ok" key={s}>{s}</span>)
                      : <em>No matching skills found yet.</em>}
                  </div>
                </div>

                <div className="rm-box">
                  <h4 className="bad"><X size={18} /> Skill gaps ({result.missing.length})</h4>
                  <div className="rm-chips">
                    {result.missing.length
                      ? result.missing.map((s) => <span className="chip bad" key={s}>{s}</span>)
                      : <em>No gaps found. Great!</em>}
                  </div>
                </div>
              </div>

              {result.kwMiss.length > 0 && (
                <div className="rm-box">
                  <h4><Search2 /> Keywords from the job missing in your resume</h4>
                  <div className="rm-chips">
                    {result.kwMiss.map((k) => <span className="chip neutral" key={k}>{k}</span>)}
                  </div>
                </div>
              )}

              <div className="rm-box">
                <h4><Lightbulb size={18} /> How to improve your resume</h4>
                <ul className="rm-tips">
                  {result.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <p className="rm-note">
                This is an automated keyword-based estimate. It shows how closely
                your resume wording matches the job, not how an employer will decide.
              </p>
            </div>

            <div className="rm-actions">
              <button type="button" className="rm-btn primary" onClick={() => window.print()}>
                <Download size={18} /> Download PDF report
              </button>
              <button type="button" className="rm-btn" onClick={handleReset}>
                <RotateCcw size={18} /> Check another job
              </button>
              {onGetHelp && (
                <button type="button" className="rm-btn accent" onClick={() => setShowExpertChat(true)}>
                  Get expert help with my profile
                </button>
              )}
            </div>
          </div>
        )}

        {/* ATS CHECK RESULT */}
        {atsResult && (
          <div className="rm-result" ref={resultRef}>
            <div className="rm-report">

              <div className="rm-print-head">
                <strong>APEXTRA SOLUTION - ATS Check Report</strong>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              <div className="rm-score-card">
                <ScoreRing score={atsResult.score} />

                <div>
                  <h2>{atsResult.verdict}</h2>
                  <p>
                    {atsResult.passed} of {atsResult.total} ATS checks passed.
                    {atsResult.hasJD
                      ? ' Your score includes keyword matching with the job description.'
                      : ' Add a job description next time to include keyword matching.'}
                  </p>
                </div>
              </div>

              <div className="rm-box">
                <h4>Score breakdown</h4>
                {atsResult.categories.map((c) => {
                  const pct = Math.round((c.got / c.max) * 100)
                  return (
                    <div className="rm-cat" key={c.name}>
                      <div className="rm-cat-top">
                        <span>{c.name}</span>
                        <b>{c.got}/{c.max}</b>
                      </div>
                      <div className="rm-bar">
                        <i style={{ width: `${pct}%`, background: scoreColor(pct) }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rm-box">
                <h4><ShieldCheck size={18} /> ATS checklist</h4>
                <ul className="rm-checks">
                  {atsResult.checks.map((r, i) => (
                    <li className={`rm-check ${r.ok ? 'ok' : r.partial ? 'part' : 'bad'}`} key={i}>
                      <span className="rm-check-ic">
                        {r.ok ? <Check size={16} /> : <X size={16} />}
                      </span>
                      <div>
                        <strong>{r.title}</strong>
                        <small>{r.detail}</small>
                      </div>
                      <em>{r.got}/{r.max}</em>
                    </li>
                  ))}
                </ul>
              </div>

              {atsResult.keyword && (
                <div className="rm-two">
                  <div className="rm-box">
                    <h4 className="ok"><Check size={18} /> Skills you have ({atsResult.keyword.matched.length})</h4>
                    <div className="rm-chips">
                      {atsResult.keyword.matched.length
                        ? atsResult.keyword.matched.map((s) => <span className="chip ok" key={s}>{s}</span>)
                        : <em>No matching skills found yet.</em>}
                    </div>
                  </div>

                  <div className="rm-box">
                    <h4 className="bad"><X size={18} /> Skill gaps ({atsResult.keyword.missing.length})</h4>
                    <div className="rm-chips">
                      {atsResult.keyword.missing.length
                        ? atsResult.keyword.missing.map((s) => <span className="chip bad" key={s}>{s}</span>)
                        : <em>No gaps found. Great!</em>}
                    </div>
                  </div>
                </div>
              )}

              <div className="rm-box">
                <h4><Lightbulb size={18} /> What to fix first</h4>
                <ul className="rm-tips">
                  {atsResult.fixes.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <p className="rm-note">
                ATS software differs from company to company. This check covers
                the common rules. Layout items such as tables, columns, text
                boxes and images cannot be fully detected from the text, so keep
                your resume in a simple single-column format.
              </p>
            </div>

            <div className="rm-actions">
              <button type="button" className="rm-btn primary" onClick={() => window.print()}>
                <Download size={18} /> Download PDF report
              </button>
              <button type="button" className="rm-btn" onClick={handleReset}>
                <RotateCcw size={18} /> Check another resume
              </button>
              {onGetHelp && (
                <button type="button" className="rm-btn accent" onClick={() => setShowExpertChat(true)}>
                  Get expert help with my profile
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* PAYMENT POPUP */}
      {showPay && (
        <div className="pay-overlay" onClick={() => !payLoading && setShowPay(false)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="pay-close"
              onClick={() => !payLoading && setShowPay(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="pay-icon"><Lock size={26} /></div>

            <h3>Your 2 free ATS checks are used</h3>
            <p>
              Unlock 5 more ATS checks to keep improving your resume and
              getting past screening software.
            </p>

            <div className="pay-plan">
              <div>
                <strong>5 ATS Checks</strong>
                <span>Score, checklist and fixes with PDF report</span>
              </div>
              <div className="pay-price">₹99</div>
            </div>

            {payError && <p className="rm-error">{payError}</p>}

            <button className="pay-btn" onClick={startPayment} disabled={payLoading}>
              {payLoading ? 'Processing...' : 'Pay ₹99 and unlock'}
            </button>

            <small>Secure payment by Razorpay: UPI, cards and net banking.</small>
          </div>
        </div>
      )}
      {showExpertChat && (
  <ExpertChat onClose={() => setShowExpertChat(false)} />
)}
    </div>
  )
}

/* small helper icon (keeps imports short) */
function Search2() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}