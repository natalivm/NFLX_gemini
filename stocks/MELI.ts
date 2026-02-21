import { StockDefinition, ScenarioType } from '../types';

export const MELI: StockDefinition = {
  ticker: 'MELI',
  name: 'MercadoLibre',
  sector: 'E-Commerce / Fintech',
  themeColor: '#f59e0b',
  currentPrice: 2035,
  fairPriceRange: '$2,100 - $3,800',
  active: true,
  shares0: 50.4,
  rev25: 28500,
  fcfMargin25: 0.085,
  taxRate: 0.20,
  cash: 4500,
  debt: 5800,
  beta: 1.35,
  costDebt: 0.065,
  unitLabel: 'Unique Buyers (M)',
  unit25: 110,
  modelType: 'EPS_PE',
  baseEps: 40.41,
  rsRating: 22,
  aiImpact: 'TAILWIND',
  strategicNarrative: "LATAM e-commerce and fintech compounder in deliberate margin-investment mode. RS 22 reflects market skepticism over Q3'25 EPS miss (-11.2%), but FCF beat +116% signals the cash machine is intact. Structural moat is infrastructure-grade — logistics, payments, lending, and marketplace flywheel with 100M annual buyers and 61M fintech MAU. Qualified buy for long-horizon investors willing to hold through EPS volatility.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.30, 0.22, 0.18, 0.15, 0.12],
      [ScenarioType.BASE]: [0.397, 0.34, 0.29, 0.276, 0.256],
      [ScenarioType.BULL]: [0.42, 0.38, 0.34, 0.30, 0.28]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.06, 0.065, 0.07, 0.075, 0.08],
      [ScenarioType.BASE]: [0.075, 0.085, 0.095, 0.10, 0.11],
      [ScenarioType.BULL]: [0.09, 0.10, 0.12, 0.13, 0.14]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 20
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.01
    },
    epsCagr: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 20,
      [ScenarioType.BULL]: 25
    },
    exitPE: {
      [ScenarioType.BEAR]: 30,
      [ScenarioType.BASE]: 38,
      [ScenarioType.BULL]: 45
    },
    prob: {
      [ScenarioType.BEAR]: 30,
      [ScenarioType.BASE]: 45,
      [ScenarioType.BULL]: 25
    },
    desc: {
      [ScenarioType.BEAR]: 'Deceleration + multiple compression. Revenue growth halves, P/E re-rates to 30x on extended margin investment period.',
      [ScenarioType.BASE]: 'Execution holds, margin delay. Revenue growth follows TIKR consensus curve, credit card cohort maturation begins showing in 2027.',
      [ScenarioType.BULL]: 'Margin inflection + re-rating. Fintech and logistics flywheel accelerates, cost/shipment efficiencies compound, P/E expands on earnings beats.'
    },
    thesis: {
      [ScenarioType.BEAR]: 'Extended investment mode depresses EPS for 4-8 more quarters while competition intensifies in Brazil. Market loses patience.',
      [ScenarioType.BASE]: 'Management executes on the reinvestment playbook. Margins recover gradually as credit card cohorts mature and shipping costs decline.',
      [ScenarioType.BULL]: 'LATAM e-commerce penetration accelerates, fintech dominance deepens, and operating leverage inflects — driving both earnings beats and multiple expansion.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.12
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.015, 0.015, 0.02],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.015],
        bbRate: 0.01,
        ebitdaProxy: 0.18
      },
      [ScenarioType.BULL]: {
        revPrem: [0.02, 0.025, 0.03, 0.03, 0.03],
        fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.03],
        bbRate: 0.015,
        ebitdaProxy: 0.25,
        maOptVal: 2035 * 50.4 * 0.05
      }
    }
  }
};
