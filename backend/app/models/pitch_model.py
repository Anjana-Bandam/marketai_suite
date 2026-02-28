
from pydantic import BaseModel, Field
from typing import Optional


class PitchRequest(BaseModel):
    product: str = Field(..., min_length=2, max_length=500)
    persona: str = Field(..., min_length=2, max_length=500, description="Customer persona description")
    industry: Optional[str] = Field("General", description="Target industry")
    company_size: Optional[str] = Field("Mid-Market", description="Company size")
    generate_email: Optional[bool] = Field(False)
    company_name: Optional[str] = Field("", description="Company name")
    budget_range: Optional[str] = Field("", description="Budget range")
    key_pain_points: Optional[str] = Field("", description="Key pain points")


class PitchResponse(BaseModel):
    pitch: Optional[str] = None
    full_pitch: Optional[str] = None
    elevator_pitch: Optional[str] = None
    value_proposition: Optional[str] = None
    differentiators: Optional[str] = None
    call_to_action: Optional[str] = None
    email_template: Optional[str] = None
    industry_detected: Optional[str] = None
    product: str
    persona: str
