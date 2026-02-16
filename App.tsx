
import React, { useState, useMemo } from 'react';
import { ScenarioType } from './types';
import { calculateProjection } from './services/projectionService';
import { TICKERS } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import ProjectionChart from './components/ProjectionChart';
import AnalystChat from './components/AnalystChat';
import ScenarioMetricsCard from './components/ScenarioMetricsCard';

type ViewType = 'home' | string;

interface StockRow {
  ticker: string;
  buy: 'YES' | 'Maybe' | 'No';
  value: 'undervalued' | 'fair price' | 'overvalued';
  fairPrice: string;
  active?: boolean;
}

const STOCKS: StockRow[] = [
  { ticker: 'NFLX', buy: 'YES', value: 'undervalued', fairPrice: '$112-155', active: true },
  { ticker: 'UBER', buy: 'YES', value: 'undervalued', fairPrice: '$85-185', active: true },
  { ticker: 'DUOL', buy: 'YES', value: 'undervalued', fairPrice: '$165-210', active: true },
  { ticker: 'FICO', buy: 'YES', value: 'undervalued', fairPrice: '$1500-1800', active: true },
  { ticker: 'SMCI', buy: 'YES', value: 'undervalued', fairPrice: '$43.25', active: false },
  { ticker: 'TKO', buy: 'Maybe', value: 'overvalued', fairPrice: '$185', active: false },
  { ticker: 'LQDA', buy: 'No', value: 'overvalued', fairPrice: '$14', active: false },
  { ticker: 'LLY', buy: 'No', value: 'overvalued', fairPrice: '$977', active: false },
  { ticker: 'APH', buy: 'YES', value: 'fair price', fairPrice: '$155', active: false },
  { ticker: 'ENPH', buy: 'No', value: 'fair price', fairPrice: '$38', active: false },
  { ticker: 'CRWD', buy: 'Maybe', value: 'undervalued', fairPrice: '$485', active: false },
  { ticker: 'FTNT', buy: 'Maybe', value: 'fair price', fairPrice: '$84', active: false },
  { ticker: 'PANW', buy: 'No', value: 'overvalued', fairPrice: '$135', active: false },
  { ticker: 'PINS', buy: 'YES', value: 'undervalued', fairPrice: '$27', active: false },
  { ticker: 'RBRK', buy: 'Maybe', value: 'fair price', fairPrice: '$48–56', active: false },
  { ticker: 'KKR', buy: 'YES', value: 'fair price', fairPrice: '$110', active: false },
  { ticker: 'SPGI', buy: 'No', value: 'overvalued', fairPrice: '$347', active: false },
];

const App: React.FC = () => {
  const [activeTicker, setActiveTicker] = useState<ViewType>('home');
  const [scenario, setScenario] = useState<ScenarioType>(ScenarioType.BASE);
  const [showEnhancements, setShowEnhancements] = useState(true);

  const tickerDef = activeTicker !== 'home' ? TICKERS[activeTicker] : null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, showEnhancements),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, showEnhancements),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, showEnhancements),
    };
  }, [activeTicker, showEnhancements]);

  const currentProjection = allProjections ? allProjections[scenario] : null;

  const investmentConclusion = useMemo(() => {
    if (!allProjections || !tickerDef) return null;
    const isSpecial = tickerDef.ticker === 'DUOL' || tickerDef.ticker === 'FICO' || tickerDef.ticker === 'UBER';
    const bearTarget = isSpecial ? allProjections.bear.pricePerShare! : allProjections.bear.priceEnhanced[4];
    const baseTarget = isSpecial ? allProjections.base.pricePerShare! : allProjections.base.priceEnhanced[4];
    const bullTarget = isSpecial ? allProjections.bull.pricePerShare! : allProjections.bull.priceEnhanced[4];
    
    const pwAvg = bearTarget * 0.25 + baseTarget * 0.5 + bullTarget * 0.25;
    const cagr = (Math.pow(pwAvg / tickerDef.currentPrice, 1 / 5) - 1) * 100;

    return { pwAvg, cagr };
  }, [allProjections, tickerDef]);

  if (activeTicker === 'home') {
    return (
      <div className="min-h-screen bg-[#0a1128] flex font-sans overflow-hidden">
        {/* Left Column - Sticky and Centered */}
        <div className="w-1/2 h-screen sticky top-0 bg-[#0a1128] flex items-center justify-center p-12 lg:p-24 overflow-hidden border-r border-slate-800/30">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
          </div>
          <div className="z-10 w-full text-center">
            <h1 className="text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] select-none animate-pulse uppercase">
              IS IT<br />A<br />BUY?
            </h1>
          </div>
        </div>

        {/* Right Column - Scrollable List */}
        <div className="w-1/2 h-screen bg-[#0d1630] overflow-y-auto">
          <div className="px-12 pt-20 pb-12">
            <div className="text-amber-500 font-black text-[10px] tracking-[0.3em] uppercase mb-2">Alpha Research Group</div>
            <h2 className="text-slate-400 text-sm font-medium">Evaluating market opportunities with high-conviction quantitative overlays.</h2>
          </div>
          
          <div className="px-12 pb-24 space-y-0">
            {STOCKS.map((stock) => {
              const dotColor = 
                stock.value === 'undervalued' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                stock.value === 'fair price' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' :
                'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';

              return (
                <button
                  key={stock.ticker}
                  onClick={() => stock.active && setActiveTicker(stock.ticker)}
                  disabled={!stock.active}
                  className={`
                    w-full flex items-center justify-between py-6 px-4 group transition-all duration-300 border-b border-slate-800/50 last:border-0
                    ${stock.active ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-5xl lg:text-6xl font-black transition-colors text-slate-500 group-hover:text-white`}>
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
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 ${dotColor}`}></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!tickerDef || !currentProjection || !allProjections || !investmentConclusion) return null;

  const accentColor = tickerDef.themeColor;
  const isSpecial = tickerDef.ticker === 'DUOL' || tickerDef.ticker === 'FICO' || tickerDef.ticker === 'UBER';

  const usd = (n: number) => "$" + n.toFixed(2);
  const pct = (n: number) => (n * 100).toFixed(1) + "%";

  return (
    <div className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden">
      <div 
        className="absolute top-0 right-0 w-[50vw] h-[50vh] opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle_at_80%_20%, ${accentColor} 0%, transparent 70%)` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
          <button 
            onClick={() => { setActiveTicker('home'); }}
            className="flex items-center gap-3 text-[10px] font-black hover:text-white uppercase tracking-[0.25em] transition-all duration-300 group px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700 shadow-xl"
            style={{ color: accentColor }}
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300 text-lg leading-none">←</span>
            Return to Universe
          </button>
        </div>

        <header className="mb-12 border-b-2 pb-8 relative" style={{ borderColor: accentColor }}>
          <div className="flex items-center gap-3 text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6">
            <span className="w-12 h-[2px] bg-amber-500/50"></span>
            {tickerDef.name.toUpperCase()} {isSpecial ? "ENHANCED DCF" : "ALPHA RESEARCH"}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
            {tickerDef.ticker} <span style={{ color: accentColor }}>2030</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 px-5 py-2 bg-[#0d1630] border border-slate-800 rounded-lg">
              <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">Entry</span>
              <span className="text-white mono text-lg font-bold">${tickerDef.currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 bg-[#0d1630] border border-slate-800 rounded-lg">
              <span className="font-black text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>Rating</span>
              <span className="text-white text-lg font-bold">STRONG BUY</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">
            {/* Investment Context Section */}
            <div className="p-8 rounded-2xl border-l-[6px] bg-[#0d1630]/80 shadow-2xl" style={{ borderLeftColor: '#f59e0b' }}>
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4">INVESTMENT CONTEXT // QUANT OVERLAY</h3>
              <div className="flex flex-col gap-6">
                <p className="text-xl text-white font-bold leading-tight">
                  {tickerDef.ticker === 'FICO' 
                    ? "FICO is a monopoly-grade franchise with 90%+ market share and 54% operating margins. Q1 FY26 showed +29% Scores growth."
                    : tickerDef.ticker === 'DUOL' 
                    ? "DUOL is a high-margin digital subscription platform with a strong brand moat and global scale. However, the quantitative signal is flashing caution."
                    : tickerDef.ticker === 'UBER'
                    ? "Uber is transitioning into a high-margin advertising and autonomous platform. While technicals are currently weak (RS 16), the fundamental re-rating logic remains strong."
                    : `${tickerDef.ticker} represents a core high-conviction position in our ${tickerDef.sector} portfolio.`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                    <div className="text-[10px] font-black text-red-500 uppercase mb-1">RS Rating</div>
                    <div className="text-2xl font-black text-white">{tickerDef.ticker === 'FICO' ? '16' : tickerDef.ticker === 'DUOL' ? '4' : tickerDef.ticker === 'UBER' ? '16' : 'N/A'}</div>
                    <div className="text-[9px] text-red-400 font-bold uppercase mt-1 text-center">Institutional Momentum Score</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Momentum</div>
                    <div className="text-lg font-black text-white">{tickerDef.ticker === 'NFLX' ? 'BULLISH' : 'BROKEN'}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Technical Overlay</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Moat Strength</div>
                    <div className="text-lg font-black text-white">MONOPOLISTIC</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">Qualitative Alpha</div>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-4">
                  <p className="text-amber-500 text-sm font-black italic">
                    {tickerDef.ticker === 'UBER'
                      ? "AV platform dominance + aggressive buybacks creates an asymmetric upside scenario."
                      : tickerDef.ticker === 'FICO' 
                      ? "Maximum pessimism + strong fundamentals = high probability of outsized forward returns."
                      : "This is now a fundamental re-rating story, not a momentum stock."}
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario & Enhancement Toggle Grouped */}
            <div className="flex flex-wrap items-center gap-6 bg-[#0d1630]/60 p-4 rounded-2xl border border-slate-800 shadow-xl">
              <ScenarioSelector active={scenario} onChange={setScenario} />
              
              <div className="h-12 w-px bg-slate-800 hidden md:block"></div>
              
              {isSpecial && (
                <div className="flex items-center gap-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                      {tickerDef.ticker === 'UBER' ? 'Extra DCF' : 'Enhanced'}
                    </span>
                    <button 
                      onClick={() => setShowEnhancements(!showEnhancements)}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all duration-500 border whitespace-nowrap ${showEnhancements ? 'bg-indigo-600 border-indigo-500 text-white scale-110 shadow-[0_0_20px_rgba(79,70,229,0.5)] z-10' : 'bg-slate-800 border-slate-700 text-slate-400 scale-100 opacity-60 z-0'}`}
                    >
                      {showEnhancements ? "★ ACTIVE" : "DISABLED"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1630]/40 overflow-hidden shadow-inner">
              <ProjectionChart currentScenario={scenario} allProjections={allProjections as any} />
            </div>

            {/* Investors Summary Section */}
            <div className="bg-[#0d1630]/80 p-8 rounded-2xl border border-slate-800 shadow-xl">
               <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                 <span className="w-10 h-[2px] bg-amber-500/50"></span>
                 INVESTOR SUMMARY // Q1 2026
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div>
                   <h4 className="text-white font-black text-sm mb-4 uppercase tracking-wider">The Bull Narrative</h4>
                   <ul className="space-y-4">
                     <li className="flex gap-4">
                       <span className="text-green-500 font-black">01</span>
                       <p className="text-slate-400 text-xs leading-relaxed italic">
                         {tickerDef.ticker === 'FICO' 
                           ? '"FICO 10T adoption creates a multi-year tailwind for higher unit pricing in mortgage and auto pulls."' 
                           : tickerDef.ticker === 'UBER'
                           ? '"AV platform dominance with Waymo/Tesla partnerships creates the global autonomous operating system."'
                           : '"Transition to global platform unlocks a 4x TAM expansion with zero CAC friction."'}
                       </p>
                     </li>
                     <li className="flex gap-4">
                       <span className="text-green-500 font-black">02</span>
                       <p className="text-slate-400 text-xs leading-relaxed italic">
                         {tickerDef.ticker === 'FICO' 
                           ? '"Software Platform ARR hitting 50%+ of mix re-rates the multiple toward SaaS data peers."' 
                           : tickerDef.ticker === 'UBER'
                           ? '"Aggressive $27B buyback program targets 7.5% share count reduction over 5 years."'
                           : '"AI-driven margin flywheel allows personalized content at near-zero marginal cost."'}
                       </p>
                     </li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="text-white font-black text-sm mb-4 uppercase tracking-wider">The Risk Overlay</h4>
                   <ul className="space-y-4">
                     <li className="flex gap-4">
                       <span className="text-red-500 font-black">01</span>
                       <p className="text-slate-400 text-xs leading-relaxed italic">
                          {tickerDef.ticker === 'FICO' 
                            ? '"Regulatory intervention regarding credit scoring monopolization remains the primary tail risk."' 
                            : tickerDef.ticker === 'UBER'
                            ? '"Regulatory pressures force driver reclassification, potentially killing logistics margins."'
                            : '"Potential commoditization of core content by LLMs demands winning on gamification loops."'}
                       </p>
                     </li>
                     <li className="flex gap-4">
                       <span className="text-red-500 font-black">02</span>
                       <p className="text-slate-400 text-xs leading-relaxed italic">
                          {tickerDef.ticker === 'FICO' 
                            ? '"High leverage with $3.2B debt creates sensitivity to sustained higher-for-longer rate environments."' 
                            : tickerDef.ticker === 'UBER'
                            ? '"AV competitors bypass platform by building their own consumer apps."'
                            : '"SBC-driven dilution remains a hurdle for per-share value accretion."'}
                       </p>
                     </li>
                   </ul>
                 </div>
               </div>
            </div>

            {/* Scenario Metrics Grid */}
            {isSpecial && tickerDef.ticker !== 'UBER' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
                <ScenarioMetricsCard data={allProjections!.bear} currentPrice={tickerDef.currentPrice} />
                <ScenarioMetricsCard data={allProjections!.base} currentPrice={tickerDef.currentPrice} />
                <ScenarioMetricsCard data={allProjections!.bull} currentPrice={tickerDef.currentPrice} />
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8">Valuation Metrics</h3>
              <div className="space-y-6">
                {[
                  { label: tickerDef.ticker === 'UBER' ? '5Y CAGR' : '5Y Total Return', value: isSpecial ? (tickerDef.ticker === 'UBER' ? pct(currentProjection.config.hardcodedTrajectory![4] / tickerDef.currentPrice - 1) : pct(currentProjection.cumReturns[0]/100)) : pct(currentProjection.cumReturns[4]/100), color: 'text-white' },
                  { label: 'WACC', value: isSpecial ? (tickerDef.ticker === 'UBER' ? (currentProjection.config.waccRange || '7.5%') : pct(currentProjection.w!)) : '10.5%', color: accentColor },
                  { label: 'Terminal Growth', value: isSpecial ? pct(currentProjection.config.termGrowth || (tickerDef.ticker === 'UBER' ? 0.028 : 0.03)) : '3.0%', color: 'text-white' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.label}</span>
                    <span className={`text-3xl font-black leading-none`} style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <AnalystChat scenario={scenario} projection={currentProjection} />
          </div>
        </div>

        <div className="mt-12 group relative rounded-2xl p-1 bg-[#0d1630] shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(90deg, ${accentColor}, #fbbf24, ${accentColor})` }}></div>
          <div className="relative bg-[#0d1630] rounded-2xl p-10 lg:p-14">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8" style={{ color: accentColor }}>FINAL INVESTMENT VERDICT</h3>
            <div className="text-2xl lg:text-4xl text-white font-black leading-tight max-w-5xl mb-8">
              Our {showEnhancements ? (tickerDef.ticker === 'UBER' ? "Enhanced (Extra DCF)" : "Enhanced") : (tickerDef.ticker === 'UBER' ? "Conservative (DCF)" : "Baseline")} target of <span className="text-white underline decoration-4 underline-offset-8" style={{ textDecorationColor: accentColor }}>
                {isSpecial ? usd(currentProjection.pricePerShare!) : usd(currentProjection.priceEnhanced[4])}
              </span> represents an asymmetric risk/reward opportunity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
