import { StockDefinition, ScenarioType } from '../types';

export const EME: StockDefinition = {
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 811.44,
  fairPriceRange: '$500 - $1200',
  active: true,
  shares0: 44.7,
  rev25: 17200,             // Revenue 2025E ($M); Q3'25 +16.4% YoY
  fcfMargin25: 0.058,       // ~5.8% FCF margin
  taxRate: 0.245,
  cash: 650,
  debt: 800,
  beta: 1.08,
  costDebt: 0.052,
  baseEps: 25.0,            // 2025E EPS guidance ~$25.0–25.75
  unitLabel: 'RPO ($B)',
  unit25: 12.6,             // Record RPO $12.6B (+29% YoY), 80% DC-driven organic
  modelType: 'EPS_PE',
  enhancementLabel: 'DC Buildout + M&A + Operational Leverage',
  rsRating: 93,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Type B cyclical growth industrial with strengthening structural tailwinds. " +
    "Q3'25 confirmed operating margin 9.1–9.4% as new baseline (rolling 12–24mo view). " +
    "RPO at record $12.6B (+29% YoY), 80% of RPO growth in data centers — organic, not M&A. " +
    "Hyperscaler clients engaging directly, validating EME's positioning in AI DC buildout chain. " +
    "Management guides organic growth at high single / low double digits — disciplined, not promotional. " +
    "Capital allocation balanced: ~$430M buybacks + ~$900M M&A in 9M'25; UK exit (~$500M rev, ~$0.45 EPS) sharpens US focus. " +
    "Operational moat via VDC/BIM/prefab productivity and field leadership, not pricing power. " +
    "Electrical segment headwinds (intangible amort ~90bps + new-geo workforce investment) are controlled, R&D-like costs. " +
    "Probability of 15%+ CAGR from current price: ~30–40%. " +
    "Key risk: valuation compression + cycle normalization can erase 2–3 years of EPS growth even if execution continues.",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 7,       // 5–8% range midpoint
      [ScenarioType.BASE]: 14,      // 12–14% range, upper end (post-call upgrade)
      [ScenarioType.BULL]: 17,      // 16–18% range midpoint
    },
    exitPE: {
      [ScenarioType.BEAR]: 18,      // 16–20x range midpoint
      [ScenarioType.BASE]: 24,      // 22–26x range midpoint
      [ScenarioType.BULL]: 27,      // 25–28x range midpoint
    },
    prob: {
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 40,
      [ScenarioType.BULL]: 35,      // Higher bull weight post-call (RPO strength + DC visibility)
    },
    revGrowth: {
      // Revenue growth for display/yield calculations
      [ScenarioType.BEAR]: [0.08, 0.05, 0.03, -0.02, 0.03],
      [ScenarioType.BASE]: [0.14, 0.10, 0.09, 0.08, 0.07],
      [ScenarioType.BULL]: [0.16, 0.14, 0.12, 0.10, 0.10],
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.048, 0.045, 0.042, 0.040, 0.042],
      [ScenarioType.BASE]: [0.058, 0.058, 0.060, 0.060, 0.060],
      [ScenarioType.BULL]: [0.060, 0.062, 0.065, 0.068, 0.070],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035,
    },
    exitMultiple: {
      // EBITDA multiples for interface compatibility (not primary for EPS_PE)
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 20,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'Cycle cools. DC capex wave decelerates, revenue growth drops to ~4–5% organic. ' +
        'Operating leverage weakens, margin drifts toward 8%. P/E compresses from ~32x to 18x. ' +
        'EPS CAGR 5–8%, 2030 EPS ~$35 × 18x = ~$630 target. CAGR ~-3% to flat. ' +
        'Compression alone can erase 2–3 years of EPS growth.',
      [ScenarioType.BASE]:
        'DC buildout continues at moderate pace. Organic growth high single / low double (per mgmt guide). ' +
        'Operating margin holds 9.1–9.4% baseline. M&A adds incremental 2–3% rev. P/E contracts to 24x. ' +
        'EPS CAGR 12–14%, 2030 EPS ~$48 × 24x = ~$1150 target. CAGR ~7–8%. ' +
        'Solid execution but hurdle rate missed at current valuation.',
      [ScenarioType.BULL]:
        'AI DC supercycle extends 4–5 years. RPO stays elevated, organic growth sustains low double digits. ' +
        'M&A execution flawless (no margin degradation). Margin expands toward 10%+. ' +
        'EPS CAGR 16–18%, 2030 EPS ~$55 × 27x = ~$1480 target. CAGR ~13%. ' +
        'Requires no cycle downturn + continued hyperscaler engagement + M&A discipline.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,          // Minimal buybacks in downturn
        ebitdaProxy: 0.08,      // Op margin drifts to ~8%
      },
      [ScenarioType.BASE]: {
        revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
        fcfUplift: [0.003, 0.003, 0.005, 0.005, 0.005],
        bbRate: 0.01,           // Balanced allocation: buybacks + M&A
        ebitdaProxy: 0.10,      // Op margin 9.1–9.4% + D&A
      },
      [ScenarioType.BULL]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
        bbRate: 0.015,          // Higher buybacks from stronger FCF
        ebitdaProxy: 0.12,      // Margin expansion toward 10%+ op margin
        maOptVal: 811.44 * 44.7 * 0.04,  // M&A optionality (~$1.45B)
      },
    },
  },
};
