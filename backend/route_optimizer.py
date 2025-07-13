from math import radians, cos, sin, sqrt, atan2

def haversine(coord1, coord2):
    """
    Calculate the great-circle distance between two coordinates.
    Returns distance in kilometers.
    """
    R = 6371  # Radius of the Earth in km
    lat1, lon1 = radians(coord1[0]), radians(coord1[1])
    lat2, lon2 = radians(coord2[0]), radians(coord2[1])
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def get_optimized_route(warehouse: tuple, store_locations: list) -> list:
    """
    Generates a route starting from the warehouse using a nearest-neighbor heuristic.
    Returns a list of coordinates [(lat, lon), ...]
    """
    route = [warehouse]
    unvisited = store_locations.copy()
    current_location = warehouse

    while unvisited:
        # Find the nearest store to the current location
        next_store = min(unvisited, key=lambda store: haversine(current_location, store))
        route.append(next_store)
        unvisited.remove(next_store)
        current_location = next_store

    return route
