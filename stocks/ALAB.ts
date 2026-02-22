import { defineStock } from './defineStock';

export const ALAB = defineStock({
  ticker: 'ALAB',
  name: 'Astera Labs',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#0ea5e9',
  currentPrice: 129.70,
  fairPriceRange: '$100 - $260',
  shares0: 169,
  rev25: 1345,
  fcfMargin25: 0.288,
  taxRate: 0.12,
  beta: 2.30,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 1.84,
  rsRating: 60,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Type B (cyclical AI growth) → potential A if scale-up switching layer consolidates. " +
    "Post-earnings update: $6.5B Amazon warrant = strategic hyperscaler lock-in, not just a design win. " +
    "Scorpio X (scale-up switching) is the main TAM driver — 2026 pre-ramp, 2027 volume ramp. " +
    "UALink + NVLink Fusion = protocol-agnostic positioning; earns regardless of who wins. " +
    "Merchant scale-up switching TAM ~$20B by 2030, optical could double. " +
    "Moat forming: PCIe 6 first-to-volume, software-defined fabric, deep hyperscaler integration, multi-protocol optionality. " +
    "Not commodity silicon — this is control-plane AI fabric. " +
    "Revenue: 396→852→1345 (3Y CAGR ~85-90%), but decelerating: +37%→+27%→+8%→negative post-2028E. " +
    "Peak-cycle earnings curve visible. Gross margin ~70-75%, EBIT margin expanding to 45-50% peak (2029E), then compression. " +
    "Aggressive OpEx step-up = strategic investment in position, payback 18-24mo minimum. " +
    "EPS turnaround: -0.71→-0.64→1.22 GAAP (adj ~1.84). " +
    "Probability of 15%+ CAGR: ~35-40%, heavily dependent on AI cycle duration + exit multiple. " +
    "RS 60 = not a market leader, momentum average, not institutional favourite. " +
    "Execution vs Cycle vs Structural: 40/40/20 split. " +
    "Key risks: AI capex normalization, protocol shifts (NVLink/ESUN displacement), hyperscaler internalization, " +
    "margin compression on OpEx step-up, optical requiring larger investment than expected. " +
    "Not buy-and-forget. Strategic AI infrastructure option on the connectivity layer between GPU, memory, and optics. " +
    "If Scorpio X becomes standard in 2-3 hyperscalers → architectural player (type A). If not → another AI-cycle silicon story.",

  revGrowth: [
    [0.25, 0.10, 0.02, -0.08, -0.15],
    [0.37, 0.27, 0.10, 0.05, -0.05],
    [0.42, 0.35, 0.20, 0.12, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.22, 0.20, 0.18, 0.16],
    [0.29, 0.32, 0.35, 0.37, 0.38],
    [0.30, 0.34, 0.38, 0.42, 0.44],
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'AI capex cycle peaks early, semiconductor downturn hits by 2028. Scorpio X ramp delayed or displaced by NVLink/ESUN. ' +
      'Hyperscalers internalize connectivity solutions. OpEx step-up compresses margins without payback. ' +
      'Operating leverage works in reverse — EPS drops 30-40%. P/E compresses to 20x. ' +
      'EPS CAGR ~15%. FY30E EPS ~$3.70 × 20x = $74. CAGR from $130 ≈ negative.',
    'Moderate AI capex sustains through 2028. Scorpio X ramps 2027 on schedule with 2-3 hyperscalers. ' +
      'UALink adoption provides protocol diversification. EBIT margin expands to 45%. ' +
      'Revenue decelerates naturally (37%→27%→10%→5%→-5%). ' +
      'EPS CAGR ~27%. FY30E EPS ~$6.20 × 30x = $186. CAGR from $130 ≈ 7-8%.',
    'AI supercycle extends. Scorpio X becomes standard scale-up switching layer across major hyperscalers. ' +
      'Optical ramps 2028, UALink adoption accelerates. Company transitions from cyclical to architectural player. ' +
      'EBIT margin reaches 50%. Multi-protocol optionality (CXL + UALink + NVLink Fusion) captures expanding TAM. ' +
      'EPS CAGR ~35%. FY30E EPS ~$8.30 × 35x = $290. CAGR from $130 ≈ 17-18%.',
  ],
  thesis: [
    'AI scale-up protocol shifts away from merchant silicon. NVLink/ESUN displaces PCIe/CXL path. ' +
      'Hyperscalers build internal connectivity (like Google TPU interconnect). ' +
      'Aggressive OpEx step-up eats into margins during cycle downturn. ' +
      '$6.5B Amazon warrant is a ceiling, not a floor — concentrated customer risk. ' +
      'RS 60 reflects market scepticism. Semiconductor cycle hits 2028-2029.',
    'Amazon warrant secures strategic position. Scorpio X ramp validates scale-up switching TAM. ' +
      'PCIe 6 first-to-volume advantage holds. Software-defined fabric creates stickiness. ' +
      'AI capex sustains but growth decelerates naturally. EBIT margin expansion to 45% offsets revenue slowdown. ' +
      'Company remains cyclical growth (type B) with improving moat. RS stays mediocre but fundamentals deliver.',
    'Scorpio X + optical + UALink = triple growth engine. Company becomes the architectural connectivity layer ' +
      'for AI scale-up infrastructure. 2-3 hyperscaler adoption creates switching costs approaching SaaS levels. ' +
      'TAM expansion from $25B to $50B+ with optical. Moat transitions from technical to structural. ' +
      'Type B → Type A reclassification. Market cap re-rates as "AI fabric infrastructure platform".',
  ],

  epsCagr: [15, 27, 35],
  exitPE: [20, 30, 35],
  prob: [30, 40, 30],

  bbRate: [0.002, 0.008, 0.015],
  ebitdaProxy: [0.25, 0.40, 0.50],
  bullMaOptVal: false,
});
