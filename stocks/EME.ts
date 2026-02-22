import { StockDefinition, ScenarioType } from '../types';

export const EME: StockDefinition = {
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 811.44,
  fairPriceRange: '$560 - $1350',
  active: true,
  shares0: 44.7,
  rev25: 17200,             // Revenue 2025E ($M); Q3'25 +16.4% YoY
  fcfMargin25: 0.058,       // ~5.8% FCF margin
  taxRate: 0.245,
  cash: 650,
  debt: 800,
  beta: 1.08,
  costDebt: 0.052,
  baseEps: 25.4,            // 2025E EPS midpoint guidance ($25.0–25.75)
  unitLabel: 'RPO ($B)',
  unit25: 12.6,             // Record RPO $12.6B (+29% YoY), 80% DC-driven organic
  modelType: 'EPS_PE',
  enhancementLabel: 'DC Buildout + Productivity Moat + M&A',
  rsRating: 93,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "B+ quality cyclical grower with semi-structural productivity moat. " +
    "Data centers now ~24–25% of revenue and growing — not sectoral noise but a systemic factor for consolidated revenue/margin. " +
    "Hyperscaler demand visibility extends to 2031 (gas turbines sold out until 2031); qualitative signal, not contracted, but materially lowers short-cycle cliff risk. " +
    "Triple execution moat: (1) labor — union recruitment/redeployment via hall, lower workforce-stuck risk; " +
    "(2) productivity — prefab/VDC/BIM investment, CapEx CAGR 28–30% vs revenue 14–15%, rev growth ~3x headcount growth; " +
    "(3) customer intimacy — hyperscalers directly 'want us on the journey'. " +
    "Margin sustainability backed by structural productivity, not just hot demand; operating margin 9.1–9.4% baseline confirmed. " +
    "Downturn playbook clear: if DC falls 50% → ~-12.5% revenue; variable labor (union) + ROI focus + 3-year payback prefab = managed downside. " +
    "RPO at record $12.6B (+29% YoY), 80% DC-driven organic. Capital allocation balanced: reinvestment (M&A + organic) vs shareholder returns ~50/50. " +
    "Probability-weighted expected CAGR from current price: ~6–7% at most likely 24x exit P/E. " +
    "Probability of 15%+ CAGR: ~35–45%, requires entry not at peak multiple or DC cycle continuation to 2031. " +
    "Good company, not cheap entry. Entry for 15% CAGR needs ~$560–665 (base/bull). " +
    "Key risk: valuation compression — even strong EPS growth yields mediocre CAGR if P/E compresses to 18x.",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 7,       // DC slows, margin compresses to ~8–8.5%
      [ScenarioType.BASE]: 13,      // DC normalizes but holds, margin 9–9.4%, organic ~9–11%
      [ScenarioType.BULL]: 17,      // DC continues high-teens, margin 9.5–10%+, M&A flawless
    },
    exitPE: {
      [ScenarioType.BEAR]: 18,      // Market re-rates EME as ordinary industrial (25% weight)
      [ScenarioType.BASE]: 24,      // Quality cyclical growth, not structural compounder (50% weight)
      [ScenarioType.BULL]: 28,      // Market sustains premium for DC visibility + execution (25% weight)
    },
    prob: {
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 50,      // 24x most likely exit — quality cyclical, not compounder
      [ScenarioType.BULL]: 25,      // 28x requires sustained DC cycle + risk-on market
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
        'DC slows (50% drop = ~-12.5% rev). Variable union labor absorbs some pain, but margin drifts to ~8–8.5%. ' +
        'Market re-rates EME as ordinary industrial: 18x exit. ' +
        'EPS CAGR ~7%, 2030E EPS ~$35.6 × 18x = ~$641. CAGR ~-4.7%. ' +
        'Downside driven by multiple compression, not bankruptcy risk. Managed but painful.',
      [ScenarioType.BASE]:
        'DC normalizes but holds. Organic high-single / low-double. Margin in 9–9.4% band (productivity-backed, not just demand). ' +
        'Capital allocation 50/50 reinvestment vs returns. 24x exit — quality cyclical, not compounder. ' +
        'EPS CAGR ~13%, 2030E EPS ~$46.8 × 24x = ~$1,123. CAGR ~6.7%. ' +
        'Good company, not cheap entry at current price. Entry ~$560 needed for 15% CAGR.',
      [ScenarioType.BULL]:
        'AI DC supercycle extends to 2031 (Baird visibility signal). Organic sustains low-double. ' +
        'Productivity moat (prefab/VDC/BIM: rev growth 3x headcount) drives margin toward 10%+. ' +
        'M&A flawless. Hyperscalers deepen partnership. 28x exit — market pays premium for execution + visibility. ' +
        'EPS CAGR ~17%, 2030E EPS ~$55.7 × 28x = ~$1,560. CAGR ~13.9%. ' +
        'Even bull at 24x exit gives only ~10.4%. 15%+ needs entry ~$665 or sustained 28x.',
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
        bbRate: 0.015,          // Not core driver — balanced 50/50 reinvest vs returns
        ebitdaProxy: 0.12,      // Margin toward 10%+, productivity-backed (prefab/VDC/BIM)
        maOptVal: 811.44 * 44.7 * 0.04,  // M&A optionality (~$1.45B)
      },
    },
  },
};
