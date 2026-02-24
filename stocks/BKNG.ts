import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  currentPrice: 4001,
  fairPriceRange: '$5,200 - $9,000',
  shares0: 30.6,
  rev25: 26917,
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17200,
  debt: 17500,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 15,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "BKNG is a high-quality travel compounder with a dominant two-sided marketplace moat (hotels + travelers), massive scale in Europe, " +
    "algorithmic pricing, and high switching costs. Asset-light model delivers ~34% FCF margin and ~33% EBIT margin with operating leverage still expanding. " +
    "Revenue CAGR ~16% (2022-2025), EPS CAGR ~29% (boosted by margin expansion + buybacks). " +
    "At ~15-16x forward P/E the market prices it as a cyclical at trough — below the historical 16-30x range. " +
    "DCF fair value $5,800-6,700; conservative stress-test still yields ~$5,200. FCF yield ~7-8% provides downside cushion. " +
    "RS 15 = no momentum, not a breakout — this is a fundamental value-growth dip entry. " +
    "Key risks: travel macro slowdown, EU regulatory pressure, Google distribution risk, Airbnb competition. " +
    "This is 80% execution, 20% travel cycle, 0% hype.",

  analystConsensus: { rating: 'Buy', targetLow: 4495, targetMedian: 5900, targetHigh: 6700, numAnalysts: 29 },

  // Revenue growth: 2025 = $26.9B. Slowing from ~16% CAGR to 8-11% base.
  revGrowth: [
    [0.05, 0.05, 0.05, 0.05, 0.05],   // Bear: travel slowdown, growth halves
    [0.11, 0.10, 0.09, 0.08, 0.08],   // Base: natural deceleration from 16% to ~9%
    [0.13, 0.12, 0.11, 0.10, 0.09],   // Bull: sustained execution + global expansion
  ],

  // FCF margin: 2025A ~33.7%. EBIT expanding from 33% to 35%+.
  fcfMargin: [
    [0.32, 0.32, 0.32, 0.33, 0.33],   // Bear: margins plateau, no further leverage
    [0.34, 0.35, 0.36, 0.37, 0.38],   // Base: continued operating leverage
    [0.36, 0.38, 0.39, 0.40, 0.41],   // Bull: full margin expansion, scale efficiencies
  ],

  // EBITDA exit multiples: historical EV/EBITDA ~14-22x
  exitMultiple: [12, 16, 20],

  desc: [
    'Travel macro slowdown + Google/Airbnb competition erodes growth to 5%. Margin plateau at ~33% FCF. Multiple compresses to cycle-low. 5yr price ~$5,700, CAGR ~7-8%.',
    'Natural deceleration to 8-11% revenue growth, margin expansion to ~38% FCF via operating leverage + buybacks. 5yr price ~$9,000, CAGR ~17%.',
    'Sustained global booking growth, full margin expansion to 41% FCF, buyback acceleration. 5yr price ~$12,500, CAGR ~24%.',
  ],

  thesis: [
    'Macro recession hits discretionary travel. EU regulation + Google direct answers pressure take rate. Revenue growth halves, market re-rates to 15x.',
    'Execution-driven compounding: 12% FCF CAGR, stable buybacks, operating leverage. FCF yield ~7-8% + growth = 14-18% shareholder return without P/E expansion.',
    'Travel cycle extends, BKNG captures emerging market share, ads monetization scales. P/E re-rates from 16x toward 22x historical midpoint.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.33, 0.37, 0.40],
  bullMaOptVal: false,

  driverOverrides: [
    {},
    { revPrem: [0.01, 0.01, 0.01, 0.01, 0.01], fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01] },
    { revPrem: [0.015, 0.02, 0.02, 0.02, 0.02], fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015] },
  ],
});
