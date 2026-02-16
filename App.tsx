
import React, { useState, useMemo } from 'react';
import { ScenarioType } from './types';
import { calculateProjection } from './services/projectionService';
import { CATALYSTS, CUR_PRICE } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import ProjectionChart from './components/ProjectionChart';
import FinancialTable from './components/FinancialTable';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        
        {/* Top Nav Back Link */}
        <div className="mb-6">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-amber-500 uppercase tracking-widest transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Return to Portfolio Universe
          </button>
        </div>

        {/* Header Section */}
        <header className="mb-10 border-b-2 border-amber-600 pb-6 relative">
          <div className="absolute top-0 right-0 text-[10px] font-black text-amber-600/50 uppercase tracking-widest leading-none pointer-events-none select-none">
            CONFIDENTIAL // FOR INSTITUTIONAL USE ONLY
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">
            <span className="w-8 h-[2px] bg-amber-500"></span>
            Institutional Equity Research Division
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter">
            NFLX <span className="text-slate-500 font-medium">5-Year Projected Value (2026–2030)</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-400 text-xs font-medium">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="text-amber-500 font-bold">CURRENT PRICE</span>
              <span className="text-white mono">${CUR_PRICE.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="text-amber-500 font-bold">RATING</span>
              <span className="text-white">CONTRARIAN BUY</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="text-amber-500 font-bold">POST-SPLIT</span>
              <span className="text-white">10:1 ADJUSTED</span>
            </div>
          </div>
        </header>

        {/* Narrative Box */}
        <div className={`mb-8 p-6 rounded-xl border-l-4 transition-all duration-500 bg-opacity-10 ${currentProjection.config.bg} border-l-[${currentProjection.config.color}]`} style={{ borderLeftColor: currentProjection.config.color }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded" style={{ backgroundColor: currentProjection.config.color, color: '#fff' }}>
                Strategy Narrative
              </span>
              <h2 className="text-2xl font-bold mt-2 text-white">{currentProjection.config.label}</h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase mb-1">2030E Target</div>
              <div className="text-4xl font-black" style={{ color: currentProjection.config.color }}>
                ${currentProjection.priceEnhanced[4].toFixed(0)}
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-4xl italic">
            "{currentProjection.config.desc}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <ScenarioSelector active={scenario} onChange={setScenario} />
            <ProjectionChart currentScenario={scenario} allProjections={allProjections} />
            <FinancialTable data={currentProjection} />
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-xl sticky top-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Scenario Summary
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">5Y Total Return</span>
                  <span className="text-xl font-black text-white">+{currentProjection.cumReturns[4].toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">Implied CAGR</span>
                  <span className="text-xl font-black text-white">{currentProjection.cagrs[4].toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">Exit Multiple</span>
                  <span className="text-xl font-black text-white">{currentProjection.config.peMultiple[4]}x</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">2030E EPS</span>
                  <span className="text-xl font-black text-white">${currentProjection.eps[4].toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-8 shadow-xl">
          <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6">
            CATALYST TIMELINE & KEY INFLECTION POINTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATALYSTS.map((c, i) => (
              <div key={i} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 h-full flex flex-col">
                <div className="text-2xl font-black text-white mb-1">{c.yr}</div>
                <div className={`text-xs font-bold mb-3 ${c.color}`}>Risk: {c.risk}</div>
                <div className="space-y-2.5 flex-1">
                  {c.events.map((e, j) => (
                    <div key={j} className="text-[11px] text-slate-400 leading-snug flex items-start gap-1.5 border-b border-slate-700/30 pb-1.5 last:border-0">
                      <span className="text-slate-500">•</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-8 shadow-xl">
          <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6">
            OUR PROJECTIONS VS. STREET CONSENSUS & TECHNICAL CONTEXT
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-5 text-slate-400 text-[13px] leading-relaxed">
              <p><strong className="text-white">Wall Street 12-Mo Consensus:</strong> $116–119 avg target. High: $152.50, Low: $92.00.</p>
              <p><strong className="text-white">Institutional Analyst Consensus:</strong> Neutral rating, $112 PT. Our model adds $15-25/share from M&A optionality consensus is not pricing in.</p>
            </div>
            <div className="space-y-5 text-slate-400 text-[13px] leading-relaxed">
              <p><strong className="text-red-400">IBD Technical Overlay (RS: 11):</strong> Stock is in a confirmed downtrend.</p>
              <p><strong className="text-green-400">Contrarian Setup:</strong> Maximum pessimism + strong fundamentals = high probability of outsized forward returns.</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/5 border-2 border-amber-500/40 rounded-lg p-8 mb-8">
          <h3 className="text-sm font-black text-amber-500 uppercase tracking-[0.15em] mb-4">
            INVESTMENT CONCLUSION
          </h3>
          <div className="text-[17px] text-slate-200 leading-[1.6] font-medium space-y-4">
            <p>
              Our probability-weighted 5-year target is <span className="text-amber-500 font-bold">${investmentConclusion.pwAvg.toFixed(0)}</span> (CAGR: <span className="text-amber-500 font-bold">{investmentConclusion.cagr.toFixed(1)}%</span>), turning $10,000 into <span className="text-amber-500 font-bold">${investmentConclusion.tenKResult.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>.
            </p>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
          <div>NFLX Investment Analytics // v4.28 // Feb 16, 2026</div>
        </footer>
      </div>
    </div>
  );
};

export default App;
