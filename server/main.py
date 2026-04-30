"""
Lightweight proxy/aggregation service that sits between the dashboard
and the sample-legacy-app backend.
"""

import httpx
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Dashboard Proxy")

LEGACY_APP_URL = "http://localhost:3000"


class EventPayload(BaseModel):
    type: str
    data: dict


@app.get("/api/metrics")
async def get_metrics():
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{LEGACY_APP_URL}/api/metrics")
        return r.json()


@app.get("/api/users")
async def get_users():
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{LEGACY_APP_URL}/api/users")
        return r.json()


@app.post("/api/events")
async def post_event(payload: EventPayload):
    async with httpx.AsyncClient() as client:
        r = await client.post(f"{LEGACY_APP_URL}/api/events", json=payload.dict())
        return r.json()
