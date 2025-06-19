// Mock data for Blue Check Inspections website

export const mockData = {
  business: {
    name: "Blue Check Inspections",
    tagline: "Your Trusted Building Inspection Experts",
    phone: "0477 167 167",
    email: "bluecheckinspections@gmail.com",
    address: "Melbourne, Victoria",
    serviceArea: "All of Melbourne Metropolitan Area",
    contactPerson: "Goran",
    businessHours: {
      weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
      saturday: "Saturday: 8:00 AM - 4:00 PM",
      sunday: "Sunday: By Appointment Only"
    },
    credentials: [
      "VBA Registered Building Practitioner",
      "HIA Member", 
      "Licensed Building Inspector",
      "15+ Years Experience"
    ]
  },

  services: [
    {
      id: 1,
      title: "Pre-Purchase Inspections",
      description: "Comprehensive property evaluation before you buy. Protect your investment with detailed structural, electrical, and plumbing assessments.",
      features: [
        "Structural integrity assessment",
        "Electrical safety inspection", 
        "Plumbing system evaluation",
        "Pest and termite inspection",
        "Detailed written report within 2-3 business days",
        "Photos and recommendations included"
      ],
      duration: "2-3 hours",
      price: "From $450"
    },
    {
      id: 2,
      title: "New Home Inspections", 
      description: "Ensure your new home meets all building standards and regulations. Quality assurance for new construction projects.",
      features: [
        "Building code compliance check",
        "Construction quality assessment",
        "Defect identification and documentation", 
        "Handover inspection support",
        "Builder liaison and follow-up",
        "Warranty protection guidance"
      ],
      duration: "2-4 hours",
      price: "From $520"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Sarah & Michael Thompson",
      location: "Brighton, VIC",
      rating: 5,
      text: "Blue Check Inspections saved us from making a costly mistake! Their thorough pre-purchase inspection revealed significant structural issues the seller hadn't disclosed. Professional, detailed, and incredibly knowledgeable.",
      date: "2024-05-15"
    },
    {
      id: 2, 
      name: "David Chen",
      location: "Camberwell, VIC",
      rating: 5,
      text: "Outstanding service for our new home inspection. The inspector was punctual, thorough, and explained everything clearly. The detailed report helped us get several defects fixed by the builder before settlement.",
      date: "2024-04-22"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      location: "Hawthorn, VIC", 
      rating: 5,
      text: "I've used Blue Check Inspections for three property purchases now. Their consistency, attention to detail, and professional reports give me complete confidence. Highly recommended!",
      date: "2024-03-18"
    }
  ],

  inspectionProcess: [
    {
      step: 1,
      title: "Book Your Inspection",
      description: "Call or email us with your property details and preferred timing"
    },
    {
      step: 2,
      title: "Professional Assessment",
      description: "Our certified inspector conducts a comprehensive evaluation"
    },
    {
      step: 3,
      title: "Detailed Report",
      description: "Receive your detailed report with photos within 24 hours"
    },
    {
      step: 4,
      title: "Expert Consultation", 
      description: "Follow-up discussion to explain findings and recommendations"
    }
  ],

  sampleReport: {
    title: "Sample Inspection Report",
    description: "See what you'll receive with every Blue Check Inspection",
    features: [
      "Comprehensive property overview",
      "High-resolution photographs",
      "Detailed findings with severity ratings",
      "Maintenance recommendations", 
      "Cost estimates for repairs",
      "Professional summary and advice"
    ],
    pages: "Typically 25-40 pages",
    delivery: "Delivered within 24 hours via email"
  },

  contactForm: {
    requiredInfo: [
      "Property address for inspection",
      "Property type (house, unit, townhouse)",
      "Inspection type needed",
      "Preferred inspection date/time",
      "Your contact details",
      "Special concerns or requests"
    ]
  },

  whyChooseUs: [
    {
      icon: "Shield",
      title: "Licensed & Insured",
      description: "VBA registered with full professional indemnity insurance"
    },
    {
      icon: "Clock",
      title: "Fast Turnaround", 
      description: "Detailed reports delivered within 2-3 business days guaranteed"
    },
    {
      icon: "Eye",
      title: "Thorough Inspections",
      description: "Comprehensive assessment using latest technology and methods"
    },
    {
      icon: "Users",
      title: "Expert Support",
      description: "15+ years experience with ongoing consultation included"
    }
  ]
};