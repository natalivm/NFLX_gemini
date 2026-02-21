import { StockDefinition, ScenarioType } from '../types';

export const WWD: StockDefinition = {
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 383.64,
  fairPriceRange: '$350 - $480',
  active: true,
  shares0: 59.9,
  rev25: 3600,
  fcfMargin25: 0.09,
  taxRate: 0.22,
  cash: 327,
  debt: 550,
  beta: 1.18,
  costDebt: 0.052,
  unitLabel: 'Actuation Systems',
  unit25: 1.0,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Safran Integration & Aftermarket',
  rsRating: 95,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Best-in-class compounder with dominant positions in aerospace actuation and industrial power controls. RS 95 confirms elite relative strength. The Safran acquisition provides significant cross-sell synergies, while AI data center infrastructure buildout creates a massive tailwind for gas turbine backup power controls.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.0765, 0.0765, 0.0765, 0.0765, 0.0765],
      [ScenarioType.BASE]: [0.09, 0.09, 0.09, 0.09, 0.09],
      [ScenarioType.BULL]: [0.1035, 0.1035, 0.1035, 0.1035, 0.1035]
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
        maOptVal: 383.64 * 59.9 * 0.07
      }
    }
  }
};
