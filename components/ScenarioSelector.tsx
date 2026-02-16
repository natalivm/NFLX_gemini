
import React from 'react';
import { ScenarioType } from '../types';

interface Props {
  active: ScenarioType;
  onChange: (type: ScenarioType) => void;
}

const ScenarioSelector: React.FC<Props> = ({ active, onChange }) => {
  const options: {type: ScenarioType, color: string, label: string}[] = [
    { type: ScenarioType.BEAR, color: '#ef4444', label: 'CONSERVATIVE' },
    { type: ScenarioType.BASE, color: '#3b82f6', label: 'NEUTRAL' },
    { type: ScenarioType.BULL, color: '#ff007f', label: 'AGGRESSIVE' },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center p-1">
      {options.map((opt) => {
        const isActive = active === opt.type;
        
        return (
          <button
            key={opt.type}
            onClick={() => onChange(opt.type)}
            className={`
              flex flex-col items-start px-8 py-4 rounded-xl transition-all duration-500 relative overflow-hidden group
              ${isActive 
                ? 'bg-[#1a233e] shadow-[0_0_20px_rgba(0,0,0,0.4)] scale-110 z-10 border border-white/10' 
                : 'bg-transparent hover:bg-white/5 scale-100 z-0'}
            `}
          >
            {isActive && (
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ 
                  backgroundColor: opt.color, 
                  boxShadow: `0 0 15px ${opt.color}`,
                  filter: 'brightness(1.2)'
                }}
              ></div>
            )}
            <span className={`text-[10px] font-black uppercase tracking-[0.25em] mb-1 ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
              Scenario
            </span>
            <span className={`text-base font-black tracking-tight ${isActive ? 'text-white' : 'text-slate-500'}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ScenarioSelector;
