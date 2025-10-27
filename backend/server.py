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
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio
from concurrent.futures import ThreadPoolExecutor


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Safe Building Inspections API", version="1.0.0")

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

# Email configuration
GMAIL_EMAIL = "bluecheckinspections@gmail.com"
GMAIL_PASSWORD = "etkg dpeo ymcd pmjd"
GMAIL_SMTP_SERVER = "smtp.gmail.com"
GMAIL_SMTP_PORT = 587

# Thread pool for email sending
email_executor = ThreadPoolExecutor(max_workers=3)

def send_email_sync(to_email: str, subject: str, html_content: str, text_content: str = ""):
    """Send email using Gmail SMTP (synchronous)"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = GMAIL_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add text and HTML parts
        if text_content:
            part1 = MIMEText(text_content, 'plain')
            msg.attach(part1)
        
        part2 = MIMEText(html_content, 'html')
        msg.attach(part2)
        
        # Send email
        server = smtplib.SMTP(GMAIL_SMTP_SERVER, GMAIL_SMTP_PORT)
        server.starttls()
        server.login(GMAIL_EMAIL, GMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False

async def send_email_async(to_email: str, subject: str, html_content: str, text_content: str = ""):
    """Send email asynchronously"""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(
        email_executor, 
        send_email_sync, 
        to_email, 
        subject, 
        html_content, 
        text_content
    )

def create_business_notification_email(inquiry: ContactInquiry) -> tuple:
    """Create email content for business notification"""
    subject = f"🏠 New Inspection Request - {inquiry.name}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .header {{ background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; }}
            .info-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
            .info-table th, .info-table td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
            .info-table th {{ background-color: #f8f9fa; font-weight: bold; }}
            .priority {{ background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }}
            .footer {{ background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏠 SAFE BUILDING INSPECTIONS</h1>
            <h2>New Inspection Request</h2>
        </div>
        
        <div class="content">
            <div class="priority">
                <strong>⚡ Action Required:</strong> New inspection request received - respond within 2 hours as promised to customer.
            </div>
            
            <h3>Customer Information:</h3>
            <table class="info-table">
                <tr><th>Name</th><td>{inquiry.name}</td></tr>
                <tr><th>Email</th><td><a href="mailto:{inquiry.email}">{inquiry.email}</a></td></tr>
                <tr><th>Phone</th><td><a href="tel:{inquiry.phone}">{inquiry.phone}</a></td></tr>
                <tr><th>Property Address</th><td>{inquiry.property_address}</td></tr>
                <tr><th>Inspection Type</th><td>{inquiry.inspection_type.replace('-', ' ').title()}</td></tr>
                <tr><th>Preferred Date</th><td>{inquiry.preferred_date or 'Not specified'}</td></tr>
                <tr><th>Submitted</th><td>{inquiry.created_at.strftime('%B %d, %Y at %I:%M %p')}</td></tr>
            </table>
            
            {f'<h3>Customer Message:</h3><div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;"><em>"{inquiry.message}"</em></div>' if inquiry.message else ''}
            
            <h3>📋 Next Steps:</h3>
            <ol>
                <li><strong>Call customer within 2 hours:</strong> <a href="tel:{inquiry.phone}">{inquiry.phone}</a></li>
                <li><strong>Confirm inspection details and scheduling</strong></li>
                <li><strong>Send quote if needed</strong></li>
                <li><strong>Update inquiry status in system</strong></li>
            </ol>
        </div>
        
        <div class="footer">
            <p>This notification was sent automatically from your Safe Building Inspections website.</p>
            <p>Inquiry ID: {inquiry.id}</p>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    NEW INSPECTION REQUEST - SAFE BUILDING INSPECTIONS
    
    ACTION REQUIRED: Respond within 2 hours as promised to customer.
    
    Customer Details:
    - Name: {inquiry.name}
    - Email: {inquiry.email}
    - Phone: {inquiry.phone}
    - Property: {inquiry.property_address}
    - Type: {inquiry.inspection_type.replace('-', ' ').title()}
    - Preferred Date: {inquiry.preferred_date or 'Not specified'}
    - Submitted: {inquiry.created_at.strftime('%B %d, %Y at %I:%M %p')}
    
    {f'Customer Message: "{inquiry.message}"' if inquiry.message else ''}
    
    Next Steps:
    1. Call customer: {inquiry.phone}
    2. Confirm inspection details
    3. Send quote if needed
    4. Update status in system
    
    Inquiry ID: {inquiry.id}
    """
    
    return subject, html_content, text_content

def create_customer_confirmation_email(inquiry: ContactInquiry) -> tuple:
    """Create email content for customer confirmation"""
    subject = f"✅ Inspection Request Received - Safe Building Inspections"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .header {{ background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; }}
            .info-box {{ background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .contact-info {{ background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }}
            .footer {{ background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏠 SAFE BUILDING INSPECTIONS</h1>
            <p>know before you buy</p>
        </div>
        
        <div class="content">
            <h2>Hello {inquiry.name},</h2>
            
            <p>Thank you for choosing Safe Building Inspections! We've received your inspection request and will contact you within <strong>2 hours</strong> to confirm your appointment.</p>
            
            <div class="info-box">
                <h3>📋 Your Request Details:</h3>
                <p><strong>Property:</strong> {inquiry.property_address}</p>
                <p><strong>Inspection Type:</strong> {inquiry.inspection_type.replace('-', ' ').title()}</p>
                <p><strong>Preferred Date:</strong> {inquiry.preferred_date or 'To be discussed'}</p>
                <p><strong>Reference ID:</strong> {inquiry.id}</p>
            </div>
            
            <h3>🕐 What Happens Next?</h3>
            <ol>
                <li><strong>We'll call you within 2 hours</strong> to confirm your inspection details</li>
                <li><strong>Schedule your inspection</strong> at a convenient time</li>
                <li><strong>Professional inspection</strong> by our VBA registered experts</li>
                <li><strong>Detailed report delivered</strong> within 24 hours</li>
            </ol>
            
            <div class="contact-info">
                <h3>📞 Need to Contact Us?</h3>
                <p><strong>Phone:</strong> <a href="tel:0477167167">0477 167 167</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@safebuildinginspections.com.au">info@safebuildinginspections.com.au</a></p>
                <p><strong>Service Area:</strong> All of Melbourne Metropolitan Area</p>
            </div>
            
            <h3>🏅 Why Choose Safe Building Inspections?</h3>
            <ul>
                <li>✅ VBA Registered Building Practitioner</li>
                <li>✅ HIA Member</li>
                <li>✅ Over 20 Years Experience</li>
                <li>✅ 5.0 Star Rating</li>
                <li>✅ Comprehensive Reports with Photos</li>
                <li>✅ Professional and Reliable Service</li>
            </ul>
            
            <p>We look forward to helping you with your building inspection needs!</p>
            
            <p><strong>Best regards,</strong><br>
            The Safe Building Inspections Team</p>
        </div>
        
        <div class="footer">
            <p>Safe Building Inspections | Melbourne, Victoria | 0477 167 167</p>
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    SAFE BUILDING INSPECTIONS - INSPECTION REQUEST CONFIRMED
    
    Hello {inquiry.name},
    
    Thank you for choosing Safe Building Inspections! We've received your inspection request and will contact you within 2 HOURS to confirm your appointment.
    
    YOUR REQUEST DETAILS:
    - Property: {inquiry.property_address}
    - Inspection Type: {inquiry.inspection_type.replace('-', ' ').title()}
    - Preferred Date: {inquiry.preferred_date or 'To be discussed'}
    - Reference ID: {inquiry.id}
    
    WHAT HAPPENS NEXT:
    1. We'll call you within 2 hours to confirm details
    2. Schedule your inspection at a convenient time
    3. Professional inspection by VBA registered experts
    4. Detailed report delivered within 24 hours
    
    CONTACT US:
    Phone: 0477 167 167
    Email: info@safebuildinginspections.com.au
    Service Area: All of Melbourne Metropolitan Area
    
    WHY CHOOSE SAFE BUILDING INSPECTIONS:
    ✅ VBA Registered Building Practitioner
    ✅ HIA Member  
    ✅ Over 20 Years Experience
    ✅ 5.0 Star Rating
    ✅ Comprehensive Reports with Photos
    ✅ Professional and Reliable Service
    
    We look forward to helping you with your building inspection needs!
    
    Best regards,
    The Safe Building Inspections Team
    
    Safe Building Inspections | Melbourne, Victoria | 0477 167 167
    """
    
    return subject, html_content, text_content

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Safe Building Inspections API is running"}

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
            
            # Send emails asynchronously
            try:
                # Send business notification email
                business_subject, business_html, business_text = create_business_notification_email(contact_inquiry)
                business_email_sent = await send_email_async(
                    GMAIL_EMAIL,
                    business_subject,
                    business_html,
                    business_text
                )
                
                # Send customer confirmation email
                customer_subject, customer_html, customer_text = create_customer_confirmation_email(contact_inquiry)
                customer_email_sent = await send_email_async(
                    inquiry.email,
                    customer_subject,
                    customer_html,
                    customer_text
                )
                
                if business_email_sent:
                    logger.info(f"Business notification email sent for inquiry {contact_inquiry.id}")
                else:
                    logger.error(f"Failed to send business notification email for inquiry {contact_inquiry.id}")
                
                if customer_email_sent:
                    logger.info(f"Customer confirmation email sent to {inquiry.email} for inquiry {contact_inquiry.id}")
                else:
                    logger.error(f"Failed to send customer confirmation email to {inquiry.email} for inquiry {contact_inquiry.id}")
                    
            except Exception as email_error:
                logger.error(f"Email sending error for inquiry {contact_inquiry.id}: {str(email_error)}")
                # Don't fail the inquiry creation if emails fail
            
            return ContactInquiryResponse(
                id=contact_inquiry.id,
                message="Your inspection request has been submitted successfully! We'll contact you within 2 hours to confirm your appointment. You should also receive a confirmation email shortly.",
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
