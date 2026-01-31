import os
import json
from typing import Dict, Any
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()


class AirQualityAgent:
    """
    Air Quality Advisory Utility
    Reusable + thread-safe + FastAPI friendly
    """

    _model = None

    # =====================================================
    # System Prompt (UPDATED with activity guidance)
    # =====================================================

    SYSTEM_PROMPT = """
You are an Air Quality Health Advisory AI Agent.

PURPOSE:
Provide SAFE, PREVENTIVE, EDUCATIONAL health guidance.

SCOPE:
- AQI precautions
- Outdoor activity safety
- Mask recommendations
- Indoor protection
- Special groups
- Activity safety assessment (running, travel, etc.)

STRICT RULES:
- No diagnosis
- No medicines
- Prevention only
- Simple language
- Return ONLY JSON

JSON SCHEMA:
{
  "profile_summary": "",
  "aqi_assessment": {
    "risk_level": "",
    "impact": ""
  },
  "activity_guidance": {
    "activity": "",
    "is_safe": "Yes/No/Limited",
    "recommendation": "",
    "precautions": ""
  },
  "precautions": {
    "outdoor_advice": "",
    "mask_recommendation": "",
    "home_protection": ""
  },
  "special_care": {
    "children": "",
    "elderly": "",
    "respiratory_patients": ""
  },
  "lifestyle_tips": "",
  "disclaimer": "Educational guidance only"
}
"""

    # =====================================================
    # Lazy Model Init
    # =====================================================

    @classmethod
    def _get_model(cls):
        if cls._model is None:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY not found")

            genai.configure(api_key=api_key)

            cls._model = genai.GenerativeModel(
                model_name="gemini-3-flash-preview",
                system_instruction=cls.SYSTEM_PROMPT,
            )

        return cls._model

    # =====================================================
    # Validation
    # =====================================================

    @staticmethod
    def _validate(age: int, aqi: int, activity: str):
        if age <= 0:
            raise ValueError("Invalid age")

        if not (0 < aqi <= 1000):
            raise ValueError("Invalid AQI")

        if not activity:
            raise ValueError("Activity is required")

    # =====================================================
    # Safe JSON parse
    # =====================================================

    @staticmethod
    def _safe_json(text: str) -> Dict[str, Any]:
        try:
            start = text.index("{")
            end = text.rindex("}") + 1
            return json.loads(text[start:end])
        except Exception:
            return {"error": "Invalid JSON from model", "raw": text}

    # =====================================================
    # Public Method
    # =====================================================

    @classmethod
    def generate_advice(
        cls,
        age: int,
        gender: str,
        people_type: str,
        disease: str,
        city: str,
        aqi: int,
        activity: str,   # ✅ NEW PARAMETER
    ) -> Dict[str, Any]:

        cls._validate(age, aqi, activity)

        prompt = f"""
PERSON DETAILS:
Age: {age}
Gender: {gender}
Type: {people_type}
Existing Disease: {disease}
City: {city}
AQI: {aqi}
Planned Activity: {activity}

Evaluate if the activity is safe.
Provide precautions and alternatives if unsafe.
Return strictly JSON.
"""

        model = cls._get_model()

        try:
            response = model.generate_content(prompt)
            return cls._safe_json(response.text)

        except Exception as e:
            return {"error": str(e)}
