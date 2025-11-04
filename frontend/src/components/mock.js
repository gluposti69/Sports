// Mock data for Safe Building Inspections website

export const mockData = {
  business: {
    name: "SAFE BUILDING INSPECTIONS",
    tagline: "know before you buy",
    phone: "0477 167 167",
    email: "info@safebuildinginspections.com.au",
    domain: "safebuildinginspections.com.au",
    address: "Melbourne, Victoria",
    serviceArea: "All of Melbourne Metropolitan Area",
    businessHours: {
      weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
      saturday: "Saturday: 8:00 AM - 4:00 PM",
      sunday: "Sunday: By Appointment Only"
    },
    credentials: [
      "VBA Registered Building Practitioner",
      "HIA Member", 
      "Over 20 Years Experience"
    ]
  },

  services: [
    {
      id: 1,
      title: "Pre-Purchase Inspections",
      description: "Comprehensive property evaluation before you buy. Protect your investment with detailed assessment conducted in accordance with AS 4349/2007 standards.",
      features: [
        "Structural integrity assessment (AS 4349/2007)", 
        "Plumbing system evaluation",
        "Detailed written report within 24 hours",
        "Photos and recommendations included",
        "Major & minor defects documented"
      ],
      duration: "1-3 hours",
      price: "From $500"
    },
    {
      id: 2,
      title: "New Home Inspections", 
      description: "Ensure your new home meets all building standards and regulations. Quality assurance for new construction projects with comprehensive water leak testing.",
      features: [
        "Building code compliance check",
        "Construction quality assessment",
        "Water leak detection and testing", 
        "Handover inspection support",
        "Builder liaison and follow-up",
        "Warranty protection guidance"
      ],
      duration: "2-4 hours",
      price: "From $500"
    },
    {
      id: 3,
      title: "Pre-Handover Inspections",
      description: "Comprehensive inspection before taking possession of your new property. Identify defects and issues before settlement.",
      features: [
        "Complete property assessment",
        "Defect identification and documentation",
        "Compliance verification",
        "Detailed defect list for builder",
        "Photo documentation included",
        "24-hour report delivery"
      ],
      duration: "2-3 hours",
      price: "From $500"
    },
    {
      id: 4,
      title: "Dilapidation Reports",
      description: "Document the current condition of your property before nearby construction or renovation work begins.",
      features: [
        "Pre-construction property condition",
        "Photographic evidence",
        "Detailed structural assessment",
        "Protect against damage claims",
        "Comprehensive condition report"
      ],
      duration: "2-3 hours",
      price: "From $350"
    },
    {
      id: 5,
      title: "Safe to Rent Reports",
      description: "Ensure rental properties meet safety and habitability standards for tenants and landlords.",
      features: [
        "Safety compliance assessment",
        "Electrical and gas safety checks",
        "Structural safety evaluation",
        "Rental regulation compliance",
        "Detailed safety report",
        "Fast 24-hour turnaround"
      ],
      duration: "1-2 hours",
      price: "From $350"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Sarah & Michael Thompson",
      location: "Brighton, VIC",
      rating: 5,
      text: "Safe Building Inspections saved us from making a costly mistake! Their thorough pre-purchase inspection revealed significant structural issues the seller hadn't disclosed. Professional, detailed, and incredibly knowledgeable.",
      date: "2025-01-15"
    },
    {
      id: 2, 
      name: "David Chen",
      location: "Camberwell, VIC",
      rating: 5,
      text: "Outstanding service for our new home inspection. The inspector was punctual, thorough, and explained everything clearly. The detailed report helped us get several defects fixed by the builder before settlement.",
      date: "2025-02-22"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      location: "Hawthorn, VIC", 
      rating: 5,
      text: "I've used Safe Building Inspections for three property purchases now. Their consistency, attention to detail, and professional reports give me complete confidence. Highly recommended!",
      date: "2025-03-18"
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
    description: "See what you'll receive with every Safe Building Inspection",
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
      description: "Detailed reports delivered within 24 hours guaranteed"
    },
    {
      icon: "Eye",
      title: "Thorough Inspections",
      description: "Comprehensive assessment using latest technology and methods"
    },
    {
      icon: "Users",
      title: "Expert Support",
      description: "Over 20 years experience with ongoing consultation included"
    }
  ]
};
