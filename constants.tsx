
import { ScenarioType, ScenarioConfig, Catalyst, TickerDefinition } from './types';

export const TICKERS: Record<string, TickerDefinition> = {
  NFLX: {
    ticker: 'NFLX',
    name: 'Netflix',
    sector: 'Digital Entertainment',
    themeColor: '#ff007f',
    currentPrice: 76.87,
    shares0: 4222,
    rev25: 45180,
    opMargin25: 0.295,
    fcfMargin25: 0.209,
    taxRate: 0.137,
    unitLabel: 'Paid Subscribers',
    unit25: 325,
    deepDive: [
      { id: 'tam', title: 'TAM Expansion', content: 'Expansion from purely licensed content to global production powerhouse, and now into live sports and gaming.' },
      { id: 'platform', title: 'Ad Flywheel', content: 'The shift to ad-supported tiers unlocks a massive lower-cost entry point while driving higher ARPU.' }
    ]
  },
  UBER: {
    ticker: 'UBER',
    name: 'Uber Technologies',
    sector: 'Mobility & Logistics',
    themeColor: '#22c55e', // Changed to green like Duolingo for better visibility
    currentPrice: 69.99,
    shares0: 2100,
    rev25: 43500,
    fcfMargin25: 0.11,
    taxRate: 0.21,
    unitLabel: 'Monthly Active Consumers',
    unit25: 155,
    deepDive: [
      { id: 'platform', title: 'Platform Network Effects', content: '15% valuation premium for winner-take-most dynamics and cross-platform synergies between Mobility and Delivery.' },
      { id: 'tam', title: 'TAM Expansion', content: 'From $100B taxi market to $1.4T global mobility, delivery, and logistics ecosystem.' }
    ]
  },
  DUOL: {
    ticker: 'DUOL',
    name: 'Duolingo',
    sector: 'EdTech',
    themeColor: '#22c55e',
    currentPrice: 112.57,
    shares0: 46.23,
    dilutedShares: 48.5,
    rev25: 748,
    fcfMargin25: 0.368,
    taxRate: 0.21,
    cash: 1100,
    debt: 0,
    unitLabel: 'Daily Active Users',
    unit25: 50,
    deepDive: [
      { id: 'tam', title: 'Total Addressable Market', content: 'Expanding from Language Learning ($50B) to Global Education ($220B+).' },
      { id: 'platform', title: 'Flywheel Effect', content: '90% organic acquisition leads to ultra-low CAC and network effects.' }
    ]
  },
  FICO: {
    ticker: 'FICO',
    name: 'Fair Isaac Corp',
    sector: 'Analytics & Scoring',
    themeColor: '#2979ff',
    currentPrice: 1344.74,
    shares0: 23.72,
    rev25: 1991,
    fcfMargin25: 0.371,
    taxRate: 0.22,
    cash: 218,
    debt: 3200,
    beta: 1.03,
    costDebt: 0.0522,
    unitLabel: 'FICO Score Pulls',
    unit25: 100,
    deepDive: [
      { id: 'tam', title: 'Score Price Penetration', content: 'Monopoly pricing power in mortgage/auto pulls with FICO 10T adoption.' },
      { id: 'platform', title: 'FICO Platform', content: 'Cloud-native decision intelligence platform with 122% NRR.' }
    ]
  }
};

export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {
  NFLX: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.12, 0.10, 0.08, 0.07, 0.06], opMargin: [0.31, 0.32, 0.33, 0.335, 0.34],
      peMultiple: [25, 24, 23, 22, 21], fcfMargin: [0.20, 0.21, 0.22, 0.22, 0.23],
      adRev: [2.5, 3.5, 4.5, 5.0, 5.5], bbSpend: [0, 0, 4, 5, 6], impact: [-3, -2, 0, 1, 2],
      desc: "Regulatory intervention or advertising disappointments."
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.138, 0.125, 0.115, 0.105, 0.095], opMargin: [0.315, 0.335, 0.355, 0.370, 0.380],
      peMultiple: [30, 30, 28, 27, 26], fcfMargin: [0.22, 0.24, 0.26, 0.27, 0.28],
      adRev: [3.0, 4.5, 6.0, 7.5, 9.0], bbSpend: [0, 0, 6, 8, 10], impact: [0, -1, 3, 5, 8],
      desc: "Steady margin expansion with buybacks resuming."
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#ff007f", bg: "bg-pink-900",
      revGrowth: [0.15, 0.14, 0.13, 0.12, 0.11], opMargin: [0.320, 0.350, 0.380, 0.400, 0.420],
      peMultiple: [35, 34, 33, 32, 30], fcfMargin: [0.24, 0.27, 0.30, 0.32, 0.34],
      adRev: [3.5, 5.5, 8.0, 10.0, 12.0], bbSpend: [0, 2, 8, 10, 12], impact: [0, 2, 6, 10, 15],
      desc: "HBO content supercharges engagement; ad platform exceeds $10B."
    }
  },
  UBER: {
    [ScenarioType.BEAR]: {
      label: "Bearish", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.10, 0.08, 0.06, 0.05, 0.04], fcfMargin: [0.07, 0.07, 0.08, 0.08, 0.09],
      desc: "Regulatory pressures, AV disruption, margin compression, minimal TAM expansion.",
      ebitdaMargin: "17-19%", waccRange: "8.5%", buybackAssumption: "$2B/yr", tamExpansionAssumption: "Limited",
      hardcodedTrajectory: [68, 73, 78, 82, 85],
      hardcodedConservative: [65, 68, 72, 76, 79]
    },
    [ScenarioType.BASE]: {
      label: "Base", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.18, 0.16, 0.15, 0.14, 0.13], fcfMargin: [0.11, 0.13, 0.15, 0.17, 0.19],
      desc: "Steady execution, moderate margin expansion, platform effects materialize.",
      ebitdaMargin: "20-23%", waccRange: "7.5%", buybackAssumption: "$3-4B/yr", tamExpansionAssumption: "Moderate",
      hardcodedTrajectory: [78, 88, 100, 112, 122],
      hardcodedConservative: [74, 82, 88, 95, 103]
    },
    [ScenarioType.BULL]: {
      label: "Bullish", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.22, 0.25, 0.24, 0.22, 0.20], fcfMargin: [0.14, 0.18, 0.25, 0.32, 0.40],
      desc: "AV dominance with partnerships, aggressive buybacks, TAM explosion.",
      ebitdaMargin: "24-27%", waccRange: "6.5%", buybackAssumption: "$5-6B/yr", tamExpansionAssumption: "Aggressive",
      hardcodedTrajectory: [92, 115, 140, 165, 185],
      hardcodedConservative: [82, 96, 108, 120, 130]
    }
  },
  DUOL: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#dc2626", bg: "bg-red-900",
      revGrowth: [0.25, 0.17, 0.12, 0.08, 0.05],
      fcfMargin: [0.28, 0.27, 0.26, 0.26, 0.27],
      termGrowth: 0.02, exitMultiple: 14, waccAdj: 0.015,
      thesis: "AI competition erodes moat; new verticals fail to scale.",
      desc: "AI competition erodes moat; new verticals fail to scale."
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#2563eb", bg: "bg-blue-900",
      revGrowth: [0.30, 0.23, 0.18, 0.15, 0.12],
      fcfMargin: [0.33, 0.34, 0.35, 0.36, 0.37],
      termGrowth: 0.03, exitMultiple: 20, waccAdj: 0,
      thesis: "Steady growth with TAM expansion into new subjects.",
      desc: "Steady growth with TAM expansion into new subjects."
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#16a34a", bg: "bg-green-900",
      revGrowth: [0.32, 0.27, 0.23, 0.20, 0.17],
      fcfMargin: [0.35, 0.37, 0.39, 0.41, 0.43],
      termGrowth: 0.04, exitMultiple: 25, waccAdj: -0.01,
      thesis: "AI moat deepens; TAM expansion to Math/Music/Chess adds $3B+ potential.",
      desc: "AI moat deepens; TAM expansion to Math/Music/Chess adds $3B+ potential."
    }
  },
  FICO: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ff1744", bg: "bg-red-900",
      revGrowth: [0.12, 0.10, 0.08, 0.06, 0.04],
      fcfGr: [0.15, 0.12, 0.10, 0.08, 0.06],
      fcfMargin: [0.35, 0.34, 0.33, 0.33, 0.32],
      termGrowth: 0.025, exitMultiple: 22, waccAdj: 0.005, bb: 800,
      thesis: "Regulatory pricing caps; VantageScore gains traction.",
      desc: "Regulatory pricing caps; VantageScore gains traction."
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#2979ff", bg: "bg-blue-900",
      revGrowth: [0.18, 0.16, 0.14, 0.12, 0.10],
      fcfGr: [0.22, 0.20, 0.17, 0.14, 0.12],
      fcfMargin: [0.37, 0.38, 0.39, 0.40, 0.41],
      termGrowth: 0.035, exitMultiple: 30, waccAdj: 0, bb: 1200,
      thesis: "Pricing power continues; FICO 10T adoption leads to 90%+ share.",
      desc: "Pricing power continues; FICO 10T adoption leads to 90%+ share."
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#00c853", bg: "bg-green-900",
      revGrowth: [0.22, 0.20, 0.18, 0.16, 0.14],
      fcfGr: [0.28, 0.25, 0.22, 0.18, 0.15],
      fcfMargin: [0.40, 0.42, 0.44, 0.46, 0.48],
      termGrowth: 0.04, exitMultiple: 38, waccAdj: -0.005, bb: 1400,
      thesis: "Mortgage Direct License outsized capture; International scoring takes off.",
      desc: "Mortgage Direct License outsized capture; International scoring takes off."
    }
  }
};

export const TICKER_CATALYSTS: Record<string, Catalyst[]> = {
  NFLX: [
    { yr: 2026, events: ["WBD merger close", "Ad revenue hit $3B"], risk: "HIGH", color: "text-red-400" },
    { yr: 2027, events: ["Gaming revenue inflects", "HBO content launch"], risk: "MEDIUM", color: "text-yellow-400" },
  ],
  UBER: [
    { yr: 2026, events: ["Ad revenue hit $1.5B", "Uber One 40M subs"], risk: "MEDIUM", color: "text-yellow-400" },
    { yr: 2027, events: ["AV Platform maturity", "$20B Buyback program realization"], risk: "LOW", color: "text-green-400" },
  ],
  DUOL: [
    { yr: 2026, events: ["Math/Music monetized", "Max Tier 25% mix"], risk: "MEDIUM", color: "text-yellow-400" },
  ],
  FICO: [
    { yr: 2026, events: ["FICO 10T mass adoption", "Software Platform ARR > 50%"], risk: "LOW", color: "text-green-400" },
  ]
};
