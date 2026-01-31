from typing import Dict
from utils.advice_agent import AirQualityAgent


# =========================================================
# Service Layer (AI call + formatting)
# =========================================================

def get_health_advisory_text(
    age: int,
    gender: str,
    people_type: str,
    disease: str,
    city: str,
    aqi: int,
    activity: str,
) -> str:
    """
    Main service used by FastAPI.
    Returns formatted chatbot text.
    """

    health_data = AirQualityAgent.generate_advice(
        age=age,
        gender=gender,
        people_type=people_type,
        disease=disease,
        city=city,
        aqi=aqi,
        activity=activity,
    )

    return format_health_advisory_response(health_data)


# =========================================================
# Formatter (UPDATED for activity guidance)
# =========================================================

def format_health_advisory_response(health_data: Dict) -> str:
    """
    Converts advisory JSON → clean professional text
    Safe extraction + FastAPI friendly
    """

    if not isinstance(health_data, dict):
        return "❌ Invalid response format received."

    if "error" in health_data:
        return f"❌ Error: {health_data['error']}"

    # ------------------ Safe Extract ------------------

    profile = health_data.get("profile_summary", "Not available")

    aqi = health_data.get("aqi_assessment", {})
    activity = health_data.get("activity_guidance", {})
    precautions = health_data.get("precautions", {})
    special = health_data.get("special_care", {})

    lifestyle = health_data.get("lifestyle_tips", "Not available")
    disclaimer = health_data.get("disclaimer", "")

    # ------------------ Professional Response ------------------

    response = f"""
🌿 **Air Quality Health Advisory Report**

━━━━━━━━━━━━━━━━━━━━━━

🧍 **Profile Summary**
{profile}

━━━━━━━━━━━━━━━━━━━━━━

📊 **Air Quality Risk Assessment**
• Risk Level: {aqi.get('risk_level', 'Not available')}
• Health Impact: {aqi.get('impact', 'Not available')}

━━━━━━━━━━━━━━━━━━━━━━

🏃 **Activity Guidance**
• Activity: {activity.get('activity', 'Not specified')}
• Safe To Do: {activity.get('is_safe', 'Unknown')}
• Recommendation: {activity.get('recommendation', 'Not available')}
• Precautions: {activity.get('precautions', 'Not available')}

━━━━━━━━━━━━━━━━━━━━━━

🛡️ **Recommended Precautions**

Outdoor:
{precautions.get('outdoor_advice', 'Not available')}

Mask:
{precautions.get('mask_recommendation', 'Not available')}

Indoor:
{precautions.get('home_protection', 'Not available')}

━━━━━━━━━━━━━━━━━━━━━━

👨‍👩‍👧‍👦 **Special Care**

Children:
{special.get('children', 'Not applicable')}

Elderly:
{special.get('elderly', 'Not applicable')}

Respiratory/Heart:
{special.get('respiratory_patients', 'Not applicable')}

━━━━━━━━━━━━━━━━━━━━━━

🌱 **Lifestyle Tips**
{lifestyle}

━━━━━━━━━━━━━━━━━━━━━━

⚠️ **Disclaimer**
{disclaimer}
"""
    print(response)

    return response.strip()


