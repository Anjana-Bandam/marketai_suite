
import json
from fastapi import APIRouter, HTTPException
from app.models.lead_model import LeadRequest, LeadResponse, LeadScoreResult
from app.services.groq_service import groq_service
from app.utils.text_cleaner import extract_json_block

router = APIRouter()


def classify_score(score: int) -> str:
    if score >= 90:
        return "Hot"
    elif score >= 75:
        return "Warm"
    elif score >= 60:
        return "Lukewarm"
    return "Cold"


@router.post("/score", response_model=LeadResponse)
async def score_lead(req: LeadRequest):
    try:
        raw = groq_service.score_lead(
            req.name, req.budget, req.need, req.urgency, req.authority
        )
        json_str = extract_json_block(raw)

        try:
            data = json.loads(json_str)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="AI returned malformed JSON. Please retry.")

        score = int(data.get("score", 50))
        budget_score = int(data.get("budget_score", 50))
        need_score = int(data.get("need_score", 50))
        urgency_score = int(data.get("urgency_score", 50))
        authority_score = int(data.get("authority_score", 50))
        classification = data.get("classification", classify_score(score))
        conversion_probability = data.get("conversion_probability", "N/A")
        reasoning = data.get("reasoning", "")
        next_action = data.get("next_action", "Follow up within 48 hours.")

        result = LeadScoreResult(
            score=score,
            classification=classification,
            budget_score=budget_score,
            need_score=need_score,
            urgency_score=urgency_score,
            authority_score=authority_score,
            conversion_probability=conversion_probability,
            reasoning=reasoning,
            next_action=next_action,
        )

        return LeadResponse(
            name=req.name,
            score=score,
            classification=classification,
            conversion_probability=conversion_probability,
            reasoning=reasoning,
            next_action=next_action,
            bant_scores={
                "budget": budget_score,
                "need": need_score,
                "urgency": urgency_score,
                "authority": authority_score,
            },
            result=result,
            raw_scores={
                "budget": budget_score,
                "need": need_score,
                "urgency": urgency_score,
                "authority": authority_score,
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
