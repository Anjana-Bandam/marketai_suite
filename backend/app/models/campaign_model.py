# from pydantic import BaseModel, Field
# from typing import Optional


# class CampaignRequest(BaseModel):
#     product: str = Field(..., min_length=2, max_length=500, description="Product or service name")
#     audience: str = Field(..., min_length=2, max_length=500, description="Target audience description")
#     platform: str = Field(..., description="Marketing platform (e.g. LinkedIn, Email, Instagram)")
#     enhance_with_gemini: Optional[bool] = Field(False, description="Use Gemini to add creative enhancements")


# class CampaignResponse(BaseModel):
#     campaign: str
#     gemini_enhancements: Optional[str] = None
#     sentiment: Optional[dict] = None
#     platform: str
#     product: str


from pydantic import BaseModel, Field
from typing import Optional, List


class CampaignRequest(BaseModel):
    product: str = Field(..., min_length=2, max_length=500, description="Product or service name")
    target_audience: str = Field(..., min_length=2, max_length=500, description="Target audience description")
    platforms: List[str] = Field(..., description="List of marketing platforms")
    campaign_goal: Optional[str] = Field(None, description="Campaign goal")
    tone: Optional[str] = Field("Professional", description="Tone of the campaign")
    enhance_with_gemini: Optional[bool] = Field(False, description="Use Gemini to add creative enhancements")


class CampaignResponse(BaseModel):
    campaign_content: str
    gemini_enhancements: Optional[str] = None
    sentiment: Optional[str] = None
    platform: Optional[str] = None
    product: Optional[str] = None

