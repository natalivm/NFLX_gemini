import { StockDefinition, ScenarioType } from '../types';

export const FICO: StockDefinition = {
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1344.74,
  fairPriceRange: '$1150 - $1780',
  active: true,
  shares0: 23.72,
  rev25: 1991,
  fcfMargin25: 0.37,
  taxRate: 0.22,
  cash: 218,
  debt: 3200,
  beta: 1.03,
  costDebt: 0.055,
  unitLabel: 'Scores',
  unit25: 600,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Platform pricing power',
  rsRating: 16,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Pricing power bubble bursting. RS 16 reflects the end of the score monopoly's safe-haven status. Big money is exiting as alternatives and regulatory headwinds for credit analytics gain momentum. A core distribution candidate.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.05, 0.04, 0.04, 0.03, 0.03],
      [ScenarioType.BASE]: [0.08, 0.08, 0.07, 0.07, 0.06],
      [ScenarioType.BULL]: [0.11, 0.10, 0.09, 0.08, 0.08]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.3145, 0.3145, 0.3145, 0.3145, 0.3145],
      [ScenarioType.BASE]: [0.37, 0.37, 0.37, 0.37, 0.37],
      [ScenarioType.BULL]: [0.3885, 0.3885, 0.3885, 0.3885, 0.3885]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 24,
      [ScenarioType.BASE]: 28,
      [ScenarioType.BULL]: 32
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
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 1344.74 * 23.72 * 0.07
      }
    }
  }
};
