import { StockDefinition, ScenarioType } from '../types';

export const CEG: StockDefinition = {
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  currentPrice: 288.43,
  fairPriceRange: '$210 - $410',
  active: true,
  shares0: 312.3,
  rev25: 25200,
  fcfMargin25: 0.097,
  taxRate: 0.255,
  cash: 4500,
  debt: 19900,
  beta: 1.83,
  costDebt: 0.0525,
  unitLabel: 'GW Capacity',
  unit25: 55,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Nuclear AI PPA',
  rsRating: 23,
  aiImpact: 'TAILWIND',
  strategicNarrative: "The tape is currently broken. RS 23 reflects a massive institutional rotation away from the 'Nuclear AI' trade as valuation reach peaked and regulatory delays weighed on sentiment. While the fundamental scarcity of carbon-free baseload power remains a decade-long tailwind, the stock is currently in deep distribution. Wait for a technical turn.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.08245, 0.08245, 0.08245, 0.08245, 0.08245],
      [ScenarioType.BASE]: [0.097, 0.097, 0.097, 0.097, 0.097],
      [ScenarioType.BULL]: [0.11155, 0.11155, 0.11155, 0.11155, 0.11155]
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
        maOptVal: 288.43 * 312.3 * 0.07
      }
    }
  }
};
