import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";

const YEARS_HIST = [2024, 2025, 2026, 2027];
const YEARS_PROJ = [2028, 2029, 2030, 2031, 2032];
const ALL_YEARS = [...YEARS_HIST, ...YEARS_PROJ];

const ANCHOR = {
  price: 381.8,
  sharesOut: 45.6,
  fcfPerShare2027: 30,
  // Historical + near-term consensus
  revenue: [2460, 4130, 4660, 4700],
  ebitMargin: [21.5, 30.0, 38.9, 43.0],
  fcf: [283, 489, 1190, 1368], // 2027 = 30 * 45.6
  eps: [null, 4.57, 21.17, 26.63],
  netDebtEbitda: [6.1, 4.2, 2.8, 2.0],
  contractedEbitdaMix: [45, 55, 65, 75],
};

function compound(base: number, rate: number, years: number) {
  return base * Math.pow(1 + rate / 100, years);
}

function fmt$(n: number) { return n >= 1000 ? `$${(n/1000).toFixed(1)}B` : `$${Math.round(n)}M`; }
function fmtPct(n: number | null) { return n === null ? "—" : `${n.toFixed(1)}%`; }
function fmtDollar(n: number | null) { return n === null ? "—" : `$${n.toFixed(2)}`; }

function Slider({ label, value, onChange, min, max, step = 1, suffix = "", prefix = "" }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; suffix?: string; prefix?: string;
}) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11.5, color: "#7d8fa3", fontFamily: "var(--mono)" }}>{label}</span>
        <span style={{ fontSize: 12.5, color: "#d4a853", fontFamily: "var(--mono)", fontWeight: 600 }}>
          {prefix}{step < 1 ? value.toFixed(1) : value}{suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#d4a853", height: 3, cursor: "pointer" }} />
    </div>
  );
}

function Pill({ children, color = "#7d8fa3" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 10, fontFamily: "var(--mono)", fontWeight: 600,
      color, background: `${color}15`, border: `1px solid ${color}30`,
      padding: "2px 8px", borderRadius: 4, letterSpacing: 0.4,
    }}>{children}</span>
  );
}

function Card({ children, accent, style: s = {} }: {
  children: React.ReactNode; accent?: string; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", borderRadius: 10,
      border: `1px solid ${accent || "rgba(255,255,255,0.05)"}`,
      padding: 18, ...s,
    }}>{children}</div>
  );
}

function Table({ title, headers, rows, highlightFn }: {
  title?: string;
  headers: string[];
  rows: (string | null)[][];
  highlightFn?: (ri: number, ci: number) => string | null;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      {title && <h3 style={{ fontSize: 11.5, color: "#d4a853", fontFamily: "var(--sans)", fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 8 }}>{title}</h3>}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--mono)", fontSize: 11.5 }}>
          <thead><tr>
            {headers.map((h, i) => (
              <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "6px 8px", color: "#4e6070", borderBottom: "1px solid #172030", fontWeight: 500, fontSize: 10, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 ? "rgba(255,255,255,0.012)" : "transparent" }}>
                {row.map((cell, ci) => {
                  const hl = highlightFn?.(ri, ci);
                  return (
                    <td key={ci} style={{
                      textAlign: ci === 0 ? "left" : "right", padding: "5px 8px",
                      color: hl === "green" ? "#4dd6a0" : hl === "gold" ? "#d4a853" : hl === "red" ? "#d65a6a" : ci === 0 ? "#a0b0c0" : "#8095a8",
                      borderBottom: "1px solid rgba(23,32,48,0.6)", fontWeight: hl ? 600 : 400, whiteSpace: "nowrap",
                    }}>{cell}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScenarioCard({ label, color, metrics, notes }: {
  label: string; color: string;
  metrics: { k: string; v: string; c?: string }[];
  notes: string;
}) {
  return (
    <Card accent={`${color}30`} style={{ flex: 1, minWidth: 210 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
        <span style={{ fontSize: 12.5, fontWeight: 700, color, fontFamily: "var(--sans)", letterSpacing: 0.4 }}>{label}</span>
      </div>
      <div style={{ fontFamily: "var(--mono)" }}>
        {metrics.map(({ k, v, c }) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10.5, color: "#4e6070" }}>{k}</span>
            <span style={{ fontSize: 12.5, color: c || "#a0b0c0", fontWeight: c ? 600 : 400 }}>{v}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: "#4e6070", margin: "10px 0 0", lineHeight: 1.5, fontFamily: "var(--sans)" }}>{notes}</p>
    </Card>
  );
}

function SensitivityMatrix({ currentPrice }: { currentPrice: number }) {
  const pes = [10, 12, 14, 16, 18, 20];
  const fcfs = [25, 30, 35, 40, 45, 50, 55];
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--sans)" }}>
        Exit Multiple × 2032 FCF/Share
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--mono)", fontSize: 10.5 }}>
          <thead><tr>
            <th style={{ textAlign: "left", padding: "5px 7px", color: "#4e6070", borderBottom: "1px solid #172030", fontSize: 9.5 }}>P/FCF ↓ \ FCF/sh →</th>
            {fcfs.map(f => <th key={f} style={{ textAlign: "right", padding: "5px 7px", color: "#4e6070", borderBottom: "1px solid #172030", fontSize: 9.5 }}>${f}</th>)}
          </tr></thead>
          <tbody>
            {pes.map(pe => (
              <tr key={pe}>
                <td style={{ padding: "4px 7px", color: "#a0b0c0", borderBottom: "1px solid rgba(23,32,48,0.5)", fontWeight: 500 }}>{pe}x</td>
                {fcfs.map(f => {
                  const price = pe * f;
                  const cagr = ((price / currentPrice) ** (1 / 5) - 1) * 100;
                  const g = cagr >= 15; const y = cagr >= 8 && !g; const r = cagr < 0;
                  return (
                    <td key={f} style={{
                      textAlign: "right", padding: "4px 7px",
                      borderBottom: "1px solid rgba(23,32,48,0.5)",
                      color: g ? "#4dd6a0" : y ? "#d4a853" : r ? "#d65a6a" : "#8095a8",
                      fontWeight: g ? 600 : 400,
                      background: g ? "rgba(77,214,160,0.05)" : "transparent",
                    }}>
                      ${price} <span style={{ fontSize: 8.5, opacity: 0.65 }}>({cagr > 0 ? "+" : ""}{cagr.toFixed(0)}%)</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 9.5, color: "#3e5060", marginTop: 5, fontFamily: "var(--sans)" }}>
        Green = 15%+ CAGR · Yellow = 8–15% · Red = negative · Annualized 5yr from 2027 entry at ${currentPrice}
      </p>
    </div>
  );
}

interface TLNModelProps {
  onBack: () => void;
}

export default function TLNModel({ onBack }: TLNModelProps) {
  const [exitPE, setExitPE] = useState(14);
  const [bullFcfGrowth, setBullFcfGrowth] = useState(13);
  const [baseFcfGrowth, setBaseFcfGrowth] = useState(7);
  const [bearFcfGrowth, setBearFcfGrowth] = useState(1);
  const [bullExitPrem, setBullExitPrem] = useState(4);
  const [bearExitDisc, setBearExitDisc] = useState(4);
  const [bullProb, setBullProb] = useState(28);
  const [baseProb, setBaseProb] = useState(50);
  const [tab, setTab] = useState("thesis");

  const bearProb = Math.max(100 - bullProb - baseProb, 0);
  const A = ANCHOR;

  const model = useMemo(() => {
    const fcfBase = A.fcfPerShare2027;

    const bull2032 = compound(fcfBase, bullFcfGrowth, 5);
    const base2032 = compound(fcfBase, baseFcfGrowth, 5);
    const bear2032 = compound(fcfBase, bearFcfGrowth, 5);

    const bullPE = exitPE + bullExitPrem;
    const basePE = exitPE;
    const bearPE = exitPE - bearExitDisc;

    const bullTarget = bull2032 * bullPE;
    const baseTarget = base2032 * basePE;
    const bearTarget = bear2032 * bearPE;

    const cagr = (t: number) => ((t / A.price) ** (1/5) - 1) * 100;

    const weighted = (bullTarget * bullProb + baseTarget * baseProb + bearTarget * bearProb) / 100;

    const projFcfPS: number[] = [];
    const projFcfTotal: number[] = [];
    const projRevenue: number[] = [];
    const projEbitMargin: number[] = [];
    const projContracted: number[] = [];

    for (let i = 0; i < 5; i++) {
      const fcfps = compound(fcfBase, baseFcfGrowth, i + 1);
      projFcfPS.push(fcfps);
      projFcfTotal.push(fcfps * A.sharesOut);
      const revGrowth = i < 2 ? 1.5 : 0.5;
      projRevenue.push(Math.round(4700 * (1 + revGrowth / 100) ** (i + 1)));
      projEbitMargin.push(Math.min(43 + (i + 1) * 1.5, 52));
      projContracted.push(Math.min(75 + (i + 1) * 2, 85));
    }

    const reqFor15 = A.price * Math.pow(1.15, 5);
    const reqFcfAt15 = reqFor15 / exitPE;
    const reqGrowth = (Math.pow(reqFcfAt15 / fcfBase, 1/5) - 1) * 100;

    return {
      bull: { fcf2032: bull2032, pe: bullPE, target: bullTarget, cagr: cagr(bullTarget) },
      base: { fcf2032: base2032, pe: basePE, target: baseTarget, cagr: cagr(baseTarget) },
      bear: { fcf2032: bear2032, pe: bearPE, target: bearTarget, cagr: cagr(bearTarget) },
      weighted, weightedCagr: cagr(weighted),
      projFcfPS, projFcfTotal, projRevenue, projEbitMargin, projContracted,
      reqFor15, reqFcfAt15, reqGrowth,
    };
  }, [exitPE, bullFcfGrowth, baseFcfGrowth, bearFcfGrowth, bullExitPrem, bearExitDisc, bullProb, baseProb, bearProb]);

  const tabs = [
    { id: "thesis", label: "Thesis Update" },
    { id: "projections", label: "Projections" },
    { id: "scenarios", label: "Scenarios" },
    { id: "sensitivity", label: "Sensitivity" },
    { id: "verdict", label: "Verdict" },
  ];

  return (
    <div style={{
      "--sans": "'Instrument Sans', 'DM Sans', sans-serif",
      "--mono": "'JetBrains Mono', 'Fira Code', monospace",
      "--serif": "'Instrument Serif', 'Playfair Display', serif",
      minHeight: "100vh",
      background: "linear-gradient(160deg, #070b12 0%, #0c1219 35%, #0f1822 100%)",
      color: "#a0b0c0", fontFamily: "var(--sans)", padding: "20px 14px",
    } as React.CSSProperties}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* Back button */}
      <div style={{ maxWidth: 980, margin: "0 auto 14px" }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "7px 16px", fontSize: 10, fontWeight: 700,
            fontFamily: "var(--sans)", letterSpacing: 1, textTransform: "uppercase",
            background: "rgba(30,41,59,0.5)", color: "#3b82f6",
            border: "1px solid rgba(59,130,246,0.3)", borderRadius: 20,
            cursor: "pointer", transition: "all 0.15s",
          }}
        >
          <ArrowLeft size={14} />
          Return to Universe
        </button>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 980, margin: "0 auto 22px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 34, fontWeight: 400, color: "#fff", margin: 0, letterSpacing: -0.3 }}>TLN</h1>
          <span style={{ fontSize: 13, color: "#4e6070", fontWeight: 500 }}>Talen Energy · Post-Deal Refresh</span>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 20, color: "#d4a853", fontWeight: 600 }}>${A.price.toFixed(1)}</div>
            <div style={{ fontSize: 10, color: "#4e6070", letterSpacing: 0.5, marginTop: 1 }}>CURRENT PRICE</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
          {[
            { l: "2027 FCF/sh", v: "$30.0", accent: true },
            { l: "Implied Yield", v: "7.8%" },
            { l: "Contracted Mix", v: ">75%" },
            { l: "Classification", v: "Cyclical Growth" },
            { l: "Mkt Cap", v: "$17.4B" },
          ].map(({ l, v, accent }) => (
            <div key={l}>
              <span style={{ fontSize: 9, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1 }}>{l}</span>
              <div style={{ fontSize: 13, color: accent ? "#d4a853" : "#8095a8", fontFamily: "var(--mono)", fontWeight: accent ? 700 : 500, marginTop: 2 }}>{v}</div>
            </div>
          ))}
          <Pill color="#d4a853">POST-DEAL UPDATE</Pill>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 980, margin: "0 auto 18px", display: "flex", gap: 3, overflowX: "auto", paddingBottom: 3 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "7px 16px", fontSize: 11, fontWeight: 600, fontFamily: "var(--sans)",
            letterSpacing: 0.7, textTransform: "uppercase",
            background: tab === t.id ? "rgba(212,168,83,0.1)" : "transparent",
            color: tab === t.id ? "#d4a853" : "#3e5060",
            border: tab === t.id ? "1px solid rgba(212,168,83,0.2)" : "1px solid transparent",
            borderRadius: 5, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto" }}>

        {/* ════════ THESIS UPDATE ════════ */}
        {tab === "thesis" && (
          <div>
            <Card accent="rgba(212,168,83,0.15)" style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 12, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 14px" }}>What Changed — M&A Call Update</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {[
                  { before: "2027 FCF/sh ~$26", after: "$30+ post-deal", delta: "+$4/sh accretion", color: "#4dd6a0" },
                  { before: "Contracted mix ~55-65%", after: ">75% contracted EBITDA", delta: "Lower vol risk", color: "#4dd6a0" },
                  { before: "15% CAGR prob: 30-40%", after: "40-50%", delta: "Improved odds", color: "#4dd6a0" },
                  { before: "Pure cyclical play", after: "Cyclical + structural shift", delta: "Better quality", color: "#d4a853" },
                ].map(({ before, after, delta, color }, i) => (
                  <div key={i} style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
                    <div style={{ color: "#4e6070", marginBottom: 3, textDecoration: "line-through", fontSize: 10.5 }}>{before}</div>
                    <div style={{ color: "#c0d0dd", fontWeight: 600, marginBottom: 3 }}>{after}</div>
                    <Pill color={color}>{delta}</Pill>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 18 }}>
              <Card>
                <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 14px" }}>Post-Deal Anchor Math</h3>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, lineHeight: 2.2, color: "#8095a8" }}>
                  <div>Investor Day 2027 base FCF/sh: <span style={{ color: "#7d8fa3" }}>~$26</span></div>
                  <div>Deal accretion: <span style={{ color: "#4dd6a0" }}>+$4/sh minimum</span></div>
                  <div>Post-deal 2027 FCF/sh: <span style={{ color: "#d4a853", fontWeight: 700 }}>$30+</span></div>
                  <div style={{ borderTop: "1px solid #172030", marginTop: 4, paddingTop: 6 }}>
                    Implied 2027 yield: <span style={{ color: "#d4a853" }}>30 / 382 = 7.8%</span>
                  </div>
                  <div>Cumulative FCF capacity '27-'32: <span style={{ color: "#4dd6a0" }}>~$190–220/sh</span></div>
                </div>
              </Card>

              <Card>
                <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 14px" }}>Key Question</h3>
                <div style={{ fontSize: 13, color: "#c0d0dd", lineHeight: 1.8 }}>
                  <p style={{ margin: "0 0 10px" }}>Can TLN grow FCF/share from <strong style={{ color: "#d4a853" }}>$30 → $45–50</strong> by 2032?</p>
                  <p style={{ margin: "0 0 10px", fontSize: 12, color: "#8095a8" }}>
                    That's what you need for 15% returns at a mid-teens multiple. It requires ~10%+ FCF/sh CAGR sustained over 5 years.
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "#7d8fa3" }}>
                    This deal meaningfully improves per-share math, contracted mix, and balance sheet trajectory — but does NOT remove power cycle risk, multiple compression risk, or merchant exposure in outer years.
                  </p>
                </div>
              </Card>
            </div>

            <Card style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 14px" }}>Risk Profile Shift</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[
                  { label: "Contracted EBITDA", before: 55, after: 75, max: 100, suffix: "%", good: true },
                  { label: "Net Debt/EBITDA '27", before: 2.8, after: 2.0, max: 7, suffix: "x", good: true },
                  { label: "Merchant Exposure", before: 45, after: 25, max: 100, suffix: "%", good: true },
                  { label: "FCF/sh '27", before: 26, after: 30, max: 40, suffix: "$", good: true },
                ].map(({ label, before, after, max, suffix }) => (
                  <div key={label} style={{ fontFamily: "var(--mono)", fontSize: 11 }}>
                    <div style={{ color: "#4e6070", fontSize: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ color: "#5a6a78", minWidth: 36 }}>{before}{suffix}</span>
                      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${(before / max) * 100}%`, height: "100%", background: "#4e6070", borderRadius: 3 }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#4dd6a0", minWidth: 36, fontWeight: 600 }}>{after}{suffix}</span>
                      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${(after / max) * 100}%`, height: "100%", background: "#4dd6a0", borderRadius: 3, transition: "width 0.4s ease" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ════════ PROJECTIONS ════════ */}
        {tab === "projections" && (
          <div>
            <Table
              title="Historical + Near-Term Consensus"
              headers={["", ...YEARS_HIST.map((y, i) => `${y}${i === 0 ? "A" : "E"}`)]}
              rows={[
                ["Revenue ($M)", ...A.revenue.map(r => fmt$(r))],
                ["EBIT Margin", ...A.ebitMargin.map(m => fmtPct(m))],
                ["FCF ($M)", ...A.fcf.map(f => fmt$(f))],
                ["FCF/Share", ...A.fcf.map((f, i) => i === 0 ? "$6.2" : fmtDollar(f / A.sharesOut))],
                ["EPS", ...A.eps.map(e => e ? fmtDollar(e) : "—")],
                ["Net Debt/EBITDA", ...A.netDebtEbitda.map(n => `${n.toFixed(1)}x`)],
                ["Contracted Mix", ...A.contractedEbitdaMix.map(c => `${c}%`)],
              ]}
              highlightFn={(ri, ci) => ri === 3 && ci === 4 ? "gold" : null}
            />

            <Table
              title={`Base Case Projections (${baseFcfGrowth}% FCF/sh CAGR from $30 anchor)`}
              headers={["", ...YEARS_PROJ.map(y => `${y}E`)]}
              rows={[
                ["FCF/Share", ...model.projFcfPS.map(f => fmtDollar(f))],
                ["Total FCF ($M)", ...model.projFcfTotal.map(f => fmt$(f))],
                ["Est. Revenue ($M)", ...model.projRevenue.map(r => fmt$(r))],
                ["Est. EBIT Margin", ...model.projEbitMargin.map(m => fmtPct(m))],
                ["Contracted Mix", ...model.projContracted.map(c => `~${c}%`)],
                ["Impl. P/FCF at $382", ...model.projFcfPS.map(f => `${(A.price / f).toFixed(1)}x`)],
                ["Impl. FCF Yield", ...model.projFcfPS.map(f => fmtPct((f / A.price) * 100))],
              ]}
              highlightFn={(ri, ci) => {
                if (ri === 0 && ci === 5) return "gold";
                if (ri === 6 && ci >= 3) return "green";
                return null;
              }}
            />

            <Card style={{ marginTop: 4 }}>
              <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 10px" }}>Cumulative FCF Generation (2027–2032)</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, padding: "0 8px" }}>
                {model.projFcfPS.map((f, i) => {
                  const h = Math.max((f / 55) * 100, 8);
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: 10, color: "#d4a853", fontFamily: "var(--mono)", fontWeight: 600, marginBottom: 3 }}>${f.toFixed(1)}</span>
                      <div style={{
                        width: "100%", maxWidth: 52, height: h, borderRadius: 4,
                        background: `linear-gradient(180deg, rgba(212,168,83,${0.5 + i * 0.1}) 0%, rgba(180,140,60,${0.3 + i * 0.08}) 100%)`,
                        transition: "height 0.3s ease",
                      }} />
                      <span style={{ fontSize: 9, color: "#4e6070", marginTop: 3 }}>{YEARS_PROJ[i]}E</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign: "center", marginTop: 10, fontFamily: "var(--mono)", fontSize: 12, color: "#8095a8" }}>
                Cumulative 5yr FCF/sh: <span style={{ color: "#4dd6a0", fontWeight: 600 }}>${model.projFcfPS.reduce((s, f) => s + f, 0).toFixed(0)}</span>
              </div>
            </Card>
          </div>
        )}

        {/* ════════ SCENARIOS ════════ */}
        {tab === "scenarios" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 1fr) 2fr", gap: 16, marginBottom: 20 }}>
            <Card>
              <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 14px" }}>Model Inputs</h3>
              <Slider label="Base Exit P/FCF" value={exitPE} onChange={setExitPE} min={8} max={22} suffix="x" />
              <div style={{ borderTop: "1px solid #172030", margin: "10px 0", paddingTop: 10 }}>
                <div style={{ fontSize: 9.5, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>FCF/Share CAGR</div>
                <Slider label="Bull CAGR" value={bullFcfGrowth} onChange={setBullFcfGrowth} min={8} max={20} suffix="%" />
                <Slider label="Base CAGR" value={baseFcfGrowth} onChange={setBaseFcfGrowth} min={3} max={12} suffix="%" />
                <Slider label="Bear CAGR" value={bearFcfGrowth} onChange={setBearFcfGrowth} min={-5} max={5} suffix="%" />
              </div>
              <div style={{ borderTop: "1px solid #172030", margin: "10px 0", paddingTop: 10 }}>
                <div style={{ fontSize: 9.5, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Multiple Adj</div>
                <Slider label="Bull Premium" value={bullExitPrem} onChange={setBullExitPrem} min={0} max={8} prefix="+" suffix="x" />
                <Slider label="Bear Discount" value={bearExitDisc} onChange={setBearExitDisc} min={0} max={8} prefix="-" suffix="x" />
              </div>
              <div style={{ borderTop: "1px solid #172030", margin: "10px 0", paddingTop: 10 }}>
                <div style={{ fontSize: 9.5, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Probabilities</div>
                <Slider label="Bull %" value={bullProb} onChange={v => { setBullProb(v); if (v + baseProb > 100) setBaseProb(100 - v); }} min={0} max={60} suffix="%" />
                <Slider label="Base %" value={baseProb} onChange={v => { setBaseProb(v); if (v + bullProb > 100) setBullProb(100 - v); }} min={0} max={70} suffix="%" />
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 12 }}>
                  <span style={{ color: "#5a6a78" }}>Bear %</span>
                  <span style={{ color: "#d65a6a", fontWeight: 600 }}>{bearProb}%</span>
                </div>
              </div>
            </Card>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <ScenarioCard label="Bull Case" color="#4dd6a0"
                  metrics={[
                    { k: "FCF/sh CAGR", v: `${bullFcfGrowth}%` },
                    { k: "2032 FCF/sh", v: fmtDollar(model.bull.fcf2032) },
                    { k: "Exit Multiple", v: `${model.bull.pe}x` },
                    { k: "Target", v: `$${model.bull.target.toFixed(0)}`, c: "#4dd6a0" },
                    { k: "5Y CAGR", v: `${model.bull.cagr > 0 ? "+" : ""}${model.bull.cagr.toFixed(1)}%`, c: model.bull.cagr >= 15 ? "#4dd6a0" : "#d4a853" },
                    { k: "Probability", v: `${bullProb}%` },
                  ]}
                  notes="New data center contract, tight PJM, accretive M&A continues, buybacks. AI infra narrative sustains premium."
                />
                <ScenarioCard label="Base Case" color="#d4a853"
                  metrics={[
                    { k: "FCF/sh CAGR", v: `${baseFcfGrowth}%` },
                    { k: "2032 FCF/sh", v: fmtDollar(model.base.fcf2032) },
                    { k: "Exit Multiple", v: `${model.base.pe}x` },
                    { k: "Target", v: `$${model.base.target.toFixed(0)}`, c: "#d4a853" },
                    { k: "5Y CAGR", v: `${model.base.cagr > 0 ? "+" : ""}${model.base.cagr.toFixed(1)}%`, c: model.base.cagr >= 15 ? "#4dd6a0" : "#d4a853" },
                    { k: "Probability", v: `${baseProb}%` },
                  ]}
                  notes="PJM normalizes, contracting offsets some vol, M&A slows. More 'IPP valuation' than AI premium."
                />
                <ScenarioCard label="Bear Case" color="#d65a6a"
                  metrics={[
                    { k: "FCF/sh CAGR", v: `${bearFcfGrowth}%` },
                    { k: "2032 FCF/sh", v: fmtDollar(model.bear.fcf2032) },
                    { k: "Exit Multiple", v: `${model.bear.pe}x` },
                    { k: "Target", v: `$${model.bear.target.toFixed(0)}`, c: "#d65a6a" },
                    { k: "5Y CAGR", v: `${model.bear.cagr > 0 ? "+" : ""}${model.bear.cagr.toFixed(1)}%`, c: model.bear.cagr >= 0 ? "#d4a853" : "#d65a6a" },
                    { k: "Probability", v: `${bearProb}%` },
                  ]}
                  notes="PJM spreads normalize, FCF stagnates, multiple compresses to utility floor."
                />
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(212,168,83,0.07), rgba(77,214,160,0.04))",
                border: "1px solid rgba(212,168,83,0.18)", borderRadius: 11, padding: 20,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3 }}>Probability-Weighted Target</div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 30, color: "#fff" }}>${model.weighted.toFixed(0)}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3 }}>Expected 5Y CAGR</div>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 22, fontWeight: 700,
                      color: model.weightedCagr >= 15 ? "#4dd6a0" : model.weightedCagr >= 8 ? "#d4a853" : "#d65a6a",
                    }}>{model.weightedCagr > 0 ? "+" : ""}{model.weightedCagr.toFixed(1)}%</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3 }}>Upside / Downside</div>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 22, fontWeight: 700,
                      color: model.weighted > A.price ? "#4dd6a0" : "#d65a6a",
                    }}>{((model.weighted / A.price - 1) * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>

              <Table title="Scenario Detail — 2032E"
                headers={["", "Bull", "Base", "Bear"]}
                rows={[
                  ["FCF/sh", fmtDollar(model.bull.fcf2032), fmtDollar(model.base.fcf2032), fmtDollar(model.bear.fcf2032)],
                  ["Exit Multiple", `${model.bull.pe}x`, `${model.base.pe}x`, `${model.bear.pe}x`],
                  ["Target Price", `$${model.bull.target.toFixed(0)}`, `$${model.base.target.toFixed(0)}`, `$${model.bear.target.toFixed(0)}`],
                  ["5Y CAGR", fmtPct(model.bull.cagr), fmtPct(model.base.cagr), fmtPct(model.bear.cagr)],
                  ["Probability", `${bullProb}%`, `${baseProb}%`, `${bearProb}%`],
                ]}
                highlightFn={(ri, ci) => {
                  if (ri === 3) return ci === 1 ? "green" : ci === 2 ? "gold" : "red";
                  return null;
                }}
              />
            </div>
          </div>
        )}

        {/* ════════ SENSITIVITY ════════ */}
        {tab === "sensitivity" && (
          <div>
            <SensitivityMatrix currentPrice={A.price} />

            <Card accent="rgba(212,168,83,0.15)" style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 12px" }}>15% CAGR Requirements</h3>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "#8095a8", lineHeight: 2.2 }}>
                <div>5Y target at 15% CAGR: <span style={{ color: "#d4a853", fontWeight: 600 }}>${model.reqFor15.toFixed(0)}</span></div>
                <div>At {exitPE}x exit → need 2032 FCF/sh: <span style={{ color: "#d4a853", fontWeight: 600 }}>${model.reqFcfAt15.toFixed(1)}</span></div>
                <div>From $30 anchor → requires <span style={{ color: model.reqGrowth <= 12 ? "#4dd6a0" : model.reqGrowth <= 16 ? "#d4a853" : "#d65a6a", fontWeight: 600 }}>{model.reqGrowth.toFixed(1)}% CAGR</span></div>
                <div style={{ borderTop: "1px solid #172030", marginTop: 6, paddingTop: 6 }}>
                  Assessment: <span style={{ color: model.reqGrowth <= 10 ? "#4dd6a0" : model.reqGrowth <= 14 ? "#d4a853" : "#d65a6a" }}>
                    {model.reqGrowth <= 10 ? "Achievable — within bull-base range" :
                     model.reqGrowth <= 14 ? "Stretch — requires strong execution + favorable cycle" :
                     "Difficult — needs multiple expansion or above-consensus growth"}
                  </span>
                </div>
              </div>
            </Card>

            <Card accent="rgba(214,90,106,0.15)">
              <h3 style={{ fontSize: 11.5, color: "#d65a6a", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 12px" }}>Stress Tests</h3>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#8095a8", lineHeight: 2.3 }}>
                <div>P/FCF to 10x on $30 FCF/sh: <span style={{ color: "#d65a6a", fontWeight: 600 }}>$300</span> → <span style={{ color: "#d65a6a" }}>-21%</span></div>
                <div>FCF falls to $25 + 10x: <span style={{ color: "#d65a6a", fontWeight: 600 }}>$250</span> → <span style={{ color: "#d65a6a" }}>-35%</span></div>
                <div>PJM collapse, FCF to $20 + 8x: <span style={{ color: "#d65a6a", fontWeight: 600 }}>$160</span> → <span style={{ color: "#d65a6a" }}>-58%</span></div>
                <div style={{ borderTop: "1px solid rgba(214,90,106,0.15)", marginTop: 6, paddingTop: 6 }}>
                  Max realistic downside: <span style={{ color: "#d65a6a", fontWeight: 700 }}>-35% to -45%</span> <span style={{ fontSize: 10, color: "#4e6070" }}>(spread normalization + derating)</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ════════ VERDICT ════════ */}
        {tab === "verdict" && (() => {
          const price = A.price;
          const zones = [
            { label: "Buy with Size", floor: 0, ceil: 340, color: "#4dd6a0", bg: "rgba(77,214,160,0.08)", border: "rgba(77,214,160,0.2)", icon: "◆", desc: "Below 11x 2027 FCF/sh — getting paid for cycle risk" },
            { label: "Starter / Hold", floor: 340, ceil: 400, color: "#d4a853", bg: "rgba(212,168,83,0.08)", border: "rgba(212,168,83,0.2)", icon: "◇", desc: "Fair value zone — need conviction on PJM tightness" },
            { label: "Trim / Pass", floor: 400, ceil: 520, color: "#d65a6a", bg: "rgba(214,90,106,0.08)", border: "rgba(214,90,106,0.2)", icon: "○", desc: "Above 14x FCF/sh — priced for perfection on a cyclical" },
          ];
          const currentZone = zones.find(z => price >= z.floor && price < z.ceil) || zones[1];
          const barMin = 250; const barMax = 520;
          const pricePct = Math.max(0, Math.min(100, ((price - barMin) / (barMax - barMin)) * 100));

          return (
          <div>
            <div style={{
              background: `linear-gradient(135deg, ${currentZone.bg}, rgba(15,21,32,0.95))`,
              borderRadius: 12, padding: 24, border: `1px solid ${currentZone.border}`, marginBottom: 18,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>Verdict at ${price}</div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "#fff", margin: 0 }}>Conditional Buy</h2>
                  <div style={{ marginTop: 6 }}><Pill color={currentZone.color}>{currentZone.label.toUpperCase()} ZONE</Pill></div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Not a Conviction Buy</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "#7d8fa3", maxWidth: 260, lineHeight: 1.6 }}>
                    Thoughtful, eyes-open, position-sized-appropriately buy.
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 16, marginBottom: 22 }}>
                {[
                  { label: "15%+ CAGR Probability", value: "~40–50%", color: "#d4a853" },
                  { label: "Expected Return", value: "9–12%", color: "#d4a853" },
                  { label: "Max Downside", value: "-35%", color: "#d65a6a" },
                  { label: "Risk/Reward", value: "Improved", color: "#4dd6a0" },
                  { label: "Position Type", value: "Conditional", color: currentZone.color },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div style={{ fontSize: 9, color: "#3e5060", textTransform: "uppercase", letterSpacing: 1.1, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 700, color }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <Card accent="rgba(212,168,83,0.12)" style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 16px" }}>Action Framework by Price Zone</h3>

              <div style={{ marginBottom: 20, padding: "0 4px" }}>
                <div style={{ position: "relative", height: 36, borderRadius: 6, overflow: "hidden", display: "flex" }}>
                  {zones.map((z, i) => {
                    const w = ((Math.min(z.ceil, barMax) - Math.max(z.floor, barMin)) / (barMax - barMin)) * 100;
                    return (
                      <div key={i} style={{
                        width: `${w}%`, height: "100%", background: z.bg,
                        borderRight: i < zones.length - 1 ? `1px solid ${z.border}` : "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 10, color: z.color, fontFamily: "var(--mono)", fontWeight: 600, whiteSpace: "nowrap" }}>{z.label}</span>
                      </div>
                    );
                  })}
                  <div style={{
                    position: "absolute", left: `${pricePct}%`, top: -2, bottom: -2,
                    width: 2, background: "#fff", borderRadius: 1, zIndex: 2,
                    boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                  }} />
                  <div style={{
                    position: "absolute", left: `${pricePct}%`, top: -18, transform: "translateX(-50%)",
                    fontSize: 10, fontFamily: "var(--mono)", color: "#fff", fontWeight: 700,
                    background: "rgba(15,21,32,0.9)", padding: "1px 6px", borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}>${price}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 9, color: "#3e5060", fontFamily: "var(--mono)" }}>$250</span>
                  <span style={{ fontSize: 9, color: "#3e5060", fontFamily: "var(--mono)" }}>$520</span>
                </div>
              </div>

              {zones.map((z, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, alignItems: "flex-start",
                  padding: "12px 14px", marginBottom: i < zones.length - 1 ? 8 : 0,
                  borderRadius: 8,
                  background: price >= z.floor && price < z.ceil ? z.bg : "transparent",
                  border: price >= z.floor && price < z.ceil ? `1px solid ${z.border}` : "1px solid transparent",
                  transition: "all 0.2s",
                }}>
                  <div style={{ minWidth: 44, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 14, color: z.color, fontWeight: 700 }}>{z.icon}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: z.color, fontFamily: "var(--sans)" }}>{z.label}</span>
                      <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "#5a6a78" }}>
                        {z.floor > 0 ? `$${z.floor}` : "—"}–${z.ceil}
                      </span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#7d8fa3", lineHeight: 1.6 }}>
                      {z.desc}
                      {i === 0 && " · You're getting paid for the cycle risk at these levels. Full position warranted."}
                      {i === 1 && " · Starter or add-to-existing. Requires differentiated view that power scarcity persists 3–5 years."}
                      {i === 2 && " · Market is pricing in perfection. Cyclical risk not adequately compensated at these multiples."}
                    </div>
                    <div style={{ fontSize: 10.5, fontFamily: "var(--mono)", color: "#4e6070", marginTop: 4 }}>
                      {i === 0 && `${(z.ceil / 30).toFixed(1)}x or less on 2027 FCF/sh · Implied yield ${(30/z.ceil * 100).toFixed(1)}%+`}
                      {i === 1 && `${(z.floor / 30).toFixed(1)}x–${(z.ceil / 30).toFixed(1)}x on 2027 FCF/sh · Implied yield ${(30/z.ceil * 100).toFixed(1)}%–${(30/z.floor * 100).toFixed(1)}%`}
                      {i === 2 && `${(z.floor / 30).toFixed(1)}x+ on 2027 FCF/sh · Implied yield sub-${(30/z.floor * 100).toFixed(1)}%`}
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <Card accent="rgba(255,255,255,0.04)" style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 11.5, color: "#d4a853", fontWeight: 600, letterSpacing: 1.3, textTransform: "uppercase", margin: "0 0 14px" }}>Why Conditional — Not Conviction</h3>
              <div style={{ fontSize: 12.5, color: "#8095a8", lineHeight: 1.85, maxWidth: 740 }}>
                <p style={{ margin: "0 0 12px" }}>
                  <strong style={{ color: "#4dd6a0" }}>What works in its favor:</strong> The post-deal $30 FCF/sh anchor gives a 7.8% starting yield — genuinely attractive. Contracted EBITDA above 75% meaningfully reduces the left tail. Balance sheet deleveraging is rapid (6.1x → 2.0x by 2027). The probability-weighted expected return of ~9–12% is respectable.
                </p>
                <p style={{ margin: "0 0 12px" }}>
                  <strong style={{ color: "#d65a6a" }}>What keeps it from conviction:</strong> The sensitivity table tells the story. Hitting 15% CAGR needs either ~10%+ FCF/sh growth sustained for 5 years OR a 17x+ exit multiple — both require the power cycle to stay favorable. Revenue is flat after 2026, so you're entirely dependent on margin durability. The -35% bear case is real if PJM spreads normalize.
                </p>
                <p style={{ margin: "0 0 12px" }}>
                  <strong style={{ color: "#d4a853" }}>At $382 you're paying a fair price</strong> for a well-positioned cyclical, not a cheap price. The deal improved the risk/reward from "speculative" to "reasonable" but didn't transform TLN into a compounder. 40–50% probability of 15%+ returns means there's still a coin-flip chance you underperform your hurdle.
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: "#fff" }}>This is a buy if</strong> you have a differentiated view that power scarcity persists 3–5 more years through the AI build-out.{" "}
                  <strong style={{ color: "#fff" }}>It's a pass if</strong> you need structural compounding or can't stomach a -30% drawdown on spread normalization.
                </p>
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              <Card accent="rgba(77,214,160,0.12)">
                <h4 style={{ fontSize: 11, color: "#4dd6a0", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 10px" }}>Catalysts for Upside</h4>
                <div style={{ fontSize: 11.5, color: "#7d8fa3", lineHeight: 1.85 }}>
                  {["Additional data center contract(s)", "PJM capacity auction surprises to upside", "Further accretive M&A at good terms", "Buyback program acceleration", "Regulatory support for dispatchable power"].map(t => (
                    <div key={t} style={{ paddingLeft: 12, position: "relative", marginBottom: 3 }}>
                      <span style={{ position: "absolute", left: 0, color: "#4dd6a0" }}>→</span> {t}
                    </div>
                  ))}
                </div>
              </Card>
              <Card accent="rgba(214,90,106,0.12)">
                <h4 style={{ fontSize: 11, color: "#d65a6a", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 10px" }}>Key Risks</h4>
                <div style={{ fontSize: 11.5, color: "#7d8fa3", lineHeight: 1.85 }}>
                  {["PJM spread normalization / overbuild", "AI capex cycle slows or reverses", "Regulatory intervention in power pricing", "Integration risk on new acquisition", "Interest rate moves compressing utility comps"].map(t => (
                    <div key={t} style={{ paddingLeft: 12, position: "relative", marginBottom: 3 }}>
                      <span style={{ position: "absolute", left: 0, color: "#d65a6a" }}>→</span> {t}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card accent="rgba(212,168,83,0.1)" style={{ marginBottom: 14 }}>
              <h4 style={{ fontSize: 11, color: "#d4a853", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 10px" }}>Position Sizing Framework</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                {[
                  { size: "Full (4–5%)", condition: "Below $340 + PJM conviction", color: "#4dd6a0" },
                  { size: "Starter (1–2%)", condition: "$340–400, building thesis", color: "#d4a853" },
                  { size: "Watch / Trim", condition: "Above $400, await pullback", color: "#d65a6a" },
                ].map(({ size, condition, color }) => (
                  <div key={size} style={{ fontFamily: "var(--mono)", fontSize: 11.5 }}>
                    <div style={{ color, fontWeight: 700, marginBottom: 3 }}>{size}</div>
                    <div style={{ color: "#5a6a78", fontSize: 10.5 }}>{condition}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#4e6070", lineHeight: 1.8 }}>
                <span style={{ color: "#5a6a78" }}>Classification:</span> High-quality cyclical with structural tailwind &nbsp;·&nbsp;
                <span style={{ color: "#5a6a78" }}>Verdict:</span> Conditional Buy — not a table-pounding buy &nbsp;·&nbsp;
                <span style={{ color: "#5a6a78" }}>Anchor:</span> $30 FCF/sh (2027, post-deal)
              </div>
            </Card>
          </div>
          );
        })()}
      </div>
    </div>
  );
}
