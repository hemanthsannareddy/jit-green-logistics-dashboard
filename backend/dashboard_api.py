from fastapi import APIRouter, HTTPException
from delivery_scheduler import schedule_delivery
from store_request_api import store_requests_db

router = APIRouter(
    prefix="/delivery",
    tags=["Delivery Scheduler"]
)

@router.get("/schedule")
def get_delivery_schedule():
    """
    Generate and return the optimized delivery route and estimated CO₂ emissions.
    """
    if not store_requests_db:
        raise HTTPException(status_code=404, detail="No store requests available for delivery.")
    
    return schedule_delivery(store_requests_db)
