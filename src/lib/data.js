"use client";

import { createContext, useContext } from "react";

// ── THEME ──
export const THEME = {
  bg: "#0a0a0a",
  bgAlt: "#1a1a1a",
  surface: "rgba(20, 20, 20, 0.75)",
  surfaceSolid: "#141414",
  surfaceHover: "rgba(30, 30, 30, 0.8)",
  border: "rgba(255, 255, 255, 0.12)",
  borderSubtle: "rgba(255, 255, 255, 0.06)",
  text: "rgba(255, 255, 255, 0.9)",
  textMuted: "rgba(255, 255, 255, 0.5)",
  textFaint: "rgba(255, 255, 255, 0.25)",
  accent: "#e63926",
  accentGreen: "#4ade80",
  purple: "#a78bfa",
  pink: "#f472b6",
  cyan: "#67e8f9",
  warning: "#fbbf24",
  orange: "#fb923c",
  lime: "#a3e635",
  success: "#4ade80",
  danger: "#e63926",
  fontMono: "'Space Mono', monospace",
  fontBody: "'Space Grotesk', sans-serif",
  fontDisplay: "'Playfair Display', serif",
};

export const ThemeContext = createContext(THEME);
export function useTheme() { return useContext(ThemeContext); }

// ── CATEGORY COLORS ──
export const CAT_COLORS = {
  "Large Incumbent": "#6b8acd",
  "AI-First": "#a78bfa",
  "Specialist": "#d4a853",
  "Up-and-Coming": "#4ade80",
  "CCaaS / Contact Center": "#f472b6",
  "Managed Service": "#67e8f9",
};

export const ALL_CATEGORIES = Object.keys(CAT_COLORS);

export const AI_COLORS = {
  "AI-First": "#a78bfa",
  "AI-Forward": "#c4b5fd",
  "Leaning into AI": "#fbbf24",
  "Hybrid": "#67e8f9",
};

// ── SHARED STYLES ──
export const GLASS = {
  background: "rgba(20, 20, 20, 0.75)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: 4,
};

// ── COMPETITOR LOGO DOMAINS ──
export const LOGO_DOMAINS = {
  "Zendesk": "zendesk.com",
  "Intercom": "intercom.com",
  "Salesforce Service Cloud": "salesforce.com",
  "ServiceNow": "servicenow.com",
  "Microsoft D365": "microsoft.com",
  "HubSpot Service Hub": "hubspot.com",
  "Zoho Desk": "zoho.com",
  "Sierra": "sierra.ai",
  "Decagon": "decagon.ai",
  "Ada": "ada.cx",
  "Cognigy (NICE)": "cognigy.com",
  "Maven AGI": "mavenagi.com",
  "Crescendo AI": "crescendo.ai",
  "Gorgias": "gorgias.com",
  "Gladly": "gladly.com",
  "DevRev": "devrev.ai",
  "Helpshift": "helpshift.com",
  "Polimorphic": "polimorphic.com",
  "Kustomer": "kustomer.com",
  "Sprinklr": "sprinklr.com",
  "Front": "front.com",
  "Dixa": "dixa.com",
  "Help Scout": "helpscout.com",
  "Tidio": "tidio.com",
  "Pylon": "usepylon.com",
  "Parloa": "parloa.com",
  "Giga": "giga.ai",
  "Capacity": "capacity.com",
  "Nurix AI": "nurix.ai",
  "Synthflow AI": "synthflow.ai",
  "Five9": "five9.com",
  "Genesys": "genesys.com",
  "IBM watsonx": "ibm.com",
  "Yellow.ai": "yellow.ai",
};

// ── SLUG UTILITY ──
export function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function findCompetitorBySlug(slug) {
  return competitors.find((c) => toSlug(c.name) === slug) || null;
}

// ── COMPETITOR DATA ──
export const competitors = [
  { name: "Zendesk", category: "Large Incumbent", hq: "San Francisco, USA", revenue: 1950, revenueLabel: "$1.9B+ (est.)", aiPosture: "AI-Forward", pricingModel: "Seat + Resolution + Add-ons", resolutionPrice: 1.5, seatPrice: 115, fundingOrVal: "$10.2B (PE buyout)", founded: 2007, automationRate: "Up to 80% (unverified)", customers: 100000, aiScore: 8, marketBreadth: 10, automationDepth: 8 },
  { name: "Intercom", category: "Large Incumbent", hq: "San Francisco, USA", revenue: 400, revenueLabel: "$400M ARR", aiPosture: "AI-Forward", pricingModel: "Seat + Resolution", resolutionPrice: 0.99, seatPrice: 85, fundingOrVal: "$240M raised", founded: 2011, automationRate: "67% avg", customers: 25000, aiScore: 9, marketBreadth: 8, automationDepth: 8 },
  { name: "Salesforce Service Cloud", category: "Large Incumbent", hq: "San Francisco, USA", revenue: 8500, revenueLabel: "$8.5B (Service Cloud est.)", aiPosture: "Leaning into AI", pricingModel: "Seat-based", resolutionPrice: null, seatPrice: 165, fundingOrVal: "Public (NYSE: CRM)", founded: 1999, automationRate: "N/A", customers: 150000, aiScore: 6, marketBreadth: 10, automationDepth: 5 },
  { name: "ServiceNow", category: "Large Incumbent", hq: "Santa Clara, USA", revenue: 13300, revenueLabel: "$13.3B total rev", aiPosture: "Leaning into AI", pricingModel: "Enterprise license", resolutionPrice: null, seatPrice: null, fundingOrVal: "Public (NYSE: NOW)", founded: 2004, automationRate: "N/A", customers: 8100, aiScore: 7, marketBreadth: 9, automationDepth: 6 },
  { name: "Microsoft D365", category: "Large Incumbent", hq: "Redmond, USA", revenue: 6000, revenueLabel: "$6B+ (D365 est.)", aiPosture: "Leaning into AI", pricingModel: "Seat + Copilot Credits", resolutionPrice: null, seatPrice: 105, fundingOrVal: "Public (NASDAQ: MSFT)", founded: 1975, automationRate: "N/A", customers: null, aiScore: 7, marketBreadth: 9, automationDepth: 5 },
  { name: "HubSpot Service Hub", category: "Large Incumbent", hq: "Cambridge, USA", revenue: 2600, revenueLabel: "$2.6B total HubSpot", aiPosture: "Leaning into AI", pricingModel: "Seat + Credits", resolutionPrice: null, seatPrice: 90, fundingOrVal: "Public (NYSE: HUBS)", founded: 2006, automationRate: "50%+ claimed", customers: 228000, aiScore: 5, marketBreadth: 8, automationDepth: 4 },
  { name: "Zoho Desk", category: "Large Incumbent", hq: "Chennai, India", revenue: 1400, revenueLabel: "$1.4B (Zoho Corp)", aiPosture: "Leaning into AI", pricingModel: "Seat-based", resolutionPrice: null, seatPrice: 40, fundingOrVal: "Bootstrapped", founded: 1996, automationRate: "N/A", customers: null, aiScore: 3, marketBreadth: 7, automationDepth: 3 },
  { name: "Sierra", category: "AI-First", hq: "San Francisco, USA", revenue: 150, revenueLabel: "$100M+ ARR", aiPosture: "AI-First", pricingModel: "Outcome-based", resolutionPrice: null, seatPrice: null, fundingOrVal: "$635M / $10B val", founded: 2023, automationRate: "70%+ claimed", customers: null, aiScore: 10, marketBreadth: 5, automationDepth: 10 },
  { name: "Decagon", category: "AI-First", hq: "San Francisco, USA", revenue: 50, revenueLabel: "~$50M+ (est.)", aiPosture: "AI-First", pricingModel: "Per-conversation / resolution", resolutionPrice: null, seatPrice: null, fundingOrVal: "$100M / $1B+ val", founded: 2023, automationRate: "N/A", customers: null, aiScore: 10, marketBreadth: 4, automationDepth: 9 },
  { name: "Ada", category: "AI-First", hq: "Toronto, Canada", revenue: 70, revenueLabel: "$70.6M rev", aiPosture: "AI-First", pricingModel: "Per-resolution", resolutionPrice: 2.25, seatPrice: null, fundingOrVal: "$200M / $1.2B val", founded: 2016, automationRate: "70% (claimed)", customers: null, aiScore: 9, marketBreadth: 6, automationDepth: 9 },
  { name: "Cognigy (NICE)", category: "AI-First", hq: "Düsseldorf, Germany", revenue: 40, revenueLabel: "~$40M (pre-acq est.)", aiPosture: "AI-First", pricingModel: "Enterprise subscription", resolutionPrice: null, seatPrice: null, fundingOrVal: "Acquired $955M", founded: 2016, automationRate: "N/A", customers: null, aiScore: 9, marketBreadth: 6, automationDepth: 8 },
  { name: "Maven AGI", category: "AI-First", hq: "Boston, USA", revenue: 7, revenueLabel: "~$7M rev", aiPosture: "AI-First", pricingModel: "Enterprise custom", resolutionPrice: null, seatPrice: null, fundingOrVal: "$78M raised", founded: 2023, automationRate: "93% claimed", customers: 40, aiScore: 9, marketBreadth: 3, automationDepth: 9 },
  { name: "Crescendo AI", category: "Managed Service", hq: "San Francisco, USA", revenue: 100, revenueLabel: "$100M+ ARR (projected)", aiPosture: "AI-First", pricingModel: "Managed service", resolutionPrice: null, seatPrice: null, fundingOrVal: "$50M / $500M val", founded: 2024, automationRate: "N/A", customers: null, aiScore: 8, marketBreadth: 4, automationDepth: 8 },
  { name: "Gorgias", category: "Specialist", hq: "San Francisco, USA", revenue: 71, revenueLabel: "$69-73M ARR", aiPosture: "Hybrid", pricingModel: "Ticket + Resolution", resolutionPrice: 0.90, seatPrice: null, fundingOrVal: "$96M raised", founded: 2015, automationRate: "N/A", customers: 15000, aiScore: 6, marketBreadth: 3, automationDepth: 7 },
  { name: "Gladly", category: "Specialist", hq: "San Francisco, USA", revenue: 48, revenueLabel: "$47.7M rev", aiPosture: "Leaning into AI", pricingModel: "Seat-based", resolutionPrice: null, seatPrice: null, fundingOrVal: "$208M raised", founded: 2014, automationRate: "N/A", customers: null, aiScore: 6, marketBreadth: 3, automationDepth: 6 },
  { name: "DevRev", category: "Specialist", hq: "Palo Alto, USA", revenue: 15, revenueLabel: "~$15M (est.)", aiPosture: "AI-First", pricingModel: "Issue-based", resolutionPrice: null, seatPrice: 25, fundingOrVal: "$150M+ / $1.15B val", founded: 2020, automationRate: "N/A", customers: null, aiScore: 8, marketBreadth: 3, automationDepth: 7 },
  { name: "Helpshift", category: "Specialist", hq: "San Francisco, USA", revenue: 25, revenueLabel: "~$25M (est.)", aiPosture: "Hybrid", pricingModel: "Ticket-based", resolutionPrice: 0.90, seatPrice: null, fundingOrVal: "Acquired $75M", founded: 2011, automationRate: "N/A", customers: null, aiScore: 5, marketBreadth: 2, automationDepth: 6 },
  { name: "Polimorphic", category: "Specialist", hq: "New York, USA", revenue: 5, revenueLabel: "~$5M (est.)", aiPosture: "AI-First", pricingModel: "Population-based", resolutionPrice: null, seatPrice: null, fundingOrVal: "$28M raised", founded: 2022, automationRate: "N/A", customers: null, aiScore: 7, marketBreadth: 1, automationDepth: 7 },
  { name: "Kustomer", category: "Up-and-Coming", hq: "New York, USA", revenue: 35, revenueLabel: "~$35M (est.)", aiPosture: "AI-First", pricingModel: "Conversation-based", resolutionPrice: 0.60, seatPrice: 89, fundingOrVal: "$250M val (2023)", founded: 2015, automationRate: "N/A", customers: null, aiScore: 7, marketBreadth: 5, automationDepth: 7 },
  { name: "Sprinklr", category: "Up-and-Coming", hq: "New York, USA", revenue: 796, revenueLabel: "$796M rev", aiPosture: "Leaning into AI", pricingModel: "Seat-based", resolutionPrice: null, seatPrice: 249, fundingOrVal: "Public (NYSE: CXM)", founded: 2009, automationRate: "N/A", customers: null, aiScore: 6, marketBreadth: 7, automationDepth: 5 },
  { name: "Front", category: "Up-and-Coming", hq: "San Francisco, USA", revenue: 100, revenueLabel: "$100M ARR", aiPosture: "Leaning into AI", pricingModel: "Seat + Resolution", resolutionPrice: 0.70, seatPrice: 65, fundingOrVal: "$204M / $1.7B val", founded: 2013, automationRate: "N/A", customers: 9000, aiScore: 5, marketBreadth: 5, automationDepth: 5 },
  { name: "Dixa", category: "Up-and-Coming", hq: "Copenhagen, Denmark", revenue: 25, revenueLabel: "~$25M (est.)", aiPosture: "Leaning into AI", pricingModel: "Seat-based", resolutionPrice: null, seatPrice: 109, fundingOrVal: "$155M raised", founded: 2015, automationRate: "N/A", customers: null, aiScore: 5, marketBreadth: 4, automationDepth: 5 },
  { name: "Help Scout", category: "Up-and-Coming", hq: "Boston, USA", revenue: 36, revenueLabel: "$36M rev", aiPosture: "Leaning into AI", pricingModel: "Contacts-based", resolutionPrice: 0.75, seatPrice: null, fundingOrVal: "$14M raised", founded: 2011, automationRate: "N/A", customers: 12000, aiScore: 5, marketBreadth: 4, automationDepth: 4 },
  { name: "Tidio", category: "Up-and-Coming", hq: "San Francisco, USA", revenue: 20, revenueLabel: "~$20M (est.)", aiPosture: "Hybrid", pricingModel: "Freemium + conversation", resolutionPrice: 0.50, seatPrice: 29, fundingOrVal: "$26.8M raised", founded: 2013, automationRate: "67% (Lyro)", customers: 300000, aiScore: 5, marketBreadth: 4, automationDepth: 5 },
  { name: "Pylon", category: "Up-and-Coming", hq: "San Francisco, USA", revenue: 10, revenueLabel: "~$10M (est.)", aiPosture: "Leaning into AI", pricingModel: "Seat-based", resolutionPrice: null, seatPrice: null, fundingOrVal: "$51M raised", founded: 2022, automationRate: "N/A", customers: 780, aiScore: 6, marketBreadth: 3, automationDepth: 5 },
  { name: "Parloa", category: "AI-First", hq: "Berlin, Germany", revenue: 15, revenueLabel: "~$15M (est.)", aiPosture: "AI-First", pricingModel: "Enterprise custom", resolutionPrice: null, seatPrice: null, fundingOrVal: "$96M raised", founded: 2018, automationRate: "N/A", customers: null, aiScore: 9, marketBreadth: 4, automationDepth: 9 },
  { name: "Giga", category: "AI-First", hq: "San Francisco, USA", revenue: 10, revenueLabel: "~$10M (est.)", aiPosture: "AI-First", pricingModel: "Enterprise custom", resolutionPrice: null, seatPrice: null, fundingOrVal: "$65M raised", founded: 2023, automationRate: "N/A", customers: null, aiScore: 9, marketBreadth: 2, automationDepth: 9 },
  { name: "Capacity", category: "Up-and-Coming", hq: "St. Louis, USA", revenue: 60, revenueLabel: "$60M ARR", aiPosture: "Hybrid", pricingModel: "Mid-market subscription", resolutionPrice: null, seatPrice: null, fundingOrVal: "$155M+ raised", founded: 2017, automationRate: "N/A", customers: 19000, aiScore: 5, marketBreadth: 5, automationDepth: 5 },
  { name: "Nurix AI", category: "AI-First", hq: "Bangalore, India", revenue: 3, revenueLabel: "~$3M (est.)", aiPosture: "AI-First", pricingModel: "Enterprise custom", resolutionPrice: null, seatPrice: null, fundingOrVal: "$27.5M raised", founded: 2024, automationRate: "N/A", customers: null, aiScore: 8, marketBreadth: 2, automationDepth: 8 },
  { name: "Synthflow AI", category: "AI-First", hq: "Berlin, Germany", revenue: 8, revenueLabel: "~$8M (est.)", aiPosture: "AI-First", pricingModel: "Usage-based (minutes)", resolutionPrice: null, seatPrice: 29, fundingOrVal: "$30M raised", founded: 2023, automationRate: "N/A", customers: null, aiScore: 7, marketBreadth: 4, automationDepth: 7 },
  { name: "Five9", category: "CCaaS / Contact Center", hq: "San Ramon, USA", revenue: 1150, revenueLabel: "$1.15B rev", aiPosture: "Leaning into AI", pricingModel: "Seat + per-minute AI", resolutionPrice: null, seatPrice: null, fundingOrVal: "Public (NASDAQ: FIVN)", founded: 2001, automationRate: "N/A", customers: 3000, aiScore: 6, marketBreadth: 7, automationDepth: 5 },
  { name: "Genesys", category: "CCaaS / Contact Center", hq: "Menlo Park, USA", revenue: 2200, revenueLabel: "$2.2B Cloud ARR", aiPosture: "Leaning into AI", pricingModel: "Seat + AI consumption", resolutionPrice: null, seatPrice: null, fundingOrVal: "Private", founded: 1990, automationRate: "N/A", customers: 8000, aiScore: 7, marketBreadth: 9, automationDepth: 6 },
  { name: "IBM watsonx", category: "CCaaS / Contact Center", hq: "Armonk, USA", revenue: null, revenueLabel: "Part of IBM ($60B+)", aiPosture: "Leaning into AI", pricingModel: "Subscription + consumption", resolutionPrice: null, seatPrice: null, fundingOrVal: "Public (NYSE: IBM)", founded: 1911, automationRate: "N/A", customers: null, aiScore: 7, marketBreadth: 6, automationDepth: 6 },
  { name: "Yellow.ai", category: "AI-First", hq: "San Mateo, USA", revenue: 80, revenueLabel: "$79.5M rev", aiPosture: "Hybrid", pricingModel: "Enterprise custom", resolutionPrice: null, seatPrice: null, fundingOrVal: "$102M+ raised", founded: 2016, automationRate: "N/A", customers: 1100, aiScore: 7, marketBreadth: 7, automationDepth: 7 },
];
