
import React from 'react';
import { ProjectionData } from '../types';

interface Props {
  data: ProjectionData;
  currentPrice: number;
}

const ScenarioMetricsCard: React.FC<Props> = ({ data, currentPrice }) => {
  const { config, pricePerShare, mosPrice, w, mosUpside } = data;
  const isPositive = (mosUpside || 0) >= 0;
  const verdictColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-[#0d1630]/60 border border-slate-800 rounded-xl p-6 shadow-xl transition-all hover:border-slate-700">
      <h3 className="text-lg font-black mb-1" style={{ color: config.color }}>
        {config.label}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
        {config.thesis || config.desc}
      </p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">DCF Value:</span>
          <span className="text-base font-black text-white">${pricePerShare?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">MoS (25%):</span>
          <span className="text-base font-black text-yellow-500">${mosPrice?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">WACC:</span>
          <span className="text-base font-black text-slate-300">{(w! * 100).toFixed(1)}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Terminal g:</span>
          <span className="text-base font-black text-slate-300">{(config.termGrowth! * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className={`pt-4 border-t border-slate-800/50 text-base font-black uppercase tracking-wider ${verdictColor}`}>
        {isPositive ? 'BUY' : 'AVOID'} — MoS {isPositive ? '+' : ''}{(mosUpside! * 100).toFixed(0)}% vs current
      </div>
    </div>
  );
};

export default ScenarioMetricsCard;
