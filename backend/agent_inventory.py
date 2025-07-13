# agent_inventory.py

from datetime import datetime, timedelta
from schemas import StoreRequest
from typing import List

# Simulated database
store_requests_db: List[StoreRequest] = []

def monitor_and_recommend():
    # Set a recent time window
    now = datetime.utcnow()
    cutoff = now - timedelta(hours=1)

    # Filter requests in the last 1 hour
    recent_requests = [
        r for r in store_requests_db
        if r.timestamp > cutoff  # Assumes StoreRequest includes a 'timestamp' field
    ]

    # Simple heuristic: if many requests recently, recommend restocking
    if len(recent_requests) >= 3:
        return {
            "recommendation": True,
            "suggested_items": ["item_A", "item_B"],  # Placeholder logic
            "reason": f"{len(recent_requests)} requests in the last hour."
        }
    return {
        "recommendation": False,
        "message": "No action needed right now."
    }
