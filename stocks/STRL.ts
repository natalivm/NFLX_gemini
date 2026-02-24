import { defineStock } from './defineStock';

export const STRL = defineStock({
  ticker: 'STRL',
  name: 'Sterling Infrastructure, Inc.',
  sector: 'Infrastructure Services · E-Infrastructure & Transportation',
  themeColor: '#e67e22',
  currentPrice: 189,
  fairPriceRange: '$130 - $280',
  shares0: 30.5,               // ~30.5M shares outstanding
  rev25: 2100,                 // FY2025 revenue ($M)
  fcfMargin25: 0.072,          // ~7.2% FCF margin
  taxRate: 0.24,
  cash: 90,
  debt: 580,
  beta: 1.15,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 6.50,               // Trailing EPS FY2025

  rsRating: 80,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Sterling Infrastructure is a diversified infrastructure play across three segments — E-Infrastructure (~53% of revenue, serving data centers, renewables, and manufacturing), " +
    "Transportation Solutions (~27%, heavy highway and aviation), and Building Solutions (~20%, residential and commercial plumbing/concrete). " +
    "E-Infrastructure is the growth engine: data center and reshoring demand is driving double-digit organic growth with structurally higher margins than legacy segments. " +
    "Backlog is near record levels, and management is executing well on margin expansion across all three segments. " +
    "The risk: at ~29x forward P/E, the stock already prices in continued E-Infrastructure outperformance. " +
    "If data center capex slows or margins mean-revert, the multiple compresses sharply. " +
    "40-50% probability of 15%+ CAGR — needs E-Infrastructure cycle to extend for the valuation to work from here.",

  // ── EPS/PE Scenarios ──
  epsCagr: [8, 14, 18],        // bear: E-Infra slows; base: steady growth; bull: supercycle
  exitPE: [18, 24, 30],        // bear: industrial re-rate; base: quality infra; bull: premium growth
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Buy', targetLow: 155, targetMedian: 210, targetHigh: 260, numAnalysts: 8 },
  revGrowth: [
    [0.12, 0.05, 0.03, 0.02, 0.01],   // Bear: E-Infra demand normalizes, Transportation flat
    [0.15, 0.12, 0.10, 0.08, 0.07],   // Base: E-Infra stays strong, steady margin expansion
    [0.18, 0.15, 0.13, 0.11, 0.09],   // Bull: Data center + reshoring supercycle across all segments
  ],
  fcfMargin: [
    [0.065, 0.060, 0.055, 0.050, 0.050],   // Bear: margin compression, mix shift to lower-margin work
    [0.072, 0.080, 0.085, 0.090, 0.095],   // Base: E-Infra mix improves overall margins
    [0.080, 0.090, 0.100, 0.105, 0.110],   // Bull: E-Infra at scale + operational leverage
  ],
  termGrowth: [0.015, 0.025, 0.030],
  exitMultiple: [8, 12, 15],
  bbRate: [0.003, 0.008, 0.012],     // Modest buybacks — growth-focused capital allocation
  ebitdaProxy: [0.12, 0.15, 0.18],   // EBITDA margins expanding with E-Infra mix shift
  bullMaOptVal: 189 * 30.5 * 0.04,   // M&A optionality in fragmented infrastructure market

  desc: [
    'E-Infrastructure demand normalizes as data center capex cycles down. Transportation and Building Solutions provide stability but limited growth. ' +
      'Margins drift lower as the high-margin E-Infra mix shrinks. The market re-rates Sterling as an ordinary industrial at 18x. ' +
      'Earnings grow at roughly 8% annually but multiple compression drives flat to negative returns from current entry.',
    'E-Infrastructure growth continues at a healthy pace driven by ongoing data center buildouts and reshoring demand. ' +
      'Transportation benefits from federal infrastructure spending and Building Solutions holds steady. ' +
      'Margins expand as E-Infra mix increases. The market values Sterling as a quality infrastructure operator at 24x. ' +
      'Earnings compound at roughly 14% annually, delivering moderate returns from current entry.',
    'A data center and manufacturing reshoring supercycle drives accelerated E-Infrastructure growth well above expectations. ' +
      'All three segments benefit from broad infrastructure spending. Margins expand meaningfully as E-Infra at scale delivers operating leverage. ' +
      'The market pays a 30x premium for execution and secular growth visibility. ' +
      'Earnings compound at roughly 18% annually, delivering strong double-digit returns from current entry.',
  ],

  thesis: [
    'E-Infrastructure is cyclical, not structural — data center capex will normalize as hyperscaler spending matures. ' +
      'At 29x forward P/E, any deceleration in the highest-margin segment triggers a double whammy of earnings miss + multiple compression. ' +
      'Transportation and Building Solutions are low-growth, low-margin segments that can\'t offset E-Infra weakness. ' +
      'Infrastructure spending is politically dependent and vulnerable to budget cuts.',
    'Sterling is well-positioned across the three major infrastructure themes — digital (data centers), energy transition (renewables), and reshoring (manufacturing). ' +
      'E-Infrastructure mix shift is structurally improving margins and the backlog provides multi-quarter visibility. ' +
      'Management execution has been strong with consistent beat-and-raise quarters. ' +
      'At 14% EPS CAGR and 24x exit, returns are moderate from current entry — needs a pullback to ~$150-165 for a compelling risk/reward.',
    'Sterling as the pure-play E-Infrastructure beneficiary of the AI/data center buildout and manufacturing reshoring megatrends. ' +
      'All three segments firing on all cylinders with transportation benefiting from IIJA spending and building solutions from housing recovery. ' +
      'Margin expansion runway is significant as E-Infra scales and operational efficiencies compound. ' +
      'If the infrastructure supercycle extends, current valuation is justified and meaningful upside remains.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.008, 0.008],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.012],
    },
  ],
});
