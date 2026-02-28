import { useState, useEffect } from 'react'
import { Megaphone, Copy, Check, ChevronDown, Download } from 'lucide-react'
import axios from 'axios'

// const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
console.log('Unsplash Key loaded:', UNSPLASH_KEY ? 'YES ✅' : 'NO ❌')

const platforms = ['LinkedIn', 'Email', 'Instagram', 'Twitter/X', 'Facebook', 'YouTube', 'TikTok', 'Google Ads']

const accentColors = ['#c94f1e', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']

function getImageQuery(product) {
  const p = product.toLowerCase()
  if (p.includes('air') || p.includes('pollution') || p.includes('environment')) return 'fresh air nature clean sky'
  if (p.includes('resume') || p.includes('career') || p.includes('job')) return 'career professional office success'
  if (p.includes('saas') || p.includes('analytics') || p.includes('dashboard')) return 'technology software dashboard modern'
  if (p.includes('food') || p.includes('restaurant') || p.includes('meal')) return 'food restaurant delicious colorful'
  if (p.includes('fitness') || p.includes('gym') || p.includes('workout')) return 'fitness gym healthy lifestyle energy'
  if (p.includes('finance') || p.includes('invest') || p.includes('money')) return 'finance investment growth success'
  if (p.includes('education') || p.includes('learn') || p.includes('course')) return 'education learning students study'
  if (p.includes('travel') || p.includes('hotel') || p.includes('trip')) return 'travel adventure destination scenic'
  if (p.includes('ecommerce') || p.includes('shop') || p.includes('store')) return 'ecommerce shopping retail vibrant'
  if (p.includes('real estate') || p.includes('property') || p.includes('home')) return 'real estate modern architecture home'
  if (p.includes('app') || p.includes('mobile') || p.includes('software')) return 'mobile app smartphone technology'
  if (p.includes('health') || p.includes('medical') || p.includes('doctor')) return 'healthcare medical professional clean'
  if (p.includes('ai') || p.includes('robot') || p.includes('automation')) return 'artificial intelligence technology futuristic'
  if (p.includes('music') || p.includes('audio') || p.includes('sound')) return 'music audio sound vibrant colorful'
  if (p.includes('photo') || p.includes('design') || p.includes('creative')) return 'creative design colorful artistic'
  return `${product} professional vibrant colorful`
}

// async function fetchUnsplashImage(query) {
//   try {
//     const res = await fetch(
//       `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&color=vibrant`,
//       { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
//     )
//     if (!res.ok) return null
//     const data = await res.json()
//     return data?.urls?.regular || null
//   } catch {
//     return null
//   }
// }
// async function fetchUnsplashImage(query) {
//   try {
//     const res = await fetch(
//       `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
//       { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
//     )
//     if (!res.ok) {
//       console.error('Unsplash error:', res.status, await res.text())
//       return null
//     }
//     const data = await res.json()
//     return data?.urls?.regular || null
//   } catch (e) {
//     console.error('Unsplash fetch failed:', e)
//     return null
//   }
// }

async function fetchUnsplashImage(query) {
  try {
    // First try with specific query
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    )
    if (res.ok) {
      const data = await res.json()
      if (data?.urls?.regular) return data.urls.regular
    }
    // Fallback — try without orientation constraint
    const res2 = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    )
    if (res2.ok) {
      const data2 = await res2.json()
      if (data2?.urls?.regular) return data2.urls.regular
    }
    return null
  } catch (e) {
    console.error('Unsplash fetch failed:', e)
    return null
  }
}

function extractPosterData(campaignText, product, audience) {
  const lines = campaignText.split('\n').filter(l => l.trim())
  const headlineIdx = lines.findIndex(l => l.toLowerCase().includes('headline'))
  let headlines = []
  if (headlineIdx !== -1) {
    for (let i = headlineIdx + 1; i < Math.min(headlineIdx + 6, lines.length); i++) {
      const l = lines[i].trim()
      if (l && !l.endsWith(':') && l.length > 5) headlines.push(l.replace(/^[\d\.\-\*]+\s*/, ''))
    }
  }
  const msgIdx = lines.findIndex(l => l.toLowerCase().includes('key message'))
  let keyMessage = ''
  if (msgIdx !== -1 && lines[msgIdx + 1]) keyMessage = lines[msgIdx + 1].trim()
  const ctaIdx = lines.findIndex(l => l.toLowerCase().includes('cta') || l.toLowerCase().includes('call to action'))
  let cta = ''
  if (ctaIdx !== -1 && lines[ctaIdx + 1]) cta = lines[ctaIdx + 1].trim().replace(/^[\d\.\-\*]+\s*/, '')
  return {
    headline: headlines[0] || product,
    subheadline: keyMessage || `Built for ${audience}`,
    cta: cta || 'Get Started Today',
    bullets: headlines.slice(1, 3),
    product,
    audience,
  }
}

// ── 5 Poster Layouts ──────────────────────────────────────────

function Layout0({ data, image, accent }) {
  return (
    <div id="campaign-poster" style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden',
      minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      fontFamily: "'DM Sans',sans-serif", boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    }}>
      {image
        ? <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #1a1714, #3d2b1f)` }} />
      }
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '40px 40px 44px' }}>
        <div style={{ display: 'inline-block', background: accent, borderRadius: 100, padding: '4px 14px', fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 16 }}>Campaign</div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 14, maxWidth: '85%' }}>{data.headline}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '75%', marginBottom: 24 }}>{data.subheadline}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ background: accent, borderRadius: 100, padding: '10px 24px', fontSize: 12, fontWeight: 700, color: '#fff' }}>{data.cta.slice(0, 36)}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>MarketAI Suite</div>
        </div>
      </div>
    </div>
  )
}

function Layout1({ data, image, accent }) {
  return (
    <div id="campaign-poster" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 20, overflow: 'hidden',
      minHeight: 500, fontFamily: "'DM Sans',sans-serif", boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    }}>
      <div style={{ background: '#1a1714', padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
            <span style={{ color: 'rgba(245,240,232,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>MarketAI Suite</span>
          </div>
          <div style={{ width: 40, height: 3, background: accent, borderRadius: 100, marginBottom: 18 }} />
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 14 }}>{data.headline}</h2>
          <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.55)', lineHeight: 1.65, marginBottom: 24 }}>{data.subheadline}</p>
          {data.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: accent, marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.6)', lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ background: accent, borderRadius: 100, padding: '10px 22px', fontSize: 11, fontWeight: 700, color: '#fff', display: 'inline-block', alignSelf: 'flex-start', marginTop: 24 }}>{data.cta.slice(0, 32)}</div>
      </div>
      <div style={{ position: 'relative', minHeight: 300 }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accent}60, #1a1714)` }} />
        }
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accent}20, transparent)` }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '6px 14px', fontSize: 9, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>🎯 {data.audience.slice(0, 28)}</div>
      </div>
    </div>
  )
}

function Layout2({ data, image, accent }) {
  return (
    <div id="campaign-poster" style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden',
      minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      fontFamily: "'DM Sans',sans-serif", boxShadow: '0 20px 60px rgba(0,0,0,0.35)', textAlign: 'center',
    }}>
      {image
        ? <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)` }} />
      }
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.88) 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '48px 52px' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 24px' }}>⚡</div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 16 }}>{data.headline}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 28px' }}>{data.subheadline}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {data.bullets.map((b, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '6px 16px', fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{b.slice(0, 30)}</div>
          ))}
        </div>
        <div style={{ background: accent, borderRadius: 100, padding: '12px 32px', fontSize: 13, fontWeight: 700, color: '#fff', display: 'inline-block' }}>{data.cta.slice(0, 36)}</div>
      </div>
      <div style={{ position: 'absolute', top: 20, right: 24, fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>MarketAI Suite</div>
    </div>
  )
}

function Layout3({ data, image, accent }) {
  return (
    <div id="campaign-poster" style={{
      borderRadius: 20, overflow: 'hidden', minHeight: 500,
      fontFamily: "'DM Sans',sans-serif", boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', height: 240, flexShrink: 0 }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accent}, #1a1714)` }} />
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(26,23,20,0.95) 100%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>⚡</div>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700 }}>MarketAI Suite</span>
        </div>
        <div style={{ position: 'absolute', top: 20, right: 20, background: accent, borderRadius: 100, padding: '4px 12px', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>Campaign</div>
      </div>
      <div style={{ background: '#1a1714', flex: 1, padding: '28px 36px 36px' }}>
        <div style={{ width: 36, height: 3, background: accent, borderRadius: 100, marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 12 }}>{data.headline}</h2>
        <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.55)', lineHeight: 1.65, marginBottom: 20 }}>{data.subheadline}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ background: accent, borderRadius: 100, padding: '10px 24px', fontSize: 12, fontWeight: 700, color: '#fff' }}>{data.cta.slice(0, 32)}</div>
          <div style={{ background: 'rgba(245,240,232,0.07)', border: `1px solid ${accent}50`, borderRadius: 100, padding: '6px 14px', fontSize: 10, color: accent, fontWeight: 600 }}>🎯 {data.audience.slice(0, 24)}</div>
        </div>
      </div>
    </div>
  )
}

function Layout4({ data, image, accent }) {
  return (
    <div id="campaign-poster" style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden',
      minHeight: 500, fontFamily: "'DM Sans',sans-serif", boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    }}>
      {image
        ? <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accent}, #1a1714)` }} />
      }
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accent}dd 0%, rgba(0,0,0,0.82) 100%)` }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', transform: 'translate(-60px,-60px)' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', transform: 'translate(70px,70px)' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '44px 40px', minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>⚡</div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>MarketAI Suite</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 100, padding: '4px 14px', fontSize: 9, color: '#fff', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Campaign</div>
        </div>
        <div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 14, maxWidth: '80%' }}>{data.headline}</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: '70%', marginBottom: 24 }}>{data.subheadline}</p>
          {data.bullets.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              {data.bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 100, padding: '12px 28px', fontSize: 13, fontWeight: 700, color: '#1a1714' }}>{data.cta.slice(0, 36)}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>🎯 {data.audience.slice(0, 28)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const posterLayouts = [Layout0, Layout1, Layout2, Layout3, Layout4]

export default function CampaignPage() {
  const [form, setForm] = useState({ product: '', target_audience: '', campaign_goal: '', tone: 'Professional', platforms: ['LinkedIn', 'Email'] })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [posterImage, setPosterImage] = useState(null)
  const [posterLayout, setPosterLayout] = useState(0)
  const [posterAccent, setPosterAccent] = useState('#c94f1e')
  const [loadingPoster, setLoadingPoster] = useState(false)
  const [downloadingPoster, setDownloadingPoster] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [result])

  const toggle = (p) => {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p]
    }))
  }

  const submit = async () => {
    if (!form.product || !form.target_audience) { setError('Please fill in product and target audience.'); return }
    setLoading(true); setError(''); setResult(null); setPosterImage(null)
    try {
      const payload = {
        product: form.product,
        target_audience: form.target_audience,
        platforms: form.platforms,
        campaign_goal: form.campaign_goal,
        tone: form.tone,
        enhance_with_gemini: false,
      }
      const { data } = await axios.post('http://localhost:8000/api/campaign/generate', payload)
      setResult(data)
      setPosterLayout(Math.floor(Math.random() * posterLayouts.length))
      setPosterAccent(accentColors[Math.floor(Math.random() * accentColors.length)])
      setLoadingPoster(true)
      // const imageQuery = getImageQuery(form.product)
      // const img = await fetchUnsplashImage(imageQuery)
      const queries = [
        getImageQuery(form.product),
        form.product,
        'business professional colorful',
        'technology modern vibrant',
        'abstract colorful background',
      ]
      let img = null
      for (const q of queries) {
        img = await fetchUnsplashImage(q)
        if (img) break
      }
      setPosterImage(img)
      setLoadingPoster(false)
    } catch {
      setError('Something went wrong. Is the backend running?')
      setLoading(false)
      setLoadingPoster(false)
    }
    setLoading(false)
  }

  const copy = () => {
    if (result?.campaign_content) {
      navigator.clipboard.writeText(result.campaign_content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // const regeneratePoster = async () => {
  //   setLoadingPoster(true)
  //   setPosterLayout(Math.floor(Math.random() * posterLayouts.length))
  //   setPosterAccent(accentColors[Math.floor(Math.random() * accentColors.length)])
  //   const imageQuery = getImageQuery(form.product) + ' colorful'
  //   const img = await fetchUnsplashImage(imageQuery)
  //   setPosterImage(img)
  //   setLoadingPoster(false)
  // }
  const regeneratePoster = async () => {
    setLoadingPoster(true)
    setPosterLayout(Math.floor(Math.random() * posterLayouts.length))
    setPosterAccent(accentColors[Math.floor(Math.random() * accentColors.length)])

    // Try multiple queries with fallbacks
    const queries = [
      getImageQuery(form.product),
      form.product,
      'business professional colorful',
      'technology modern vibrant',
      'abstract colorful background',
    ]
    let img = null
    for (const q of queries) {
      img = await fetchUnsplashImage(q)
      if (img) break
    }
    setPosterImage(img)
    setLoadingPoster(false)
  }

  const downloadPoster = async () => {
    setDownloadingPoster(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const el = document.getElementById('campaign-poster')
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: null })
      const link = document.createElement('a')
      link.download = `${form.product.replace(/\s+/g, '_')}_campaign_poster.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) { console.error(e) }
    setDownloadingPoster(false)
  }

  const posterData = result ? extractPosterData(result.campaign_content, form.product, form.target_audience) : null
  const PosterLayout = posterLayouts[posterLayout]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .rv{opacity:0;transform:translateY(32px);transition:opacity 0.7s ease,transform 0.7s ease}
        .rv.vis{opacity:1 !important;transform:translateY(0) !important}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}
        .inp{width:100%;background:#f5f0e8;border:1.5px solid rgba(26,23,20,0.12);border-radius:14px;padding:14px 18px;font-size:14px;color:#1a1714;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,box-shadow 0.2s;resize:none}
        .inp:focus{border-color:rgba(26,23,20,0.4);box-shadow:0 0 0 3px rgba(26,23,20,0.06)}
        .inp::placeholder{color:#aaa09a}
        .ptag{padding:8px 16px;border-radius:100px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.15s;border:1.5px solid rgba(26,23,20,0.12);background:transparent;font-family:'DM Sans',sans-serif}
        .ptag.on{background:#1a1714;border-color:#1a1714;color:#f5f0e8}
        .ptag.off{background:transparent;color:rgba(26,23,20,0.5)}
        .ptag.off:hover{border-color:rgba(26,23,20,0.3);background:rgba(26,23,20,0.03)}
        .sub-btn{background:#1a1714;color:#f5f0e8;border:none;border-radius:100px;padding:15px 36px;font-size:14px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px}
        .sub-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(26,23,20,0.2)}
        .sub-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none !important}
        .sel{background:#f5f0e8;border:1.5px solid rgba(26,23,20,0.12);border-radius:14px;padding:14px 18px;font-size:14px;color:#1a1714;font-family:'DM Sans',sans-serif;outline:none;width:100%;appearance:none;cursor:pointer;transition:border-color 0.2s}
        .sel:focus{border-color:rgba(26,23,20,0.4)}
        .icon-btn{display:flex;align-items:center;gap:6px;background:rgba(26,23,20,0.05);border:1px solid rgba(26,23,20,0.1);border-radius:100px;padding:7px 16px;font-size:12px;color:#1a1714;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s}
        .icon-btn:hover{background:rgba(26,23,20,0.09)}
        .icon-btn:disabled{opacity:0.5;cursor:not-allowed}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 0.8s linear infinite;display:inline-block}
        .result-content{white-space:pre-wrap;font-size:14px;line-height:1.8;color:#3d3830;font-family:'DM Sans',sans-serif}
        @keyframes shimmer{0%,100%{opacity:0.4}50%{opacity:0.8}}
      `}</style>

      <div style={{ padding: '52px 48px 80px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div className="rv" style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8c8479', marginBottom: 16 }}>
            <span style={{ width: 18, height: 1.5, background: '#8c8479', display: 'inline-block' }}></span>
            Feature 01
          </div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(34px,4vw,56px)', fontWeight: 900, letterSpacing: '-2.5px', lineHeight: 0.93, color: '#1a1714', marginBottom: 14 }}>
            Campaign<br /><em style={{ fontStyle: 'italic', color: '#c94f1e' }}>Generator</em>
          </h1>
          <p style={{ fontSize: 15, color: '#8c8479', lineHeight: 1.7, fontWeight: 300, maxWidth: 480 }}>
            Drop in your product details and target audience — MarketAI generates a full data-driven campaign strategy in seconds.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 28 }}>

          {/* FORM */}
          <div className="rv d1" style={{ background: '#ffffff', borderRadius: 24, padding: 36, border: '1px solid rgba(26,23,20,0.08)', boxShadow: '0 4px 24px rgba(26,23,20,0.06)' }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,23,20,0.45)', marginBottom: 8 }}>Product / Service *</label>
              <input className="inp" placeholder="e.g. AI-powered analytics SaaS platform" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,23,20,0.45)', marginBottom: 8 }}>Target Audience *</label>
              <input className="inp" placeholder="e.g. B2B SaaS startups, 50-500 employees" value={form.target_audience} onChange={e => setForm(f => ({ ...f, target_audience: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,23,20,0.45)', marginBottom: 8 }}>Campaign Goal</label>
              <input className="inp" placeholder="e.g. Generate 50 qualified leads this month" value={form.campaign_goal} onChange={e => setForm(f => ({ ...f, campaign_goal: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,23,20,0.45)', marginBottom: 8 }}>Tone</label>
              <div style={{ position: 'relative' }}>
                <select className="sel" value={form.tone} onChange={e => setForm(f => ({ ...f, tone: e.target.value }))}>
                  {['Professional', 'Casual', 'Bold', 'Inspirational', 'Urgent'].map(t => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#8c8479', pointerEvents: 'none' }} />
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,23,20,0.45)', marginBottom: 12 }}>Platforms</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {platforms.map(p => (
                  <button key={p} className={`ptag ${form.platforms.includes(p) ? 'on' : 'off'}`} onClick={() => toggle(p)}>{p}</button>
                ))}
              </div>
            </div>
            {error && (
              <div style={{ background: 'rgba(201,79,30,0.06)', border: '1px solid rgba(201,79,30,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#c94f1e', marginBottom: 20 }}>{error}</div>
            )}
            <button className="sub-btn" onClick={submit} disabled={loading}>
              {loading ? <><span className="spin">⟳</span> Generating...</> : <><Megaphone size={15} /> Generate Campaign</>}
            </button>
          </div>

          {/* RESULT */}
          {result && (
            <div className="rv" style={{ background: '#ffffff', borderRadius: 24, padding: 36, border: '1px solid rgba(26,23,20,0.08)', boxShadow: '0 4px 24px rgba(26,23,20,0.06)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, background: '#2d5a27', borderRadius: '50%', boxShadow: '0 0 8px #2d5a27' }}></div>
                  <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 15, color: '#1a1714' }}>Campaign Ready</span>
                </div>
                <button className="icon-btn" onClick={copy}>
                  {copied ? <><Check size={12} color="#2d5a27" /> Copied!</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
              {result.sentiment && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                  <span style={{ background: 'rgba(45,90,39,0.08)', border: '1px solid rgba(45,90,39,0.2)', borderRadius: 100, padding: '4px 14px', fontSize: 11, fontWeight: 600, color: '#2d5a27' }}>
                    Sentiment: {result.sentiment}
                  </span>
                </div>
              )}
              <div style={{ flex: 1, overflowY: 'auto', background: '#f5f0e8', borderRadius: 16, padding: 24 }}>
                <div className="result-content">{result.campaign_content}</div>
              </div>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ marginTop: 28, background: '#ffffff', borderRadius: 24, padding: 36, border: '1px solid rgba(26,23,20,0.08)' }}>
            {[100, 75, 88, 60].map((w, i) => (
              <div key={i} style={{ height: 14, background: 'rgba(26,23,20,0.06)', borderRadius: 100, marginBottom: 14, width: `${w}%`, animation: 'shimmer 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        )}

        {/* ── POSTER SECTION ── */}
        {result && (
          <div className="rv" style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8c8479', marginBottom: 6 }}>Auto-Generated Poster</div>
                <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 900, letterSpacing: '-1px', color: '#1a1714' }}>Campaign Visual 🎨</h3>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="icon-btn" onClick={regeneratePoster} disabled={loadingPoster}>
                  {loadingPoster ? <><span className="spin">⟳</span> Loading...</> : <>🎲 New Style</>}
                </button>
                <button
                  onClick={downloadPoster}
                  disabled={downloadingPoster || loadingPoster}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1a1714', border: 'none', borderRadius: 100, padding: '10px 22px', fontSize: 13, fontWeight: 600, color: '#f5f0e8', cursor: (downloadingPoster || loadingPoster) ? 'not-allowed' : 'pointer', opacity: (downloadingPoster || loadingPoster) ? 0.6 : 1, fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' }}
                >
                  <Download size={13} />
                  {downloadingPoster ? 'Saving...' : 'Download Poster'}
                </button>
              </div>
            </div>

            {loadingPoster ? (
              <div style={{ background: '#ffffff', borderRadius: 20, minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(26,23,20,0.08)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🎨</div>
                  <div style={{ fontSize: 13, color: '#8c8479', fontFamily: "'DM Sans',sans-serif" }}>Finding the perfect image...</div>
                </div>
              </div>
            ) : posterData ? (
              <PosterLayout data={posterData} image={posterImage} accent={posterAccent} />
            ) : null}

            <div style={{ marginTop: 10, fontSize: 11, color: '#aaa09a', fontFamily: "'DM Sans',sans-serif", textAlign: 'right' }}>
              Photos by <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={{ color: '#8c8479' }}>Unsplash</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}