# from fastapi import APIRouter, HTTPException
# from app.models.campaign_model import CampaignRequest, CampaignResponse
# from app.services.groq_service import groq_service
# from app.services.gemini_service import gemini_service
# from app.services.huggingface_service import huggingface_service
# from app.utils.text_cleaner import clean_markdown

# router = APIRouter()


# @router.post("/generate", response_model=CampaignResponse)
# async def generate_campaign(req: CampaignRequest):
#     """
#     Generate a full marketing campaign using Groq LLaMA 3.3 70B.
#     Optionally enhance with Google Gemini creative ideas.
#     """
#     try:
#         # Step 1: Groq main campaign generation
#         raw = groq_service.generate_campaign(req.product, req.audience, req.platform)
#         campaign_text = clean_markdown(raw)

#         # Step 2: Optional Gemini enhancement
#         gemini_result = None
#         if req.enhance_with_gemini:
#             gemini_raw = gemini_service.enhance_campaign(campaign_text, req.product)
#             gemini_result = clean_markdown(gemini_raw)

#         # Step 3: Hugging Face sentiment on campaign copy
#         sentiment = huggingface_service.analyze_sentiment(campaign_text[:512])

#         return CampaignResponse(
#             campaign=campaign_text,
#             gemini_enhancements=gemini_result,
#             sentiment=sentiment,
#             platform=req.platform,
#             product=req.product,
#         )
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
from fastapi import APIRouter, HTTPException
from app.models.campaign_model import CampaignRequest, CampaignResponse
from app.services.groq_service import groq_service
from app.services.gemini_service import gemini_service
from app.services.huggingface_service import huggingface_service
from app.utils.text_cleaner import clean_markdown

router = APIRouter()


@router.post("/generate", response_model=CampaignResponse)
async def generate_campaign(req: CampaignRequest):
    try:
        # Convert platforms list to a comma-separated string for the prompt
        platform_str = ", ".join(req.platforms)

        # Step 1: Groq main campaign generation
        raw = groq_service.generate_campaign(
            product=req.product,
            audience=req.target_audience,
            platform=platform_str,
            tone=req.tone,
            goal=req.campaign_goal,
        )
        campaign_text = clean_markdown(raw)

        # Step 2: Optional Gemini enhancement
        gemini_result = None
        if req.enhance_with_gemini:
            gemini_raw = gemini_service.enhance_campaign(campaign_text, req.product)
            gemini_result = clean_markdown(gemini_raw)

        # Step 3: Hugging Face sentiment on campaign copy
        sentiment_raw = huggingface_service.analyze_sentiment(campaign_text[:512])
        # Convert sentiment to a simple string if it's a dict
        if isinstance(sentiment_raw, list) and len(sentiment_raw) > 0:
            sentiment = sentiment_raw[0].get("label", "Neutral")
        elif isinstance(sentiment_raw, dict):
            sentiment = sentiment_raw.get("label", "Neutral")
        else:
            sentiment = str(sentiment_raw)

        return CampaignResponse(
            campaign_content=campaign_text,
            gemini_enhancements=gemini_result,
            sentiment=sentiment,
            platform=platform_str,
            product=req.product,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))