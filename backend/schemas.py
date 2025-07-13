from pydantic import BaseModel
from typing import List

class ItemRequest(BaseModel):
    item: str
    quantity: int

class StoreRequest(BaseModel):
    store_id: int
    store_name: str
    latitude: float
    longitude: float
    items_needed: List[ItemRequest]
