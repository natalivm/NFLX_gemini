
import React from 'react';
import { ProjectionData } from '../types';
import { formatVal } from '../services/projectionService';
import { REV_25, OP_MARGIN_25, FCF_25, SHARES_0, CUR_PRICE } from '../constants';

interface Props {
  data: ProjectionData;
}

const FinancialTable: React.FC<Props> = ({ data }) => {
  const { config, years, revs, ebit, netIncome, fcf, shares, eps, price, priceEnhanced, cagrs, cumReturns, fcfYield } = data;

  const Cell = ({ children, header = false, align = 'right', highlight = false, color = '', border = true }: any) => (
    <td className={`
      px-4 py-3 text-[11px] font-medium mono whitespace-nowrap
      ${border ? 'border-b border-slate-800/30' : ''}
      ${header ? 'bg-[#0d1630] font-black text-slate-500 uppercase tracking-widest text-[9px]' : 'text-slate-300'}
      ${align === 'right' ? 'text-right' : 'text-left'}
      ${highlight ? 'bg-[#ff007f]/5 font-black text-[#ff007f]' : ''}
    `} style={color ? { color } : {}}>
      {children}
    </td>
  );

  const SectionHeader = ({ title, color = 'text-[#ff007f]' }: any) => (
    <tr>
      <td colSpan={8} className={`px-4 py-2 bg-[#1a233e]/50 text-[10px] font-black uppercase tracking-[0.3em] ${color} border-y border-slate-800/40`}>
        {title}
      </td>
    </tr>
  );

  const cagr5y = (valFinal: number, valInitial: number) => 
    ((Math.pow(valFinal / valInitial, 1/5) - 1) * 100).toFixed(1) + '%';

  return (
    <div className="bg-[#0d1630]/40 backdrop-blur-md">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#0d1630]">
        <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">
          DATA MATRIX // {config.label}
        </h3>
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Post-split Adj.</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Cell header align="left">Metric Field</Cell>
              <Cell header>2025A</Cell>
              {years.map(y => <Cell key={y} header>{y}E</Cell>)}
              <Cell header>5Y CAGR</Cell>
            </tr>
          </thead>
          <tbody>
            <SectionHeader title="Top Line Metrics" />
            <tr>
              <Cell align="left">Revenue (USD B)</Cell>
              <Cell>{formatVal(REV_25)}</Cell>
              {revs.map((r, i) => <Cell key={i}>{formatVal(r)}</Cell>)}
              <Cell highlight>{cagr5y(revs[4], REV_25)}</Cell>
            </tr>
            <tr>
              <Cell align="left">Growth YoY (%)</Cell>
              <Cell>16.0%</Cell>
              {config.revGrowth.map((g, i) => <Cell key={i}>{(g * 100).toFixed(1)}%</Cell>)}
              <Cell>-</Cell>
            </tr>
            <tr>
              <Cell align="left">Ads Rev Layer</Cell>
              <Cell>$1.5B</Cell>
              {config.adRev.map((a, i) => <Cell key={i} color="#10b981" highlight>${a.toFixed(1)}B</Cell>)}
              <Cell color="#10b981">{cagr5y(config.adRev[4], 1.5)}</Cell>
            </tr>

            <SectionHeader title="Operational Efficiency" />
            <tr>
              <Cell align="left">Operating Margin</Cell>
              <Cell>{(OP_MARGIN_25 * 100).toFixed(1)}%</Cell>
              {config.opMargin.map((m, i) => <Cell key={i}>{(m * 100).toFixed(1)}%</Cell>)}
              <Cell color="#3b82f6">+{(config.opMargin[4] - OP_MARGIN_25).toFixed(3)}</Cell>
            </tr>
            <tr>
              <Cell align="left">EBIT (Billions)</Cell>
              <Cell>{formatVal(REV_25 * OP_MARGIN_25)}</Cell>
              {ebit.map((e, i) => <Cell key={i}>{formatVal(e)}</Cell>)}
              <Cell>{cagr5y(ebit[4], REV_25 * OP_MARGIN_25)}</Cell>
            </tr>

            <SectionHeader title="Capital Allocation" />
            <tr>
              <Cell align="left">Shares Out. (M)</Cell>
              <Cell>{SHARES_0}M</Cell>
              {shares.map((s, i) => <Cell key={i}>{s.toFixed(0)}M</Cell>)}
              <Cell color="#ef4444">{((shares[4] - SHARES_0) / SHARES_0 * 100).toFixed(1)}%</Cell>
            </tr>
            <tr>
              <Cell align="left">Earnings Per Share</Cell>
              <Cell>$2.53</Cell>
              {eps.map((e, i) => <Cell key={i} highlight color="#ff007f">${e.toFixed(2)}</Cell>)}
              <Cell highlight color="#ff007f">{cagr5y(eps[4], 2.53)}</Cell>
            </tr>

            <SectionHeader title="Alpha Valuation" color="text-amber-500" />
            <tr className="bg-[#ff007f]/5">
              <Cell align="left" highlight border={false}>Target Price (USD)</Cell>
              <Cell highlight border={false}>${CUR_PRICE.toFixed(2)}</Cell>
              {priceEnhanced.map((p, i) => (
                <Cell key={i} highlight border={false} color="#ff007f" className="text-sm font-black">${p.toFixed(2)}</Cell>
              ))}
              <Cell highlight border={false} color="#ff007f" className="text-sm font-black">{cagrs[4].toFixed(1)}%</Cell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
