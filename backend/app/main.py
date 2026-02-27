from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import campaign, pitch, lead_scoring
from app.config import settings

app = FastAPI(
    title="MarketAI Suite API",
    description="AI-powered marketing and sales intelligence platform",
    version="1.0.0"
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(campaign.router, prefix="/api/campaign", tags=["Campaign"])
app.include_router(pitch.router, prefix="/api/pitch", tags=["Pitch"])
app.include_router(lead_scoring.router, prefix="/api/lead", tags=["Lead Scoring"])


@app.get("/")
def root():
    return {"message": "MarketAI Suite API is running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok", "model": settings.GROQ_MODEL}
