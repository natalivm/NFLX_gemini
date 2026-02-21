import { StockDefinition, ScenarioType } from '../types';

export const ENVA: StockDefinition = {
  ticker: 'ENVA',
  name: 'Enova International',
  sector: 'FinTech / Lending',
  themeColor: '#3b82f6',
  currentPrice: 149.28,
  fairPriceRange: '$120 - $185',
  active: true,
  shares0: 24.8,
  rev25: 1830,
  fcfMargin25: 0.098,
  taxRate: 0.22,
  cash: 200,
  debt: 3950,
  beta: 1.49,
  costDebt: 0.072,
  unitLabel: 'Loan Portfolio',
  unit25: 3.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Grasshopper Bank & Buybacks',
  rsRating: 88,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Enova is at an inflection point. The Grasshopper Bank deal transforms it from a non-bank lender with regulatory overhang into a bank holding company with a national charter, deposit funding, and a regulatory moat. Combined with aggressive buybacks (10% of float retired) and AI-native underwriting, the stock's 9.5x forward P/E is significantly discounted vs peers.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.10, 0.08, 0.06, 0.04, 0.03],
      [ScenarioType.BASE]: [0.16, 0.14, 0.12, 0.10, 0.08],
      [ScenarioType.BULL]: [0.18, 0.16, 0.14, 0.12, 0.10]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.0833, 0.0833, 0.0833, 0.0833, 0.0833],
      [ScenarioType.BASE]: [0.098, 0.098, 0.098, 0.098, 0.098],
      [ScenarioType.BULL]: [0.10584, 0.10584, 0.10584, 0.10584, 0.10584]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 8,
      [ScenarioType.BASE]: 11,
      [ScenarioType.BULL]: 12
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Credit cycle headwinds and regulatory friction slowing originations.',
      [ScenarioType.BASE]: 'Steady execution on core lending products with moderate Grasshopper synergies.',
      [ScenarioType.BULL]: 'Explosive growth via bank charter TAM expansion and high-margin BaaS scaling.'
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
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 149.28 * 24.8 * 0.05
      }
    }
  }
};
