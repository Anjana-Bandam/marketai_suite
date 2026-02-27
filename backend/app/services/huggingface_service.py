import requests
from app.config import settings


HF_API_URL = "https://api-inference.huggingface.co/models"


class HuggingFaceService:
    def __init__(self):
        self.headers = {"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"}

    def _query(self, model: str, payload: dict) -> dict:
        url = f"{HF_API_URL}/{model}"
        response = requests.post(url, headers=self.headers, json=payload, timeout=30)
        return response.json()

    def analyze_sentiment(self, text: str) -> dict:
        """Analyze sentiment of marketing copy or lead notes."""
        result = self._query(
            "distilbert-base-uncased-finetuned-sst-2-english",
            {"inputs": text[:512]}
        )
        if isinstance(result, list) and result:
            top = max(result[0], key=lambda x: x["score"])
            return {"label": top["label"], "confidence": round(top["score"] * 100, 1)}
        return {"label": "UNKNOWN", "confidence": 0}

    def summarize(self, text: str) -> str:
        """Summarize long campaign or pitch text."""
        result = self._query(
            "facebook/bart-large-cnn",
            {"inputs": text[:1024], "parameters": {"max_length": 120, "min_length": 40}}
        )
        if isinstance(result, list) and result:
            return result[0].get("summary_text", "")
        return ""

    def classify_industry(self, text: str) -> str:
        """Zero-shot classify the industry from a product description."""
        result = self._query(
            "facebook/bart-large-mnli",
            {
                "inputs": text,
                "parameters": {
                    "candidate_labels": [
                        "SaaS", "E-commerce", "Healthcare", "Finance",
                        "Education", "Manufacturing", "Retail", "Real Estate"
                    ]
                }
            }
        )
        if isinstance(result, dict) and "labels" in result:
            return result["labels"][0]
        return "General"


huggingface_service = HuggingFaceService()
