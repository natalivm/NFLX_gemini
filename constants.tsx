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
    fcfMargin25: 0.209,
    taxRate: 0.137,
    unitLabel: 'Paid Subscribers',
    unit25: 325,
    modelType: 'PE_MULTIPLE',
    enhancementLabel: 'M&A Impact',
    deepDive: [{ id: 'platform', title: 'Ad Flywheel', content: 'Shift to ad-supported tiers unlocks a massive lower-cost entry point.' }]
  },
  UBER: {
    ticker: 'UBER',
    name: 'Uber Technologies',
    sector: 'Mobility & Logistics',
    themeColor: '#22c55e',
    currentPrice: 69.99,
    shares0: 2100,
    rev25: 43500,
    fcfMargin25: 0.11,
    taxRate: 0.21,
    unitLabel: 'Consumers',
    unit25: 155,
    modelType: 'HARDCODED_PATH',
    enhancementLabel: 'Extra DCF',
    deepDive: [{ id: 'tam', title: 'TAM Expansion', content: 'From $100B taxi market to $1.4T global mobility ecosystem.' }]
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
    unitLabel: 'Daily Active Users',
    unit25: 35,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'TAM Expansion',
    deepDive: [{ id: 'platform', title: 'Flywheel Effect', content: '90% organic acquisition leads to ultra-low CAC.' }]
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
    unitLabel: 'Scores Sold',
    unit25: 600,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Score Pricing',
    deepDive: [{ id: 'tam', title: 'Score Penetration', content: 'Monopoly pricing power in mortgage/auto pulls.' }]
  },
  TLN: {
    ticker: 'TLN',
    name: 'Talen Energy',
    sector: 'Power & Utilities',
    themeColor: '#3b82f6',
    currentPrice: 376.70,
    shares0: 45.96,
    rev25: 2430,
    fcfMargin25: 0.203,
    taxRate: 0.21,
    cash: 650,
    debt: 5800,
    unitLabel: 'GW Capacity',
    unit25: 13,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Hyperscale Premium',
    deepDive: [{ id: 'ai', title: 'AWS Nuclear PPA', content: 'Anchor deal providing ~$18B lifetime revenue.' }]
  },
  AGCO: {
    ticker: 'AGCO',
    name: 'AGCO Corporation',
    sector: 'Agriculture',
    themeColor: '#00d4aa',
    currentPrice: 140.49,
    shares0: 74.6,
    rev25: 11662,
    fcfMargin25: 0.10,
    taxRate: 0.23,
    cash: 884,
    debt: 2800,
    beta: 1.16,
    unitLabel: 'Units Sold',
    unit25: 120,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Buyback & PTx',
    deepDive: [{ id: 'ptx', title: 'PTx Trimble JV', content: 'Brand-agnostic retrofit model addressing 73% of mixed-fleet farms.' }]
  },
  DE: {
    ticker: 'DE',
    name: 'Deere & Company',
    sector: 'Machinery',
    themeColor: '#10b981',
    currentPrice: 602.92,
    shares0: 271.1,
    rev25: 45684,
    fcfMargin25: 0.098,
    taxRate: 0.22,
    cash: 5200,
    debt: 65953,
    beta: 0.78,
    costDebt: 0.0497,
    unitLabel: 'Connected Machines',
    unit25: 1.0,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Strategic Overlays',
    deepDive: [{ id: 'platform', title: 'Data Flywheel', content: '1M+ connected machines across 500M acres creates deep lock-in.' }]
  }
};

export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {
  NFLX: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.12, 0.10, 0.08, 0.07, 0.06], fcfMargin: [0.20, 0.21, 0.22, 0.22, 0.23],
      peMultiple: [25, 24, 23, 22, 21], impact: [-3, -2, 0, 1, 2],
      desc: "Regulatory intervention or advertising disappointments.",
      drivers: { niMargin: 0.20 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.138, 0.125, 0.115, 0.105, 0.095], fcfMargin: [0.22, 0.24, 0.26, 0.27, 0.28],
      peMultiple: [30, 30, 28, 27, 26], impact: [0, -1, 3, 5, 8],
      desc: "Steady margin expansion with buybacks resuming.",
      drivers: { niMargin: 0.25 }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#ff007f", bg: "bg-pink-900",
      revGrowth: [0.15, 0.14, 0.13, 0.12, 0.11], fcfMargin: [0.24, 0.27, 0.30, 0.32, 0.34],
      peMultiple: [35, 34, 33, 32, 30], impact: [0, 2, 6, 10, 15],
      desc: "HBO content supercharges engagement.",
      drivers: { niMargin: 0.28 }
    }
  },
  UBER: {
    [ScenarioType.BEAR]: {
      label: "Bearish", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.1, 0.08, 0.06, 0.05, 0.04], fcfMargin: [0.07, 0.07, 0.08, 0.08, 0.09],
      desc: "Regulatory pressures and AV disruption.",
      hardcodedTrajectory: [68, 73, 78, 82, 85], hardcodedConservative: [65, 68, 72, 76, 79]
    },
    [ScenarioType.BASE]: {
      label: "Base", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.18, 0.16, 0.15, 0.14, 0.13], fcfMargin: [0.11, 0.13, 0.15, 0.17, 0.19],
      desc: "Steady execution and platform effects.",
      hardcodedTrajectory: [78, 88, 100, 112, 122], hardcodedConservative: [74, 82, 88, 95, 103]
    },
    [ScenarioType.BULL]: {
      label: "Bullish", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.22, 0.25, 0.24, 0.22, 0.20], fcfMargin: [0.14, 0.18, 0.25, 0.32, 0.40],
      desc: "AV dominance and aggressive buybacks.",
      hardcodedTrajectory: [92, 115, 140, 165, 185], hardcodedConservative: [82, 96, 108, 120, 130]
    }
  },
  DE: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [-0.02, 0.08, 0.10, 0.07, 0.05], fcfMargin: [0.22, 0.24, 0.26, 0.27, 0.27],
      exitMultiple: 11, termGrowth: 0.02, waccAdj: 0.01,
      desc: "Prolonged ag downcycle, farmer stress.",
      drivers: { fcfBase: 4500, fcfGrowth: [0.10, 0.15, 0.12, 0.08, 0.05], tamB: [0,0,0,0,0], bbRate: 0.0, ebitdaProxy: 0.22 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [-0.02, 0.08, 0.10, 0.07, 0.05], fcfMargin: [0.22, 0.24, 0.26, 0.27, 0.28],
      exitMultiple: 14, termGrowth: 0.025, waccAdj: 0,
      desc: "Gradual cyclical recovery and software growth.",
      drivers: { fcfBase: 4500, fcfGrowth: [0.15, 0.22, 0.18, 0.12, 0.08], tamB: [50, 150, 350, 600, 900], maB: [0, 75, 175, 275, 400], plB: [25, 100, 225, 400, 625], revPrem: [0.005, 0.01, 0.015, 0.02, 0.025], bbRate: 0.035, ebitdaProxy: 0.27 }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#10b981", bg: "bg-green-900",
      revGrowth: [0.02, 0.12, 0.15, 0.12, 0.10], fcfMargin: [0.24, 0.27, 0.30, 0.32, 0.34],
      exitMultiple: 16, termGrowth: 0.035, waccAdj: -0.005,
      desc: "Strong ag recovery and autonomy adoption.",
      drivers: { fcfBase: 4500, fcfGrowth: [0.20, 0.30, 0.25, 0.15, 0.10], tamB: [100, 300, 600, 1000, 1500], bbRate: 0.045, ebitdaProxy: 0.30 }
    }
  },
  DUOL: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.25, 0.20, 0.18, 0.15, 0.12], fcfMargin: [0.30, 0.32, 0.34, 0.35, 0.36],
      exitMultiple: 20, termGrowth: 0.03, desc: "Slower AI monetization.",
      drivers: { ebitdaProxy: 0.35 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.38, 0.32, 0.28, 0.24, 0.20], fcfMargin: [0.37, 0.39, 0.42, 0.44, 0.46],
      exitMultiple: 35, termGrowth: 0.04, desc: "AI tiers drive ARPU expansion.",
      drivers: { ebitdaProxy: 0.42 }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.45, 0.40, 0.35, 0.30, 0.25], fcfMargin: [0.40, 0.45, 0.50, 0.52, 0.55],
      exitMultiple: 45, termGrowth: 0.05, desc: "English learning ubiquity.",
      drivers: { ebitdaProxy: 0.50 }
    }
  },
  FICO: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.08, 0.07, 0.06, 0.05, 0.05], fcfMargin: [0.35, 0.36, 0.37, 0.37, 0.38],
      exitMultiple: 25, termGrowth: 0.02, desc: "Regulatory pricing caps.",
      drivers: { ebitdaProxy: 0.40 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.12, 0.14, 0.15, 0.14, 0.12], fcfMargin: [0.37, 0.40, 0.42, 0.45, 0.48],
      exitMultiple: 35, termGrowth: 0.03, desc: "Scoring monopoly pricing power.",
      drivers: { ebitdaProxy: 0.50 }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#2979ff", bg: "bg-blue-900",
      revGrowth: [0.15, 0.18, 0.20, 0.20, 0.18], fcfMargin: [0.40, 0.45, 0.50, 0.55, 0.60],
      exitMultiple: 45, termGrowth: 0.04, desc: "Platform shift success.",
      drivers: { ebitdaProxy: 0.55 }
    }
  },
  TLN: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.02, 0.02, 0.02, 0.01, 0.01], fcfMargin: [0.18, 0.18, 0.19, 0.19, 0.20],
      exitMultiple: 8, termGrowth: 0.01, desc: "Regulatory PPA challenges.",
      drivers: { ebitdaProxy: 0.25 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.05, 0.08, 0.12, 0.10, 0.08], fcfMargin: [0.20, 0.25, 0.30, 0.35, 0.40],
      exitMultiple: 12, termGrowth: 0.02, desc: "AI data center nuclear deals.",
      drivers: { ebitdaProxy: 0.35 }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.10, 0.15, 0.20, 0.18, 0.15], fcfMargin: [0.25, 0.35, 0.45, 0.50, 0.55],
      exitMultiple: 16, termGrowth: 0.03, desc: "Hyperscale co-location alpha.",
      drivers: { ebitdaProxy: 0.45 }
    }
  },
  AGCO: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [-0.05, 0.02, 0.04, 0.03, 0.02], fcfMargin: [0.08, 0.08, 0.09, 0.09, 0.10],
      exitMultiple: 8, termGrowth: 0.01, desc: "Prolonged ag slump.",
      drivers: { ebitdaProxy: 0.12 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.02, 0.06, 0.08, 0.07, 0.05], fcfMargin: [0.10, 0.12, 0.14, 0.15, 0.16],
      exitMultiple: 12, termGrowth: 0.02, desc: "Retrofit tech adoption.",
      drivers: { ebitdaProxy: 0.18 }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#00d4aa", bg: "bg-green-900",
      revGrowth: [0.05, 0.10, 0.12, 0.10, 0.08], fcfMargin: [0.12, 0.15, 0.18, 0.20, 0.22],
      exitMultiple: 15, termGrowth: 0.025, desc: "Trimble JV outperformance.",
      drivers: { ebitdaProxy: 0.22 }
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
  DE: [
    { yr: 2026, events: ["Autonomy retrofit launch", "Interest rate pivot tailwind"], risk: "MEDIUM", color: "text-yellow-400" },
    { yr: 2027, events: ["Software rev hits $2B milestone", "New EV Tractor mass production"], risk: "LOW", color: "text-green-400" },
  ]
};