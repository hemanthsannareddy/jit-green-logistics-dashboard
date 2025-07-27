from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from store_request_api import router as store_router
from dashboard_api import router as dashboard_router

app = FastAPI(
    title="Belc JIT + Green Logistics API",
    description="Optimized Delivery Route & CO₂ Emissions Estimator for Belc",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://jit-frontend.vercel.app/"  # Replace with your actual Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(store_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {"message": "Belc JIT + Green Logistics API is live!"}
