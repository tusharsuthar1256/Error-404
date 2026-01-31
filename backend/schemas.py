# ==========================================
# schemas.py
# Pydantic schemas for AQI Health Advisory
# ==========================================

from pydantic import BaseModel, Field
from typing import Dict, Optional
from enum import Enum


# ==========================================
# ENUMS (Strict values only)
# ==========================================

class GenderEnum(str, Enum):
    male = "male"
    female = "female"
    other = "other"


class PeopleTypeEnum(str, Enum):
    child = "child"
    adult = "adult"
    elderly = "elderly"
    pregnant = "pregnant"


class DiseaseEnum(str, Enum):
    none = "none"
    asthma = "asthma"
    copd = "copd"
    heart_disease = "heart_disease"


class RiskLevelEnum(str, Enum):
    low = "Low"
    moderate = "Moderate"
    high = "High"
    very_high = "Very High"
    severe = "Severe"


# ==========================================
# REQUEST SCHEMA
# ==========================================

class HealthRequest(BaseModel):
    """
    Input payload for AQI advisory agent
    """

    age: int = Field(
        ...,
        ge=0,
        le=120,
        description="Age of the person"
    )

    gender: GenderEnum

    people_type: PeopleTypeEnum

    disease: DiseaseEnum

    city: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="City name"
    )

    aqi: int = Field(
        ...,
        ge=1,
        le=1000,
        description="Air Quality Index value"
    )


# ==========================================
# RESPONSE SCHEMAS (Structured JSON)
# ==========================================

class AQIAssessment(BaseModel):
    risk_level: RiskLevelEnum
    impact: str


class Precautions(BaseModel):
    outdoor_advice: str
    mask_recommendation: str
    home_protection: str


class SpecialCare(BaseModel):
    children: Optional[str] = None
    elderly: Optional[str] = None
    respiratory_patients: Optional[str] = None


class HealthAdvisoryJSON(BaseModel):
    """
    Exact structure returned by Gemini
    """

    profile_summary: str

    aqi_assessment: AQIAssessment

    precautions: Precautions

    special_care: SpecialCare

    lifestyle_tips: str

    disclaimer: str


# ==========================================
# HUMAN READABLE RESPONSE
# ==========================================

class HealthAdvisoryText(BaseModel):
    """
    Formatted chatbot response
    """
    message: str


# ==========================================
# ERROR RESPONSE
# ==========================================

class ErrorResponse(BaseModel):
    error: str
