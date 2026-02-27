# MarketAI Suite 🚀

> AI-powered marketing campaign generation, personalized sales pitches, and intelligent lead scoring — built with Groq LLaMA 3.3 70B, FastAPI, and React.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Campaign Generator** | Generate full marketing campaigns for any product + audience using Groq LLaMA 3.3 70B |
| **Sales Pitch AI** | Create 30-sec elevator pitches, value props, differentiators, and CTAs personalized to your customer |
| **Lead Scoring** | BANT-based 0–100 lead qualification with conversion probability and next-action recommendations |
| **Gemini Enhancements** | Optional Google Gemini creative hooks and cold email templates |
| **HuggingFace NLP** | Sentiment analysis on campaigns, zero-shot industry detection |

---

## 🛠 Tech Stack

- **Backend:** FastAPI + Python 3.11
- **AI Inference:** Groq API (LLaMA 3.3 70B — 500+ tok/s)
- **Secondary AI:** Google Gemini 1.5 Flash
- **NLP:** Hugging Face Inference API
- **Enterprise AI:** IBM Watson AI
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Routing:** React Router v6

---

## 📁 Project Structure

```
marketai/
├── backend/
│   ├── app/
│   │   ├── main.py              ← FastAPI app entry point
│   │   ├── config.py            ← Environment/settings via pydantic
│   │   ├── services/
│   │   │   ├── groq_service.py        ← Groq LLaMA 3.3 70B calls
│   │   │   ├── gemini_service.py      ← Google Gemini calls
│   │   │   └── huggingface_service.py ← HuggingFace NLP
│   │   ├── routes/
│   │   │   ├── campaign.py      ← POST /api/campaign/generate
│   │   │   ├── pitch.py         ← POST /api/pitch/generate
│   │   │   └── lead_scoring.py  ← POST /api/lead/score
│   │   ├── models/
│   │   │   ├── campaign_model.py
│   │   │   ├── pitch_model.py
│   │   │   └── lead_model.py
│   │   └── utils/
│   │       └── text_cleaner.py  ← Markdown cleanup utilities
│   ├── requirements.txt
│   └── .env                     ← API keys (never commit!)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx       ← Sidebar navigation shell
│   │   │   └── ResultCard.jsx   ← Reusable AI result display
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    ← Home / overview page
│   │   │   ├── CampaignPage.jsx ← Campaign generator UI
│   │   │   ├── PitchPage.jsx    ← Sales pitch UI
│   │   │   └── LeadScoringPage.jsx ← Lead scoring UI
│   │   ├── services/
│   │   │   └── api.js           ← Axios API layer
│   │   ├── App.jsx              ← Routes
│   │   ├── main.jsx             ← React entry point
│   │   └── index.css            ← Global styles + Tailwind
│   ├── public/
│   │   └── landing.html         ← Public marketing landing page
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/marketai-suite.git
cd marketai-suite
```

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up your .env file
cp .env .env.local
# Edit .env and add your actual API keys
```

**Edit `.env`:**
```
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here
HUGGINGFACE_API_KEY=your_hf_token_here
IBM_API_KEY=your_ibm_key_here
```

**Get your Groq API key (required):**
1. Visit https://console.groq.com
2. Sign up / log in
3. Go to **API Keys** → **Create new API key**
4. Copy and paste into `.env`

**Start the backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

Backend runs at: http://localhost:8000
API docs at: http://localhost:8000/docs

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: http://localhost:5173

The Vite dev server proxies `/api/*` requests to `http://localhost:8000` automatically.

---

## 📡 API Endpoints

### Campaign Generator
```
POST /api/campaign/generate
{
  "product": "string",
  "audience": "string",
  "platform": "string",
  "enhance_with_gemini": false
}
```

### Sales Pitch
```
POST /api/pitch/generate
{
  "product": "string",
  "persona": "string",
  "industry": "SaaS",
  "company_size": "Mid-Market",
  "generate_email": false
}
```

### Lead Scoring
```
POST /api/lead/score
{
  "name": "string",
  "budget": "string",
  "need": "string",
  "urgency": "string",
  "authority": "string",
  "notes": ""
}
```

---

## 🏗 Deployment

### Deploy Backend (Railway / Render)
```bash
# Add a Procfile
echo "web: uvicorn app.main:app --host 0.0.0.0 --port $PORT" > Procfile
```

### Deploy Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# dist/ folder is your deployable build
```

Update `vite.config.js` proxy target with your deployed backend URL for production.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Groq inference API — https://console.groq.com |
| `GEMINI_API_KEY` | Optional | Google AI Studio — https://aistudio.google.com |
| `HUGGINGFACE_API_KEY` | Optional | HuggingFace token — https://huggingface.co/settings/tokens |
| `IBM_API_KEY` | Optional | IBM Cloud — https://cloud.ibm.com |

---

Built with ❤️ — Groq · Gemini · Hugging Face · IBM AI · FastAPI · React
