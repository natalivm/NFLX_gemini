import { defineStock } from './defineStock';

export const APP = defineStock({
  ticker: 'APP',
  name: 'AppLovin Corporation',
  sector: 'Ad-Tech / AI Monetization',
  themeColor: '#f97316',
  currentPrice: 418,
  fairPriceRange: '$310 - $836',
  shares0: 340,
  rev25: 5480,
  fcfMargin25: 0.72,
  taxRate: 0.15,
  cash: 3000,
  debt: 3500,
  beta: 1.80,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 9.75,
  rsRating: 26,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Type B — cyclical growth with strong execution-moat, not a classic structural compounder. " +
    "Post-earnings update: Q4'25 $1.66B rev (+66% YoY), Adj EBITDA $1.4B (+82% YoY, ~84% margin), FCF $1.31B (+88% YoY). " +
    "FY'25: $5.48B rev (+70%), $4.51B EBITDA (+87%, ~82% margin), $3.95B FCF (+91%). " +
    "Q1'26 guide: $1.745-1.775B (+5-7% QoQ despite seasonality), EBITDA margin ~84%. " +
    "~95% incremental revenue flow-through to EBITDA — top-tier quality of growth. " +
    "Moat: network effects + data scale + MAX auction lock-in (often >50% of publisher UA spend). " +
    "Self-serve GA on track 1H'26. CAC/LTV 30-day breakeven — very strong scalable growth loop signal. " +
    "GenAI creative tools: 100+ clients pilot, video-gen model shortly. " +
    "Conversion rate: historically ~1%, 'confident ads' up to 5% — upside lever from advertiser diversity. " +
    "FY buybacks $2.58B (shares 346M→340M, -1.7%). Remaining auth ~$3.28B. " +
    "Margin expansion nearly exhausted at 82-84% EBITDA. From here, growth ≈ revenue growth + buybacks. " +
    "Platform broadening (e-comm, lead gen, CTV) adds anti-cyclical buffer but ad-cycle exposure remains. " +
    "Meta already bidding on ID-traffic — competition real but 'pie expands' with bid density per mgmt. " +
    "Probability of 15%+ CAGR: ~60-65% (up from 55-60% pre-call). " +
    "RS 26 — very weak, momentum broken, -38% from peak. Not institutional favourite. " +
    "Execution split: 50% execution + 30% structural AI ad trend + 20% ad cycle. " +
    "Key risks: multiple compression (P/E 18-20x = -25-33% downside), ad-cycle, Meta/no-ID competition, black-box narrative. " +
    "Not buy-and-forget. High-margin growth engine transitioning from hyper-growth to normalized growth.",

  revGrowth: [
    [0.20, 0.12, 0.10, 0.10, 0.08],
    [0.25, 0.18, 0.16, 0.15, 0.14],
    [0.30, 0.25, 0.22, 0.20, 0.18],
  ],
  fcfMargin: [
    [0.68, 0.65, 0.62, 0.60, 0.58],
    [0.72, 0.72, 0.71, 0.70, 0.70],
    [0.72, 0.74, 0.75, 0.76, 0.76],
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'Ad budgets cut + Meta/no-ID competition erodes share. Revenue growth drops to low-teens. ' +
      'Operating leverage works in reverse at 82-84% EBITDA — any revenue miss hits EPS hard. ' +
      'Self-serve rollout disappoints, e-comm vertical fails to scale. P/E compresses to 18x. ' +
      'EPS CAGR ~20%. FY30E EPS ~$24 × 18x = $436. CAGR from $418 ≈ 1%.',
    'Q1 guide validates sustained engine. Revenue CAGR ~18%, EBITDA margin holds 80%+. ' +
      'Self-serve GA drives broadening. CAC/LTV 30-day payback scales. Buybacks 1-2%/yr. ' +
      'P/E compresses from 43x to 22x through earnings growth — returns come from EPS, not multiple. ' +
      'EPS CAGR ~31%. FY30E EPS ~$38 × 22x = $836. CAGR from $418 ≈ 15%.',
    'Self-serve + e-comm + GenAI creative tools unlock TAM expansion. Revenue sustains 25%+ CAGR. ' +
      'Conversion rate moves from ~1% toward 5% via advertiser diversity. MAX becomes default auction layer. ' +
      'Massive FCF funds buybacks + optionality. Market re-rates from cyclical to structural. ' +
      'EPS CAGR ~37%. FY30E EPS ~$47 × 25x = $1175. CAGR from $418 ≈ 23%.',
  ],
  thesis: [
    'Ad cycle turns down — macro cuts budgets. Meta captures no-ID traffic, TikTok takes share. ' +
      'Margin at 82-84% EBITDA has zero room to expand — revenue miss flows straight to EPS. ' +
      '"Black box" narrative keeps institutional discount. RS 26 signals distribution. ' +
      'Self-serve qualified leads → go-live at 57% shows conversion bottleneck (lack of creatives for format).',
    'Q1 guide (+5-7% QoQ despite seasonality) validates growth engine intact. ' +
      'Self-serve GA 1H26 broadens advertiser base. CAC/LTV 30-day breakeven = scalable growth loop. ' +
      'MAX lock-in (>50% of publisher UA spend) sustains moat. Platform broadening reduces cyclicality. ' +
      'GenAI creative tools remove key bottleneck. Buybacks + $3.28B auth provide EPS floor.',
    'AppLovin becomes the default monetization + creative platform for mobile ecosystem. ' +
      'Self-serve + GenAI tools + e-comm solve advertiser diversity problem → conversion rate expansion. ' +
      'Network effects compound: more advertisers → better auction → higher publisher ROAS → more publishers. ' +
      'CTV, web, lead-gen open new TAM. $4B+ FCF funds aggressive buybacks. ' +
      'Meta competition expands pie (bid density) rather than taking share.',
  ],

  epsCagr: [20, 31, 37],
  exitPE: [18, 22, 25],
  prob: [20, 45, 35],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.70, 0.78, 0.82],
  bullMaOptVal: false,
});
