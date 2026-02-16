
// Add React import to resolve missing namespace error
import React from 'react';

export enum ScenarioType {
  BEAR = 'bear',
  BASE = 'base',
  BULL = 'bull'
}

export interface ScenarioConfig {
  label: string;
  color: string;
  bg: string;
  revGrowth: number[];
  fcfGr?: number[]; // FICO specific
  opMargin?: number[];
  fcfMargin: number[];
  peMultiple?: number[];
  exitMultiple?: number;
  termGrowth?: number;
  waccAdj?: number;
  bb?: number; // FICO buyback amount
  adRev?: number[];
  subs?: number[];
  users?: number[];
  bbSpend?: number[];
  impact?: number[];
  desc: string;
  thesis?: string;
  // Uber specific model assumptions
  ebitdaMargin?: string;
  waccRange?: string;
  buybackAssumption?: string;
  tamExpansionAssumption?: string;
  hardcodedTrajectory?: number[]; // To match the provided Uber model exactly
  hardcodedConservative?: number[];
}

export interface DeepDiveSection {
  title: string;
  id: string;
  content: string | React.ReactNode;
  metrics?: { label: string; value: string; color?: string }[];
}

export interface TickerDefinition {
  ticker: string;
  name: string;
  sector: string;
  themeColor: string;
  currentPrice: number;
  shares0: number;
  dilutedShares?: number;
  rev25: number;
  opMargin25?: number;
  fcfMargin25: number;
  taxRate: number;
  unitLabel: string;
  unit25: number;
  cash?: number;
  debt?: number;
  beta?: number;
  costDebt?: number;
  deepDive: DeepDiveSection[];
}

export interface ProjectionData {
  years: string[];
  revs: number[];
  ebit: number[];
  netIncome: number[];
  fcf: number[];
  pvFCFs?: number[];
  shares: number[];
  eps: number[];
  price: number[];
  priceEnhanced: number[];
  cagrs: number[];
  cumReturns: number[];
  fcfYield: number[];
  config: ScenarioConfig;
  ticker: string;
  // Specialized DCF outputs
  w?: number;
  equityVal?: number;
  pricePerShare?: number;
  mosPrice?: number;
  upside?: number;
  mosUpside?: number;
}

export interface Catalyst {
  yr: number;
  events: string[];
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  color: string;
}
