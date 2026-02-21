import { StockDefinition, ScenarioType } from '../types';

export const PANW: StockDefinition = {
  ticker: 'PANW',
  name: 'Palo Alto Networks',
  sector: 'Cybersecurity',
  themeColor: '#00a3e0',
  currentPrice: 166.95,
  fairPriceRange: '$140 - $250',
  active: true,
  shares0: 808.0,
  rev25: 9200,
  fcfMargin25: 0.376,
  taxRate: 0.20,
  cash: 3200,
  debt: 4883,
  beta: 1.20,
  costDebt: 0.05,
  unitLabel: 'ARR',
  unit25: 9.2,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Platformization Success',
  rsRating: 20,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Fundamentals say 'consolidation winner', but RS 20 says 'broken'. The market is punishing the friction of their free-trial platformization shift. DCF math reveals value, but institutions are in distribution mode. Avoid until the tape stabilizes.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.3196, 0.3196, 0.3196, 0.3196, 0.3196],
      [ScenarioType.BASE]: [0.376, 0.376, 0.376, 0.376, 0.376],
      [ScenarioType.BULL]: [0.4324, 0.4324, 0.4324, 0.4324, 0.4324]
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
        maOptVal: 166.95 * 808.0 * 0.07
      }
    }
  }
};
