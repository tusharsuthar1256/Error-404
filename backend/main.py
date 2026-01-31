from fastapi import FastAPI
from pydantic import BaseModel
from services.health_advisory_service import get_health_advisory_text

app = FastAPI()


class AdvisoryRequest(BaseModel):
    age: int
    gender: str
    people_type: str
    disease: str
    city: str
    aqi: int
    activity: str


@app.post("/health-advisory")
def health_advisory(data: AdvisoryRequest):
    message = get_health_advisory_text(**data.dict())

    return {
        "success": True,
        "message": message
    }
