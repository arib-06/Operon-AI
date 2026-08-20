"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Wind,
  AlertCircle,
  Target,
  Cpu,
  Database,
  TrendingDown,
  BrainCircuit,
  Terminal
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyzeEnergy, EnergyData, AuthOperatorOutput } from "@/lib/analyzeEnergy";
import { cn } from "@/lib/utils";

// --- Top Card Component ---
function TopCard({ title, value, icon: Icon, colorClass, borderClass }: any) {
  return (
    <div className={cn("widget-hover px-5 py-5 rounded-xl relative overflow-hidden group", borderClass)}>
      {/* Glossy top reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-start relative z-10 font-sans">
        <div>
          <h3 className="text-[10px] font-medium text-slate-400 group-hover:text-slate-300 transition-colors uppercase tracking-wider mb-1 font-sans">
            {title}
          </h3>
          <div className="text-xl font-bold text-white tracking-tight leading-none mt-2 font-sans">{value}</div>
        </div>
        <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/5 transition-colors group-hover:bg-white/10 shadow-inner", colorClass)}>
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<EnergyData>({
    operon: 65,
    temp: 55,
    expected: 250, // Higher default kW for impact
    actual: 180,
    electricityRate: 0.18 // SAR
  });

  const [analysis, setAnalysis] = useState<AuthOperatorOutput>(analyzeEnergy(data));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysis(analyzeEnergy(data));
      setIsAnalyzing(false);
    }, 800);
  };

  const chartData = useMemo(() => {
    const base = new Date().getHours() || 12;
    const points = [];
    for (let i = 0; i < 7; i++) {
        const timeStr = `${Math.max(0, base - 6 + i)}:00`;
        const variance = Math.random() * 8 - 4;
        points.push({
            time: timeStr,
            Expected: data.expected,
            Actual: i === 6 ? data.actual : Math.max(0, Math.min(data.expected, data.actual + variance + (6-i)*2.5)),
        });
    }
    return points;
  }, [data.expected, data.actual]);

  const efficiencyScore = data.expected > 0 ? ((data.actual / data.expected) * 100).toFixed(1) : "0";
  
  return (
    <div className="text-slate-300 font-sans pb-12">

      <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        
        {/* === HEADER === */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/[0.08] pb-4">
          <div>
             <div className="flex items-center space-x-2 mb-1">
                <BrainCircuit className="size-5 text-slate-200" />
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">Autonomous Energy Dispatcher</h1>
             </div>
            <p className="text-slate-400 text-sm tracking-wide font-medium">NEOM Solar Array — Sector 7 Operations</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center space-x-2 bg-white/[0.04] backdrop-blur-md px-4 py-2 rounded-full border border-white/[0.08]">
                <div className="size-2 bg-sky-400 rounded-full" />
                <span className="text-xs font-sans text-slate-200 font-semibold tracking-wide uppercase">Operator Active</span>
             </div>
          </div>
        </header>

        {/* === 1. TOP HEADER CARDS === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TopCard
            title="Module Efficiency"
            value={`${efficiencyScore}%`}
            icon={Target}
            colorClass="text-slate-300"
            borderClass="border-white/[0.08]"
          />
          <TopCard
            title="Current Issue"
            value={analysis.issue}
            icon={AlertCircle}
            colorClass={analysis.currentLossPercent > 10 ? "text-amber-400" : "text-slate-300"}
             borderClass={analysis.currentLossPercent > 10 ? "border-amber-500/20" : "border-white/[0.08]"}
          />
          <TopCard
            title="Projected 3-Day Loss"
            value={`SAR ${analysis.scenarios.noAction.moneyLost}`}
            icon={TrendingDown}
            colorClass="text-rose-400"
            borderClass="border-rose-500/10"
          />
          <TopCard
            title="Operator Status"
            value={analysis.automation.status.toUpperCase()}
            icon={Terminal}
            colorClass={
              analysis.automation.status === 'Dispatched' ? "text-sky-400" : 
              analysis.automation.status === 'Scheduled' ? "text-amber-400" : "text-slate-300"
            }
            borderClass={
              analysis.automation.status === 'Dispatched' ? "border-sky-500/20 bg-sky-950/10" : 
              analysis.automation.status === 'Scheduled' ? "border-amber-500/20 bg-amber-950/10" : "border-white/[0.08] bg-white/[0.01]"
            }
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
          
          {/* === 2. INPUT PANEL (LEFT) === */}
          <div className="xl:col-span-1 widget-hover rounded-2xl p-6 flex flex-col justify-between">
             <div>
                <h3 className="text-sm font-semibold text-slate-300 flex items-center space-x-2 mb-6 uppercase tracking-widest border-b border-white/[0.08] pb-3">
                  <Wind className="size-4 text-slate-400" />
                  <span>Telemetry Simulator</span>
                </h3>

                <div className="space-y-6">
                  {/* Operon */}
                  <div className="group/slider space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-slate-400 uppercase tracking-wider font-bold text-[10px]">Operon Level (%)</label>
                      <span className="font-mono text-slate-300 font-bold">{data.operon}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-1.5 bg-white/[0.02] rounded-lg appearance-none cursor-ew-resize accent-slate-400 border border-white/[0.08] shadow-inner transition-colors"
                      value={data.operon}
                      onChange={(e) => setData({ ...data, operon: parseInt(e.target.value) })}
                    />
                  </div>

                  {/* Temp */}
                  <div className="group/slider space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="text-slate-400 uppercase tracking-wider font-bold text-[10px]">Matrix Temperature (°C)</label>
                      <span className="font-mono text-slate-300 font-bold">{data.temp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      className="w-full h-1.5 bg-white/[0.02] rounded-lg appearance-none cursor-ew-resize accent-slate-400 border border-white/[0.08] shadow-inner transition-colors"
                      value={data.temp}
                      onChange={(e) => setData({ ...data, temp: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 mb-2 block uppercase tracking-wider font-bold">Expected (kW)</label>
                      <input
                        type="number"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg p-3 text-xl text-white outline-none focus:border-white/30 focus:bg-white/[0.05] font-mono transition-all shadow-inner"
                        value={data.expected}
                        onChange={(e) => setData({ ...data, expected: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 mb-2 block uppercase tracking-wider font-bold">Actual (kW)</label>
                      <input
                        type="number"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg p-3 text-xl text-white outline-none focus:border-white/30 focus:bg-white/[0.05] font-mono transition-all shadow-inner"
                        value={data.actual}
                        onChange={(e) => setData({ ...data, actual: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
             </div>

             <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-8 w-full py-4 rounded-lg font-bold tracking-widest uppercase text-sm flex items-center justify-center space-x-2 bg-white/[0.05] text-white border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isAnalyzing ? "Processing..." : "Run AI Simulation"}
             </button>
          </div>

          {/* === 3. THREE-LAYER OUTPUT SYSTEM === */}
          <div className="xl:col-span-2 flex flex-col gap-6">
             
             {/* SECTION A & B IN ONE ROW */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SECTION A - RAW DATA */}
                <div className="widget-hover rounded-2xl p-5 relative">
                   <div className="absolute top-0 right-0 py-1.5 px-3 text-[9px] text-slate-500 font-mono uppercase tracking-widest bg-white/[0.01] rounded-bl-lg border-b border-l border-white/[0.08]">
                     Diagnostic Readout
                   </div>
                   <h3 className="text-sm font-semibold text-white flex items-center space-x-2 mb-5">
                     <Database className="size-4 text-slate-400" />
                     <span>Diagnostic Overlay</span>
                   </h3>
                   <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center border-b border-white/[0.06] pb-3">
                        <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Operon Level</span>
                        <span className="font-mono text-slate-200">{data.operon}%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/[0.06] pb-3">
                        <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Array Temp</span>
                        <span className="font-mono text-slate-200">{data.temp}°C</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/[0.06] pb-2">
                        <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Output Delta</span>
                        <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">-{Math.max(0, data.expected - data.actual)} kW</span>
                      </div>
                   </div>
                </div>

                {/* SECTION B - SCENARIOS */}
                <div className="widget-hover rounded-2xl p-5 relative">
                   <div className="absolute top-0 right-0 py-1.5 px-3 text-[9px] text-slate-500 font-mono uppercase tracking-widest bg-white/[0.01] rounded-bl-lg border-b border-l border-white/[0.08]">
                     Projections
                   </div>
                   <h3 className="text-sm font-semibold text-white flex items-center space-x-2 mb-5">
                     <Activity className="size-4 text-slate-400" />
                     <span>Financial Simulation (72h)</span>
                   </h3>
                   <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/[0.06]">
                        <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold">If No Action:</span>
                        <span className="font-mono text-rose-400 text-sm font-bold tracking-tight">-SAR {analysis.scenarios.noAction.moneyLost}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/[0.06]">
                        <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">If Act Immediate:</span>
                        <span className="font-mono text-amber-400 text-sm font-bold tracking-tight">Saves SAR {analysis.scenarios.immediateAction.savings}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/[0.06]">
                         <span className="text-[11px] uppercase tracking-wider text-sky-400 font-bold">If Act in 48h:</span>
                         <span className="font-mono text-sky-400 text-sm font-bold tracking-tight">Saves SAR {analysis.scenarios.delayedAction.savings}</span>
                      </div>
                   </div>
                </div>

             </div>

             {/* SECTION C - DECISION ENGINE */}
              <div className="widget-hover rounded-xl relative overflow-hidden flex flex-col justify-between flex-1">
                  
                  <div className="p-7 relative z-10">
                    <div className="absolute top-0 right-0 py-1.5 px-3 text-[9px] text-slate-400 font-mono uppercase tracking-widest bg-white/[0.02] rounded-bl-lg border-b border-l border-white/[0.08]">
                        Decision Output
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-2 mb-8 uppercase tracking-widest">
                        <Cpu className="size-5 text-slate-400" />
                        <span>Decision Engine</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-2">
                       {/* Left decision block */}
                       <div className="space-y-6">
                          <div>
                            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Recommended Action</div>
                            <div className="text-2xl font-bold text-white leading-tight">{analysis.decision.recommendedAction}</div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Target Schedule</div>
                            <div className="font-bold text-amber-400 text-lg flex items-center">
                               <span className="size-2 rounded-full bg-amber-500 mr-2" />
                               {analysis.decision.bestTime}
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-white/[0.08] pl-4 py-1">
                             "{analysis.decision.reason}"
                          </p>
                       </div>

                       {/* Right side Terminal Readout */}
                       <div className="flex flex-col justify-center">
                          <div className="bg-black/20 border border-white/[0.08] rounded-xl p-5 font-mono text-xs text-slate-300 relative shadow-inner">
                             <div className="absolute top-2.5 left-3.5 flex space-x-1.5 opacity-60">
                                <div className="size-2.5 rounded-full bg-rose-500/80 border border-rose-950" />
                                <div className="size-2.5 rounded-full bg-amber-500/80 border border-amber-950" />
                                <div className="size-2.5 rounded-full bg-sky-500/80 border border-sky-950" />
                             </div>
                             <div className="pt-6 space-y-2.5 leading-relaxed opacity-90">
                                <p className="text-slate-500">operator@operon:~# invoke dispatcher --simulate</p>
                                <p className="text-slate-400">{'>'} Analyzing telemetry matrices...</p>
                                <p className="text-slate-400 flex"><span className="mr-2">{'>'}</span> <span>Applying action protocol: [{analysis.automation.status.toUpperCase()}]</span></p>
                                <p className="border-t border-white/[0.06] pt-3 mt-3 text-slate-300 font-bold tracking-tight">
                                   System Status: <span className="text-slate-400 font-normal">{analysis.automation.message}</span>
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>

        {/* BOTTOM: CHART SECTION */}
        <div className="grid grid-cols-1">
          <div className="widget-hover rounded-2xl p-6 h-80 relative overflow-hidden group">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2 mb-6 uppercase tracking-widest border-b border-white/[0.06] pb-3">
               <Activity className="size-4 text-slate-400" />
               <span>Live Telemetry Grid (kW)</span>
            </h3>
            <ResponsiveContainer width="100%" height="80%" className="relative z-10">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(10, 13, 22, 0.95)', borderColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px', borderWidth: '1px' }}
                  itemStyle={{ color: '#f1f5f9', fontSize: '13px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="Expected" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="4 4" isAnimationActive={false}/>
                <Line type="monotone" dataKey="Actual" stroke="#f43f5e" strokeWidth={3} dot={true} activeDot={{r: 6}} isAnimationActive={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>
    </div>
  );
}
