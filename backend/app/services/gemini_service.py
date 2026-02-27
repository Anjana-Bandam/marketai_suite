import google.generativeai as genai
from app.config import settings


class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)

    def generate(self, prompt: str) -> str:
        """Generate text using Gemini."""
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Gemini error: {str(e)}"

    def enhance_campaign(self, campaign_text: str, product: str) -> str:
        """Use Gemini to add creative hooks and visual content ideas to a campaign."""
        prompt = (
            f"Given this marketing campaign for '{product}':\n\n{campaign_text}\n\n"
            f"Add: 3 creative visual content ideas, 2 viral hook concepts, "
            f"and 1 influencer collaboration angle. Keep it concise and actionable."
        )
        return self.generate(prompt)

    def generate_email_template(self, pitch_text: str, persona: str) -> str:
        """Convert a pitch into a cold email template."""
        prompt = (
            f"Convert this sales pitch into a cold outreach email for persona '{persona}':\n\n"
            f"{pitch_text}\n\n"
            f"Format: Subject line, Opening (2 sentences), Value body (3 sentences), "
            f"CTA (1 sentence), Sign-off. Keep it under 150 words total."
        )
        return self.generate(prompt)


gemini_service = GeminiService()
