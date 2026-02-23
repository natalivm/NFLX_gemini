import { defineStock } from './defineStock';

export const AMAT = defineStock({
  ticker: 'AMAT',
  name: 'Applied Materials, Inc.',
  sector: 'Semiconductor Equipment · Deposition & Etch',
  themeColor: '#1a5f7a',
  currentPrice: 366,
  fairPriceRange: '$210 - $750',
  shares0: 800,           // ~800M diluted shares (market cap ~$293B / $366)
  rev25: 28370,           // FY25 revenue $28.37B
  fcfMargin25: 0.20,      // FCF $5.7B / rev $28.37B ≈ 20%
  taxRate: 0.12,
  cash: 6500,
  debt: 5000,
  beta: 1.25,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 11.1,          // FY26E calibrated after Q1'26 actuals ($2.38) + Q2 guide ($2.64 mid)
  rsRating: 97,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "AMAT is the largest semiconductor equipment company by revenue — dominant in CVD, PVD, ALD, and etch with 49% gross margins and an AGS services segment (~25% of revenue) that is genuinely recurring: 2/3 under multi-year contracts (~2.9yr avg), ~90% renewal rate, growing 12-15% YoY. " +
    "Q1 FY26 beat at $2.38 EPS and Q2 guided to $2.64 mid; equipment segment growing >20% in CY2026 with momentum extending into 2027. Equipment gross margin is ~54% — high-quality, compounding moat. " +
    "The structural AI tailwind is more visible post-Q1: gate-all-around at 2nm, HBM, and advanced packaging all intensify deposition/etch steps. " +
    "But the business remains WFE-cycle dependent — ICAPS flat, NAND modest, China mix (30% of revenue) is a gross margin headwind. Near-term FCF is compressed by EPIC capacity capex. " +
    "At 33x forward P/E, you are paying full price for the supercycle. Prob-weighted 5-year return is ~5-7% — well below 15% hurdle. " +
    "Probability of achieving 15%+ CAGR from current levels: ~30-35% (improved post-Q1 visibility, still valuation-constrained). Best entry below $300.",

  epsCagr: [5, 11, 17],
  exitPE: [17, 23, 29],
  prob: [30, 45, 25],

  revGrowth: [
    [0.04, 0.02, 0.03, 0.04, 0.04],  // bear: cycle breaks early, ICAPS/NAND drag
    [0.12, 0.11, 0.09, 0.08, 0.07],  // base: CY26-27 strong, then normalization
    [0.20, 0.18, 0.15, 0.13, 0.11],  // bull: AI supercycle, cleanroom adds capacity
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.19],  // bear: capex drag persists, margin pressure
    [0.19, 0.20, 0.21, 0.22, 0.22],  // base: FCF rebounds 2027-28 as EPIC capex normalizes
    [0.21, 0.23, 0.24, 0.25, 0.26],  // bull: volume leverage + services attach
  ],
  exitMultiple: [14, 21, 27],
  desc: [
    'The WFE cycle breaks ahead of schedule — TSMC or Samsung guides capex down, NAND stays depressed, and the China mix becomes a margin drag without the offsetting volume. ' +
      'EPIC capacity investments weigh on FCF while revenue growth disappoints. ' +
      'EPS grows at only 5% annually from the FY26 base, and with P/E derating from 33x toward 17x (historical mid-floor), this scenario implies roughly -7% to -10% annualized returns. A stress-test to $210 is realistic if EPS also compresses.',
    'CY2026-2027 are solid as the >20% equipment growth management guided plays out. ' +
      'AGS grows at 12-13% YoY with 90% contract renewal providing an earnings floor. Gate-all-around and HBM support sustained deposition intensity at leading nodes. ' +
      'After 2027 the cycle normalizes, ICAPS stays flat, and the multiple compresses from 33x to 23x as AI capex visibility shortens. ' +
      'EPS compounds at 11% from the FY26 base ($11.1) — roughly 2-7% annualized returns from current levels.',
    'The AI supercycle extends beyond 2027 as GAA, advanced packaging (CoWoS, 3D-IC), and HBM build-out all require significantly more AMAT steps per wafer. ' +
      'Cleanroom supply and service engineer constraints get solved, unlocking the second leg of equipment demand. ' +
      'AGS attaches at higher rates as the installed base grows, improving margin mix. ' +
      'EPS compounds at 17% from the FY26 base with a 29x exit multiple — stock returns approach 12-16% annualized. Requires every variable to cooperate for 5 consecutive years.',
  ],

  thesis: [
    'The WFE cycle reversal: even without a macro shock, capex cycles historically run 2-3 years of strength before digestion. ' +
      'ICAPS is already flat, NAND is sub-10% of WFE, and China mix (30% of revenue) creates a structural gross margin ceiling. ' +
      'Near-term FCF is compressed by EPIC and cleanroom capacity capex — if the cycle softens before FCF recovers, the setup deteriorates quickly. ' +
      'Management guided equipment >20% but also explicitly cited physical constraints (cleanroom, supply chain, service engineers) — these can become bottlenecks. ' +
      'P/E derate from 33x to 17x alone, without any EPS compression, implies ~45% price decline from current. Stress-test: FY26E $11.1 × 18x = ~$200.',
    'Post Q1\'26 call, the base case is more concrete: equipment segment growing >20% in CY2026 (2H-weighted), momentum guided into 2027. ' +
      'AGS is a genuine compounder-within-a-cyclical: 2/3 of the segment under long-term contracts (~2.9yr avg), ~90% renewal rate, growing 12-15% YoY, low-double-digit guided for Q2. ' +
      'Equipment GM ~54% was separately disclosed — if mix shifts further toward high-value GAA/HBM tools, company-level GM can inch toward 50%+ over time. ' +
      'Buybacks remain strong (85% FCF returned in FY25) though EPIC capex may moderate near-term payout. ' +
      'The problem is valuation — a 23x exit on $11.1 × (1.11)^5 = $18.7 implies ~$430 target in 5 years, only ~3-4% CAGR from $366.',
    'Full bull case validated by Q1\'26 call: management cited "greater visibility" from customers, stronger services attach, and clear signal that AI/advanced node investments are multi-year. ' +
      'The three structural drivers — gate-all-around (2nm, 1.4nm), HBM deposition intensity, and advanced packaging (CoWoS/3D-IC) — all require disproportionately more AMAT content per wafer. ' +
      'If cleanroom constraints get resolved and EPIC investments fully deploy, AMAT can sustain >15% revenue growth through 2027-2028. ' +
      'AGS compounding at 13%+ annually becomes a second growth engine. Services approaching 30% of revenue at high margins. ' +
      '$11.1 × (1.17)^5 = ~$24.3, at 29x exit = ~$705. Around 14-15% CAGR — the only scenario that clears the hurdle.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.015, 0.025],
  ebitdaProxy: [0.28, 0.35, 0.42],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],
});
