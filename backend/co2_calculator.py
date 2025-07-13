import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
CLIMATIQ_API_KEY = os.getenv("CLIMATIQ_API_KEY")

# Emission factor mapping for API
VEHICLE_EMISSION_FACTORS = {
    "medium_diesel_truck": "delivery.vehicle_type_medium_diesel_truck.ton_km",
    "electric_van": "delivery.vehicle_type_electric_van.ton_km",
    "small_gasoline_car": "passenger_vehicle.car_gasoline.ton_km"
}

# Approximate CO₂ emissions (g/km) for offline fallback
OFFLINE_EMISSION_FACTORS = {
    "medium_diesel_truck": 700,   # grams CO₂ per km
    "electric_van": 120,          # Japan’s grid average (g/km)
    "small_gasoline_car": 180     # typical small gasoline car (g/km)
}


def estimate_co2_emission(distance_km: float, vehicle_type: str = "medium_diesel_truck", region: str = "JP") -> float:
    """
    Estimate CO₂ emissions (in kg) for a delivery route based on distance and vehicle type.
    Uses ClimaTIQ API if available; otherwise falls back to local estimate.

    Args:
        distance_km: Total distance of the route in kilometers
        vehicle_type: Type of vehicle (default = medium_diesel_truck)
        region: ISO 2-letter country code for region (default = 'JP')

    Returns:
        Estimated CO₂ emissions in kg
    """
    # Step 1: Try using ClimaTIQ API
    if CLIMATIQ_API_KEY:
        activity_id = VEHICLE_EMISSION_FACTORS.get(vehicle_type)
        if activity_id:
            url = "https://beta3.api.climatiq.io/estimate"
            headers = {
                "Authorization": f"Bearer {CLIMATIQ_API_KEY}",
                "Content-Type": "application/json"
            }
            payload = {
                "emission_factor": {
                    "activity_id": activity_id,
                    "source": "GREET",
                    "region": region
                },
                "parameters": {
                    "distance": distance_km,
                    "distance_unit": "km",
                    "weight": 1,
                    "weight_unit": "t"
                }
            }
            try:
                response = requests.post(url, json=payload, headers=headers, timeout=5)
                response.raise_for_status()
                data = response.json()
                if "co2e" in data:
                    return data["co2e"]
            except requests.RequestException as e:
                print(f"[Offline Fallback Activated] API Error: {e}")

    # Step 2: Offline fallback estimation (approximation)
    g_per_km = OFFLINE_EMISSION_FACTORS.get(vehicle_type)
    if g_per_km is None:
        raise ValueError(f"Unsupported vehicle type '{vehicle_type}' for offline fallback.")

    co2_kg = (distance_km * g_per_km) / 1000  # convert grams → kg
    return co2_kg
