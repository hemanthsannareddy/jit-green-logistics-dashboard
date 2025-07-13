from typing import List, Dict, Tuple
from route_optimizer import get_optimized_route, haversine
from co2_calculator import estimate_co2_emission

# Warehouse location (Tokyo Station as example)
WAREHOUSE_COORDINATES = (35.6812, 139.7671)

def calculate_total_distance(route: List[Tuple[float, float]]) -> float:
    """
    Calculates the total distance (in km) for the full route using haversine formula.
    """
    total_distance = 0.0
    for i in range(len(route) - 1):
        total_distance += haversine(route[i], route[i + 1])
    return round(total_distance, 2)

def schedule_delivery(store_requests: List) -> Dict:
    """
    Generate an optimized delivery schedule with labeled route and accurate CO₂ emissions.
    """
    if not store_requests:
        return {"message": "No store requests to schedule."}

    # Prepare store locations and names
    store_locations = [(req.latitude, req.longitude) for req in store_requests]
    store_names = [req.store_name for req in store_requests]

    # Generate optimized route
    optimized_route = get_optimized_route(WAREHOUSE_COORDINATES, store_locations)

    # Calculate total distance & CO₂ emission
    total_distance_km = calculate_total_distance(optimized_route)
    co2_emission = round(total_distance_km * 0.21, 2)  # 0.21 kg CO₂ per km

    # Prepare labeled route output
    labeled_route = [{"label": "Warehouse", "coordinates": optimized_route[0]}]
    for idx, coord in enumerate(optimized_route[1:]):
        labeled_route.append({"label": store_names[idx], "coordinates": coord})

    return {
        "total_stores": len(store_requests),
        "optimized_route": labeled_route,
        "total_distance_km": total_distance_km,
        "estimated_co2_kg": co2_emission
    }
