
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { ScenarioType, ProjectionData } from '../types';
import { CUR_PRICE, CONFIGS } from '../constants';

interface Props {
  currentScenario: ScenarioType;
  allProjections: Record<ScenarioType, ProjectionData>;
}

const ProjectionChart: React.FC<Props> = ({ currentScenario, allProjections }) => {
  const data = [0, 1, 2, 3, 4].map((i) => {
    return {
      year: 2026 + i,
      bear: allProjections.bear.priceEnhanced[i],
      base: allProjections.base.priceEnhanced[i],
      bull: allProjections.bull.priceEnhanced[i],
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a1128] border border-[#ff007f]/40 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
          <p className="text-[#ff007f] text-[10px] font-black mb-3 uppercase tracking-widest">{label} TARGETS</p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex justify-between gap-10 mb-2 items-center border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                {entry.name}
              </span>
              <span className="text-sm font-black text-white mono">${entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-[10px] font-black text-[#ff007f] uppercase tracking-[0.3em] mb-2">Price Velocity Matrix</h3>
          <p className="text-xs text-slate-500 font-medium italic">Projected valuation paths // Multivariable Outcomes</p>
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="year" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              padding={{ left: 30, right: 30 }}
              tick={{ fontWeight: 800 }}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(val) => `$${val}`}
              tick={{ fontWeight: 800 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={CUR_PRICE} 
              stroke="#fbbf24" 
              strokeDasharray="4 4" 
              strokeWidth={2}
              label={{ value: 'SPOT', position: 'right', fill: '#fbbf24', fontSize: 10, fontWeight: 900 }} 
            />
            <Line 
              type="monotone" 
              dataKey="bear" 
              name="Conservative"
              stroke="#ef4444" 
              strokeWidth={currentScenario === 'bear' ? 4 : 1} 
              dot={false}
              activeDot={{ r: 6, fill: '#ef4444' }}
              opacity={currentScenario === 'bear' ? 1 : 0.2}
            />
            <Line 
              type="monotone" 
              dataKey="base" 
              name="Base Case"
              stroke="#3b82f6" 
              strokeWidth={currentScenario === 'base' ? 4 : 1} 
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6' }}
              opacity={currentScenario === 'base' ? 1 : 0.2}
            />
            <Line 
              type="monotone" 
              dataKey="bull" 
              name="Aggressive"
              stroke="#ff007f" 
              strokeWidth={currentScenario === 'bull' ? 4 : 1.5} 
              dot={false}
              activeDot={{ r: 8, fill: '#ff007f' }}
              opacity={currentScenario === 'bull' ? 1 : 0.2}
              filter="url(#glow)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionChart;
