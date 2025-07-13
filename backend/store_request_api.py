from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import requests

router = APIRouter(prefix="/store", tags=["Store Requests"])

# Dummy in-memory DB
store_requests_db = []

# --- Schemas ---
class StoreRequest(BaseModel):
    store_id: str
    items: List[str]
    urgency: str

# --- .NET Predictor Caller ---
def call_dotnet_predictor(store_id, item, last_week_sales, avg_sales, day_of_week):
    try:
        response = requests.post(
            "http://localhost:5134/predict-demand",
            json={
                "storeId": store_id,
                "item": item,
                "lastWeekSales": last_week_sales,
                "avgWeeklySales": avg_sales,
                "dayOfWeek": day_of_week
            },
            timeout=5
        )
        return response.json()
    except Exception as e:
        return {"error": f"Prediction service unavailable: {str(e)}"}

# --- Submit Store Request ---
@router.post("/request")
def submit_store_request(request: StoreRequest):
    store_requests_db.append(request)
    return {
        "message": "Store request submitted successfully",
        "data": request
    }

# --- Get All Requests ---
@router.get("/requests")
def get_all_requests():
    if not store_requests_db:
        raise HTTPException(status_code=404, detail="No store requests found.")
    return store_requests_db

# --- Predict Inventory using .NET API ---
@router.post("/predict")
def predict_inventory(request: StoreRequest):
    # Dummy data for now
    last_week_sales = 120
    avg_sales = 110
    day_of_week = "Monday"

    result = call_dotnet_predictor(
        store_id=request.store_id,
        item=request.items[0],
        last_week_sales=last_week_sales,
        avg_sales=avg_sales,
        day_of_week=day_of_week
    )
    return result
