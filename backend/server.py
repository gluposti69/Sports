from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="BlueCheck Inspections API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Enums
class InspectionType(str, Enum):
    PRE_PURCHASE = "pre-purchase"
    NEW_HOME = "new-home"

class InquiryStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    property_address: str
    inspection_type: InspectionType
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    status: InquiryStatus = InquiryStatus.NEW
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    property_address: str = Field(..., min_length=5, max_length=200)
    inspection_type: InspectionType
    preferred_date: Optional[str] = None
    message: Optional[str] = Field(None, max_length=1000)

class ContactInquiryResponse(BaseModel):
    id: str
    message: str
    status: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "BlueCheck Inspections API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Form Endpoints
@api_router.post("/contact/inquiry", response_model=ContactInquiryResponse)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    """
    Create a new contact inquiry for building inspection services
    """
    try:
        # Create the inquiry object
        inquiry_data = inquiry.dict()
        contact_inquiry = ContactInquiry(**inquiry_data)
        
        # Insert into MongoDB
        result = await db.contact_inquiries.insert_one(contact_inquiry.dict())
        
        if result.inserted_id:
            # Log the inquiry for monitoring
            logger.info(f"New contact inquiry created: {contact_inquiry.id} from {inquiry.email}")
            
            return ContactInquiryResponse(
                id=contact_inquiry.id,
                message="Your inspection request has been submitted successfully! We'll contact you within 2 hours to confirm your appointment.",
                status="success"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to create inquiry")
            
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/inquiries", response_model=List[ContactInquiry])
async def get_contact_inquiries(status: Optional[InquiryStatus] = None, limit: int = 50):
    """
    Get all contact inquiries with optional status filtering
    """
    try:
        query = {}
        if status:
            query["status"] = status
            
        inquiries = await db.contact_inquiries.find(query).sort("created_at", -1).limit(limit).to_list(limit)
        return [ContactInquiry(**inquiry) for inquiry in inquiries]
        
    except Exception as e:
        logger.error(f"Error fetching contact inquiries: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch inquiries")

@api_router.get("/contact/inquiry/{inquiry_id}", response_model=ContactInquiry)
async def get_contact_inquiry(inquiry_id: str):
    """
    Get a specific contact inquiry by ID
    """
    try:
        inquiry = await db.contact_inquiries.find_one({"id": inquiry_id})
        if not inquiry:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        return ContactInquiry(**inquiry)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact inquiry {inquiry_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch inquiry")

@api_router.patch("/contact/inquiry/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, status: InquiryStatus):
    """
    Update the status of a contact inquiry
    """
    try:
        result = await db.contact_inquiries.update_one(
            {"id": inquiry_id},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Inquiry not found")
            
        return {"message": f"Inquiry status updated to {status}", "status": "success"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating inquiry status {inquiry_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update inquiry status")

# Statistics endpoint
@api_router.get("/contact/stats")
async def get_contact_stats():
    """
    Get statistics about contact inquiries
    """
    try:
        total_inquiries = await db.contact_inquiries.count_documents({})
        
        # Count by status
        status_counts = {}
        for status in InquiryStatus:
            count = await db.contact_inquiries.count_documents({"status": status})
            status_counts[status.value] = count
        
        # Count by inspection type
        inspection_type_counts = {}
        for inspection_type in InspectionType:
            count = await db.contact_inquiries.count_documents({"inspection_type": inspection_type})
            inspection_type_counts[inspection_type.value] = count
        
        # Recent inquiries (last 7 days)
        seven_days_ago = datetime.utcnow().timestamp() - (7 * 24 * 60 * 60)
        recent_inquiries = await db.contact_inquiries.count_documents({
            "created_at": {"$gte": datetime.fromtimestamp(seven_days_ago)}
        })
        
        return {
            "total_inquiries": total_inquiries,
            "status_breakdown": status_counts,
            "inspection_type_breakdown": inspection_type_counts,
            "recent_inquiries_7_days": recent_inquiries
        }
        
    except Exception as e:
        logger.error(f"Error fetching contact stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
