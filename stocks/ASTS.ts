import { StockDefinition, ScenarioType } from '../types';

export const ASTS: StockDefinition = {
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 82.49,
  fairPriceRange: '$30 - $210',
  active: true,
  shares0: 284.37,
  rev25: 18.5,
  fcfMargin25: 0.15,
  taxRate: 0.21,
  cash: 3200,
  debt: 1700,
  beta: 1.46,
  costDebt: 0.035,
  unitLabel: 'Satellites In Orbit',
  unit25: 5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Block 2 Constellation Ramp',
  rsRating: 97,
  aiImpact: 'TAILWIND',
  strategicNarrative: "ASTS is a high-conviction, asymmetric category-defining bet. Building the only space-based cellular broadband network for standard smartphones. 50+ MNO partnerships covering 3B+ subscribers and $1B+ in contracted revenue. RS 97 confirms institutional accumulation. While valuation is speculative vs current revenue, the 'Space-to-Phone' moat is deep and validated by MNO commitments.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.1275, 0.1275, 0.1275, 0.1275, 0.1275],
      [ScenarioType.BASE]: [0.15, 0.15, 0.15, 0.15, 0.15],
      [ScenarioType.BULL]: [0.1725, 0.1725, 0.1725, 0.1725, 0.1725]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 19
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Economic headwinds leading to multiple compression and slower growth.',
      [ScenarioType.BASE]: 'Market alignment with standard institutional growth expectations.',
      [ScenarioType.BULL]: 'Category-defining growth powered by AI tailwinds and operating leverage.'
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
        maOptVal: 82.49 * 284.37 * 0.07
      }
    }
  }
};
