
import React, { useState, useMemo } from 'react';
import { ScenarioType } from './types';
import { calculateProjection } from './services/projectionService';
import { CATALYSTS, CUR_PRICE } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import ProjectionChart from './components/ProjectionChart';
import FinancialTable from './components/FinancialTable';
import AnalystChat from './components/AnalystChat';

type ViewType = 'home' | 'nflx';

interface StockRow {
  ticker: string;
  buy: 'YES' | 'Maybe' | 'No';
  value: 'undervalued' | 'fair price' | 'overvalued';
  fairPrice: string;
  active?: boolean;
}

const STOCKS: StockRow[] = [
  { ticker: 'NFLX', buy: 'YES', value: 'undervalued', fairPrice: '$112-155', active: true },
  { ticker: 'TKO', buy: 'Maybe', value: 'overvalued', fairPrice: '$185' },
  { ticker: 'LQDA', buy: 'No', value: 'overvalued', fairPrice: '$14' },
  { ticker: 'LLY', buy: 'No', value: 'overvalued', fairPrice: '$977' },
  { ticker: 'APH', buy: 'YES', value: 'fair price', fairPrice: '$155' },
  { ticker: 'SMCI', buy: 'YES', value: 'undervalued', fairPrice: '43.25' },
  { ticker: 'ENPH', buy: 'No', value: 'fair price', fairPrice: '$38' },
  { ticker: 'CRWD', buy: 'Maybe', value: 'undervalued', fairPrice: '$485' },
  { ticker: 'UBER', buy: 'Maybe', value: 'undervalued', fairPrice: '$75' },
  { ticker: 'FTNT', buy: 'Maybe', value: 'fair price', fairPrice: '$84' },
  { ticker: 'PANW', buy: 'No', value: 'overvalued', fairPrice: '$135' },
  { ticker: 'PINS', buy: 'YES', value: 'undervalued', fairPrice: '$27' },
  { ticker: 'RBRK', buy: 'Maybe', value: 'fair price', fairPrice: '$48–56' },
  { ticker: 'KKR', buy: 'YES', value: 'fair price', fairPrice: '$110' },
  { ticker: 'SPGI', buy: 'No', value: 'overvalued', fairPrice: '$347' },
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [scenario, setScenario] = useState<ScenarioType>(ScenarioType.BASE);

  const allProjections = useMemo(() => ({
    [ScenarioType.BEAR]: calculateProjection(ScenarioType.BEAR),
    [ScenarioType.BASE]: calculateProjection(ScenarioType.BASE),
    [ScenarioType.BULL]: calculateProjection(ScenarioType.BULL),
  }), []);

  const currentProjection = allProjections[scenario];

  const investmentConclusion = useMemo(() => {
    const bearTarget = allProjections.bear.priceEnhanced[4];
    const baseTarget = allProjections.base.priceEnhanced[4];
    const bullTarget = allProjections.bull.priceEnhanced[4];
    
    const pwAvg = bearTarget * 0.25 + baseTarget * 0.5 + bullTarget * 0.25;
    const cagr = (Math.pow(pwAvg / CUR_PRICE, 1 / 5) - 1) * 100;
    const tenKResult = (pwAvg / CUR_PRICE) * 10000;

    return { pwAvg, cagr, tenKResult };
  }, [allProjections]);

  if (view === 'home') {
    return (
      <div className="min-h-screen bg-[#0a1128] flex font-sans">
        {/* Left Side: Fixed Hero Hook */}
        <div className="w-1/2 h-screen sticky top-0 bg-[#0a1128] flex items-center justify-center p-12 lg:p-24 overflow-hidden border-r border-slate-800/30">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,#ff007f_0%,transparent_60%)]"></div>
          </div>
          <div className="z-10 w-full">
            <h1 className="text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] text-left select-none animate-pulse">
              IS it<br />A<br />BUY?
            </h1>
          </div>
        </div>

        {/* Right Side: Simple Elegant List */}
        <div className="w-1/2 bg-[#0d1630]">
          <div className="px-12 pt-20 pb-12">
            <div className="text-amber-500 font-black text-[10px] tracking-[0.3em] uppercase mb-2">Alpha Research Group</div>
            <h2 className="text-slate-400 text-sm font-medium">Evaluating hot stocks on a market every day!</h2>
          </div>
          
          <div className="px-12 pb-24 space-y-2">
            {STOCKS.map((stock) => {
              const dotColor = 
                stock.value === 'undervalued' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                stock.value === 'fair price' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' :
                'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';

              return (
                <button
                  key={stock.ticker}
                  onClick={() => stock.active && setView('nflx')}
                  disabled={!stock.active}
                  className={`
                    w-full flex items-center justify-between p-4 group transition-all duration-300 rounded-lg
                    ${stock.active 
                      ? 'hover:bg-slate-800/40 cursor-pointer' 
                      : 'opacity-40 cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-5xl lg:text-6xl font-black transition-colors ${stock.active ? 'text-white group-hover:text-amber-500' : 'text-slate-600'}`}>
                      {stock.ticker}
                    </span>
                    <div className="flex flex-col items-start leading-none gap-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fair Value</span>
                      <span className="text-lg font-bold text-slate-300 mono">{stock.fairPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {stock.active && (
                      <span className="text-amber-500 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">
                        OPEN ANALYSIS →
                      </span>
                    )}
                    <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer inside right side */}
          <div className="px-12 py-8 border-t border-slate-800/50 bg-[#0b1227]/50 sticky bottom-0 backdrop-blur-sm">
            <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest text-center">
              Real-time quantitative overlay • Professional Grade Analytics
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-[#ff007f]/30 font-sans relative overflow-x-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_80%_20%,#ff007f15_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_20%_80%,#fbbf2408_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        
        {/* Top Nav Back Link */}
        <div className="mb-8">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-3 text-[10px] font-black text-[#ff007f] hover:text-white uppercase tracking-[0.2em] transition-all group px-4 py-2 bg-[#ff007f]/5 rounded-full border border-[#ff007f]/20"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Return to Universe
          </button>
        </div>

        {/* Header Section */}
        <header className="mb-12 border-b-2 border-[#ff007f] pb-8 relative">
          <div className="absolute top-0 right-0 text-[10px] font-black text-[#ff007f]/40 uppercase tracking-[0.4em] leading-none pointer-events-none select-none">
            EYES ONLY // QUANT ANALYSIS
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6">
            <span className="w-12 h-[2px] bg-amber-500/50"></span>
            NFLX ALPHA RESEARCH UNIT
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
            NFLX <span className="text-[#ff007f] drop-shadow-[0_0_15px_rgba(255,0,127,0.4)]">2030</span>
          </h1>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 px-5 py-2 bg-[#0d1630] border border-slate-800 rounded-lg shadow-inner">
              <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">Entry</span>
              <span className="text-white mono text-lg font-bold">${CUR_PRICE.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 bg-[#0d1630] border border-slate-800 rounded-lg shadow-inner">
              <span className="text-[#ff007f] font-black text-[10px] uppercase tracking-widest">Rating</span>
              <span className="text-white text-lg font-bold">STRONG BUY</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 bg-[#0d1630] border border-slate-800 rounded-lg shadow-inner">
              <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Horizon</span>
              <span className="text-white text-lg font-bold">5 YEARS</span>
            </div>
          </div>
        </header>

        {/* Narrative Box */}
        <div className={`mb-10 p-8 rounded-2xl border-l-[6px] transition-all duration-700 bg-[#0d1630]/80 backdrop-blur-md border-[#ff007f] shadow-[0_0_40px_rgba(0,0,0,0.3)] relative group`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff007f05] to-transparent pointer-events-none rounded-2xl"></div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff007f] text-white shadow-[0_0_15px_rgba(255,0,127,0.5)]">
                  Intelligence Core
                </span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">PROBABILITY WEIGHTED: 50%</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">{currentProjection.config.label}</h2>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">Target Price High</div>
              <div className="text-5xl lg:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                ${currentProjection.priceEnhanced[4].toFixed(0)}
              </div>
            </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed max-w-5xl font-medium border-t border-slate-800/50 pt-6">
            <span className="text-[#ff007f] font-black text-3xl leading-none mr-2">"</span>
            {currentProjection.config.desc}
            <span className="text-[#ff007f] font-black text-3xl leading-none ml-2">"</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-[#0d1630]/60 p-2 rounded-xl inline-block border border-slate-800">
              <ScenarioSelector active={scenario} onChange={setScenario} />
            </div>
            
            <div className="rounded-2xl border border-slate-800 bg-[#0d1630]/40 overflow-hidden backdrop-blur-sm">
              <ProjectionChart currentScenario={scenario} allProjections={allProjections} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1630]/40 overflow-hidden backdrop-blur-sm">
              <FinancialTable data={currentProjection} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
                Key Projections
              </h3>
              <div className="space-y-6">
                {[
                  { label: '5Y Total Return', value: `+${currentProjection.cumReturns[4].toFixed(0)}%`, color: 'text-white' },
                  { label: 'Implied CAGR', value: `${currentProjection.cagrs[4].toFixed(1)}%`, color: 'text-[#ff007f]' },
                  { label: '2030E Multiple', value: `${currentProjection.config.peMultiple[4]}x`, color: 'text-white' },
                  { label: '2030E EPS', value: `$${currentProjection.eps[4].toFixed(2)}`, color: 'text-amber-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.label}</span>
                    <span className={`text-3xl font-black ${item.color} leading-none`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <AnalystChat scenario={scenario} projection={currentProjection} />
          </div>
        </div>

        {/* Catalyst Grid */}
        <div className="bg-[#0d1630]/40 border border-slate-800 rounded-2xl p-10 mb-12 backdrop-blur-md">
          <h3 className="text-[10px] font-black text-[#ff007f] uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
            <span className="w-10 h-[1px] bg-[#ff007f]"></span>
            EXECUTION TIMELINE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CATALYSTS.map((c, i) => (
              <div key={i} className="bg-[#0a1128] rounded-xl p-6 border border-slate-800 transition-all hover:border-[#ff007f]/40 hover:-translate-y-1 group h-full">
                <div className="text-4xl font-black text-white mb-2 group-hover:text-[#ff007f] transition-colors">{c.yr}</div>
                <div className={`text-[10px] font-black mb-4 px-2 py-0.5 rounded-full inline-block ${c.risk === 'HIGH' ? 'bg-red-500/20 text-red-500' : c.risk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}`}>
                   {c.risk} RISK
                </div>
                <div className="space-y-3">
                  {c.events.map((e, j) => (
                    <div key={j} className="text-xs text-slate-400 leading-relaxed font-medium pb-2 border-b border-slate-800/50 last:border-0">
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion Hero */}
        <div className="relative group overflow-hidden rounded-2xl p-1 bg-[#0d1630]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff007f] via-amber-500 to-[#ff007f] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-[#0d1630] rounded-2xl p-10 lg:p-14">
            <h3 className="text-[10px] font-black text-[#ff007f] uppercase tracking-[0.4em] mb-8">
              FINAL INVESTMENT VERDICT
            </h3>
            <div className="text-2xl lg:text-4xl text-white font-black leading-tight max-w-5xl mb-8">
              Our probability-weighted target of <span className="text-white underline decoration-[#ff007f] decoration-4 underline-offset-8">${investmentConclusion.pwAvg.toFixed(0)}</span> represents a <span className="text-amber-500">{investmentConclusion.cagr.toFixed(1)}% CAGR</span> over the next 5 years.
            </div>
            <p className="text-slate-400 text-lg max-w-4xl font-medium">
              At an entry price of ${CUR_PRICE.toFixed(2)}, Netflix provides a rare combination of platform optionality, margin expansion, and shareholder yield that current market sentiment is significantly discounting. 
            </p>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] uppercase tracking-[0.4em] font-black">
          <div>QUANT ALPHA CORE // V.2026.02</div>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Proprietary Model</span>
            <span className="hover:text-white cursor-pointer transition-colors">GS TMT Adjusted</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
