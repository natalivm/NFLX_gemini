import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  currentPrice: 4001,
  fairPriceRange: '$7,700 - $10,300',
  shares0: 30.6,
  rev25: 26917,
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17800,
  debt: 17500,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 15,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "BKNG is a high-quality travel compounder with a dominant two-sided marketplace moat. " +
    "Q4'25 call confirmed: 2026 algo targets ~9% CC top line (8% algo + 100 bps), mid-teens EPS growth, +50 bps EBITDA margin — even after $700M incremental reinvestment. " +
    "Transformation Program delivers $550M annual run-rate savings (end-2025), $500-550M in-year savings in 2026, self-funding growth investments with ROI discipline. " +
    "Capital return: 2025 FCF ~$9.1B, returned $8.2B (~90%). Since 2022: $29B buybacks, -22% net share count. ~4% annual net share reduction modeled in DCF. " +
    "LLM/AI risk addressed by CEO Fogel: LLMs may become new top-of-funnel, but merchant-of-record, supply integrations, payments, regulatory compliance, and service = deep moat at bottom of funnel. More likely a new paid traffic channel (like Google was) than an existential threat. " +
    "At ~15-16x forward P/E, market prices BKNG as cyclical trough — below historical 16-30x range. " +
    "DCF base fair value ~$7.7k (~93% upside) including ~4% annual net share reduction. FCF yield ~7-8% provides downside cushion. " +
    "RS 15 = no momentum — value entry, not breakout. Risks: travel macro slowdown (mgmt notes 'thoughtful discretionary spending'), EU regulation, Google distribution risk.",

  analystConsensus: { rating: 'Buy', targetLow: 4495, targetMedian: 5900, targetHigh: 6700, numAnalysts: 29 },

  // Revenue growth: 2026 algo ~9% CC top line. Q1'26 room nights +5-7%.
  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04],   // Bear: travel slowdown, below algo, discretionary pullback
    [0.09, 0.09, 0.09, 0.08, 0.08],   // Base: algo execution ~9% CC, gradual deceleration
    [0.11, 0.10, 0.10, 0.09, 0.09],   // Bull: above-algo execution + global expansion
  ],

  // FCF margin: 2025A ~33.7%. Call: +50 bps EBITDA margin even after $700M reinvest.
  // $550M savings self-fund investments. Net margin expansion is policy, not accident.
  fcfMargin: [
    [0.33, 0.33, 0.33, 0.34, 0.34],   // Bear: margins stable, savings offset by cycle pressure
    [0.34, 0.345, 0.35, 0.355, 0.36], // Base: +50 bps/yr FCF margin, savings-funded reinvest
    [0.35, 0.36, 0.37, 0.38, 0.39],   // Bull: full operating leverage, merchant mix tailwind
  ],

  // EBITDA exit multiples: historical EV/EBITDA ~14-22x
  exitMultiple: [12, 16, 18],

  desc: [
    'Travel macro recession forces discretionary pullback — "thoughtful spending" translates to real demand compression across EU and US leisure segments. Revenue growth decelerates to 4-5% as room night growth stalls. ' +
      'EU regulatory pressure on OTA commissions plus early LLM-driven disintermediation erode take rate at the margins. FCF margins hold at ~33-34% on Transformation Program savings but cycle pressure caps expansion. ' +
      'Reduced buybacks (~2% net share reduction) limit per-share compounding. Market re-rates to 12x EV/EBITDA as cyclical trough multiple. DCF fair value ~$4,500 — roughly flat from current levels.',
    'Company executes on Q4\'25 algo targets: ~9% constant-currency top line (8% algo + 100 bps), mid-teens EPS growth, +50 bps annual FCF margin expansion — self-funded by $550M Transformation Program run-rate savings. ' +
      'Capital return stays disciplined: ~90% of FCF returned via buybacks, driving ~4% annual net share reduction. FCF margins expand from 34% to 36% over five years on merchant mix shift and payment processing scale. ' +
      'P/E stays compressed at ~16x (vs. 16-30x historical range) but FCF compounds at ~10% CAGR. DCF fair value ~$7,700 — upside driven by earnings growth and share count reduction, not multiple expansion.',
    'Travel cycle extends beyond expectations — connected trip and GenAI-powered personalization drive above-algo room night growth. Merchant-of-record mix shift plus payments integration expand take rate and FCF margins to 39% by Year 5. ' +
      'Aggressive capital return (~5% net share reduction) accelerates per-share value creation. LLM integration becomes a paid traffic channel (like Google was) rather than a disintermediation threat — Booking\'s supply depth, regulatory compliance, and payment infrastructure form an insurmountable bottom-of-funnel moat. ' +
      'P/E normalizes from 16x toward 18x as market recognizes the structural compounder. DCF fair value ~$10,300.',
  ],

  thesis: [
    'Macro recession hits discretionary travel. "Thoughtful spending" becomes real pullback. EU regulation + LLM-driven disintermediation erode take rate. Market re-rates to trough.',
    'Company executes algo (9% top line, mid-teens EPS). Transformation Program savings self-fund reinvestment. 90% FCF returned. P/E stays compressed but FCF compounds.',
    'Travel cycle extends, algo beats on merchant mix + payments. LLM integration becomes paid channel (like Google). P/E normalizes from 16x toward 18x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  // Buybacks: -4% net share count in 2025 (net of SBC), -22% since 2022. ~90% FCF returned.
  // Bear: recession slows buybacks. Base: continues at ~4% (actual 2025 rate). Bull: accelerates.
  bbRate: [0.02, 0.04, 0.05],
  ebitdaProxy: [0.37, 0.39, 0.41],
  bullMaOptVal: false,

  // Zero out speculative premiums (revPrem, fcfUplift) — keep only buybacks as realistic enhancement.
  driverOverrides: [
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
  ],
});
