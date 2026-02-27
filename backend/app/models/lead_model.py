# from pydantic import BaseModel, Field
# from typing import Optional


# class LeadRequest(BaseModel):
#     name: str = Field(..., min_length=1, max_length=200, description="Lead or company name")
#     budget: str = Field(..., min_length=2, max_length=500, description="Budget information")
#     need: str = Field(..., min_length=2, max_length=500, description="Business pain points and needs")
#     urgency: str = Field(..., min_length=2, max_length=500, description="Timeline and urgency")
#     authority: str = Field(..., min_length=2, max_length=500, description="Decision-making role/authority")
#     notes: Optional[str] = Field("", description="Additional notes")


# class LeadScoreResult(BaseModel):
#     score: int
#     classification: str          # Hot / Warm / Lukewarm / Cold
#     budget_score: int
#     need_score: int
#     urgency_score: int
#     authority_score: int
#     conversion_probability: str
#     reasoning: str
#     next_action: str


# class LeadResponse(BaseModel):
#     name: str
#     result: LeadScoreResult
#     raw_scores: dict
from pydantic import BaseModel, Field
from typing import Optional


class LeadRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200, description="Lead or company name")
    budget: str = Field(..., min_length=1, max_length=500, description="Budget information")
    need: str = Field(..., min_length=1, max_length=500, description="Business pain points and needs")
    urgency: str = Field(..., min_length=1, max_length=500, description="Timeline and urgency")
    authority: str = Field(..., min_length=1, max_length=500, description="Decision-making role")
    notes: Optional[str] = Field("", description="Additional notes")


class LeadScoreResult(BaseModel):
    score: int
    classification: str
    budget_score: int
    need_score: int
    urgency_score: int
    authority_score: int
    conversion_probability: str
    reasoning: str
    next_action: str


class LeadResponse(BaseModel):
    name: str
    score: int
    classification: str
    conversion_probability: str
    reasoning: str
    next_action: str
    bant_scores: dict
    result: LeadScoreResult
    raw_scores: dict