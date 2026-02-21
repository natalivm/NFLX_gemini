import { StockDefinition, ScenarioType } from '../types';

export const PANW: StockDefinition = {
  ticker: 'PANW',
  name: 'Palo Alto Networks',
  sector: 'Cybersecurity',
  themeColor: '#00a3e0',
  currentPrice: 149.0,
  fairPriceRange: '$160 - $230',
  active: true,
  shares0: 697.0,
  rev25: 9200,
  fcfMargin25: 0.37,
  taxRate: 0.20,
  cash: 7900,
  debt: 5500,
  beta: 1.20,
  costDebt: 0.05,
  unitLabel: 'NGS ARR',
  unit25: 6.3,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Platformization + AI Security',
  rsRating: 20,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Q2 FY2026: beat estimates (NGS ARR +33% to $6.3B, RPO +23%), but FY2026 EPS guidance lowered to $3.65–3.70 from $3.80 due to CyberArk + Chronosphere integration costs. Platform is working — 1,550 platformized customers, 119% NRR, SASE ARR >$1.5B (+40%). CyberArk deal (closed Feb 11) adds Identity as 4th pillar; Chronosphere adds observability. Stock -18% over 52 weeks (RS ~20). Tape is broken — wait for integration clarity and RS recovery before adding.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      // FY2025 base: $9.2B. FY2026 guidance: $11.28–11.31B (+23% incl. M&A).
      // Consensus path: FY27E $13.1B, FY28E $14.9B, FY29E $16.3B, FY30E $18.2B
      [ScenarioType.BEAR]: [0.12, 0.09, 0.07, 0.05, 0.05],
      [ScenarioType.BASE]: [0.23, 0.16, 0.14, 0.09, 0.12],
      [ScenarioType.BULL]: [0.27, 0.20, 0.17, 0.13, 0.13]
    },
    fcfMargin: {
      // FY2026 guidance: 37% adj. FCF margin. Target 40%+ by FY2028.
      [ScenarioType.BEAR]: [0.28, 0.28, 0.30, 0.30, 0.30],
      [ScenarioType.BASE]: [0.37, 0.37, 0.39, 0.40, 0.40],
      [ScenarioType.BULL]: [0.40, 0.41, 0.43, 0.44, 0.45]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 20
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Integration friction from CyberArk/Chronosphere weighs on growth; SaaS sector rotation persists. Organic deceleration offsets M&A contribution.',
      [ScenarioType.BASE]: 'Consensus path: M&A integration on track, NGS ARR sustains ~30%+ growth, FCF margins hold 37-40%. Platformization drives durable revenue at scale.',
      [ScenarioType.BULL]: 'Agentic AI security becomes enterprise standard; CyberArk identity + Cortex XSIAM unlock cross-sell at scale. NGS ARR targets $20B by FY2030 achieved.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.15
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.015,
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.03,
        ebitdaProxy: 0.35,
        maOptVal: 149.0 * 697.0 * 0.07
      }
    }
  }
};
