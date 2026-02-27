# # from groq import Groq
# # from app.config import settings


# # class GroqService:
# #     def __init__(self):
# #         self.client = Groq(api_key=settings.GROQ_API_KEY)
# #         self.model = settings.GROQ_MODEL

# #     def generate(self, system_prompt: str, user_prompt: str, max_tokens: int = 2048) -> str:
# #         """Send a prompt to Groq and return the response text."""
# #         response = self.client.chat.completions.create(
# #             model=self.model,
# #             messages=[
# #                 {"role": "system", "content": system_prompt},
# #                 {"role": "user", "content": user_prompt},
# #             ],
# #             max_tokens=max_tokens,
# #             temperature=0.75,
# #         )
# #         return response.choices[0].message.content

# #     def generate_campaign(self, product: str, audience: str, platform: str) -> str:
# #         system = (
# #             "You are an expert marketing strategist. Generate comprehensive, "
# #             "data-driven marketing campaign strategies. Always respond in clean, "
# #             "structured text — no markdown symbols like ** or ##. Use clear section "
# #             "headings followed by a colon."
# #         )
# #         user = (
# #             f"Create a detailed marketing campaign for:\n"
# #             f"Product: {product}\n"
# #             f"Target Audience: {audience}\n"
# #             f"Platform: {platform}\n\n"
# #             f"Include: Campaign Concept, Key Message, Content Strategy, "
# #             f"Headline Ideas (3), CTA Suggestions, KPIs to Track."
# #         )
# #         return self.generate(system, user)

# #     def generate_pitch(self, product: str, persona: str, industry: str, company_size: str) -> str:
# #         system = (
# #             "You are a world-class B2B sales coach. Create highly personalized, "
# #             "compelling sales pitches. Respond in clean structured text — "
# #             "no markdown symbols. Use section headings followed by a colon."
# #         )
# #         user = (
# #             f"Create a complete sales pitch for:\n"
# #             f"Product/Solution: {product}\n"
# #             f"Customer Persona: {persona}\n"
# #             f"Industry: {industry}\n"
# #             f"Company Size: {company_size}\n\n"
# #             f"Include: 30-Second Elevator Pitch, Value Proposition, "
# #             f"Key Differentiators (3), Objection Handling, Call-To-Action."
# #         )
# #         return self.generate(system, user)

# #     def score_lead(self, name: str, budget: str, need: str, urgency: str, authority: str) -> str:
# #         system = (
# #             "You are an expert sales qualification analyst. Evaluate leads using "
# #             "the BANT framework (Budget, Authority, Need, Timeline). "
# #             "Always return a JSON object with these exact keys: "
# #             "score (0-100 integer), classification (Hot/Warm/Lukewarm/Cold), "
# #             "budget_score (0-100), need_score (0-100), urgency_score (0-100), "
# #             "authority_score (0-100), conversion_probability (percentage string), "
# #             "reasoning (string), next_action (string). Return ONLY valid JSON."
# #         )
# #         user = (
# #             f"Score this lead:\n"
# #             f"Name: {name}\n"
# #             f"Budget: {budget}\n"
# #             f"Business Need: {need}\n"
# #             f"Urgency / Timeline: {urgency}\n"
# #             f"Decision-Making Authority: {authority}\n"
# #         )
# #         return self.generate(system, user, max_tokens=1024)


# # groq_service = GroqService()



# from groq import Groq
# from app.config import settings


# class GroqService:
#     def __init__(self):
#         self.client = Groq(api_key=settings.GROQ_API_KEY)
#         self.model = settings.GROQ_MODEL

#     def generate(self, system_prompt: str, user_prompt: str, max_tokens: int = 2048) -> str:
#         response = self.client.chat.completions.create(
#             model=self.model,
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {"role": "user", "content": user_prompt},
#             ],
#             max_tokens=max_tokens,
#             temperature=0.75,
#         )
#         return response.choices[0].message.content

#     def generate_campaign(self, product: str, audience: str, platform: str, tone: str = "Professional", goal: str = None) -> str:
#         system = (
#             "You are an expert marketing strategist. Generate comprehensive, "
#             "data-driven marketing campaign strategies. Always respond in clean, "
#             "structured text — no markdown symbols like ** or ##. Use clear section "
#             "headings followed by a colon."
#         )
#         user = (
#             f"Create a detailed marketing campaign for:\n"
#             f"Product: {product}\n"
#             f"Target Audience: {audience}\n"
#             f"Platform: {platform}\n"
#             f"Tone: {tone}\n"
#             f"Campaign Goal: {goal if goal else 'Not specified'}\n\n"
#             f"Include: Campaign Concept, Key Message, Content Strategy, "
#             f"Headline Ideas (3), CTA Suggestions, KPIs to Track."
#         )
#         return self.generate(system, user)

#     def generate_pitch(self, product: str, persona: str, industry: str, company_size: str) -> str:
#         system = (
#             "You are a world-class B2B sales coach. Create highly personalized, "
#             "compelling sales pitches. Respond in clean structured text — "
#             "no markdown symbols. Use section headings followed by a colon."
#         )
#         user = (
#             f"Create a complete sales pitch for:\n"
#             f"Product/Solution: {product}\n"
#             f"Customer Persona: {persona}\n"
#             f"Industry: {industry}\n"
#             f"Company Size: {company_size}\n\n"
#             f"Include: 30-Second Elevator Pitch, Value Proposition, "
#             f"Key Differentiators (3), Objection Handling, Call-To-Action."
#         )
#         return self.generate(system, user)

#     def score_lead(self, name: str, budget: str, need: str, urgency: str, authority: str) -> str:
#         system = (
#             "You are an expert sales qualification analyst. Evaluate leads using "
#             "the BANT framework (Budget, Authority, Need, Timeline). "
#             "Always return a JSON object with these exact keys: "
#             "score (0-100 integer), classification (Hot/Warm/Lukewarm/Cold), "
#             "budget_score (0-100), need_score (0-100), urgency_score (0-100), "
#             "authority_score (0-100), conversion_probability (percentage string), "
#             "reasoning (string), next_action (string). Return ONLY valid JSON."
#         )
#         user = (
#             f"Score this lead:\n"
#             f"Name: {name}\n"
#             f"Budget: {budget}\n"
#             f"Business Need: {need}\n"
#             f"Urgency / Timeline: {urgency}\n"
#             f"Decision-Making Authority: {authority}\n"
#         )
#         return self.generate(system, user, max_tokens=1024)


# groq_service = GroqService()
from groq import Groq
from app.config import settings


class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.GROQ_MODEL

    def generate(self, system_prompt: str, user_prompt: str, max_tokens: int = 2048) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=max_tokens,
            temperature=0.75,
        )
        return response.choices[0].message.content

    def generate_campaign(self, product: str, audience: str, platform: str, tone: str = "Professional", goal: str = None) -> str:
        system = (
            "You are an expert marketing strategist. Generate comprehensive, "
            "data-driven marketing campaign strategies. Always respond in clean, "
            "structured text — no markdown symbols like ** or ##. Use clear section "
            "headings followed by a colon."
        )
        user = (
            f"Create a detailed marketing campaign for:\n"
            f"Product: {product}\n"
            f"Target Audience: {audience}\n"
            f"Platform: {platform}\n"
            f"Tone: {tone}\n"
            f"Campaign Goal: {goal if goal else 'Not specified'}\n\n"
            f"Include: Campaign Concept, Key Message, Content Strategy, "
            f"Headline Ideas (3), CTA Suggestions, KPIs to Track."
        )
        return self.generate(system, user)

    def generate_pitch(self, product: str, persona: str, industry: str, company_size: str, key_pain_points: str = "") -> str:
        system = (
            "You are a world-class B2B sales coach. Create highly personalized, "
            "compelling sales pitches. Respond in clean structured text — "
            "no markdown symbols. Use section headings followed by a colon."
        )
        user = (
            f"Create a complete sales pitch for:\n"
            f"Product/Solution: {product}\n"
            f"Customer Persona: {persona}\n"
            f"Industry: {industry}\n"
            f"Company Size: {company_size}\n"
            f"Key Pain Points: {key_pain_points if key_pain_points else 'Not specified'}\n\n"
            f"Include: 30-Second Elevator Pitch, Value Proposition, "
            f"Key Differentiators (3), Objection Handling, Call-To-Action."
        )
        return self.generate(system, user)

    def score_lead(self, name: str, budget: str, need: str, urgency: str, authority: str) -> str:
        system = (
            "You are an expert sales qualification analyst. Evaluate leads using "
            "the BANT framework (Budget, Authority, Need, Timeline). "
            "Always return a JSON object with these exact keys: "
            "score (0-100 integer), classification (Hot/Warm/Lukewarm/Cold), "
            "budget_score (0-100), need_score (0-100), urgency_score (0-100), "
            "authority_score (0-100), conversion_probability (percentage string), "
            "reasoning (string), next_action (string). Return ONLY valid JSON."
        )
        user = (
            f"Score this lead:\n"
            f"Name: {name}\n"
            f"Budget: {budget}\n"
            f"Business Need: {need}\n"
            f"Urgency / Timeline: {urgency}\n"
            f"Decision-Making Authority: {authority}\n"
        )
        return self.generate(system, user, max_tokens=1024)


groq_service = GroqService()