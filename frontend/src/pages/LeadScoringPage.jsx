import { useState, useEffect } from 'react'
import { Target, ChevronDown } from 'lucide-react'
import axios from 'axios'

export default function LeadScoringPage() {
  const [form, setForm] = useState({ lead_name:'', company:'', industry:'SaaS', budget:'', authority_level:'Manager', need_description:'', timeline:'', current_solution:'' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [animScore, setAnimScore] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [result])

  useEffect(() => {
    if (result?.score) {
      setAnimScore(0)
      let current = 0
      const target = result.score
      const step = target / 40
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        setAnimScore(Math.round(current))
        if (current >= target) clearInterval(timer)
      }, 30)
      return () => clearInterval(timer)
    }
  }, [result])

  
  const submit = async () => {
    if (!form.lead_name || !form.company) { setError('Please fill in lead name and company.'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const payload = {
        name: form.lead_name,                  // frontend: lead_name → backend: name
        budget: form.budget || "Not specified",
        need: form.need_description || "Not specified",  // frontend: need_description → backend: need
        urgency: form.timeline || "Not specified",       // frontend: timeline → backend: urgency
        authority: form.authority_level,                 // frontend: authority_level → backend: authority
        notes: form.current_solution || "",
      }
      const { data } = await axios.post('http://localhost:8000/api/lead/score', payload)
      setResult(data)
    } catch { setError('Something went wrong. Is the backend running?') }
    setLoading(false)
  }

  const getColor = (score) => score >= 85 ? '#c94f1e' : score >= 70 ? '#2d5a27' : score >= 55 ? '#1a4a7a' : '#8c8479'
  const getLabel = (score) => score >= 85 ? '🔥 Hot Lead' : score >= 70 ? '✅ Warm Lead' : score >= 55 ? '👀 Lukewarm' : '❄️ Cold Lead'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .rv{opacity:0;transform:translateY(32px);transition:opacity 0.7s ease,transform 0.7s ease}
        .rv.vis{opacity:1 !important;transform:translateY(0) !important}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}.d4{transition-delay:0.4s}
        .inp{width:100%;background:#f5f0e8;border:1.5px solid rgba(26,23,20,0.12);border-radius:14px;padding:14px 18px;font-size:14px;color:#1a1714;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,box-shadow 0.2s;resize:none}
        .inp:focus{border-color:rgba(26,23,20,0.4);box-shadow:0 0 0 3px rgba(26,23,20,0.06)}
        .inp::placeholder{color:#aaa09a}
        .sel{background:#f5f0e8;border:1.5px solid rgba(26,23,20,0.12);border-radius:14px;padding:14px 18px;font-size:14px;color:#1a1714;font-family:'DM Sans',sans-serif;outline:none;width:100%;appearance:none;cursor:pointer}
        .sel:focus{border-color:rgba(26,23,20,0.4)}
        .sub-btn{background:#1a1714;color:#f5f0e8;border:none;border-radius:100px;padding:15px 36px;font-size:14px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px}
        .sub-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(26,23,20,0.2)}
        .sub-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none !important}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 0.8s linear infinite;display:inline-block}
        @keyframes barGrow{from{width:0}to{width:var(--w)}}
        .bar-fill{animation:barGrow 1s ease forwards;animation-delay:0.3s}
        @keyframes shimmer{0%,100%{opacity:0.4}50%{opacity:0.8}}
      `}</style>

      <div style={{ padding:'52px 48px 80px', maxWidth:1000, margin:'0 auto' }}>

        {/* Header */}
        <div className="rv" style={{ marginBottom:44 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#8c8479', marginBottom:16 }}>
            <span style={{ width:18, height:1.5, background:'#8c8479', display:'inline-block' }}></span>
            Feature 03
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'clamp(34px,4vw,56px)', fontWeight:900, letterSpacing:'-2.5px', lineHeight:0.93, color:'#1a1714', marginBottom:14 }}>
            Lead<br /><em style={{ fontStyle:'italic', color:'#1a4a7a' }}>Scoring Engine</em>
          </h1>
          <p style={{ fontSize:15, color:'#8c8479', lineHeight:1.7, fontWeight:300, maxWidth:480 }}>
            Stop guessing. Evaluate Budget, Authority, Need and Timeline — get a 0–100 score with full breakdown instantly.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap:28, alignItems:'start' }}>

          {/* FORM */}
          <div className="rv d1" style={{ background:'#ffffff', borderRadius:24, padding:36, border:'1px solid rgba(26,23,20,0.08)', boxShadow:'0 4px 24px rgba(26,23,20,0.06)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Lead Name *</label>
                <input className="inp" placeholder="e.g. John Smith" value={form.lead_name} onChange={e => setForm(f => ({...f, lead_name:e.target.value}))} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Company *</label>
                <input className="inp" placeholder="e.g. TechCorp Inc." value={form.company} onChange={e => setForm(f => ({...f, company:e.target.value}))} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Budget</label>
                <input className="inp" placeholder="e.g. $10,000/month" value={form.budget} onChange={e => setForm(f => ({...f, budget:e.target.value}))} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Authority Level</label>
                <div style={{ position:'relative' }}>
                  <select className="sel" value={form.authority_level} onChange={e => setForm(f => ({...f, authority_level:e.target.value}))}>
                    {['C-Suite / Executive','VP / Director','Manager','Individual Contributor'].map(a => <option key={a}>{a}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', color:'#8c8479', pointerEvents:'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Industry</label>
                <div style={{ position:'relative' }}>
                  <select className="sel" value={form.industry} onChange={e => setForm(f => ({...f, industry:e.target.value}))}>
                    {['SaaS','E-commerce','Healthcare','Finance','Education','Manufacturing','Retail','Real Estate'].map(i => <option key={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', color:'#8c8479', pointerEvents:'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Timeline</label>
                <input className="inp" placeholder="e.g. Q1 2025, within 3 months" value={form.timeline} onChange={e => setForm(f => ({...f, timeline:e.target.value}))} />
              </div>

              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Need / Pain Points</label>
                <textarea className="inp" rows={3} placeholder="e.g. Struggling with manual reporting and lack of real-time data visibility" value={form.need_description} onChange={e => setForm(f => ({...f, need_description:e.target.value}))} />
              </div>

              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Current Solution</label>
                <input className="inp" placeholder="e.g. Using spreadsheets and manual processes" value={form.current_solution} onChange={e => setForm(f => ({...f, current_solution:e.target.value}))} />
              </div>
            </div>

            {error && <div style={{ background:'rgba(201,79,30,0.06)', border:'1px solid rgba(201,79,30,0.2)', borderRadius:12, padding:'12px 16px', fontSize:13, color:'#c94f1e', margin:'20px 0 0' }}>{error}</div>}

            <div style={{ marginTop:28 }}>
              <button className="sub-btn" onClick={submit} disabled={loading}>
                {loading ? <><span className="spin">⟳</span> Scoring...</> : <><Target size={15} /> Score This Lead</>}
              </button>
            </div>
          </div>

          {/* RESULT */}
          {result && (
            <div>
              {/* Big score */}
              <div className="rv" style={{ background:'#ffffff', borderRadius:24, padding:36, border:'1px solid rgba(26,23,20,0.08)', boxShadow:'0 4px 24px rgba(26,23,20,0.06)', marginBottom:20, textAlign:'center' }}>
                <div style={{ fontFamily:"'Fraunces',serif", fontSize:96, fontWeight:900, letterSpacing:'-5px', lineHeight:1, color: getColor(result.score), transition:'color 0.3s' }}>
                  {animScore}
                </div>
                <div style={{ fontSize:12, color:'#8c8479', marginTop:4 }}>Lead Qualification Score</div>
                <div style={{ display:'inline-block', marginTop:14, background: result.score >= 85 ? 'rgba(201,79,30,0.08)' : result.score >= 70 ? 'rgba(45,90,39,0.08)' : 'rgba(26,23,20,0.05)', border:`1px solid ${result.score >= 85 ? 'rgba(201,79,30,0.2)' : result.score >= 70 ? 'rgba(45,90,39,0.2)' : 'rgba(26,23,20,0.1)'}`, borderRadius:100, padding:'8px 20px', fontSize:13, fontWeight:700, color: getColor(result.score) }}>
                  {getLabel(result.score)}
                </div>
                {result.conversion_probability && (
                  <div style={{ marginTop:16, fontSize:13, color:'#8c8479' }}>
                    Conversion Probability: <strong style={{ color:'#2d5a27' }}>{result.conversion_probability}</strong>
                  </div>
                )}
              </div>

              {/* BANT Bars */}
              {result.bant_scores && (
                <div className="rv d1" style={{ background:'#ffffff', borderRadius:24, padding:28, border:'1px solid rgba(26,23,20,0.08)', boxShadow:'0 2px 12px rgba(26,23,20,0.04)', marginBottom:20 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(26,23,20,0.35)', marginBottom:20 }}>BANT Breakdown</div>
                  {Object.entries(result.bant_scores).map(([key, val]) => {
                    const pct = typeof val === 'number' ? val : parseInt(val)
                    const color = pct >= 80 ? '#2d5a27' : pct >= 60 ? '#c94f1e' : '#8c8479'
                    return (
                      <div key={key} style={{ marginBottom:16 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12 }}>
                          <span style={{ color:'#3d3830', fontWeight:500 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          <span style={{ fontFamily:"'Fraunces',serif", fontWeight:700, color }}>{pct}%</span>
                        </div>
                        <div style={{ height:7, background:'rgba(26,23,20,0.07)', borderRadius:100, overflow:'hidden' }}>
                          <div className="bar-fill" style={{ height:'100%', background:color, borderRadius:100, '--w':`${pct}%`, width:0 }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Reasoning + Next Action */}
              {result.reasoning && (
                <div className="rv d2" style={{ background:'#1a1714', borderRadius:20, padding:24, marginBottom:12 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(245,240,232,0.4)', marginBottom:12 }}>AI Reasoning</div>
                  <div style={{ fontSize:13, color:'rgba(245,240,232,0.75)', lineHeight:1.75 }}>{result.reasoning}</div>
                </div>
              )}

              {result.next_action && (
                <div className="rv d3" style={{ background:'rgba(45,90,39,0.07)', border:'1px solid rgba(45,90,39,0.2)', borderRadius:20, padding:24 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#2d5a27', marginBottom:12 }}>Recommended Next Action</div>
                  <div style={{ fontSize:14, color:'#1a1714', lineHeight:1.65, fontWeight:500 }}>{result.next_action}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ marginTop:28, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {[1,2].map(i => (
              <div key={i} style={{ background:'#ffffff', borderRadius:20, padding:28, border:'1px solid rgba(26,23,20,0.08)' }}>
                <div style={{ height:60, background:'rgba(26,23,20,0.05)', borderRadius:16, marginBottom:16, animation:'shimmer 1.5s ease-in-out infinite' }}></div>
                {[100,75,88].map((w,j) => (
                  <div key={j} style={{ height:10, background:'rgba(26,23,20,0.05)', borderRadius:100, marginBottom:10, width:`${w}%`, animation:`shimmer 1.5s ease-in-out infinite`, animationDelay:`${j*0.1}s` }}></div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}