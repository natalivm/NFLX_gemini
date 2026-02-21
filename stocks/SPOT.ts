import { StockDefinition, ScenarioType } from '../types';

export const SPOT: StockDefinition = {
  ticker: 'SPOT',
  name: 'Spotify Technology S.A.',
  sector: 'Interactive Media / Audio',
  themeColor: '#C5A572',
  currentPrice: 469.88,
  fairPriceRange: '$380 - $610',
  active: true,
  shares0: 206,
  rev25: 19800,
  fcfMargin25: 0.174,
  taxRate: 0.17,
  cash: 9500,
  debt: 3360,
  beta: 1.35,
  costDebt: 0.042,
  unitLabel: 'Premium Subs (M)',
  unit25: 290,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Audio TAM & M&A Option',
  rsRating: 12,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Spotify faces an existential 'synthetic content' risk. LLM-generated music could saturate the catalog, potentially diluting human artist value and complicating royalty negotiations. The market (RS 12) is weighing this disruption against record gross margins and a superior personalization engine.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.12, 0.10, 0.08, 0.06, 0.04],
      [ScenarioType.BASE]: [0.16, 0.15, 0.14, 0.13, 0.12],
      [ScenarioType.BULL]: [0.19, 0.18, 0.17, 0.16, 0.15]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.15, 0.15, 0.15, 0.15, 0.15],
      [ScenarioType.BASE]: [0.174, 0.174, 0.174, 0.174, 0.174],
      [ScenarioType.BULL]: [0.1914, 0.1914, 0.1914, 0.1914, 0.1914]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 14,
      [ScenarioType.BASE]: 17,
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
        maOptVal: 469.88 * 206 * 0.07
      }
    }
  }
};
