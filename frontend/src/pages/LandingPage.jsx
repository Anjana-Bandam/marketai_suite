import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const curRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Cursor
    let mx = 0, my = 0, rx = 0, ry = 0
    const moveCursor = (e) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', moveCursor)
    let raf
    const animCursor = () => {
      if (curRef.current) curRef.current.style.transform = `translate(${mx - 5}px,${my - 5}px)`
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px,${ry - 18}px)`
      raf = requestAnimationFrame(animCursor)
    }
    animCursor()

    // Nav scroll
    const nav = document.getElementById('land-nav')
    const onScroll = () => nav?.classList.toggle('sc', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    // Reveal on scroll
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv,.rvl,.rvr').forEach(el => obs.observe(el))

    // Hover on links
    const links = document.querySelectorAll('a,button')
    links.forEach(el => {
      el.addEventListener('mouseenter', () => ringRef.current?.classList.add('h'))
      el.addEventListener('mouseleave', () => ringRef.current?.classList.remove('h'))
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{`
        .land *{box-sizing:border-box}
        .land{font-family:'DM Sans',sans-serif;background:#f5f0e8;color:#1a1714;overflow-x:hidden;min-height:100vh}
        .cur2{width:10px;height:10px;background:#1a1714;border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        .crng2{width:36px;height:36px;border:1.5px solid rgba(26,23,20,0.3);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width 0.2s,height 0.2s,border-color 0.2s}
        .crng2.h{width:54px;height:54px;border-color:#1a1714}

        /* NAV */
        #land-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:22px 52px;display:flex;align-items:center;justify-content:space-between;transition:background 0.4s,box-shadow 0.4s}
        #land-nav.sc{background:rgba(245,240,232,0.92);backdrop-filter:blur(24px);box-shadow:0 1px 0 rgba(26,23,20,0.1)}
        .nlogo{font-family:'Fraunces',serif;font-weight:900;font-size:21px;color:#1a1714;text-decoration:none;display:flex;align-items:center;gap:8px;cursor:pointer;background:none;border:none}
        .ndot{width:8px;height:8px;background:#c94f1e;border-radius:50%;display:inline-block}
        .nlinks{display:flex;gap:32px;list-style:none;align-items:center}
        .nlinks button{background:none;border:none;color:#8c8479;font-size:14px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:color 0.2s;padding:0}
        .nlinks button:hover{color:#1a1714}
        .nbtn{background:#1a1714 !important;color:#f5f0e8 !important;padding:10px 22px;border-radius:100px;font-weight:500;font-size:13px;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;border:none;font-family:'DM Sans',sans-serif}
        .nbtn:hover{transform:scale(1.04);box-shadow:0 4px 20px rgba(26,23,20,0.25)}

        /* HERO */
        .hero2{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:130px 48px 80px;text-align:center;position:relative;overflow:hidden}
        .blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;opacity:0.55}
        .b1{width:500px;height:500px;background:#d4e8c4;top:-120px;left:-120px}
        .b2{width:420px;height:420px;background:#fad5c0;bottom:-60px;right:-60px}
        .b3{width:320px;height:320px;background:#c4d4e8;top:35%;left:55%}
        .grain{position:absolute;inset:0;opacity:0.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none}

        .float-card{position:absolute;background:white;border-radius:20px;box-shadow:0 20px 60px rgba(26,23,20,0.12);padding:20px 24px;pointer-events:none;min-width:160px}
        .fcl{left:3%;top:32%;animation:flt 5s ease-in-out infinite}
        .fcr{right:3%;top:40%;animation:flt 5s 1.5s ease-in-out infinite}
        @keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        .fl{font-size:10px;color:#8c8479;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
        .fv{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#1a1714}
        .fs2{font-size:11px;color:#2d5a27;font-weight:500;margin-top:4px}

        .eyebrow{display:inline-flex;align-items:center;gap:8px;background:white;border:1px solid rgba(26,23,20,0.1);border-radius:100px;padding:7px 18px 7px 8px;font-size:12px;font-weight:500;color:#3d3830;margin-bottom:32px;box-shadow:0 2px 12px rgba(26,23,20,0.06);opacity:0;animation:fU 0.8s 0.2s forwards}
        .etag{background:#2d5a27;color:white;border-radius:100px;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase}

        .htitle{font-family:'Fraunces',serif;font-size:clamp(54px,9vw,112px);font-weight:900;line-height:0.9;letter-spacing:-4px;color:#1a1714;margin-bottom:28px;opacity:0;animation:fU 0.9s 0.35s forwards}
        .htitle em{font-style:italic;color:#c94f1e}
        .hsub{font-size:clamp(15px,1.8vw,18px);color:#8c8479;max-width:480px;line-height:1.72;font-weight:300;margin-bottom:44px;opacity:0;animation:fU 0.9s 0.5s forwards}

        .hactions{display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;opacity:0;animation:fU 0.9s 0.65s forwards}
        .btn-dk{background:#1a1714;color:#f5f0e8;padding:15px 32px;border-radius:100px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer}
        .btn-dk:hover{transform:translateY(-3px);box-shadow:0 10px 36px rgba(26,23,20,0.2)}
        .btn-ol{background:transparent;color:#1a1714;padding:15px 28px;border-radius:100px;font-size:14px;text-decoration:none;border:1.5px solid rgba(26,23,20,0.18);transition:border-color 0.2s,background 0.2s;display:inline-flex;align-items:center;gap:6px;cursor:pointer;font-family:'DM Sans',sans-serif}
        .btn-ol:hover{border-color:#1a1714;background:rgba(26,23,20,0.03)}

        .trust{display:flex;align-items:center;gap:10px;margin-top:52px;font-size:12px;color:#8c8479;opacity:0;animation:fI 1s 1.1s forwards}
        .tavs{display:flex}
        .tav{width:28px;height:28px;border-radius:50%;border:2px solid #f5f0e8;margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white}
        .ta1{background:#2d5a27;margin-left:0}.ta2{background:#c94f1e}.ta3{background:#1a4a7a}.ta4{background:#6b3a8a}

        .sh2{position:absolute;bottom:44px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fI 1s 1.5s forwards}
        .sl{width:1px;height:46px;background:linear-gradient(to bottom,transparent,rgba(26,23,20,0.3));animation:sp 2s infinite}
        @keyframes sp{0%,100%{opacity:0.4}50%{opacity:1}}
        .st{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#8c8479}

        /* MARQUEE */
        .mq{background:#1a1714;padding:18px 0;overflow:hidden}
        .mq-track{display:flex;gap:40px;width:max-content;animation:marq 25s linear infinite}
        .mi{display:flex;align-items:center;gap:12px;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;color:rgba(245,240,232,0.55)}
        .ms{color:rgba(245,240,232,0.25);font-size:8px}
        @keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* LOGOS */
        .lgsec{padding:56px 52px;border-bottom:1px solid rgba(26,23,20,0.1)}
        .lglbl{text-align:center;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8c8479;margin-bottom:32px}
        .lgrow{overflow:hidden}
        .lg-track{display:flex;gap:16px;width:max-content;animation:marq 18s linear infinite;align-items:center}
        .lgchip{background:white;border:1px solid rgba(26,23,20,0.1);border-radius:100px;padding:10px 24px;font-weight:600;font-size:13px;color:#3d3830;white-space:nowrap;box-shadow:0 2px 8px rgba(26,23,20,0.04)}

        /* STATS */
        .sband{background:#1a1714;padding:72px 52px}
        .sgrid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(245,240,232,0.1);border-radius:20px;overflow:hidden}
        .scell{background:#1a1714;padding:48px 36px;text-align:center}
        .snum{font-family:'Fraunces',serif;font-size:clamp(42px,5vw,68px);font-weight:900;letter-spacing:-2px;color:#f5f0e8;line-height:1;margin-bottom:12px}
        .snum span{color:#c4e89c}
        .sdesc{font-size:13px;color:rgba(245,240,232,0.4);line-height:1.6}

        /* SPLITS */
        .split{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;padding:100px 52px;max-width:1200px;margin:0 auto}
        .altbg{background:#ede8df;border-top:1px solid rgba(26,23,20,0.1);border-bottom:1px solid rgba(26,23,20,0.1);padding:100px 52px}
        .altbg .split{padding:0;margin:0 auto}

        /* MOCK */
        .mock{background:white;border-radius:28px;padding:36px;box-shadow:0 24px 80px rgba(26,23,20,0.1);min-height:400px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
        .mock::after{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(201,79,30,0.07) 0%,transparent 70%);border-radius:50%}
        .mchip{display:inline-flex;align-items:center;gap:6px;background:#e8f5e3;border:1px solid rgba(45,90,39,0.2);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;color:#2d5a27;margin-bottom:24px;width:fit-content}
        .mrow{background:#f5f0e8;border-radius:14px;padding:18px 20px;margin-bottom:12px}
        .mrl{font-size:10px;color:#8c8479;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
        .mrv{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:#1a1714}
        .mbar{height:5px;background:rgba(26,23,20,0.08);border-radius:100px;margin-top:10px;overflow:hidden}
        .mbf{height:100%;background:linear-gradient(90deg,#2d5a27,#5aa84f);border-radius:100px;animation:ba 2.5s ease-in-out infinite alternate}
        @keyframes ba{from{width:36%}to{width:82%}}
        .mtags{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
        .mtag{background:#ede8df;border:1px solid rgba(26,23,20,0.1);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:500;color:#3d3830}

        /* PITCH MOCK */
        .pmsg{background:#f5f0e8;border-radius:14px;padding:16px 18px;margin-bottom:10px;font-size:13px;color:#3d3830;line-height:1.65;border-left:3px solid transparent}
        .pmsg.pa{background:rgba(201,79,30,0.05);border-left-color:#c94f1e;color:#1a1714}
        .plab{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8c8479;margin-bottom:6px}

        /* SCORE MOCK */
        .scbig{text-align:center;padding:16px 0 24px}
        .scnum{font-family:'Fraunces',serif;font-size:80px;font-weight:900;color:#2d5a27;line-height:1;letter-spacing:-4px}
        .sclbl{font-size:12px;color:#8c8479;margin-top:4px}
        .scbadge{display:inline-block;background:#e8f5e3;border:1px solid rgba(45,90,39,0.2);border-radius:100px;padding:6px 18px;font-size:12px;font-weight:700;color:#2d5a27;margin-top:12px}
        .sbars{margin-top:20px}
        .sbrow{display:flex;align-items:center;gap:12px;margin-bottom:12px;font-size:12px;color:#8c8479}
        .sbtrack{flex:1;height:6px;background:rgba(26,23,20,0.08);border-radius:100px;overflow:hidden}
        .sbfill{height:100%;border-radius:100px;background:#2d5a27}

        /* SECTION TEXT */
        .seye{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8c8479;margin-bottom:18px}
        .seye::before{content:'';display:block;width:18px;height:1.5px;background:#8c8479}
        .stitle{font-family:'Fraunces',serif;font-size:clamp(34px,4.5vw,62px);font-weight:900;line-height:0.96;letter-spacing:-2px;color:#1a1714;margin-bottom:20px}
        .stitle em{font-style:italic;color:#c94f1e}
        .ssub{font-size:16px;color:#8c8479;line-height:1.72;font-weight:300;max-width:480px}

        /* FEATURE LIST */
        .flist{list-style:none;margin-top:32px}
        .flist li{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid rgba(26,23,20,0.1);font-size:15px;color:#3d3830;line-height:1.65}
        .flist li:last-child{border:none}
        .fchk{width:22px;height:22px;min-width:22px;background:#e8f5e3;border:1px solid rgba(45,90,39,0.2);border-radius:7px;display:flex;align-items:center;justify-content:center;color:#2d5a27;font-size:10px;margin-top:2px}

        /* STEPS */
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:56px}
        .step{background:white;border:1px solid rgba(26,23,20,0.1);border-radius:20px;padding:32px 24px;box-shadow:0 2px 8px rgba(26,23,20,0.04)}
        .stepn{font-family:'Fraunces',serif;font-size:11px;font-weight:700;color:#c94f1e;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
        .stept{font-family:'Fraunces',serif;font-size:17px;font-weight:700;margin-bottom:10px;color:#1a1714}
        .stepd{font-size:13px;color:#8c8479;line-height:1.65}

        /* TECH */
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
        .tcard{background:white;border:1px solid rgba(26,23,20,0.1);border-radius:20px;padding:32px;transition:transform 0.3s,box-shadow 0.3s;box-shadow:0 2px 12px rgba(26,23,20,0.04)}
        .tcard:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(26,23,20,0.1)}
        .tico{width:46px;height:46px;background:#ede8df;border:1px solid rgba(26,23,20,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px}
        .tname{font-family:'Fraunces',serif;font-size:19px;font-weight:700;margin-bottom:8px;color:#1a1714}
        .tdesc{font-size:13px;color:#8c8479;line-height:1.65}

        /* TESTIMONIAL */
        .testi{background:#1a1714;padding:100px 52px}
        .ti{max-width:800px;margin:0 auto;text-align:center}
        .tq{font-family:'Fraunces',serif;font-size:clamp(22px,3.5vw,38px);font-weight:700;line-height:1.3;letter-spacing:-1px;color:#f5f0e8;margin-bottom:40px}
        .tq em{font-style:italic;color:#c4e89c}
        .tau{display:flex;align-items:center;gap:14px;justify-content:center}
        .taav{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#c94f1e,#e8732d);display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;color:white;font-size:16px}
        .tan{font-weight:500;font-size:14px;color:#f5f0e8;text-align:left}
        .tar{font-size:12px;color:rgba(245,240,232,0.4);margin-top:2px;text-align:left}

        /* PRICING */
        .psec{padding:100px 52px;text-align:center;background:#f5f0e8}
        .pcard{background:white;border:1px solid rgba(26,23,20,0.1);border-radius:28px;padding:64px 52px;max-width:580px;margin:56px auto 0;box-shadow:0 16px 60px rgba(26,23,20,0.08);position:relative;overflow:hidden}
        .pcard::before{content:'';position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,rgba(45,90,39,0.07) 0%,transparent 70%);border-radius:50%}
        .pbadge{display:inline-block;background:#e8f5e3;border:1px solid rgba(45,90,39,0.2);border-radius:100px;padding:6px 18px;font-size:11px;font-weight:700;color:#2d5a27;letter-spacing:1px;text-transform:uppercase;margin-bottom:28px}
        .pnum{font-family:'Fraunces',serif;font-size:88px;font-weight:900;letter-spacing:-5px;line-height:1;color:#1a1714}
        .psub{font-size:14px;color:#8c8479;margin-bottom:40px;margin-top:8px}
        .pfeats{list-style:none;text-align:left;margin-bottom:40px}
        .pfeats li{padding:13px 0;border-bottom:1px solid rgba(26,23,20,0.08);font-size:15px;color:#3d3830;display:flex;align-items:center;gap:12px}
        .pfeats li::before{content:'✦';color:#2d5a27;font-size:10px}

        /* LETTER */
        .lsec{padding:100px 52px;background:#ede8df;border-top:1px solid rgba(26,23,20,0.1);border-bottom:1px solid rgba(26,23,20,0.1)}
        .linner{max-width:640px;margin:0 auto;font-size:16px;line-height:1.9;color:#3d3830;font-weight:300}
        .linner p{margin-bottom:22px}
        .linner strong{color:#1a1714;font-weight:600}
        .lsig{margin-top:40px;font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#1a1714}
        .lrole{font-size:13px;color:#8c8479;font-family:'DM Sans',sans-serif;font-weight:300;margin-top:5px}

        /* CTA */
        .ctasec{padding:120px 52px;text-align:center;position:relative;overflow:hidden;background:#f5f0e8}
        .ctasec::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:500px;background:radial-gradient(ellipse,rgba(201,79,30,0.06) 0%,transparent 65%);pointer-events:none}
        .ctat{font-family:'Fraunces',serif;font-size:clamp(48px,8vw,100px);font-weight:900;line-height:0.9;letter-spacing:-4px;color:#1a1714;margin-bottom:28px}
        .ctat em{font-style:italic;color:#c94f1e}
        .ctas{font-size:17px;color:#8c8479;margin-bottom:48px;font-weight:300}

        /* FOOTER */
        .foot{padding:48px 52px;border-top:1px solid rgba(26,23,20,0.1);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;background:#f5f0e8}
        .flogo{font-family:'Fraunces',serif;font-weight:900;font-size:18px;color:#1a1714;background:none;border:none;cursor:pointer}
        .flinks{display:flex;gap:28px;list-style:none}
        .flinks button{background:none;border:none;color:#8c8479;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:color 0.2s;padding:0}
        .flinks button:hover{color:#1a1714}
        .fcopy{font-size:12px;color:rgba(26,23,20,0.3)}

        /* SEC WRAPPERS */
        .sec{padding:100px 52px;max-width:1200px;margin:0 auto}

        /* REVEAL */
        .rv{opacity:0;transform:translateY(44px);transition:opacity 0.9s ease,transform 0.9s ease}
        .rvl{opacity:0;transform:translateX(-44px);transition:opacity 0.9s ease,transform 0.9s ease}
        .rvr{opacity:0;transform:translateX(44px);transition:opacity 0.9s ease,transform 0.9s ease}
        .vis{opacity:1 !important;transform:translate(0) !important}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}.d4{transition-delay:0.4s}

        @keyframes fU{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fI{from{opacity:0}to{opacity:1}}

        @media(max-width:960px){
          #land-nav{padding:18px 24px}
          .nlinks{display:none}
          .hero2{padding:110px 24px 70px}
          .float-card{display:none}
          .split{grid-template-columns:1fr;gap:48px;padding:60px 24px}
          .sgrid{grid-template-columns:repeat(2,1fr)}
          .tgrid{grid-template-columns:1fr 1fr}
          .steps{grid-template-columns:1fr 1fr}
          .sec{padding:72px 24px}
          .sband,.testi{padding:60px 24px}
          .altbg,.lsec,.psec,.ctasec{padding:72px 24px}
          .foot{padding:36px 24px;flex-direction:column;align-items:flex-start}
          .lgsec{padding:40px 0}
        }
        @media(max-width:600px){
          .sgrid{grid-template-columns:1fr 1fr}
          .tgrid,.steps{grid-template-columns:1fr}
        }
      `}</style>

      <div className="land">
        {/* Cursors */}
        <div className="cur2" ref={curRef}></div>
        <div className="crng2" ref={ringRef}></div>

        {/* NAV */}
        <nav id="land-nav">
          <button className="nlogo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="ndot"></span>MarketAI Suite
          </button>
          <ul className="nlinks">
            <li><button onClick={() => scrollTo('features')}>Features</button></li>
            <li><button onClick={() => scrollTo('stack')}>Tech Stack</button></li>
            <li><button onClick={() => scrollTo('how')}>How It Works</button></li>
            <li><button onClick={() => scrollTo('pricing')}>Pricing</button></li>
            <li><button className="nbtn" onClick={() => navigate('/dashboard')}>Launch App →</button></li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="hero2">
          <div className="grain"></div>
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="blob b3"></div>

          <div className="float-card fcl">
            <div className="fl">Lead Score</div>
            <div className="fv">87 / 100</div>
            <div className="fs2">🔥 Hot Lead — Follow up now</div>
          </div>
          <div className="float-card fcr">
            <div className="fl">Campaigns Generated</div>
            <div className="fv">12,400+</div>
            <div className="fs2">↑ This month</div>
          </div>

          <div className="eyebrow"><span className="etag">New</span> Powered by LLaMA 3.3 70B via Groq</div>
          <h1 className="htitle">Close deals<br/><em>10x faster</em></h1>
          <p className="hsub">MarketAI Suite gives your team AI-powered campaign generation, personalized sales pitches, and intelligent lead scoring — all in seconds.</p>

          <div className="hactions">
            <button className="btn-dk" onClick={() => navigate('/dashboard')}>
              Start for free
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <button className="btn-ol" onClick={() => scrollTo('features')}>See how it works →</button>
          </div>

          <div className="trust">
            <div className="tavs">
              <div className="tav ta1">R</div><div className="tav ta2">S</div><div className="tav ta3">M</div><div className="tav ta4">A</div>
            </div>
            Used by marketing & sales teams worldwide
          </div>

          <div className="sh2"><div className="sl"></div><span className="st">scroll</span></div>
        </section>

        {/* MARQUEE */}
        <div className="mq">
          <div className="mq-track">
            {['Campaign Generator','Sales Pitch AI','Lead Scoring Engine','Groq LLaMA 3.3 70B','Google Gemini','Hugging Face NLP','FastAPI Backend','React + Vite','IBM Watson AI',
              'Campaign Generator','Sales Pitch AI','Lead Scoring Engine','Groq LLaMA 3.3 70B','Google Gemini','Hugging Face NLP','FastAPI Backend','React + Vite','IBM Watson AI'].map((t,i)=>(
              <span key={i} className="mi"><span className="ms">★</span>{t}</span>
            ))}
          </div>
        </div>

        {/* LOGOS */}
        <div className="lgsec">
          <div className="lglbl">Built on industry-leading AI infrastructure</div>
          <div className="lgrow">
            <div className="lg-track">
              {['⚡ Groq LLaMA 3.3','✨ Google Gemini','🤗 Hugging Face','🧠 IBM Watson AI','🚀 FastAPI','⚛️ React + Vite','🐍 Python 3.11','🔥 Flask',
                '⚡ Groq LLaMA 3.3','✨ Google Gemini','🤗 Hugging Face','🧠 IBM Watson AI','🚀 FastAPI','⚛️ React + Vite','🐍 Python 3.11','🔥 Flask'].map((t,i)=>(
                <div key={i} className="lgchip">{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="sband">
          <div className="sgrid">
            <div className="scell rv"><div className="snum">3<span>x</span></div><div className="sdesc">faster campaign creation vs manual teams</div></div>
            <div className="scell rv d1"><div className="snum"><span>$</span>0</div><div className="sdesc">to get started — fully open source</div></div>
            <div className="scell rv d2"><div className="snum">100<span>%</span></div><div className="sdesc">AI-generated, data-driven pitches</div></div>
            <div className="scell rv d3"><div className="snum">70<span>B</span></div><div className="sdesc">parameter LLaMA model powering everything</div></div>
          </div>
        </div>

        {/* FEATURE 1 */}
        <div id="features" className="split">
          <div className="rvl">
            <div className="mock">
              <div>
                <div className="mchip">✦ Campaign Generator</div>
                <div className="mrow"><div className="mrl">Product</div><div className="mrv">SaaS Analytics Platform</div></div>
                <div className="mrow"><div className="mrl">Target Audience</div><div className="mrv" style={{fontSize:'15px',fontFamily:'DM Sans',fontWeight:400}}>B2B tech startups, 50–500 employees</div></div>
                <div className="mrow"><div className="mrl">Projected Engagement</div><div className="mrv">+47% reach</div><div className="mbar"><div className="mbf"></div></div></div>
              </div>
              <div className="mtags">
                {['LinkedIn','Email','Twitter/X','Google Ads'].map(t=><span key={t} className="mtag">{t}</span>)}
              </div>
            </div>
          </div>
          <div className="rvr">
            <div className="seye">Feature 01</div>
            <h2 className="stitle">Launch campaigns<br/><em>in seconds</em></h2>
            <p className="ssub">Drop in your product and audience — MarketAI generates a full data-driven campaign strategy instantly.</p>
            <ul className="flist">
              <li><span className="fchk">✦</span>Multi-platform strategy (LinkedIn, Email, Social)</li>
              <li><span className="fchk">✦</span>Tailored messaging for any target audience</li>
              <li><span className="fchk">✦</span>Campaign hooks, headlines and CTAs included</li>
              <li><span className="fchk">✦</span>Export as PDF or copy to clipboard instantly</li>
            </ul>
          </div>
        </div>

        {/* FEATURE 2 */}
        <div className="altbg">
          <div className="split" style={{maxWidth:'1200px',margin:'0 auto'}}>
            <div className="rvl">
              <div className="seye">Feature 02</div>
              <h2 className="stitle">Win every<br/><em>conversation</em></h2>
              <p className="ssub">Generate personalized pitches tuned to your customer persona. 30-second elevator pitch, value prop, differentiators and CTA — instantly.</p>
              <ul className="flist">
                <li><span className="fchk">✦</span>30-second and long-form pitch variants</li>
                <li><span className="fchk">✦</span>Competitor differentiators baked in</li>
                <li><span className="fchk">✦</span>LinkedIn DM & cold email templates ready</li>
                <li><span className="fchk">✦</span>Tailored by industry, company size & budget</li>
              </ul>
            </div>
            <div className="rvr">
              <div className="mock">
                <div className="mchip">✦ Sales Pitch Generator</div>
                <div className="pmsg pa">"Struggling with manual reporting? Our platform cuts analytics time by 80% — your team gets insights in real-time, not end of week."</div>
                <div className="pmsg"><div className="plab">Value Proposition</div>Reduce decision latency from days to minutes with AI-powered business intelligence.</div>
                <div className="pmsg"><div className="plab">Call To Action</div>Book a 20-minute live demo — see your own data in the platform within 48 hours.</div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE 3 */}
        <div className="split">
          <div className="rvl">
            <div className="mock">
              <div className="mchip">✦ Lead Scoring Engine</div>
              <div className="scbig">
                <div className="scnum">87</div>
                <div className="sclbl">Lead Qualification Score</div>
                <div className="scbadge">🔥 HOT LEAD — Follow up now</div>
              </div>
              <div className="sbars">
                {[['Budget','90%','90'],['Need','85%','85'],['Urgency','80%','80'],['Authority','88%','88']].map(([l,p,w])=>(
                  <div key={l} className="sbrow">{l}<div className="sbtrack"><div className="sbfill" style={{width:`${w}%`}}></div></div>{p}</div>
                ))}
              </div>
              <div style={{marginTop:'14px',fontSize:'12px',color:'#8c8479'}}>Conversion Probability: <strong style={{color:'#2d5a27'}}>76%</strong></div>
            </div>
          </div>
          <div className="rvr">
            <div className="seye">Feature 03</div>
            <h2 className="stitle">Score leads,<br/><em>not guesses</em></h2>
            <p className="ssub">Stop wasting time on cold leads. MarketAI evaluates Budget, Need, Urgency and Authority — delivering a 0–100 score with full breakdown.</p>
            <ul className="flist">
              <li><span className="fchk">✦</span>0–100 BANT qualification score in seconds</li>
              <li><span className="fchk">✦</span>Hot / Warm / Lukewarm / Cold classification</li>
              <li><span className="fchk">✦</span>Conversion probability estimate</li>
              <li><span className="fchk">✦</span>AI-written reasoning for every score</li>
            </ul>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="altbg" id="how">
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <div className="rv" style={{textAlign:'center',maxWidth:'560px',margin:'0 auto'}}>
              <div className="seye" style={{justifyContent:'center'}}>How it works</div>
              <h2 className="stitle" style={{textAlign:'center'}}>From input to insight<br/>in <em>4 steps</em></h2>
            </div>
            <div className="steps">
              {[
                ['Step 01','Input your data','Enter your product, audience, persona or lead info into the clean MarketAI interface.'],
                ['Step 02','AI prompt construction','MarketAI builds a context-aware prompt and sends it to Groq\'s LLaMA 3.3 70B model.'],
                ['Step 03','Inference at 500 tok/s','Groq\'s hardware-accelerated inference returns structured results in milliseconds.'],
                ['Step 04','Use it immediately','Copy, export or push to your CRM, email client or presentation deck. Done.'],
              ].map(([n,t,d],i)=>(
                <div key={i} className={`step rv d${i}`}><div className="stepn">{n}</div><div className="stept">{t}</div><div className="stepd">{d}</div></div>
              ))}
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="sec" id="stack">
          <div className="rv" style={{maxWidth:'540px'}}>
            <div className="seye">Tech Stack</div>
            <h2 className="stitle">Built on the<br/><em>best AI</em></h2>
            <p className="ssub">MarketAI is engineered with best-in-class tools — fast, reliable and developer-friendly.</p>
          </div>
          <div className="tgrid">
            {[
              ['⚡','Groq API','LLaMA 3.3 70B at 500+ tok/s — the fastest AI inference on the planet.'],
              ['✨','Google Gemini','Multimodal AI for advanced content analysis and creative enhancements.'],
              ['🤗','Hugging Face','Open-source NLP for sentiment analysis and industry classification.'],
              ['🧠','IBM Watson AI','Enterprise-grade AI for trust, explainability and augmentation.'],
              ['🚀','FastAPI','Blazing-fast Python backend with async support and auto-generated docs.'],
              ['⚛️','React + Vite','Modern component-driven frontend with lightning-fast HMR.'],
            ].map(([ico,name,desc],i)=>(
              <div key={i} className={`tcard rv d${i%4}`}>
                <div className="tico">{ico}</div>
                <div className="tname">{name}</div>
                <div className="tdesc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIAL */}
        <div className="testi">
          <div className="ti rv">
            <div className="tq">"What used to take our team <em>three full days</em> — research, writing, review — MarketAI does in under <em>90 seconds.</em> It's giving everyone superpowers."</div>
            <div className="tau">
              <div className="taav">R</div>
              <div><div className="tan">Rahul K.</div><div className="tar">VP of Growth, B2B SaaS startup</div></div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="psec" id="pricing">
          <div className="rv">
            <div className="seye" style={{justifyContent:'center'}}>Pricing</div>
            <h2 className="stitle" style={{textAlign:'center',letterSpacing:'-3px'}}>Simple, transparent<br/><em>pricing</em></h2>
            <p className="ssub" style={{margin:'0 auto',textAlign:'center'}}>No hidden fees. Fully open source.</p>
          </div>
          <div className="pcard rv">
            <div className="pbadge">✦ All Inclusive</div>
            <div className="pnum">Free</div>
            <div className="psub">Self-host with your own API keys</div>
            <ul className="pfeats">
              {['Unlimited campaign generations','Unlimited sales pitch creation','Unlimited lead scoring','Groq, Gemini & Hugging Face integrations','FastAPI + React full-stack codebase','Export to PDF, Word, CSV'].map(f=>(
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button className="btn-dk" style={{width:'100%',justifyContent:'center',fontSize:'15px',padding:'17px'}} onClick={() => navigate('/dashboard')}>
              Launch MarketAI Suite →
            </button>
          </div>
        </div>

        {/* LETTER */}
        <div className="lsec">
          <div className="linner rv">
            <p>Dear sales and marketing teams,</p>
            <p>We've watched talented people burn hours crafting campaigns, rewriting pitches, and debating lead priority — only to get beaten by smaller teams who moved faster.</p>
            <p>The problem was never strategy. It was <strong>speed</strong>. The time between insight and action is where deals are lost.</p>
            <p>That's why we built MarketAI Suite. We believe that <strong>every business deserves AI-grade intelligence</strong> — not just the ones that can afford enterprise contracts.</p>
            <p>When your tools think faster than your competitors can react, you win. That's the only goal.</p>
            <div className="lsig">The MarketAI Team<div className="lrole">Built for sales and marketing teams everywhere</div></div>
          </div>
        </div>

        {/* CTA */}
        <div className="ctasec">
          <div className="rv">
            <h2 className="ctat">Close more.<br/><em>Pitch smarter.</em></h2>
            <p className="ctas">Generate your first AI campaign in under 30 seconds.</p>
            <button className="btn-dk" style={{fontSize:'16px',padding:'18px 44px'}} onClick={() => navigate('/dashboard')}>
              Launch MarketAI Suite
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="foot">
          <button className="flogo" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>MarketAI Suite</button>
          <ul className="flinks">
            <li><button onClick={() => scrollTo('features')}>Features</button></li>
            <li><button onClick={() => scrollTo('stack')}>Tech Stack</button></li>
            <li><button onClick={() => scrollTo('how')}>How It Works</button></li>
            <li><button onClick={() => scrollTo('pricing')}>Pricing</button></li>
            <li><button onClick={() => navigate('/dashboard')}>Launch App</button></li>
          </ul>
          <div className="fcopy">Groq · Gemini · Hugging Face · IBM AI · FastAPI · React</div>
        </footer>
      </div>
    </>
  )
}