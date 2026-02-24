import { TickerDefinition, ProjectionData, ScenarioType } from '../types';

// ── Acceleration-score constants ──

const CAGR_ACCELERATION_MULT = 1.5;
const DEFAULT_TIME_HORIZON = 5;

const UPSIDE_WEIGHT = 0.4;
const UPSIDE_CAP = 40;
const RS_WEIGHT = 0.3;
const AI_SCORE_TAILWIND = 20;
const AI_SCORE_NEUTRAL = 10;
const AI_SCORE_DISRUPTION = 5;
const PROB_FLOOR = 10;
const PROB_CEILING = 95;

export interface StockMetrics {
  baseTarget: number;
  bullTarget: number;
  momentumUpside: number;
  timeToTarget: number;
  probAcceleration: number;
}

export function computeStockMetrics(
  tickerDef: TickerDefinition,
  currentProjection: ProjectionData,
  allProjections: Record<ScenarioType, ProjectionData>,
): StockMetrics {
  const baseTarget = allProjections.base.pricePerShare;
  const bullTarget = allProjections.bull.pricePerShare;
  const momentumUpside = (baseTarget / tickerDef.currentPrice - 1) * 100;

  const baseCagr = currentProjection.cagrs[4];
  const acceleratedCagr = baseCagr * CAGR_ACCELERATION_MULT;
  const timeToTarget =
    acceleratedCagr > 0
      ? Math.log(baseTarget / tickerDef.currentPrice) / Math.log(1 + acceleratedCagr / 100)
      : DEFAULT_TIME_HORIZON;

  const upsideScore = Math.min(UPSIDE_CAP, Math.abs(momentumUpside) * UPSIDE_WEIGHT);
  const rsScore = tickerDef.rsRating * RS_WEIGHT;
  const aiScore = tickerDef.aiImpact === 'TAILWIND' ? AI_SCORE_TAILWIND
    : tickerDef.aiImpact === 'NEUTRAL' ? AI_SCORE_NEUTRAL
    : AI_SCORE_DISRUPTION;
  const probAcceleration = Math.round(Math.min(PROB_CEILING, Math.max(PROB_FLOOR, upsideScore + rsScore + aiScore)));

  return { baseTarget, bullTarget, momentumUpside, timeToTarget, probAcceleration };
}

export const usd = (n: number) => "$" + n.toFixed(2);
export const pctFmt = (n: number) => (n * 100).toFixed(1) + "%";
