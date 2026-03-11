import { FormData } from "@/context/ConsultationContext";

export interface Feature {
  icon: string;
  name: string;
  description: string;
  priority: "must" | "should" | "nice";
}

export interface Competitor {
  name: string;
  initials: string;
  domain: string;
  color: string;
  type: "Direct" | "Indirect";
  founded: number;
  weakness: string;
  yourEdge: string;
}

export interface RevenueStream {
  icon: string;
  type: string;
  description: string;
  estimate: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  color: string;
  tasks: string[];
  milestone: string;
}

export interface ConsultationResult {
  projectName: string;
  projectDescription: string;
  projectScore: number;
  whyThisProject: string[];
  demandLevel: string;
  demandPercent: number;
  marketSize: string;
  marketGrowth: string;
  monthlyRevenue: string;
  buildTime: string;
  marketOpportunity: string;
  opportunityHighlights: { icon: string; title: string; desc: string }[];
  marketValues: { icon: string; label: string; value: string }[];
  marketTrend: { year: number; value: number }[];
  features: Feature[];
  competitors: Competitor[];
  competitionLevel: string;
  competitiveAdvantage: string[];
  revenueStreams: RevenueStream[];
  pricingTiers: PricingTier[];
  revenueProjection: { month: string; revenue: number }[];
  folderStructure: string;
  techStack: string[];
  roadmap: RoadmapPhase[];
}

const marketProjects: Record<string, { name: string; desc: string }> = {
  "Tech & Software": {
    name: "DevFlow Pro",
    desc: "a developer productivity and project management platform",
  },
  "E-Commerce & Retail": {
    name: "ShopWise",
    desc: "an e-commerce analytics and inventory management tool",
  },
  Healthcare: {
    name: "MediBook Pro",
    desc: "an appointment booking and patient management SaaS tool built for small clinics",
  },
  Education: {
    name: "LearnHub",
    desc: "a modern learning management system for online educators",
  },
  "Finance & FinTech": {
    name: "PayTrack",
    desc: "a smart expense tracking and invoicing platform for freelancers",
  },
  "Food & Restaurant": {
    name: "TableReady",
    desc: "a restaurant reservation and order management system",
  },
  "Real Estate": {
    name: "PropView",
    desc: "a property listing and tenant management platform",
  },
  "Design & Creative": {
    name: "DesignForge",
    desc: "a design asset marketplace and collaboration tool",
  },
  "Social Media & Marketing": {
    name: "PostPilot",
    desc: "a social media scheduling and analytics dashboard",
  },
  "Other / General": {
    name: "BuilderKit",
    desc: "a customizable SaaS starter platform",
  },
};

export function generateConsultation(formData: FormData): ConsultationResult {
  const { skill, buildType, market, experience } = formData;
  const proj = marketProjects[market] || marketProjects["Other / General"];
  const score =
    experience === "Expert" ? 92 : experience === "Intermediate" ? 87 : 78;
  const buildTimeMap: Record<string, string> = {
    Beginner: "4-6 months",
    Intermediate: "3-4 months",
    Expert: "2-3 months",
  };

  return {
    projectName: proj.name,
    projectDescription: `${proj.name} is ${proj.desc}. Given your ${skill} skills and ${experience.toLowerCase()} experience, this is the perfect ${buildType.toLowerCase()} to build and monetize.`,
    projectScore: score,
    whyThisProject: [
      `Your ${skill} skills are perfectly suited for building this type of ${buildType.toLowerCase()}`,
      `The ${market} market has high demand and room for new entrants`,
      `Your ${experience.toLowerCase()} experience level matches the complexity of this project`,
    ],
    demandLevel: "HIGH DEMAND 🔥",
    demandPercent: 85,
    marketSize: "$4.5 Billion",
    marketGrowth: "+18% annually",
    monthlyRevenue: "$8K-25K/mo",
    buildTime: buildTimeMap[experience] || "3-4 months",
    marketOpportunity: `The ${market.toLowerCase()} market is massively underserved with most businesses still using outdated software. There is a clear gap for a modern, affordable, easy-to-use ${buildType.toLowerCase()} solution targeting this space.`,
    opportunityHighlights: [
      {
        icon: "🎯",
        title: "Underserved Market",
        desc: "Most existing solutions are outdated or overpriced",
      },
      {
        icon: "📈",
        title: "Growing Demand",
        desc: "Market growing 18% year-over-year consistently",
      },
      {
        icon: "💡",
        title: "Low Competition in Niche",
        desc: "Few modern solutions targeting small businesses",
      },
    ],
    marketValues: [
      { icon: "💰", label: "Avg. Customer LTV", value: "$840/year" },
      { icon: "👥", label: "Target Customers", value: "500K+ businesses" },
      { icon: "📈", label: "YoY Growth", value: "18%" },
    ],
    marketTrend: [
      { year: 2020, value: 2.1 },
      { year: 2021, value: 2.5 },
      { year: 2022, value: 3.0 },
      { year: 2023, value: 3.5 },
      { year: 2024, value: 4.0 },
      { year: 2025, value: 4.5 },
      { year: 2026, value: 5.3 },
    ],
    features: [
      {
        icon: "📅",
        name: "Smart Booking System",
        description: "Let users book and manage appointments online",
        priority: "must",
      },
      {
        icon: "👤",
        name: "User Profiles",
        description: "Store user history, preferences & records",
        priority: "must",
      },
      {
        icon: "📱",
        name: "SMS & Push Notifications",
        description: "Automated reminders before appointments",
        priority: "must",
      },
      {
        icon: "💳",
        name: "Online Payments",
        description: "Accept payments via Stripe integration",
        priority: "must",
      },
      {
        icon: "📊",
        name: "Analytics Dashboard",
        description: "Track bookings, revenue & user metrics",
        priority: "should",
      },
      {
        icon: "🔔",
        name: "Email Notifications",
        description: "Automated email notification system",
        priority: "should",
      },
      {
        icon: "📄",
        name: "Invoice Generator",
        description: "Auto-generate PDF invoices for transactions",
        priority: "should",
      },
      {
        icon: "🌐",
        name: "Multi-language Support",
        description: "Support multiple languages for global reach",
        priority: "nice",
      },
    ],
    competitors: [
      {
        name: "Calendly",
        initials: "CA",
        domain: "calendly.com",
        color: "#06b6d4",
        type: "Indirect",
        founded: 2013,
        weakness: "Not built for specific industries",
        yourEdge: "Industry-specific features & workflows",
      },
      {
        name: "SimplePractice",
        initials: "SP",
        domain: "simplepractice.com",
        color: "#7c3aed",
        type: "Direct",
        founded: 2012,
        weakness: "Very expensive ($70-$150/mo)",
        yourEdge: "Affordable pricing for small businesses",
      },
      {
        name: "Acuity Scheduling",
        initials: "AS",
        domain: "acuityscheduling.com",
        color: "#f59e0b",
        type: "Indirect",
        founded: 2006,
        weakness: "No client management features",
        yourEdge: "Full client history & records management",
      },
      {
        name: "Jane App",
        initials: "JA",
        domain: "jane.app",
        color: "#ec4899",
        type: "Direct",
        founded: 2012,
        weakness: "Complex UI, steep learning curve",
        yourEdge: "Simple, clean, modern interface",
      },
      {
        name: "vcita",
        initials: "VC",
        domain: "vcita.com",
        color: "#06b6d4",
        type: "Direct",
        founded: 2010,
        weakness: "Poor mobile experience",
        yourEdge: "Mobile-first responsive design",
      },
    ],
    competitionLevel: "Medium",
    competitiveAdvantage: [
      "Modern tech stack = faster development and better UX",
      "Focused on small businesses = simpler and more affordable",
      "Mobile-first design = better experience for end users",
      `Your ${skill} expertise = faster iteration and unique features`,
    ],
    revenueStreams: [
      {
        icon: "💳",
        type: "Subscription Plans",
        description: "Charge businesses monthly/yearly for access",
        estimate: "$2,000 - $15,000/month",
        difficulty: "Easy",
      },
      {
        icon: "📢",
        type: "Featured Listings",
        description: "Businesses pay to appear higher in search",
        estimate: "$500 - $3,000/month",
        difficulty: "Medium",
      },
      {
        icon: "💰",
        type: "Transaction Fees",
        description: "Take 2-3% cut on every payment processed",
        estimate: "$1,000 - $8,000/month",
        difficulty: "Medium",
      },
      {
        icon: "🏷️",
        type: "White Label / Agency",
        description: "Sell the software to agencies to resell",
        estimate: "$3,000 - $20,000/month",
        difficulty: "Hard",
      },
    ],
    pricingTiers: [
      {
        name: "FREE",
        price: "$0",
        features: [
          "1 user profile",
          "20 bookings/month",
          "Basic features",
          "Email support",
        ],
      },
      {
        name: "PRO",
        price: "$29",
        features: [
          "Unlimited bookings",
          "SMS reminders",
          "Payment processing",
          "Analytics dashboard",
          "Priority support",
        ],
        recommended: true,
      },
      {
        name: "BUSINESS",
        price: "$79",
        features: [
          "Everything in Pro",
          "Multi-user support",
          "Custom branding",
          "API access",
          "Dedicated support",
        ],
      },
    ],
    revenueProjection: [
      { month: "M1", revenue: 0 },
      { month: "M2", revenue: 200 },
      { month: "M3", revenue: 800 },
      { month: "M4", revenue: 1500 },
      { month: "M5", revenue: 2800 },
      { month: "M6", revenue: 4200 },
      { month: "M7", revenue: 6000 },
      { month: "M8", revenue: 8500 },
      { month: "M9", revenue: 11000 },
      { month: "M10", revenue: 14000 },
      { month: "M11", revenue: 18000 },
      { month: "M12", revenue: 22000 },
    ],
    folderStructure: `${proj.name.toLowerCase().replace(/\s+/g, "")}/
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Input.jsx
│   │   │   ├── 📁 layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── ItemList.jsx
│   │   │   │   └── RevenueChart.jsx
│   │   │   └── 📁 features/
│   │   │       ├── BookingForm.jsx
│   │   │       ├── CalendarView.jsx
│   │   │       └── ProfileCard.jsx
│   │   ├── 📁 pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Settings.jsx
│   │   ├── 📁 hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useData.js
│   │   ├── 📁 context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── AppContext.jsx
│   │   ├── 📁 services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   └── 📁 utils/
│   │       ├── helpers.js
│   │       └── constants.js
│   ├── package.json
│   └── vite.config.js
│
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   ├── authController.js
│   │   │   ├── bookingController.js
│   │   │   └── paymentController.js
│   │   ├── 📁 models/
│   │   │   ├── User.js
│   │   │   ├── Booking.js
│   │   │   └── Payment.js
│   │   ├── 📁 routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   └── paymentRoutes.js
│   │   ├── 📁 middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   └── 📁 config/
│   │       ├── database.js
│   │       └── stripe.js
│   ├── server.js
│   └── package.json
│
├── 📁 database/
│   └── schema.sql
├── .env.example
├── .gitignore
└── README.md`,
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
      "Twilio",
      "JWT",
      "Tailwind CSS",
    ],
    roadmap: [
      {
        phase: 1,
        title: "Foundation & Planning",
        duration: "Week 1-2",
        color: "#7c3aed",
        tasks: [
          "Define your target customer clearly",
          "Research top 3 competitors in detail",
          "Write down core 5 features (no more)",
          "Set up GitHub repository",
          "Create basic wireframes on Figma",
          "Set up project management (Notion/Trello)",
        ],
        milestone: "✅ You know exactly what you're building",
      },
      {
        phase: 2,
        title: "Design & Setup",
        duration: "Week 3-4",
        color: "#06b6d4",
        tasks: [
          "Design UI in Figma (all main screens)",
          "Set up React + Vite project",
          "Install and configure Tailwind CSS",
          "Set up folder structure (from above)",
          "Create reusable UI components",
          "Set up Node.js + Express backend",
          "Connect MongoDB database",
        ],
        milestone: "✅ Project skeleton is ready",
      },
      {
        phase: 3,
        title: "Core Development",
        duration: "Month 2",
        color: "#3b82f6",
        tasks: [
          "Build authentication (login/register/JWT)",
          "Build core booking/listing system",
          "Build user profile management",
          "Build admin dashboard",
          "Connect frontend to backend APIs",
          "Test all core features thoroughly",
          "Fix bugs and improve performance",
        ],
        milestone: "✅ Core product is working",
      },
      {
        phase: 4,
        title: "Monetization & Launch",
        duration: "Month 3",
        color: "#f59e0b",
        tasks: [
          "Integrate Stripe for subscription payments",
          "Set up 3 pricing tiers",
          "Integrate SMS reminders (Twilio)",
          "Add email notifications",
          "Write landing page copy",
          "Build marketing landing page",
          "Set up analytics (Google Analytics)",
          "Deploy backend (Railway/Render)",
          "Deploy frontend (Vercel/Netlify)",
        ],
        milestone: "✅ Product is live and accepting payments",
      },
      {
        phase: 5,
        title: "First Customers",
        duration: "Month 4",
        color: "#f59e0b",
        tasks: [
          "List on Product Hunt",
          "Post on relevant Reddit communities",
          "Reach out to 50 target businesses directly",
          "Offer free 30-day trial to first users",
          "Collect feedback from early users",
          "Fix top 5 complaints immediately",
          "Ask happy users for testimonials",
          "Set up basic customer support",
        ],
        milestone: "✅ First 10 paying customers",
      },
      {
        phase: 6,
        title: "Growth & Scale",
        duration: "Month 5-6+",
        color: "#f97316",
        tasks: [
          "Launch Google Ads campaign",
          "Start content marketing (blog/YouTube)",
          "Build affiliate program",
          "Add most-requested features",
          "Hire first customer support person",
          "Apply to startup directories",
          "Target adjacent markets",
          "Consider raising funding or bootstrapping growth",
        ],
        milestone: "✅ $1,000+ Monthly Recurring Revenue",
      },
    ],
  };
}
