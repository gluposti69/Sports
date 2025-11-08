# 🔐 Safe Building Inspections Admin Guide

## 📊 Admin Dashboard Access

### **Method 1: Web Dashboard (Recommended)**
**URL:** `https://your-website-url.com/admin`

**Features:**
- 📋 **View All Inquiries** - See all contact form submissions
- 📈 **Statistics Dashboard** - Total inquiries, new leads, inspection types
- 🔄 **Status Management** - Update inquiry status (New → Contacted → Scheduled → Completed)
- 🔍 **Detailed View** - Click any inquiry to see full details
- 📞 **Quick Actions** - Click phone numbers to call, emails to send
- 🎯 **Filter Options** - Filter by status (New, Contacted, Scheduled, etc.)

### **Method 2: Direct API Access**
Base URL: `https://your-website-url.com/api`

## 🛠️ Available Admin Features

### **1. Dashboard Statistics**
**Endpoint:** `GET /api/contact/stats`
**What you get:**
```json
{
  "total_inquiries": 25,
  "status_breakdown": {
    "new": 8,
    "contacted": 5,
    "scheduled": 7,
    "completed": 4,
    "cancelled": 1
  },
  "inspection_type_breakdown": {
    "pre-purchase": 18,
    "new-home": 7
  },
  "recent_inquiries_7_days": 12
}
```

### **2. View All Inquiries**
**Endpoint:** `GET /api/contact/inquiries`
**Filters available:**
- All inquiries: `/api/contact/inquiries`
- New only: `/api/contact/inquiries?status=new`
- Contacted only: `/api/contact/inquiries?status=contacted`
- Scheduled only: `/api/contact/inquiries?status=scheduled`

### **3. View Single Inquiry**
**Endpoint:** `GET /api/contact/inquiry/{inquiry_id}`
**Example:** `/api/contact/inquiry/abc-123-def-456`

### **4. Update Inquiry Status**
**Endpoint:** `PATCH /api/contact/inquiry/{inquiry_id}/status`
**Body:** `{"status": "contacted"}`

**Available Status Options:**
- `new` - Just received (red badge)
- `contacted` - You've called/emailed them (yellow badge)
- `scheduled` - Inspection booked (blue badge)
- `completed` - Inspection done (green badge)
- `cancelled` - Inquiry cancelled (gray badge)

## 📱 How to Use the Admin Dashboard

### **Step 1: Access the Dashboard**
1. Go to: `https://your-website-url.com/admin`
2. You'll see the admin dashboard with statistics at the top

### **Step 2: Review New Inquiries**
1. Look for inquiries with **red "NEW" badges** - these need immediate attention
2. Click on any inquiry to see full details on the right panel
3. You'll see:
   - Customer contact information
   - Property address
   - Inspection type requested
   - Preferred date
   - Customer message
   - Submission timestamp

### **Step 3: Contact Customers**
1. **Call them:** Click the phone number to call directly
2. **Email them:** Click the email address to send an email
3. **Update status:** After contacting, change status to "contacted"

### **Step 4: Manage Your Workflow**
1. **New inquiries** (red) → **Contacted** (yellow) → **Scheduled** (blue) → **Completed** (green)
2. Use the status filter to focus on specific stages
3. Track your progress with the dashboard statistics

## 📧 Email Notifications

**You automatically receive emails for every new inquiry at:**
📨 `info@safebuildinginspections.com.au`

**Email includes:**
- ⚡ Priority alert (respond within 2 hours)
- 👤 Complete customer details
- 🏠 Property information
- 📅 Preferred inspection date
- 💬 Customer message
- 📋 Next steps checklist

## 📊 Key Metrics to Track

### **Daily Tasks:**
- Check **"New"** inquiries (aim for 0 by end of day)
- Follow up on **"Contacted"** inquiries
- Confirm **"Scheduled"** inspections

### **Weekly Review:**
- Total inquiries received
- Conversion rate (inquiries → scheduled inspections)
- Response time performance
- Most popular inspection type

### **Business Insights:**
- **Busiest days/times** for inquiries
- **Popular inspection types** (pre-purchase vs new home)
- **Geographic patterns** (property locations)
- **Customer communication preferences**

## 🔧 Admin API Examples

### **Get inquiry statistics:**
```bash
curl https://your-website-url.com/api/contact/stats
```

### **Get all new inquiries:**
```bash
curl https://your-website-url.com/api/contact/inquiries?status=new
```

### **Update inquiry to "contacted":**
```bash
curl -X PATCH https://your-website-url.com/api/contact/inquiry/[ID]/status \
  -H "Content-Type: application/json" \
  -d '{"status": "contacted"}'
```

## 📱 Mobile Access

The admin dashboard is **mobile-responsive**, so you can:
- ✅ Check new inquiries on your phone
- ✅ Update statuses while on-site
- ✅ Access customer details during calls
- ✅ View statistics anywhere

## 🚨 Best Practices

### **Response Time:**
- Aim to respond to **new inquiries within 2 hours** (as promised to customers)
- Check the admin dashboard **multiple times per day**
- Set up notifications on your phone for the admin email

### **Status Management:**
1. **New** → Change immediately after first contact attempt
2. **Contacted** → Change when customer responds and you're discussing details
3. **Scheduled** → Change when inspection date/time is confirmed
4. **Completed** → Change after inspection is finished and report delivered

### **Customer Service:**
- Use the customer's **preferred date** as a starting point for scheduling
- Reference their **specific message/concerns** when you call
- Keep the **inquiry ID** for your records
- Update status promptly to track your progress

## 🔄 Workflow Example

1. **9:00 AM** - Check admin dashboard for new inquiries
2. **9:15 AM** - Call first customer, discuss their pre-purchase inspection needs
3. **9:30 AM** - Update status to "contacted" in admin dashboard
4. **10:00 AM** - Customer confirms date, update status to "scheduled"
5. **End of day** - Review all inquiries, aim for zero "new" status items

Your admin dashboard gives you complete control over your inspection business workflow! 🎯
