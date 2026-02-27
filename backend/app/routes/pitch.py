# from fastapi import APIRouter, HTTPException
# from app.models.pitch_model import PitchRequest, PitchResponse
# from app.services.groq_service import groq_service
# from app.services.gemini_service import gemini_service
# from app.services.huggingface_service import huggingface_service
# from app.utils.text_cleaner import clean_markdown

# router = APIRouter()


# @router.post("/generate", response_model=PitchResponse)
# async def generate_pitch(req: PitchRequest):
#     """
#     Generate a personalized sales pitch using Groq LLaMA 3.3 70B.
#     Optionally generate a cold email template via Gemini.
#     """
#     try:
#         # Step 1: Groq pitch generation
#         raw = groq_service.generate_pitch(req.product, req.persona, req.industry, req.company_size)
#         pitch_text = clean_markdown(raw)

#         # Step 2: Optional Gemini cold email template
#         email_template = None
#         if req.generate_email:
#             email_raw = gemini_service.generate_email_template(pitch_text, req.persona)
#             email_template = clean_markdown(email_raw)

#         # Step 3: Detect industry via Hugging Face zero-shot
#         industry_detected = huggingface_service.classify_industry(req.product + " " + req.persona)

#         return PitchResponse(
#             pitch=pitch_text,
#             email_template=email_template,
#             industry_detected=industry_detected,
#             product=req.product,
#             persona=req.persona,
#         )
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, HTTPException
from app.models.pitch_model import PitchRequest, PitchResponse
from app.services.groq_service import groq_service
from app.services.gemini_service import gemini_service
from app.services.huggingface_service import huggingface_service
from app.utils.text_cleaner import clean_markdown

router = APIRouter()


def extract_section(text: str, keywords: list) -> str:
    """Extract a section from pitch text by keyword."""
    lines = text.split('\n')
    result = []
    capturing = False
    for line in lines:
        line_lower = line.lower()
        if any(kw in line_lower for kw in keywords):
            capturing = True
            continue
        elif capturing and line.strip() and line.endswith(':'):
            break
        elif capturing and line.strip():
            result.append(line.strip())
    return ' '.join(result) if result else None


@router.post("/generate", response_model=PitchResponse)
async def generate_pitch(req: PitchRequest):
    try:
        # Step 1: Groq pitch generation
        raw = groq_service.generate_pitch(
            req.product,
            req.persona,
            req.industry,
            req.company_size,
            req.key_pain_points,
        )
        pitch_text = clean_markdown(raw)

        # Step 2: Extract sections from pitch text
        elevator_pitch = extract_section(pitch_text, ['elevator', '30-second', '30 second'])
        value_proposition = extract_section(pitch_text, ['value proposition', 'value prop'])
        differentiators = extract_section(pitch_text, ['differentiator', 'key differ'])
        call_to_action = extract_section(pitch_text, ['call to action', 'call-to-action', 'cta'])

        # Step 3: Optional Gemini cold email
        email_template = None
        if req.generate_email:
            email_raw = gemini_service.generate_email_template(pitch_text, req.persona)
            email_template = clean_markdown(email_raw)

        # Step 4: Detect industry
        industry_detected = huggingface_service.classify_industry(req.product + " " + req.persona)

        return PitchResponse(
            pitch=pitch_text,
            full_pitch=pitch_text,
            elevator_pitch=elevator_pitch,
            value_proposition=value_proposition,
            differentiators=differentiators,
            call_to_action=call_to_action,
            email_template=email_template,
            industry_detected=industry_detected,
            product=req.product,
            persona=req.persona,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
