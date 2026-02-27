import { useState } from 'react'
import { Copy, CheckCheck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ResultCard({ title, content, accent = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: accent ? 'rgba(232,255,71,0.04)' : '#131210',
      border: accent ? '1px solid rgba(232,255,71,0.2)' : '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20, padding: 32, marginBottom: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
          color: accent ? '#e8ff47' : 'rgba(245,242,236,0.4)',
        }}>
          {title}
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '7px 14px',
            fontSize: 11, color: 'rgba(245,242,236,0.6)',
            cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          {copied ? <CheckCheck size={12} color="#e8ff47" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{
        fontSize: 14, color: 'rgba(245,242,236,0.75)',
        lineHeight: 1.85, whiteSpace: 'pre-wrap', fontWeight: 300,
      }}>
        {content}
      </div>
    </div>
  )
}
