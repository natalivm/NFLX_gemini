
import { 
  ScenarioType, 
  ProjectionData, 
  ScenarioConfig,
  TickerDefinition
} from '../types';
import { TICKERS, CONFIGS } from '../constants';

/**
 * Shared logic for WACC calculation
 */
const calculateWacc = (t: TickerDefinition, sc: ScenarioConfig) => {
  const rfRate = 0.0404;
  const erp = 0.055;
  const beta = t.beta || 1.0;
  const ke = rfRate + beta * erp;
  
  const mktCap = t.currentPrice * t.shares0;
  const totalDebt = t.debt || 0;
  const eqW = mktCap / (mktCap + totalDebt);
  const debtW = 1 - eqW;
  
  return (eqW * ke) + (debtW * (t.costDebt || 0.05) * (1 - t.taxRate)) + (sc.waccAdj || 0);
};

/**
 * Model Processors
 */
const Processors = {
  // Advanced DCF (Used by FICO, DUOL, TLN, AGCO, DE)
  DCF_ADVANCED: (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
    const w = calculateWacc(t, sc);
    const years = ["2026E", "2027E", "2028E", "2029E", "2030E"];
    
    // Resolve dynamic drivers from config
    const tamAdder = (showEnhancements && sc.drivers?.tamB as number[]) || [0,0,0,0,0];
    const maAdder = (showEnhancements && sc.drivers?.maB as number[]) || [0,0,0,0,0];
    const platAdder = (showEnhancements && sc.drivers?.plB as number[]) || [0,0,0,0,0];
    const revPremium = (showEnhancements && sc.drivers?.revPrem as number[]) || [0,0,0,0,0];
    const buybackRate = (showEnhancements && (sc.drivers?.bbRate as number)) || 0;
    
    const fcfBase = sc.drivers?.fcfBase as number;
    const fcfGrowth = sc.drivers?.fcfGrowth as number[];

    let currentRev = t.rev25;
    let currentShares = t.dilutedShares || t.shares0;
    
    const revs: number[] = [];
    const fcfs: number[] = [];
    const pvFCFs: number[] = [];
    const shareHistory: number[] = [];

    let pFcf = fcfBase || 0;

    for (let i = 0; i < 5; i++) {
      currentRev *= (1 + sc.revGrowth[i] + revPremium[i]);
      
      let baseFcf = 0;
      if (fcfBase && fcfGrowth) {
        baseFcf = i === 0 ? fcfBase : pFcf * (1 + fcfGrowth[i]);
        pFcf = baseFcf;
      } else {
        baseFcf = currentRev * sc.fcfMargin[i];
      }
      
      const totalFcf = baseFcf + tamAdder[i] + maAdder[i] + platAdder[i];
      
      revs.push(currentRev);
      fcfs.push(totalFcf);
      pvFCFs.push(totalFcf / Math.pow(1 + w, i + 1));
      
      if (buybackRate > 0) currentShares *= (1 - buybackRate);
      shareHistory.push(currentShares);
    }

    const sumPVFCF = pvFCFs.reduce((a, b) => a + b, 0);
    const tg = sc.termGrowth || 0.025;
    
    // Terminal Value: Blend of Gordon Growth and Exit Multiple
    const tvPerp = (fcfs[4] * (1 + tg)) / (w - tg);
    const tvExit = (revs[4] * (sc.drivers?.ebitdaProxy as number || 0.15)) * (sc.exitMultiple || 15);
    const pvTV = ((tvPerp + tvExit) / 2) / Math.pow(1 + w, 5);

    const netDebt = (t.debt || 0) - (t.cash || 0);
    const equityVal = sumPVFCF + pvTV - netDebt + (showEnhancements ? (sc.drivers?.maOptVal as number || 0) : 0);
    const pricePerShare = equityVal / shareHistory[4];

    return {
      ticker: t.ticker,
      years, revs, shares: shareHistory, w, pricePerShare,
      ebit: revs.map(r => r * 0.2), 
      netIncome: revs.map(r => r * 0.15),
      fcf: fcfs,
      eps: fcfs.map((f, i) => f / shareHistory[i]),
      price: shareHistory.map(() => pricePerShare),
      priceEnhanced: shareHistory.map((_, i) => pricePerShare * (0.85 + 0.03 * i)),
      cagrs: shareHistory.map(() => (Math.pow(pricePerShare / t.currentPrice, 1/5) - 1) * 100),
      cumReturns: shareHistory.map(() => (pricePerShare / t.currentPrice - 1) * 100),
      fcfYield: fcfs.map((f, i) => (f / shareHistory[i]) / pricePerShare * 100),
      config: sc,
      mosPrice: pricePerShare * 0.75,
      mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
    };
  },

  // PE Multiple Model (Used by NFLX)
  PE_MULTIPLE: (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
    const years = ["2026E", "2027E", "2028E", "2029E", "2030E"];
    let currentRev = t.rev25;
    const revs = years.map((_, i) => currentRev *= (1 + sc.revGrowth[i]));
    const netIncome = revs.map((r, i) => r * (sc.drivers?.niMargin as number || 0.25));
    const shares = years.map(() => t.shares0);
    const eps = netIncome.map((ni, i) => ni / shares[i]);
    const basePrice = eps.map((e, i) => e * (sc.peMultiple?.[i] || 25));
    
    const priceEnhanced = basePrice.map((p, i) => p + (showEnhancements && sc.impact ? sc.impact[i] : 0));
    const pricePerShare = priceEnhanced[4];

    return {
      ticker: t.ticker,
      years, revs, ebit: revs.map(r => r * 0.3), netIncome, fcf: revs.map(r => r * 0.2),
      shares, eps, price: basePrice, priceEnhanced, pricePerShare,
      cagrs: priceEnhanced.map((p, i) => (Math.pow(p / t.currentPrice, 1 / (i + 1)) - 1) * 100),
      cumReturns: priceEnhanced.map(p => ((p / t.currentPrice) - 1) * 100),
      fcfYield: eps.map((e, i) => (e * 0.8) / priceEnhanced[i] * 100),
      config: sc,
      mosPrice: pricePerShare * 0.75,
      mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
    };
  },

  // Hardcoded Path (Used by UBER)
  HARDCODED_PATH: (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
    const trajectory = showEnhancements ? sc.hardcodedTrajectory! : sc.hardcodedConservative!;
    const years = ["2026E", "2027E", "2028E", "2029E", "2030E"];
    const pricePerShare = trajectory[4];

    return {
      ticker: t.ticker,
      years, revs: years.map(() => t.rev25), ebit: years.map(() => 0), netIncome: years.map(() => 0),
      fcf: years.map(() => 0), shares: years.map(() => t.shares0), eps: years.map(() => 0),
      price: trajectory, priceEnhanced: trajectory, pricePerShare,
      cagrs: trajectory.map((p, i) => (Math.pow(p / t.currentPrice, 1 / (i + 1)) - 1) * 100),
      cumReturns: trajectory.map(p => ((p / t.currentPrice) - 1) * 100),
      fcfYield: trajectory.map(() => 0),
      config: sc,
      mosPrice: pricePerShare * 0.75,
      mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
    };
  }
};

export const calculateProjection = (tickerId: string, type: ScenarioType, showEnhancements = true): ProjectionData => {
  const t = TICKERS[tickerId];
  const sc = CONFIGS[tickerId][type];
  
  const processor = Processors[t.modelType] || Processors.PE_MULTIPLE;
  return processor(t, sc, showEnhancements);
};

export const formatVal = (n: number, decimals = 1, currency = true): string => {
  const prefix = currency ? '$' : '';
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(decimals)}T`;
  if (Math.abs(n) >= 1e3) return `${prefix}${(n / 1e3).toFixed(decimals)}B`;
  return `${prefix}${n.toFixed(decimals)}`;
};
