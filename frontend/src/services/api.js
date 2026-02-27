import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Campaign ────────────────────────────────────────────────────────────────
export const generateCampaign = (data) =>
  api.post('/campaign/generate', data).then(r => r.data)

// ─── Pitch ───────────────────────────────────────────────────────────────────
export const generatePitch = (data) =>
  api.post('/pitch/generate', data).then(r => r.data)

// ─── Lead Scoring ─────────────────────────────────────────────────────────────
export const scoreLead = (data) =>
  api.post('/lead/score', data).then(r => r.data)

// ─── Health ───────────────────────────────────────────────────────────────────
export const checkHealth = () =>
  api.get('/health').then(r => r.data)

export default api
