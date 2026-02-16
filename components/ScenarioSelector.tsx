
import React from 'react';
import { ScenarioType } from '../types';
import { CONFIGS } from '../constants';

interface Props {
  active: ScenarioType;
  onChange: (type: ScenarioType) => void;
}

const ScenarioSelector: React.FC<Props> = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {(Object.keys(CONFIGS) as ScenarioType[]).map((type) => {
        const config = CONFIGS[type];
        const isActive = active === type;
        
        // Map original colors to synthwave theme
        const themeColor = type === 'bull' ? '#22c55e' : type === 'bear' ? '#ef4444' : '#3b82f6';
        const label = type === 'bull' ? 'AGGRESSIVE' : type === 'bear' ? 'CONSERVATIVE' : 'NEUTRAL';

        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`
              flex flex-col items-start px-6 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group
              ${isActive 
                ? 'bg-[#1a233e] shadow-lg' 
                : 'bg-transparent hover:bg-white/5'}
            `}
          >
            {isActive && (
              <div 
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
              ></div>
            )}
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-slate-400' : 'text-slate-600'}`}>
              Scenario
            </span>
            <span className={`text-sm font-black tracking-tight ${isActive ? 'text-white' : 'text-slate-500'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ScenarioSelector;
