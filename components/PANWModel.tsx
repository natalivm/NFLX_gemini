import React, { useState, useMemo } from "react";
import { AreaChart, Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Bar } from "recharts";
import { ArrowLeft } from "lucide-react";

const FONT = `'DM Sans', 'Segoe UI', sans-serif`;
const MONO = `'DM Mono', monospace`;

const C = {
  bg: "#0a0e1a", card: "#111827", border: "#1e293b",
  accent: "#3b82f6", bull: "#10b981", bullDim: "#064e3b",
  base: "#3b82f6", baseDim: "#1e3a5f",
  bear: "#ef4444", bearDim: "#7f1d1d",
  text: "#e2e8f0", textDim: "#64748b",
  yellow: "#f59e0b", panel: "#0f172a",
  consensus: "#f472b6", wait: "#fb923c",
};

interface Props {
  onBack: () => void;
}

const SliderInput = ({ label, value, onChange, min, max, step, format, color = C.accent, note }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; format: string; color?: string; note?: string;
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  const display = format === "pct" ? `${(value * 100).toFixed(1)}%` : format === "x" ? `${value.toFixed(1)}x` : `$${value.toFixed(2)}`;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ color: C.textDim, fontSize: 11, fontWeight: 500, letterSpacing: "0.03em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ color, fontSize: 13, fontWeight: 700, fontFamily: MONO }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", height: 5, appearance: "none", borderRadius: 3, cursor: "pointer", background: `linear-gradient(to right, ${color} ${pct}%, ${C.border} ${pct}%)`, outline: "none" }} />
      {note && <div style={{ fontSize: 9, color: C.textDim, marginTop: 2, opacity: 0.7 }}>{note}</div>}
      <style>{`input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:${color};border:2px solid ${C.bg};cursor:pointer;box-shadow:0 0 6px ${color}44;}`}</style>
    </div>
  );
};

const Stat = ({ label, value, color = C.text, large, sub }: {
  label: string; value: string; color?: string; large?: boolean; sub?: string;
}) => (
  <div style={{ textAlign: "center", padding: "8px 0" }}>
    <div style={{ color: C.textDim, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{label}</div>
    <div style={{ color, fontSize: large ? 26 : 18, fontWeight: 800, fontFamily: MONO, lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ color: C.textDim, fontSize: 9, marginTop: 2 }}>{sub}</div>}
  </div>
);

const ScenarioToggle = ({ active, onChange }: { active: string; onChange: (k: string) => void }) => {
  const opts = [
    { key: "bear", label: "Bear", color: C.bear },
    { key: "base", label: "Base", color: C.base },
    { key: "bull", label: "Bull", color: C.bull },
  ];
  return (
    <div style={{ display: "flex", gap: 3, background: C.bg, borderRadius: 8, padding: 3 }}>
      {opts.map((o) => (
        <button key={o.key} onClick={() => onChange(o.key)}
          style={{
            flex: 1, padding: "6px 12px", border: "none", borderRadius: 6, cursor: "pointer",
            fontSize: 11, fontWeight: 700, fontFamily: FONT, letterSpacing: "0.04em", transition: "all 0.2s",
            background: active === o.key ? o.color + "22" : "transparent",
            color: active === o.key ? o.color : C.textDim,
            boxShadow: active === o.key ? `inset 0 0 0 1.5px ${o.color}` : "none",
          }}>
          {o.label}
        </button>
      ))}
    </div>
  );
};

const SensCell: React.FC<{ val: number; highlight: boolean }> = ({ val, highlight }) => {
  const v = val * 100;
  const bg = v >= 15 ? C.bullDim : v >= 8 ? C.baseDim : v >= 0 ? "#78350f" : C.bearDim;
  const color = v >= 15 ? C.bull : v >= 8 ? C.base : v >= 0 ? C.yellow : C.bear;
  return (
    <td style={{
      padding: "5px 7px", textAlign: "center", background: bg, color, fontWeight: 700,
      fontSize: 11, fontFamily: MONO, border: `1px solid ${C.border}`,
      boxShadow: highlight ? `inset 0 0 0 2px white` : "none",
    }}>{v.toFixed(1)}%</td>
  );
};

const TriggerCard: React.FC<{
  icon: string; label: string; trigger: string; status: string; color: string; detail: string;
}> = ({ icon, label, trigger, status, color, detail }) => (
  <div style={{ background: C.panel, borderRadius: 10, padding: 12, border: `1px solid ${color}33`, display: "flex", flexDirection: "column", gap: 6 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
    </div>
    <div style={{ fontSize: 15, fontWeight: 800, fontFamily: MONO, color }}>{trigger}</div>
    <div style={{ fontSize: 10, color: status === "NOT MET" ? C.bear : C.bull, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: status === "NOT MET" ? C.bear : C.bull, display: "inline-block" }} />
      {status}
    </div>
    <div style={{ fontSize: 9, color: C.textDim, lineHeight: 1.4 }}>{detail}</div>
  </div>
);

export default function PANWModel({ onBack }: Props) {
  // Current price as of Feb 2026 (~$149 post Q2 FY2026 earnings sell-off)
  const [price] = useState(149.0);
  const [scenario, setScenario] = useState("base");
  const [entryPrice, setEntryPrice] = useState(149.0);

  // Updated consensus after Q2 FY2026 (reported Feb 17, 2026):
  // - FY26 EPS guidance lowered to $3.65–3.70 due to CyberArk/Chronosphere integration costs
  // - FY26 revenue guidance raised to $11.28–11.31B (+22-23% YoY incl. M&A)
  // - NGS ARR +33% to $6.3B; 1,550 platformized customers (+35% YoY)
  const consensus = {
    eps: [3.67, 4.09, 4.70, 5.34, 6.66],
    rev: [11.3, 13.1, 14.9, 16.3, 18.2],
    pe: [40, 37, 32, 28, 23],
    years: ["FY26", "FY27E", "FY28E", "FY29E", "FY30E"],
  };

  const [bearExitPE, setBearExitPE] = useState(22);
  const [baseExitPE, setBaseExitPE] = useState(30);
  const [bullExitPE, setBullExitPE] = useState(38);
  const [bearEpsMult, setBearEpsMult] = useState(0.90);
  const [baseEpsMult, setBaseEpsMult] = useState(1.00);
  const [bullEpsMult, setBullEpsMult] = useState(1.12);

  const scenarioData: Record<string, { exitPE: number; epsMult: number }> = {
    bear: { exitPE: bearExitPE, epsMult: bearEpsMult },
    base: { exitPE: baseExitPE, epsMult: baseEpsMult },
    bull: { exitPE: bullExitPE, epsMult: bullEpsMult },
  };

  const targets = useMemo(() => {
    const calc = (s: { exitPE: number; epsMult: number }, ep: number) => {
      const termEPS = consensus.eps[4] * s.epsMult;
      const tp = termEPS * s.exitPE;
      const cagr = Math.pow(tp / ep, 1 / 4) - 1;
      return { termEPS, tp, cagr, upside: tp / ep - 1 };
    };
    return {
      bear: calc(scenarioData.bear, entryPrice),
      base: calc(scenarioData.base, entryPrice),
      bull: calc(scenarioData.bull, entryPrice),
    };
  }, [bearExitPE, baseExitPE, bullExitPE, bearEpsMult, baseEpsMult, bullEpsMult, entryPrice]);

  const weightedCAGR = targets.bear.cagr * 0.25 + targets.base.cagr * 0.50 + targets.bull.cagr * 0.25;

  const riskFreeRate = 0.045;
  const waitMonths = 12;
  const riskFreeGain = entryPrice * riskFreeRate * (waitMonths / 12);

  const chartData = useMemo(() => {
    return consensus.years.map((yr, i) => ({
      year: yr,
      consEPS: consensus.eps[i],
      consRev: consensus.rev[i],
      consPE: consensus.pe[i],
      bullEPS: consensus.eps[i] * bullEpsMult,
      bearEPS: consensus.eps[i] * bearEpsMult,
      consPrice: consensus.eps[i] * consensus.pe[i],
      revGrowth: i === 0 ? 0.23 : (consensus.rev[i] / consensus.rev[i - 1] - 1),
    }));
  }, [bearEpsMult, bullEpsMult]);

  const entryPrices = [120, 125, 130, 135, 140, 145, 149];
  const exitPEs = [22, 25, 28, 30, 33, 35, 38];
  const entrySens = entryPrices.map((ep) =>
    exitPEs.map((pe) => Math.pow((consensus.eps[4] * pe) / ep, 1 / 4) - 1)
  );

  const sensEpsMults = [0.85, 0.90, 0.95, 1.00, 1.05, 1.10, 1.15];
  const sensPEs = [20, 22, 25, 28, 30, 33, 35, 38];
  const sensMatrix = sensPEs.map((pe) =>
    sensEpsMults.map((m) => Math.pow((consensus.eps[4] * m * pe) / entryPrice, 1 / 4) - 1)
  );

  const sc = scenarioData[scenario];
  // Forward P/E: $149 / $3.67 FY26 consensus EPS = 40.6x
  const fwdPE = (price / consensus.eps[0]).toFixed(1);

  return (
    <div style={{ fontFamily: FONT, background: C.bg, color: C.text, minHeight: "100vh", padding: "20px 16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Back button */}
      <div style={{ maxWidth: 1120, margin: "0 auto", marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 8, background: "rgba(30,41,59,0.5)",
            border: "1px solid #334155", borderRadius: 24, padding: "8px 16px",
            color: "#00a3e0", fontSize: 10, fontWeight: 800, fontFamily: FONT,
            letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} /> Return to Universe
        </button>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 1120, margin: "0 auto", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: C.accent }}>PANW</span> <span style={{ color: C.textDim, fontWeight: 400 }}>Consensus Model</span>
          </h1>
          <span style={{ color: C.textDim, fontSize: 12, fontFamily: MONO }}>${price.toFixed(0)}</span>
          <span style={{ background: C.wait + "22", color: C.wait, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
            VERDICT: WAIT — SET TRIGGERS
          </span>
        </div>
        <div style={{ height: 2, background: `linear-gradient(to right, ${C.wait}, ${C.bear}, transparent)`, marginTop: 10, borderRadius: 1 }} />
      </div>

      {/* ═══ ACTION VERDICT BAR ═══ */}
      <div style={{ maxWidth: 1120, margin: "0 auto 16px", background: `linear-gradient(135deg, ${C.bear}15, ${C.wait}15)`, borderRadius: 14, padding: "18px 22px", border: `1.5px solid ${C.wait}44` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ fontSize: 36, lineHeight: 1 }}>⏳</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.wait }}>DON'T BUY NOW</div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.5, marginTop: 4 }}>
              Quality platform, wrong timing. RS 20 = downtrend. CyberArk + Chronosphere integration creating near-term EPS headwinds (guidance cut to $3.65–3.70).
              NGS ARR +33% is real but M&A complexity clouds FY27 visibility.
              Base case 8–10% doesn't justify locking capital when T-bills yield 4.5% risk-free.
              <span style={{ color: C.text, fontWeight: 600 }}> Wait for triggers below.</span>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "8px 16px", background: C.panel, borderRadius: 10, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9, color: C.textDim, textTransform: "uppercase", fontWeight: 600 }}>Opportunity Cost</div>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: MONO, color: C.bull, marginTop: 2 }}>
              ${riskFreeGain.toFixed(1)}
            </div>
            <div style={{ fontSize: 9, color: C.textDim }}>earned in T-bills per share / 12mo</div>
          </div>
          <div style={{ textAlign: "center", padding: "8px 16px", background: C.panel, borderRadius: 10, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9, color: C.textDim, textTransform: "uppercase", fontWeight: 600 }}>Integration Timeline</div>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: MONO, color: C.yellow, marginTop: 2 }}>
              12–18mo
            </div>
            <div style={{ fontSize: 9, color: C.textDim }}>est. for CyberArk/Chronosphere clarity</div>
          </div>
        </div>
      </div>

      {/* ═══ BUY TRIGGERS ═══ */}
      <div style={{ maxWidth: 1120, margin: "0 auto 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Buy Triggers — Enter When Any One Is Met
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <TriggerCard
            icon="💰" label="Price Trigger" trigger="$125–130"
            status="NOT MET" color={C.bear}
            detail="At $128, base case (cons EPS × 30x exit) clears 12%/yr comfortably. Gives margin of safety for P/E compression and integration overhang."
          />
          <TriggerCard
            icon="📊" label="Technical Trigger" trigger="RS > 40–50"
            status="NOT MET" color={C.bear}
            detail="Currently RS ~20 = deep downtrend. RS above 40 signals sector rotation has resumed. Stock -18% over 52 weeks — don't fight the tape."
          />
          <TriggerCard
            icon="📈" label="Fundamental Trigger" trigger="Organic NGS ARR reaccel (ex-M&A)"
            status="NOT MET" color={C.bear}
            detail="Need a quarter showing organic ARR growth re-accelerating ex-CyberArk contribution. Proves platform thesis isn't solely M&A-driven. De-risks bull case."
          />
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "310px 1fr", gap: 16, alignItems: "start" }}>
        {/* LEFT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 20 }}>
          {/* Consensus */}
          <div style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.consensus}33` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.consensus, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.consensus, display: "inline-block" }} />
              Consensus Estimates
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
              <thead>
                <tr>
                  {["", "EPS", "Rev", "P/E"].map((h) => (
                    <th key={h} style={{ padding: "4px 6px", color: C.textDim, textAlign: h ? "right" : "left", fontSize: 9, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consensus.years.map((yr, i) => (
                  <tr key={yr} style={{ borderBottom: `1px solid ${C.border}22` }}>
                    <td style={{ padding: "4px 6px", color: C.textDim, fontWeight: 600 }}>{yr}</td>
                    <td style={{ padding: "4px 6px", textAlign: "right", fontFamily: MONO, color: C.consensus, fontWeight: 700 }}>${consensus.eps[i]}</td>
                    <td style={{ padding: "4px 6px", textAlign: "right", fontFamily: MONO, color: C.textDim }}>${consensus.rev[i]}B</td>
                    <td style={{ padding: "4px 6px", textAlign: "right", fontFamily: MONO, color: C.yellow }}>{consensus.pe[i]}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 6, padding: "5px 8px", background: C.panel, borderRadius: 6, fontSize: 9, color: C.textDim }}>
              FY26 EPS $3.65–3.70 guidance (cut from $3.80 due to M&A costs) · NGS ARR +33% to $6.3B · Rev +23% incl. CyberArk
            </div>
          </div>

          {/* Scenario */}
          <div style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Scenario</div>
            <ScenarioToggle active={scenario} onChange={setScenario} />
          </div>

          {/* Inputs */}
          <div style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              {scenario.charAt(0).toUpperCase() + scenario.slice(1)} Case
            </div>
            {scenario === "bear" && <>
              <SliderInput label="Exit P/E" value={bearExitPE} onChange={setBearExitPE} min={15} max={40} step={1} format="x" color={C.bear} />
              <SliderInput label="EPS vs Cons" value={bearEpsMult} onChange={setBearEpsMult} min={0.75} max={1.10} step={0.01} format="x" color={C.bear} note={`FY30 EPS: $${(6.66*bearEpsMult).toFixed(2)}`} />
            </>}
            {scenario === "base" && <>
              <SliderInput label="Exit P/E" value={baseExitPE} onChange={setBaseExitPE} min={20} max={45} step={1} format="x" color={C.base} />
              <SliderInput label="EPS vs Cons" value={baseEpsMult} onChange={setBaseEpsMult} min={0.85} max={1.15} step={0.01} format="x" color={C.base} note={`FY30 EPS: $${(6.66*baseEpsMult).toFixed(2)}`} />
            </>}
            {scenario === "bull" && <>
              <SliderInput label="Exit P/E" value={bullExitPE} onChange={setBullExitPE} min={25} max={55} step={1} format="x" color={C.bull} />
              <SliderInput label="EPS vs Cons" value={bullEpsMult} onChange={setBullEpsMult} min={0.95} max={1.30} step={0.01} format="x" color={C.bull} note={`FY30 EPS: $${(6.66*bullEpsMult).toFixed(2)}`} />
            </>}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4 }}>
              <SliderInput label="Your Entry Price" value={entryPrice} onChange={setEntryPrice} min={100} max={160} step={1} format="$" color={C.wait}
                note="Slide to see how entry price changes returns" />
            </div>
          </div>

          {/* Key stats */}
          <div style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <Stat label="Fwd P/E" value={`${fwdPE}x`} color={C.yellow} />
              <Stat label="FCF Yield" value="3.1%" sub="$3.75B TTM" />
              <Stat label="RS Rating" value="20" color={C.bear} sub="downtrend" />
              <Stat label="T-Bill Alt." value="4.5%" color={C.bull} sub="risk-free" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Target cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {["bear", "base", "bull"].map((k) => {
              const t = targets[k as keyof typeof targets];
              const col = { bear: C.bear, base: C.base, bull: C.bull }[k]!;
              const active = k === scenario;
              const sd = scenarioData[k];
              return (
                <div key={k} onClick={() => setScenario(k)} style={{
                  background: active ? col + "11" : C.card, borderRadius: 12, padding: 14,
                  border: `1.5px solid ${active ? col : C.border}`, cursor: "pointer", transition: "all 0.2s",
                  boxShadow: active ? `0 0 20px ${col}15` : "none",
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: col, marginBottom: 6 }}>{k}</div>
                  <Stat label={`Target (from $${entryPrice.toFixed(0)})`} value={`$${t.tp.toFixed(0)}`} color={col} large />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 4 }}>
                    <Stat label="4Y CAGR" value={`${(t.cagr * 100).toFixed(1)}%`} color={t.cagr >= 0.15 ? C.bull : t.cagr >= 0.08 ? C.yellow : t.cagr >= 0 ? C.wait : C.bear} />
                    <Stat label="Return" value={`${t.upside >= 0 ? "+" : ""}${(t.upside * 100).toFixed(0)}%`} color={t.upside >= 0 ? C.bull : C.bear} />
                  </div>
                  <div style={{ marginTop: 6, padding: "4px 6px", background: C.panel, borderRadius: 4, fontSize: 9, color: C.textDim, textAlign: "center", fontFamily: MONO }}>
                    ${t.termEPS.toFixed(2)} × {sd.exitPE}x
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weighted + verdict comparison */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div style={{ background: C.panel, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: C.textDim, fontWeight: 600, textTransform: "uppercase" }}>Weighted CAGR</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: MONO, color: weightedCAGR >= 0.15 ? C.bull : weightedCAGR >= 0.08 ? C.yellow : C.bear, marginTop: 4 }}>
                {(weightedCAGR * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>from ${entryPrice.toFixed(0)} entry</div>
            </div>
            <div style={{ background: C.panel, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.bear}33`, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: C.textDim, fontWeight: 600, textTransform: "uppercase" }}>Cons. Path</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: MONO, color: C.bear, marginTop: 4 }}>
                {((Math.pow((consensus.eps[4] * consensus.pe[4]) / entryPrice, 1 / 4) - 1) * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>${(consensus.eps[4] * consensus.pe[4]).toFixed(0)} at 23x</div>
            </div>
            <div style={{ background: C.panel, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.bull}33`, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: C.textDim, fontWeight: 600, textTransform: "uppercase" }}>T-Bill Alternative</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: MONO, color: C.bull, marginTop: 4 }}>4.5%</div>
              <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>risk-free while you wait</div>
            </div>
          </div>

          {/* ═══ ENTRY PRICE SENSITIVITY ═══ */}
          <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.wait}44` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.wait, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
              Why Entry Price Matters — 4Y CAGR at Consensus EPS ($6.66)
            </div>
            <div style={{ fontSize: 9, color: C.textDim, marginBottom: 12 }}>
              Slide "Your Entry Price" on the left to see how a lower entry dramatically improves returns
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: MONO }}>
                <thead>
                  <tr>
                    <th style={{ padding: "7px", background: C.panel, color: C.textDim, border: `1px solid ${C.border}`, fontSize: 9 }}>Entry ↓ \ Exit P/E →</th>
                    {exitPEs.map((pe) => (
                      <th key={pe} style={{ padding: "7px", background: C.panel, color: pe === 23 ? C.consensus : C.accent, border: `1px solid ${C.border}`, textAlign: "center" }}>
                        {pe}x
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {entryPrices.map((ep, i) => (
                    <tr key={ep}>
                      <td style={{ padding: "5px 7px", background: C.panel, color: ep === 149 ? C.wait : C.accent, fontWeight: 700, border: `1px solid ${C.border}` }}>
                        ${ep} {ep === 149 && <span style={{ fontSize: 8, color: C.wait }}>now</span>}
                        {ep === 128 && <span style={{ fontSize: 8, color: C.bull }}> ← target</span>}
                      </td>
                      {entrySens[i].map((v, j) => (
                        <SensCell key={j} val={v}
                          highlight={Math.abs(ep - entryPrice) < 3 && exitPEs[j] === scenarioData[scenario].exitPE}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 14, fontSize: 9, color: C.textDim }}>
              <span><span style={{ color: C.bull }}>■</span> ≥15%</span>
              <span><span style={{ color: C.base }}>■</span> 8–15%</span>
              <span><span style={{ color: C.yellow }}>■</span> 0–8%</span>
              <span><span style={{ color: C.bear }}>■</span> {"<0%"}</span>
            </div>
            <div style={{ marginTop: 8, padding: "8px 10px", background: C.wait + "11", borderRadius: 6, border: `1px solid ${C.wait}33`, fontSize: 10, color: C.textDim }}>
              <span style={{ color: C.wait, fontWeight: 700 }}>Key insight:</span> At $149 + 30x exit you get ~10%. At $128 + 30x exit you get ~14%.
              That $21 difference = 3–4% CAGR improvement. Patience literally pays 3–4% per year extra.
            </div>
          </div>

          {/* EPS Chart */}
          <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>EPS: Consensus vs Scenario Range</div>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={{ stroke: C.border }} tickFormatter={(v: number) => `$${v.toFixed(1)}`} />
                <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} formatter={(v: number) => `$${v.toFixed(2)}`} />
                <Area type="monotone" dataKey="bullEPS" stroke={C.bull} fill={C.bull + "15"} strokeWidth={1.5} strokeDasharray="4 3" name="Bull" />
                <Area type="monotone" dataKey="bearEPS" stroke={C.bear} fill={C.bear + "10"} strokeWidth={1.5} strokeDasharray="4 3" name="Bear" />
                <Line type="monotone" dataKey="consEPS" stroke={C.consensus} strokeWidth={3} dot={{ r: 4, fill: C.consensus }} name="Consensus" />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue + P/E */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Revenue Deceleration</div>
              <ResponsiveContainer width="100%" height={170}>
                <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 9 }} axisLine={{ stroke: C.border }} />
                  <YAxis yAxisId="rev" tick={{ fill: C.textDim, fontSize: 9 }} axisLine={{ stroke: C.border }} tickFormatter={(v: number) => `$${v}`} />
                  <YAxis yAxisId="gr" orientation="right" tick={{ fill: C.yellow, fontSize: 9 }} axisLine={{ stroke: C.border }} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
                  <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} />
                  <Bar yAxisId="rev" dataKey="consRev" fill={C.accent} opacity={0.7} name="Rev ($B)" radius={[3, 3, 0, 0]} />
                  <Line yAxisId="gr" type="monotone" dataKey="revGrowth" stroke={C.yellow} strokeWidth={2} dot={{ r: 3, fill: C.yellow }} name="YoY %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>P/E Compression Path</div>
              <ResponsiveContainer width="100%" height={170}>
                <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 9 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 9 }} axisLine={{ stroke: C.border }} domain={[15, 45]} tickFormatter={(v: number) => `${v}x`} />
                  <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11 }} formatter={(v: number) => `${v}x`} />
                  <ReferenceLine y={scenarioData[scenario].exitPE} stroke={{ bear: C.bear, base: C.base, bull: C.bull }[scenario]} strokeDasharray="6 3"
                    label={{ value: `${scenario} exit ${scenarioData[scenario].exitPE}x`, fill: ({ bear: C.bear, base: C.base, bull: C.bull } as Record<string, string>)[scenario], fontSize: 9, position: "right" }} />
                  <Area type="monotone" dataKey="consPE" stroke={C.yellow} fill={C.yellow + "15"} strokeWidth={2.5} dot={{ r: 4, fill: C.yellow }} name="Consensus P/E" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Full sensitivity */}
          <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              Full Sensitivity: Exit P/E × EPS vs Consensus (from ${entryPrice.toFixed(0)} entry)
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: MONO }}>
                <thead>
                  <tr>
                    <th style={{ padding: "7px", background: C.panel, color: C.textDim, border: `1px solid ${C.border}`, fontSize: 9 }}>P/E ↓ \ EPS →</th>
                    {sensEpsMults.map((m) => (
                      <th key={m} style={{ padding: "7px", background: C.panel, color: m === 1 ? C.consensus : C.accent, border: `1px solid ${C.border}`, textAlign: "center", fontSize: 10 }}>
                        {m === 1 ? "Cons" : m > 1 ? `+${((m - 1) * 100).toFixed(0)}%` : `${((m - 1) * 100).toFixed(0)}%`}
                        <div style={{ fontSize: 8, color: C.textDim }}>${(6.66 * m).toFixed(2)}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sensPEs.map((pe, i) => (
                    <tr key={pe}>
                      <td style={{ padding: "5px 7px", background: C.panel, color: pe === 23 ? C.consensus : C.accent, fontWeight: 700, border: `1px solid ${C.border}` }}>{pe}x</td>
                      {sensMatrix[i].map((v, j) => (
                        <SensCell key={j} val={v}
                          highlight={pe === scenarioData[scenario].exitPE && Math.abs(sensEpsMults[j] - scenarioData[scenario].epsMult) < 0.03}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 6, display: "flex", gap: 14, fontSize: 9, color: C.textDim }}>
              <span><span style={{ color: C.bull }}>■</span> ≥15%</span>
              <span><span style={{ color: C.base }}>■</span> 8–15%</span>
              <span><span style={{ color: C.yellow }}>■</span> 0–8%</span>
              <span><span style={{ color: C.bear }}>■</span> {"<0%"}</span>
              <span style={{ marginLeft: "auto" }}>□ = active scenario</span>
            </div>
          </div>

          {/* FINAL VERDICT */}
          <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.wait}44` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.wait, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Final Verdict</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 14 }}>
              {[
                { l: "Action", v: "WAIT", c: C.wait },
                { l: "Type", v: "A/D Hybrid", c: C.accent },
                { l: "Base Return", v: "8–10%", c: C.yellow },
                { l: "15%+ CAGR", v: "Bull Only", c: C.bull },
                { l: "Target Entry", v: "$125–130", c: C.bull },
              ].map((d) => (
                <div key={d.l} style={{ background: C.panel, borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{d.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: d.c }}>{d.v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.textDim, lineHeight: 1.65 }}>
              <span style={{ color: C.wait, fontWeight: 700 }}>The math is clear: don't buy at $149.</span>{" "}
              Base case gives 8–10%/yr while T-bills give 4.5% risk-free. You're only getting paid 3–5% for taking equity risk on a stock in a downtrend with CyberArk integration complexity weighing on near-term EPS (guidance cut to $3.65–3.70 from $3.80).{" "}
              <span style={{ color: C.text, fontWeight: 600 }}>At $125–130, the math flips</span> — base case clears 12%+ and you have real margin of safety for P/E compression and M&A integration uncertainty.{" "}
              The business is A-tier: NGS ARR +33% to $6.3B, 1,550 platformized customers with 119% NRR, 76% gross margins, CyberArk adding Identity as the 4th platform pillar, and $20B NGS ARR target by FY2030. The price isn't right yet.{" "}
              <span style={{ color: C.bull, fontWeight: 600 }}>Earn 4.5% in T-bills while you wait.</span>{" "}
              Re-evaluate when any buy trigger fires. CyberArk + Chronosphere integration typically takes 12–18 months to digest — patience here literally pays 3–4% extra per year in better entry math.{" "}
              <span style={{ color: C.text, fontWeight: 600 }}>The best trade is sometimes no trade.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
