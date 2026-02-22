import { defineStock } from './defineStock';

export const CAVA = defineStock({
  ticker: 'CAVA',
  name: 'CAVA Group, Inc.',
  sector: 'Restaurants · Fast-Casual · Mediterranean',
  themeColor: '#c8553d',
  currentPrice: 69.90,
  fairPriceRange: '$25 - $128',
  shares0: 116,
  rev25: 1421,
  fcfMargin25: 0.027,
  taxRate: 0.22,
  cash: 388,
  debt: 0,
  beta: 1.50,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 0.53,
  rsRating: 57,
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Type B+ execution-driven unit expansion growth story. 415 restaurants (+17.9% YoY), guiding 16%+ unit growth in 2026 — " +
    "unit openings are the real growth engine, not SSS. Q3'25: SSS +1.9% (price/mix, traffic ~flat), but 2-year stack ~20%, " +
    "3-year stack 34.1% — brand not breaking, just cycling tough comps in most discount-intensive macro since Great Recession. " +
    "Revenue $1.42B (2025E, +21% YoY), EBIT margin expanding 4.6% → 7.6%, EPS $0.53 (2025E) → $1.38 (2029E) = ~45% CAGR from low base. " +
    "FCF still early-stage: $39M (2025E) → $170M (2029E), explosive growth but from very low base. " +
    "Fortress balance sheet: $388M cash, zero debt, $75M undrawn revolver. No buybacks — EPS growth is pure revenue + margin expansion. " +
    "Moat is operational, not structural: Mediterranean category positioning ('health + bold flavor'), value framing (pricing under CPI/peers), " +
    "loyalty program (+36% members YoY, tiered statuses). But gross margin ~25%, zero switching costs, intense competition (Chipotle, Sweetgreen). " +
    "Tech investments: KDS in ~350 locations, TurboChef in 100% of restaurants (new proteins incl. salmon spring '26). " +
    "AGM program = higher pay, slight labor% pressure in 2026. Management ready to reinvest margin for long-term brand. " +
    "Valuation stretched: trailing P/E ~330x, fwd P/E (2025E) ~130x, 2029E P/E ~50x. RS 57 = not a momentum leader. " +
    "Key risk: multiple compression — at 25x on 2029E EPS $1.38 = $34 (-50%). Business can grow while stock doesn't. " +
    "Probability of 15%+ CAGR: ~40–50%. This is a bet on execution: unit openings, food cost control, operational discipline. " +
    "Not cycle, not tech trend, not moat. Next 3–5 years decisive: if EBIT margin doesn't reach 10%+, the multiple breaks.",

  epsCagr: [13, 27, 37],
  exitPE: [25, 35, 50],
  prob: [30, 40, 30],

  revGrowth: [
    [0.12, 0.10, 0.08, 0.07, 0.06],
    [0.18, 0.15, 0.12, 0.10, 0.09],
    [0.22, 0.20, 0.18, 0.16, 0.14],
  ],
  fcfMargin: [
    [0.025, 0.025, 0.03, 0.03, 0.03],
    [0.027, 0.035, 0.045, 0.055, 0.07],
    [0.03, 0.045, 0.06, 0.08, 0.10],
  ],
  exitMultiple: [15, 25, 35],
  desc: [
    'Revenue growth halves to ~10%, EBIT margin stagnates as discount environment persists and younger cohorts pull back. ' +
      'EPS CAGR ~13%, exit P/E compresses to 25x on valuation reset. ' +
      'FY30E EPS ~$0.98 × 25x = ~$24. CAGR ~-19%. ' +
      'Good company, bad stock — operational moat insufficient to sustain premium multiple.',
    'Unit growth ~16% sustains high-teens top-line, EBIT margin expands to ~7–8% via operational leverage. ' +
      'SSS low-to-mid single digits (traffic + mix, minimal pricing). Management reinvests margin selectively (labor, tech, loyalty). ' +
      'EPS CAGR ~27%, exit P/E 35x. FY30E EPS ~$1.75 × 35x = ~$61. CAGR ~-3%. ' +
      'Solid execution but current valuation already prices in most of the growth.',
    'Full execution: 16%+ unit growth sustained, SSS inflects to mid-single digits as macro normalizes. ' +
      'EBIT margin reaches 10%+, FCF engine scales. Mediterranean category expands TAM, loyalty deepens, new proteins drive traffic. ' +
      'EPS CAGR ~37%, exit P/E 50x (market re-rates for proven restaurant scaler). ' +
      'FY30E EPS ~$2.56 × 50x = ~$128. CAGR ~13%. Upside if multiple expansion beyond 50x.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  waccAdj: [0.015, 0, -0.01],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0.06, 0.10, 0.14],
  bullMaOptVal: false,

  driverOverrides: [
    {
      bbRate: 0,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.002,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.005,
    },
  ],
});
