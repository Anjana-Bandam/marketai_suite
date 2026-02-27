import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Megaphone, MessageSquare, Target, ArrowRight, Zap, Brain, Globe } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .rv{opacity:0;transform:translateY(36px);transition:opacity 0.75s ease,transform 0.75s ease}
        .rv.vis{opacity:1 !important;transform:translateY(0) !important}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}
        .fcard{transition:transform 0.25s ease,box-shadow 0.25s ease;cursor:pointer}
        .fcard:hover{transform:translateY(-8px) !important;box-shadow:0 28px 64px rgba(26,23,20,0.12) !important}
        .chip-btn{transition:all 0.15s}
        .chip-btn:hover{background:rgba(26,23,20,0.08) !important}
      `}</style>

      <div style={{ padding:'52px 48px 80px', maxWidth:1100, margin:'0 auto' }}>

        {/* HERO HEADER */}
        <div className="rv" style={{ marginBottom:52 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#8c8479', marginBottom:18 }}>
            <span style={{ width:18, height:1.5, background:'#8c8479', display:'inline-block' }}></span>
            Welcome to MarketAI Suite
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'clamp(38px,5vw,64px)', fontWeight:900, letterSpacing:'-3px', lineHeight:0.93, marginBottom:18, color:'#1a1714' }}>
            Close more.<br />
            <em style={{ fontStyle:'italic', color:'#c94f1e' }}>Pitch smarter.</em>
          </h1>
          <p style={{ fontSize:16, color:'#8c8479', maxWidth:460, lineHeight:1.72, fontWeight:300 }}>
            AI-powered marketing campaigns, personalized sales pitches, and intelligent lead scoring — all in one platform.
          </p>
        </div>

        {/* STATS BAR */}
        <div className="rv" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'rgba(26,23,20,0.08)', borderRadius:20, overflow:'hidden', marginBottom:48, boxShadow:'0 4px 24px rgba(26,23,20,0.06)' }}>
          {[
            { num:'3x', label:'Faster campaigns' },
            { num:'70B', label:'Parameter LLM' },
            { num:'0–100', label:'Lead scoring' },
            { num:'< 2s', label:'Response time' },
          ].map(({ num, label }) => (
            <div key={label} style={{ background:'#ffffff', padding:'28px 20px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:38, fontWeight:900, letterSpacing:'-2px', color:'#c94f1e', lineHeight:1, marginBottom:8 }}>{num}</div>
              <div style={{ fontSize:12, color:'#8c8479' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* FEATURE CARDS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:48 }}>
          {[
            { to:'/dashboard/campaign', icon:Megaphone, tag:'Feature 01', title:'Campaign Generator', desc:'Generate full marketing campaigns for any product and audience in seconds. Powered by LLaMA 3.3 70B.', color:'#c94f1e', bg:'rgba(201,79,30,0.07)', border:'rgba(201,79,30,0.18)' },
            { to:'/dashboard/pitch', icon:MessageSquare, tag:'Feature 02', title:'Sales Pitch AI', desc:'Create personalized compelling pitches with elevator pitch, value prop, differentiators, and CTAs.', color:'#2d5a27', bg:'rgba(45,90,39,0.07)', border:'rgba(45,90,39,0.18)' },
            { to:'/dashboard/leads', icon:Target, tag:'Feature 03', title:'Lead Scoring', desc:'Score and qualify leads 0–100 using the BANT framework. Know exactly which leads to chase first.', color:'#1a4a7a', bg:'rgba(26,74,122,0.07)', border:'rgba(26,74,122,0.18)' },
          ].map(({ to, icon: Icon, tag, title, desc, color, bg, border }, i) => (
            <div key={to} className={`fcard rv d${i}`} onClick={() => navigate(to)} style={{
              background:'#ffffff', border:'1px solid rgba(26,23,20,0.08)',
              borderRadius:24, padding:32,
              boxShadow:'0 2px 12px rgba(26,23,20,0.04)',
            }}>
              <div style={{ width:46, height:46, background:bg, border:`1px solid ${border}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                <Icon size={18} color={color} />
              </div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color, marginBottom:10 }}>{tag}</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:700, marginBottom:10, letterSpacing:'-0.5px', color:'#1a1714' }}>{title}</div>
              <div style={{ fontSize:13, color:'#8c8479', lineHeight:1.65, marginBottom:24 }}>{desc}</div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color, fontWeight:600 }}>
                Open <ArrowRight size={13} />
              </div>
            </div>
          ))}
        </div>

        {/* TECH STACK STRIP */}
        <div className="rv" style={{ background:'#ffffff', border:'1px solid rgba(26,23,20,0.08)', borderRadius:24, padding:'28px 32px', boxShadow:'0 2px 12px rgba(26,23,20,0.04)' }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(26,23,20,0.3)', marginBottom:18 }}>Powered by</div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {[
              { icon:Zap, name:'Groq LLaMA 3.3', desc:'500+ tok/s' },
              { icon:Brain, name:'Google Gemini', desc:'Multimodal AI' },
              { icon:Globe, name:'Hugging Face', desc:'Open-source NLP' },
            ].map(({ icon: Icon, name, desc }) => (
              <div key={name} className="chip-btn" style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(26,23,20,0.04)', border:'1px solid rgba(26,23,20,0.08)', borderRadius:100, padding:'10px 20px', cursor:'default' }}>
                <Icon size={14} color="#c94f1e" />
                <span style={{ fontFamily:"'Fraunces',serif", fontWeight:700, fontSize:13, color:'#1a1714' }}>{name}</span>
                <span style={{ fontSize:11, color:'#8c8479' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}