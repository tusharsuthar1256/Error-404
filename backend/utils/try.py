from advice_agent import AirQualityAgent

result = AirQualityAgent.generate_advice(
    age=28,
    gender="Male",
    people_type="Adult",
    disease="None",
    city="Delhi",
    aqi=280,
    activity="Running outdoors"
)

print(result)
