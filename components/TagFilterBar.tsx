import React from 'react';
import { TAG_DEFS } from '../constants';
import { cn } from '../utils';

interface Props {
  activeTagFilter: string | null;
  tagCounts: Record<string, number>;
  onToggle: (tag: string | null) => void;
}

const TagFilterBar: React.FC<Props> = ({ activeTagFilter, tagCounts, onToggle }) => (
  <div className="flex flex-wrap gap-2 mb-6 pt-1">
    {TAG_DEFS.map(({ tag, label, color, activeBorder, activeBg, dot }) => {
      const count = tagCounts[tag];
      const isActive = activeTagFilter === tag;
      return (
        <button
          key={tag}
          onClick={() => onToggle(isActive ? null : tag)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all duration-200",
            isActive
              ? `${activeBorder} ${activeBg} ${color}`
              : "border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-300"
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", isActive ? dot : 'bg-slate-600')}></span>
          {label}
          <span className={cn(
            "font-mono text-[11px] px-1.5 py-0.5 rounded",
            isActive ? `${activeBg} ${color}` : 'bg-slate-800 text-slate-400'
          )}>
            {count}
          </span>
        </button>
      );
    })}
    {activeTagFilter && (
      <button
        onClick={() => onToggle(null)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-300 hover:border-slate-500 transition-all duration-200"
      >
        <span className="text-xs">&#x2715;</span> CLEAR
      </button>
    )}
  </div>
);

export default TagFilterBar;
