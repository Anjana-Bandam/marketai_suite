import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Megaphone, MessageSquare, Target, Zap, ArrowLeft } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/campaign', icon: Megaphone, label: 'Campaign Generator' },
  { to: '/dashboard/pitch', icon: MessageSquare, label: 'Sales Pitch' },
  { to: '/dashboard/leads', icon: Target, label: 'Lead Scoring' },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f0e8', fontFamily:"'DM Sans',sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{
        width:256, minHeight:'100vh',
        background:'#ffffff',
        borderRight:'1px solid rgba(26,23,20,0.08)',
        display:'flex', flexDirection:'column',
        position:'fixed', top:0, left:0, bottom:0,
        zIndex:50, boxShadow:'4px 0 24px rgba(26,23,20,0.04)',
      }}>
        {/* Logo */}
        <div style={{ padding:'24px 20px', borderBottom:'1px solid rgba(26,23,20,0.08)' }}>
          <button onClick={() => navigate('/')} style={{
            display:'flex', alignItems:'center', gap:10,
            background:'none', border:'none', cursor:'pointer', width:'100%', marginBottom:16, padding:0,
          }}>
            <div style={{ width:34, height:34, background:'#1a1714', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Zap size={16} color="#f5f0e8" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily:"'Fraunces',serif", fontWeight:900, fontSize:17, color:'#1a1714', letterSpacing:'-0.5px' }}>
              Market<span style={{ color:'#c94f1e' }}>AI</span>
            </span>
          </button>
          <button onClick={() => navigate('/')} style={{
            display:'flex', alignItems:'center', gap:6,
            background:'rgba(26,23,20,0.04)', border:'1px solid rgba(26,23,20,0.08)',
            borderRadius:100, padding:'6px 14px',
            fontSize:11, color:'rgba(26,23,20,0.45)', cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif", transition:'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(26,23,20,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(26,23,20,0.04)'}
          >
            <ArrowLeft size={11} /> Back to Home
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding:'16px 12px', flex:1 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(26,23,20,0.28)', padding:'0 12px', marginBottom:12 }}>
            Features
          </div>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to))
            return (
              <button key={to} onClick={() => navigate(to)} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'11px 14px', borderRadius:12, marginBottom:4,
                width:'100%', textAlign:'left',
                background: active ? '#1a1714' : 'transparent',
                border:'none',
                color: active ? '#f5f0e8' : 'rgba(26,23,20,0.45)',
                fontSize:13, fontWeight: active ? 600 : 400,
                cursor:'pointer', transition:'all 0.15s',
                fontFamily:"'DM Sans',sans-serif",
                boxShadow: active ? '0 4px 16px rgba(26,23,20,0.15)' : 'none',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background='rgba(26,23,20,0.05)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background='transparent' }}
              >
                <Icon size={15} />{label}
              </button>
            )
          })}
        </nav>

        {/* Status */}
        <div style={{ padding:'16px 24px', borderTop:'1px solid rgba(26,23,20,0.08)', fontSize:11, color:'rgba(26,23,20,0.35)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:6, height:6, background:'#2d5a27', borderRadius:'50%', display:'inline-block', boxShadow:'0 0 6px #2d5a27' }}></span>
            Groq LLaMA 3.3 70B · Live
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex:1, marginLeft:256, minHeight:'100vh', background:'#f5f0e8' }}>
        <Outlet />
      </main>
    </div>
  )
}