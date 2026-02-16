
import { 
  ScenarioType, 
  ProjectionData, 
  ScenarioConfig 
} from '../types';
import { 
  TICKERS,
  CONFIGS 
} from '../constants';

export const calculateProjection = (ticker: string, type: ScenarioType, showEnhancements = true): ProjectionData => {
  const t = TICKERS[ticker];
  const sc = CONFIGS[ticker][type];
  const years = ["2025E", "2026E", "2027E", "2028E", "2029E"];

  // Specialized Logic for UBER (Hardcoded Trajectory Model)
  if (ticker === 'UBER') {
    const trajectory = showEnhancements ? sc.hardcodedTrajectory! : sc.hardcodedConservative!;
    const fcf = years.map((_, i) => t.rev25 * Math.pow(1.15, i) * (sc.fcfMargin[i] || 0.15));
    const shares = years.map(() => t.shares0);
    const finalPrice = trajectory[4];
    
    return {
      ticker,
      years,
      revs: years.map((_, i) => t.rev25 * Math.pow(1.15, i)),
      ebit: years.map((_, i) => t.rev25 * Math.pow(1.15, i) * 0.18),
      netIncome: years.map((_, i) => t.rev25 * Math.pow(1.15, i) * 0.12),
      fcf,
      shares,
      eps: fcf.map((f, i) => f / shares[i]),
      price: trajectory, // Base path
      priceEnhanced: trajectory, // Converged path
      cagrs: trajectory.map((p, i) => (Math.pow(p / t.currentPrice, 1 / (i + 1)) - 1) * 100),
      cumReturns: trajectory.map(p => ((p / t.currentPrice) - 1) * 100),
      fcfYield: fcf.map((f, i) => (f / shares[i]) / trajectory[i] * 100),
      config: sc,
      pricePerShare: finalPrice,
      w: parseFloat(sc.waccRange || '7.5') / 100,
      upside: (finalPrice / t.currentPrice - 1)
    };
  }

  // Specialized Logic for DUOL and FICO
  if (ticker === 'DUOL' || ticker === 'FICO') {
    const isFico = ticker === 'FICO';
    
    // WACC Build-up
    const rfRate = 0.0404; // Updated for FICO model Feb 13
    const erp = 0.055;
    const beta = t.beta || 1.0;
    const ke = rfRate + beta * erp;
    
    let w: number;
    if (isFico) {
      const mktCap = t.currentPrice * t.shares0;
      const ev = mktCap + (t.debt || 0) - (t.cash || 0);
      const debtW = (t.debt || 0) / (mktCap + (t.debt || 0));
      const eqW = mktCap / (mktCap + (t.debt || 0));
      w = eqW * ke + debtW * (t.costDebt || 0.05) * (1 - t.taxRate);
    } else {
      w = rfRate + 0.85 * erp + 0.015 + 0.02; // DUOL legacy
    }
    w += (sc.waccAdj || 0);

    // Enhancement Premiums
    const tamPrem = isFico ? 0.10 : 0.05;
    const platPrem = isFico ? 0.08 : 0.05;
    const maPrem = isFico ? 0.03 : 0.05;
    const totPrem = showEnhancements ? (tamPrem + platPrem + maPrem) : 0;

    const buybackReduction = showEnhancements ? (isFico ? 0.03 : 0.01) : 0;
    const avgBuybackPrice = [t.currentPrice * 1.1, t.currentPrice * 1.25, t.currentPrice * 1.4, t.currentPrice * 1.6, t.currentPrice * 1.8];

    let currentRev = t.rev25;
    let currentFcf = t.fcfMargin25 * t.rev25;
    const revs: number[] = [];
    const fcfs: number[] = [];
    const pvFCFs: number[] = [];
    let currentShares = t.dilutedShares || t.shares0;
    const shareHistory: number[] = [];

    for (let i = 0; i < 5; i++) {
      currentRev *= (1 + sc.revGrowth[i]);
      if (sc.fcfGr) {
        currentFcf *= (1 + sc.fcfGr[i]);
      } else {
        currentFcf = currentRev * sc.fcfMargin[i];
      }
      
      const pv = currentFcf / Math.pow(1 + w, i + 1);
      
      revs.push(currentRev);
      fcfs.push(currentFcf);
      pvFCFs.push(pv);
      
      // Buyback math: shares reduced by (Dollar Spend / Price)
      if (isFico && showEnhancements && sc.bb) {
         currentShares -= (sc.bb / avgBuybackPrice[i]);
      } else {
         currentShares *= (1 - buybackReduction);
      }
      shareHistory.push(currentShares);
    }

    const sumPVFCF = pvFCFs.reduce((a, b) => a + b, 0);
    const tg = sc.termGrowth || (isFico ? 0.035 : 0.03);
    const termFCF = fcfs[4] * (1 + tg);
    const tvPerp = termFCF / (w - tg);
    const pvTVPerp = tvPerp / Math.pow(1 + w, 5);
    
    const exitM = sc.exitMultiple || (isFico ? 30 : 20);
    const tvExit = fcfs[4] * exitM;
    const pvTVExit = tvExit / Math.pow(1 + w, 5);
    
    // Blended TV (50/50 for institutional precision)
    const pvTVBlend = pvTVPerp * 0.5 + pvTVExit * 0.5;
    let ev = sumPVFCF + pvTVBlend;
    if (showEnhancements) ev *= (1 + totPrem);
    
    const equityVal = ev + (t.cash || 0) - (t.debt || 0);
    const pricePerShare = equityVal / currentShares;

    return {
      ticker,
      years,
      revs,
      ebit: revs.map(r => r * (isFico ? 0.54 : 0.2)), 
      netIncome: revs.map(r => r * (isFico ? 0.40 : 0.15)),
      fcf: fcfs,
      pvFCFs,
      shares: shareHistory,
      eps: fcfs.map((f, i) => f / shareHistory[i]), // Proxy FCFPS
      price: shareHistory.map(() => pricePerShare),
      priceEnhanced: shareHistory.map((_, i) => pricePerShare * (0.85 + 0.03 * i)), // Convergence path
      cagrs: shareHistory.map(() => (Math.pow(pricePerShare / t.currentPrice, 1/5) - 1) * 100),
      cumReturns: shareHistory.map(() => (pricePerShare / t.currentPrice - 1) * 100),
      fcfYield: fcfs.map((f, i) => (f / shareHistory[i]) / pricePerShare * 100),
      config: sc,
      w,
      equityVal,
      pricePerShare,
      mosPrice: pricePerShare * 0.75,
      upside: (pricePerShare / t.currentPrice - 1),
      mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
    };
  }

  // Standard Projection Logic for other tickers
  let currentRev = t.rev25;
  const revs: number[] = [];
  for (let i = 0; i < 5; i++) {
    currentRev *= (1 + sc.revGrowth[i]);
    revs.push(currentRev);
  }
  const ebit = revs.map((r, i) => r * (sc.opMargin ? sc.opMargin[i] : 0.2));
  const netIncome = ebit.map(e => e * (1 - t.taxRate));
  const fcf = revs.map((r, i) => r * sc.fcfMargin[i]);
  const shares = revs.map(() => t.shares0);
  const eps = netIncome.map((ni, i) => ni / shares[i]);
  const price = eps.map((e, i) => e * (sc.peMultiple ? sc.peMultiple[i] : 25));
  const priceEnhanced = price.map((p, i) => p + (sc.impact ? sc.impact[i] : 0));
  const cagrs = priceEnhanced.map((p, i) => (Math.pow(p / t.currentPrice, 1 / (i + 1)) - 1) * 100);
  const cumReturns = priceEnhanced.map(p => ((p / t.currentPrice) - 1) * 100);
  const fcfYield = fcf.map((f, i) => (f / shares[i]) / priceEnhanced[i] * 100);

  return {
    ticker,
    years: years,
    revs,
    ebit,
    netIncome,
    fcf,
    shares,
    eps,
    price,
    priceEnhanced,
    cagrs,
    cumReturns,
    fcfYield,
    config: sc
  };
};

export const formatVal = (n: number, decimals = 1, currency = true): string => {
  const prefix = currency ? '$' : '';
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(decimals)}T`;
  if (Math.abs(n) >= 1e3) return `${prefix}${(n / 1e3).toFixed(decimals)}B`;
  return `${prefix}${n.toFixed(decimals)}`;
};
