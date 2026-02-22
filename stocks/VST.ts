import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 171,
  fairPriceRange: '$134 - $318',
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.157,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  unitLabel: 'Nuclear Capacity (GW)',
  unit25: 6.5,
  modelType: 'EPS_PE',
  baseEps: 8.81,
  enhancementLabel: 'Nuclear AI PPA Expansion',
  rsRating: 46,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Cyclical growth (Type B) with capital-return + contracting overlay. Nov-2025 call raised visibility: 2025E Adj EBITDA $5.7–5.9B, 2026E $6.8–7.6B, 60%+ EBITDA→FCF conversion. Comanche Peak 20yr PPA + 70% hedged 2027 generation reduce near-term vol, but economics remain power-cycle dependent. Buybacks are a core EPS driver (−30% shares since 2021, ~$1.3B/yr capital return), though effectiveness diminishes at $171 vs. avg buyback price <$34. RS 46 = weak momentum, not in institutional acceleration. Prob-weighted 5yr CAGR ~6.7% at $171 — still insufficient risk compensation. Key risks: power spread normalization, P/E compression to 12x (−38%), post-2027 EPS deceleration to ~10%. Verdict: WAIT / HOLD — better contracted, still mid-cycle.",

  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.17, 0.12, 0.09, 0.07, 0.06],
    [0.17, 0.15, 0.12, 0.10, 0.09],
  ],
  fcfMargin: [
    [0.14, 0.14, 0.14, 0.13, 0.13],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.17, 0.19, 0.21, 0.23, 0.24],
  ],
  exitMultiple: [10, 13, 16],
  bbRate: [0.015, 0.022, 0.03],

  epsCagr: [5, 10, 15],
  exitPE: [12, 15, 18],
  prob: [15, 50, 35],

  desc: [
    'Power price compression + P/E mean reversion. EPS CAGR 5%, exit P/E 12x. 5yr EPS ~$11.2 × 12 = $134. CAGR from $171 ≈ −4% to 0%.',
    'Consensus execution with moderate margin expansion. EPS CAGR 10%, exit P/E 15x. 5yr EPS ~$14.2 × 15 = $213. CAGR from $171 ≈ 4–5%.',
    'Sustained AI/data-center demand + power pricing tailwind. EPS CAGR 15%, exit P/E 18x. 5yr EPS ~$17.7 × 18 = $318. CAGR from $171 ≈ 13–14%.',
  ],

  bullMaOptVal: 171.00 * 339.0 * 0.07,
});
