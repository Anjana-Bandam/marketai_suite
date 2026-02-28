import { useState, useEffect } from 'react'
import { MessageSquare, Copy, Check, ChevronDown, Download } from 'lucide-react'
import axios from 'axios'

const industries = ['SaaS','E-commerce','Healthcare','Finance','Education','Manufacturing','Retail','Real Estate']
const sizes = ['Startup','SMB','Mid-Market','Enterprise']

export default function PitchPage() {
  const [form, setForm] = useState({ company_name:'', product:'', target_customer:'', industry:'SaaS', company_size:'SMB', budget_range:'', key_pain_points:'' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState({})
  const [downloadingPDF, setDownloadingPDF] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [result])

  const submit = async () => {
    if (!form.product || !form.target_customer) { setError('Please fill in product and target customer.'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const payload = {
        product: form.product,
        persona: form.target_customer,
        industry: form.industry,
        company_size: form.company_size,
        company_name: form.company_name,
        budget_range: form.budget_range,
        key_pain_points: form.key_pain_points,
        generate_email: false,
      }
      const { data } = await axios.post('http://localhost:8000/api/pitch/generate', payload)
      setResult(data)
    } catch { setError('Something went wrong. Is the backend running?') }
    setLoading(false)
  }

  const copy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(c => ({...c, [key]: true}))
    setTimeout(() => setCopied(c => ({...c, [key]: false})), 2000)
  }

  const downloadPDF = async () => {
    if (!result) return
    setDownloadingPDF(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' })
      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()
      const margin = 20
      const contentW = pageW - margin * 2
      let y = margin

      // Header bar
      doc.setFillColor(26, 23, 20)
      doc.rect(0, 0, pageW, 55, 'F')
      doc.setFillColor(201, 79, 30)
      doc.circle(margin + 4, 22, 4, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(245, 240, 232)
      doc.text('MarketAI Suite', margin + 12, 25)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(140, 132, 121)
      doc.text('AI-Powered Sales Pitch Report', margin + 12, 34)
      const chipText = (result.product || 'Pitch').slice(0, 22)
      const chipX = pageW - margin - 55
      doc.setFillColor(201, 79, 30)
      doc.roundedRect(chipX, 17, 55, 11, 3, 3, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(255, 255, 255)
      doc.text(chipText, chipX + 4, 24.5)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(140, 132, 121)
      doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}`, margin, 46)
      y = 68

      const sectionDefs = [
        { label:'Elevator Pitch',      content: result.elevator_pitch,   color:[201,79,30],   light:[255,243,237] },
        { label:'Value Proposition',   content: result.value_proposition, color:[45,90,39],    light:[237,247,237] },
        { label:'Key Differentiators', content: result.differentiators,   color:[26,74,122],   light:[235,242,252] },
        { label:'Call to Action',      content: result.call_to_action,    color:[107,58,138],  light:[245,238,252] },
        { label:'Full Pitch',          content: result.full_pitch,        color:[26,23,20],    light:[245,240,232] },
      ].filter(s => s.content)

      for (const section of sectionDefs) {
        if (y > pageH - 50) { doc.addPage(); y = margin }
        doc.setFillColor(...section.color)
        doc.roundedRect(margin, y, contentW, 11, 2, 2, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(255, 255, 255)
        doc.text(section.label.toUpperCase(), margin + 6, y + 7.5)
        y += 15
        const textLines = doc.splitTextToSize(section.content, contentW - 12)
        const blockH = textLines.length * 5.5 + 10
        if (y + blockH > pageH - 30) { doc.addPage(); y = margin }
        doc.setFillColor(...section.light)
        doc.roundedRect(margin, y, contentW, blockH, 3, 3, 'F')
        doc.setFillColor(...section.color)
        doc.roundedRect(margin, y, 3, blockH, 1, 1, 'F')
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        doc.setTextColor(61, 56, 48)
        let ty = y + 7
        for (const line of textLines) {
          if (ty > pageH - 30) { doc.addPage(); ty = margin + 7 }
          doc.text(line, margin + 8, ty)
          ty += 5.5
        }
        y = ty + 10
        doc.setDrawColor(220, 215, 208)
        doc.setLineWidth(0.2)
        doc.line(margin, y - 5, pageW - margin, y - 5)
      }

      const totalPages = doc.internal.getNumberOfPages()
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p)
        doc.setFillColor(245, 240, 232)
        doc.rect(0, pageH - 13, pageW, 13, 'F')
        doc.setDrawColor(220, 215, 208)
        doc.setLineWidth(0.3)
        doc.line(0, pageH - 13, pageW, pageH - 13)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        doc.setTextColor(140, 132, 121)
        doc.text('Generated by MarketAI Suite — AI-Powered Sales Intelligence Platform', margin, pageH - 4.5)
        doc.setFont('helvetica', 'bold')
        doc.text(`${p} / ${totalPages}`, pageW - margin, pageH - 4.5, { align:'right' })
      }

      doc.save(`${(result.product || 'pitch').replace(/\s+/g, '_')}_sales_pitch.pdf`)
    } catch (e) { console.error('PDF error:', e) }
    setDownloadingPDF(false)
  }

  const sections = result ? [
    { label:'Elevator Pitch',      content: result.elevator_pitch,   color:'#c94f1e', key:'ep' },
    { label:'Value Proposition',   content: result.value_proposition, color:'#2d5a27', key:'vp' },
    { label:'Key Differentiators', content: result.differentiators,   color:'#1a4a7a', key:'kd' },
    { label:'Call to Action',      content: result.call_to_action,    color:'#6b3a8a', key:'cta' },
  ].filter(s => s.content) : []

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
        .dl-btn{background:#2d5a27;color:#f5f0e8;border:none;border-radius:100px;padding:15px 36px;font-size:14px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px}
        .dl-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(45,90,39,0.25)}
        .dl-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none !important}
        .icon-btn{display:flex;align-items:center;gap:6px;background:rgba(26,23,20,0.05);border:1px solid rgba(26,23,20,0.1);border-radius:100px;padding:7px 16px;font-size:12px;color:#1a1714;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s}
        .icon-btn:hover{background:rgba(26,23,20,0.09)}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin 0.8s linear infinite;display:inline-block}
        .scard{transition:transform 0.2s}
        .scard:hover{transform:translateY(-3px)}
        @keyframes shimmer{0%,100%{opacity:0.4}50%{opacity:0.8}}
      `}</style>

      <div style={{ padding:'52px 48px 80px', maxWidth:1000, margin:'0 auto' }}>

        {/* Header */}
        <div className="rv" style={{ marginBottom:44 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#8c8479', marginBottom:16 }}>
            <span style={{ width:18, height:1.5, background:'#8c8479', display:'inline-block' }}></span>
            Feature 02
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'clamp(34px,4vw,56px)', fontWeight:900, letterSpacing:'-2.5px', lineHeight:0.93, color:'#1a1714', marginBottom:14 }}>
            Sales Pitch<br /><em style={{ fontStyle:'italic', color:'#2d5a27' }}>Generator</em>
          </h1>
          <p style={{ fontSize:15, color:'#8c8479', lineHeight:1.7, fontWeight:300, maxWidth:480 }}>
            Generate personalized pitches tuned to your customer persona. Elevator pitch, value prop, differentiators and CTA — instantly.
          </p>
        </div>

        {/* FORM */}
        <div className="rv d1" style={{ background:'#ffffff', borderRadius:24, padding:36, border:'1px solid rgba(26,23,20,0.08)', boxShadow:'0 4px 24px rgba(26,23,20,0.06)', marginBottom:28 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Your Product / Service *</label>
              <input className="inp" placeholder="e.g. AI analytics platform" value={form.product} onChange={e => setForm(f => ({...f, product:e.target.value}))} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Target Customer *</label>
              <input className="inp" placeholder="e.g. VP of Marketing at Series B startup" value={form.target_customer} onChange={e => setForm(f => ({...f, target_customer:e.target.value}))} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Company Name</label>
              <input className="inp" placeholder="e.g. TechCorp Inc." value={form.company_name} onChange={e => setForm(f => ({...f, company_name:e.target.value}))} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Industry</label>
              <div style={{ position:'relative' }}>
                <select className="sel" value={form.industry} onChange={e => setForm(f => ({...f, industry:e.target.value}))}>
                  {industries.map(i => <option key={i}>{i}</option>)}
                </select>
                <ChevronDown size={14} style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', color:'#8c8479', pointerEvents:'none' }} />
              </div>
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Company Size</label>
              <div style={{ display:'flex', gap:8 }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setForm(f => ({...f, company_size:s}))} style={{
                    flex:1, padding:'10px 4px', borderRadius:10, border:'1.5px solid rgba(26,23,20,0.12)',
                    background: form.company_size === s ? '#1a1714' : 'transparent',
                    color: form.company_size === s ? '#f5f0e8' : 'rgba(26,23,20,0.45)',
                    fontSize:11, fontWeight:600, cursor:'pointer', transition:'all 0.15s',
                    fontFamily:"'DM Sans',sans-serif",
                  }}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Budget Range</label>
              <input className="inp" placeholder="e.g. $5,000–$20,000/month" value={form.budget_range} onChange={e => setForm(f => ({...f, budget_range:e.target.value}))} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(26,23,20,0.45)', marginBottom:8 }}>Key Pain Points</label>
              <textarea className="inp" rows={3} placeholder="e.g. Spending too much time on manual reporting, no real-time data visibility" value={form.key_pain_points} onChange={e => setForm(f => ({...f, key_pain_points:e.target.value}))} />
            </div>
          </div>

          {error && <div style={{ background:'rgba(201,79,30,0.06)', border:'1px solid rgba(201,79,30,0.2)', borderRadius:12, padding:'12px 16px', fontSize:13, color:'#c94f1e', margin:'20px 0 0' }}>{error}</div>}

          <div style={{ marginTop:28, display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
            <button className="sub-btn" onClick={submit} disabled={loading}>
              {loading ? <><span className="spin">⟳</span> Generating...</> : <><MessageSquare size={15} /> Generate Pitch</>}
            </button>
            {result && (
              <button className="dl-btn" onClick={downloadPDF} disabled={downloadingPDF}>
                {downloadingPDF ? <><span className="spin">⟳</span> Preparing...</> : <><Download size={15} /> Download PDF</>}
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ background:'#ffffff', borderRadius:20, padding:28, border:'1px solid rgba(26,23,20,0.08)' }}>
                {[100,75,88].map((w,j) => (
                  <div key={j} style={{ height:12, background:'rgba(26,23,20,0.06)', borderRadius:100, marginBottom:12, width:`${w}%`, animation:`shimmer 1.5s ease-in-out infinite`, animationDelay:`${j*0.1}s` }}></div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* RESULTS */}
        {result && sections.length > 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {sections.map(({ label, content, color, key }, i) => (
              <div key={label} className={`scard rv d${i}`} style={{ background:'#ffffff', borderRadius:20, padding:28, border:'1px solid rgba(26,23,20,0.08)', boxShadow:'0 2px 12px rgba(26,23,20,0.04)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color }}>{label}</div>
                  <button className="icon-btn" onClick={() => copy(content, key)}>
                    {copied[key] ? <><Check size={12} color="#2d5a27" /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
                <div style={{ borderLeft:`3px solid ${color}`, paddingLeft:14, fontSize:13, color:'#3d3830', lineHeight:1.75 }}>{content}</div>
              </div>
            ))}

            {result.full_pitch && (
              <div className="rv" style={{ gridColumn:'1/-1', background:'#1a1714', borderRadius:20, padding:32, boxShadow:'0 8px 32px rgba(26,23,20,0.15)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(245,240,232,0.5)' }}>Full Pitch</div>
                  <div style={{ display:'flex', gap:10 }}>
                    <button onClick={() => copy(result.full_pitch, 'full')} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(245,240,232,0.1)', border:'1px solid rgba(245,240,232,0.15)', borderRadius:100, padding:'6px 14px', fontSize:11, color:'rgba(245,240,232,0.6)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                      {copied['full'] ? <><Check size={11} color="#2d5a27" /> Copied!</> : <><Copy size={11} /> Copy full pitch</>}
                    </button>
                    <button onClick={downloadPDF} disabled={downloadingPDF} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(45,90,39,0.3)', border:'1px solid rgba(45,90,39,0.4)', borderRadius:100, padding:'6px 14px', fontSize:11, color:'rgba(245,240,232,0.8)', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                      {downloadingPDF ? <><span className="spin" style={{fontSize:11}}>⟳</span> Preparing...</> : <><Download size={11} /> Download PDF</>}
                    </button>
                  </div>
                </div>
                <div style={{ fontSize:14, color:'rgba(245,240,232,0.8)', lineHeight:1.8, whiteSpace:'pre-wrap' }}>{result.full_pitch}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}