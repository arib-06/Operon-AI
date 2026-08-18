"use client";

import { useState } from "react";
import { 
  Sun, Lock, Leaf, DollarSign, Thermometer, Battery, 
  Activity, Globe, Target, Maximize2, Plus, Minus, RotateCw, AlertTriangle
} from "lucide-react";
import Image from "next/image";
import TranslateWidget from "@/components/TranslateWidget";

export default function DataLakePage() {
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [panelState, setPanelState] = useState(true); // true = active, false = off
  const [energyGenerated, setEnergyGenerated] = useState(847.3);

  const handleTogglePanel = () => {
    setPanelState(!panelState);
  };

  const handleRefreshEnergy = () => {
    setEnergyGenerated(prev => parseFloat((prev + Math.random() * 2).toFixed(1)));
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] text-slate-300 font-sans p-4 md:p-6 lg:p-6 max-w-[1700px] mx-auto space-y-6">
      
      {/* Top Header */}
      <header className="flex items-center justify-between text-xs text-slate-500 font-sans px-2 uppercase tracking-widest border-b border-white/[0.04] pb-4">
         <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Operon AI</span>
            <span>•</span>
            <span className="text-slate-400">Soleil Solar Telemetry Data Lake</span>
         </div>
         <div className="flex items-center space-x-3">
            <TranslateWidget />
            <span className="flex items-center bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.08] shadow-inner">
                <div className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse mr-2" />
                <span className="text-slate-300 font-sans font-semibold tracking-wide uppercase">Telemetry Grid Connected</span>
            </span>
         </div>
      </header>

      {/* Main Grid Wrapper: Left sidebar + Right 3D Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Section: Soleil Headquarter Farm details */}
        <div className="lg:col-span-1 bg-[#18191b] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between shadow-2xl relative">
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight leading-tight">Soleil Headquarter Farm</h2>
                <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Batu, Malang • 6 active fields</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-slate-100 font-mono">120 <span className="text-xs text-slate-400 font-sans">kWp</span></div>
                <div className="text-[9px] text-slate-500 mt-0.5">Last updated 07:45</div>
              </div>
            </div>

            {/* Telemetry counts */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Active Inverters</span>
                <span className="font-mono text-white font-bold">6 / 6 <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">Online</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Panels Reporting</span>
                <span className="font-mono text-white font-bold">96 / 96 <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">Panels</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Active Alerts</span>
                <span className="font-mono text-white font-bold">{activeAlerts} <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">Alerts</span></span>
              </div>
            </div>

            {/* Power Flow Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-slate-400 flex items-center justify-between uppercase tracking-wider">
                <span>Power Flow</span>
                <span className="size-3.5 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-mono text-slate-500">i</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/[0.01] border border-white/[0.04] rounded p-2 text-center">
                  <div className="text-[9px] text-slate-500 font-mono uppercase">Solar Array</div>
                  <div className="text-xs font-bold text-white font-mono mt-1">12.4 <span className="text-[9px] text-slate-500 font-sans font-normal">MW</span></div>
                  <div className="w-full h-1 bg-white/[0.03] mt-2 rounded overflow-hidden">
                    <div className="w-2/3 h-full bg-slate-400" />
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/[0.04] rounded p-2 text-center">
                  <div className="text-[9px] text-slate-500 font-mono uppercase">Connection</div>
                  <div className="text-xs font-bold text-white mt-1">Stable</div>
                  <div className="w-full h-1 bg-white/[0.03] mt-2 rounded overflow-hidden">
                    <div className="w-full h-full bg-slate-400" />
                  </div>
                </div>
                <div className="bg-white/[0.01] border border-white/[0.04] rounded p-2 text-center">
                  <div className="text-[9px] text-slate-500 font-mono uppercase">Battery</div>
                  <div className="text-xs font-bold text-white font-mono mt-1">87%</div>
                  <div className="w-full h-1 bg-white/[0.03] mt-2 rounded overflow-hidden">
                    <div className="w-[87%] h-full bg-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary Bottom Box */}
          <div className="mt-8 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase">AI Summary</span>
              <span className="px-2 py-0.5 rounded text-[8px] font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-950/20 uppercase tracking-wider">Operation Normal</span>
            </div>
            <p className="text-xs text-slate-305 leading-relaxed font-sans">
              Energy output, efficiency, and thermal conditions are stable across all active fields.
            </p>
            <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-white/[0.04] pt-2 font-mono uppercase">
              <span>High <span className="text-[8px] text-slate-650 block font-sans">Stability</span></span>
              <span>Low <span className="text-[8px] text-slate-650 block font-sans">Efficiency Risk</span></span>
              <span>None <span className="text-[8px] text-slate-650 block font-sans">Maintenance</span></span>
            </div>
          </div>
        </div>

        {/* Right Section: 3D panel canvas */}
        <div className="lg:col-span-3 bg-[#18191b] border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col justify-between">
          {/* Top text overlay */}
          <div className="absolute top-5 left-6 z-10">
            <h2 className="text-base font-bold text-white tracking-tight leading-tight">Soleil Headquarter Cubiq 1</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 font-mono uppercase tracking-wider font-semibold">SOL001-SOL015</p>
          </div>

          {/* Isometric 3D Render Image as canvas background */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 bg-[#18191b]">
            <div className="relative w-full h-full max-w-[650px] aspect-square opacity-95">
              <Image 
                src="/3d_solar_panel_array.jpg" 
                alt="3D Solar Panel Array" 
                fill 
                className="object-contain rounded-lg"
                priority
              />
              
              {/* Highlight Nodes / Target Dots over panel coordinates */}
              <div className="absolute top-[28%] left-[54%] w-3 h-3 bg-white rounded-full border border-slate-900 shadow-lg animate-ping" />
              <div className="absolute top-[28%] left-[54%] w-2 h-2 bg-white rounded-full border border-slate-900 shadow-lg" />
              
              <div className="absolute top-[38%] left-[44%] w-3 h-3 bg-white rounded-full border border-slate-900 shadow-lg animate-ping" />
              <div className="absolute top-[38%] left-[44%] w-2 h-2 bg-white rounded-full border border-slate-900 shadow-lg" />

              <div className="absolute top-[48%] left-[34%] w-3 h-3 bg-white rounded-full border border-slate-900 shadow-lg animate-ping" />
              <div className="absolute top-[48%] left-[34%] w-2 h-2 bg-white rounded-full border border-slate-900 shadow-lg" />
              
              <div className="absolute top-[20%] left-[64%] w-3 h-3 bg-white rounded-full border border-slate-900 shadow-lg animate-ping" />
              <div className="absolute top-[20%] left-[64%] w-2 h-2 bg-white rounded-full border border-slate-900 shadow-lg" />

              <div className="absolute top-[33%] left-[73%] w-3 h-3 bg-white rounded-full border border-slate-900 shadow-lg animate-ping" />
              <div className="absolute top-[33%] left-[73%] w-2 h-2 bg-white rounded-full border border-slate-900 shadow-lg" />

              <div className="absolute top-[44%] left-[61%] w-3 h-3 bg-white rounded-full border border-slate-900 shadow-lg animate-ping" />
              <div className="absolute top-[44%] left-[61%] w-2 h-2 bg-white rounded-full border border-slate-900 shadow-lg" />
            </div>
          </div>

          {/* Right Floating Dashboard Box Panel 006 */}
          <div className="absolute top-5 right-6 z-10 w-72 bg-[#1e1f22]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-4.5 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-xs font-bold text-white font-mono">Panel 006</h3>
                <div className="text-[9px] text-slate-500 mt-0.5 font-sans">Array B • 12 Panels</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-400 font-mono">4.92 <span className="text-[9px] text-slate-400 font-sans font-normal ml-0.5">kW</span></div>
                <div className="text-[8px] text-slate-500 mt-0.5 font-mono">Last updated 07:45</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-white/[0.03] border border-white/[0.06] rounded">
                  <Activity className="size-3.5 text-slate-350" />
                </div>
                <div>
                  <div className="text-slate-100 font-bold font-mono">91.4%</div>
                  <div className="text-[8px] text-slate-550 uppercase font-sans">Efficiency</div>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-white/[0.03] border border-white/[0.06] rounded">
                  <Thermometer className="size-3.5 text-slate-355" />
                </div>
                <div>
                  <div className="text-slate-100 font-bold font-mono">42°C</div>
                  <div className="text-[8px] text-slate-550 uppercase font-sans">Temperature</div>
                </div>
              </div>
            </div>

            {/* AI Summary Box */}
            <div className="bg-[#18191b] border border-white/[0.05] rounded-lg p-3 text-[11px]">
              <div className="text-slate-405 uppercase tracking-widest text-[8px] font-mono mb-1 font-bold">AI Summary</div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Slight efficiency drop likely caused by surface dust accumulation.
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={handleTogglePanel}
                className={`py-2 rounded-lg font-bold uppercase tracking-wider text-[10px] border transition-all cursor-pointer ${
                  panelState 
                    ? "bg-[#18191b] text-slate-200 border-white/[0.08] hover:bg-[#202124]" 
                    : "bg-emerald-500 text-slate-900 border-emerald-400 font-black hover:bg-emerald-400"
                }`}
              >
                {panelState ? "Turn Off" : "Turn On"}
              </button>
              <button 
                onClick={handleRefreshEnergy}
                className="py-2 bg-transparent text-slate-300 border border-white/20 hover:bg-white/5 rounded-lg font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Floating HUD controls bottom-left */}
          <div className="absolute bottom-5 left-6 z-10 flex space-x-2">
            <button className="p-2 bg-[#1e1f22]/90 border border-white/[0.08] rounded hover:bg-[#25262a] transition-all text-slate-300 cursor-pointer shadow-lg">
              <Target className="size-4" />
            </button>
            <button className="p-2 bg-[#1e1f22]/90 border border-white/[0.08] rounded hover:bg-[#25262a] transition-all text-slate-300 cursor-pointer shadow-lg">
              <Globe className="size-4" />
            </button>
          </div>

          {/* Floating Zoom HUD controls bottom-right */}
          <div className="absolute bottom-5 right-6 z-10 flex space-x-2">
            <button className="p-2 bg-[#1e1f22]/90 border border-white/[0.08] rounded hover:bg-[#25262a] transition-all text-slate-300 cursor-pointer shadow-lg">
              <Plus className="size-4" />
            </button>
            <button className="p-2 bg-[#1e1f22]/90 border border-white/[0.08] rounded hover:bg-[#25262a] transition-all text-slate-300 cursor-pointer shadow-lg">
              <Minus className="size-4" />
            </button>
          </div>

          {/* Layout corner decor border spacer */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 pointer-events-none" />
        </div>

      </div>

      {/* Bottom Grid: Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Column 1: Stack of 4 small cards */}
        <div className="grid grid-cols-2 gap-4">
          
          <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between h-28 relative shadow-lg">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Energy Generated</div>
              <Sun className="size-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-white font-mono leading-none">25,482 <span className="text-[10px] text-slate-400 font-sans font-normal ml-0.5">kwh</span></div>
              <div className="text-[9px] text-emerald-400 font-semibold font-mono tracking-tight">+2.6% vs Yesterday</div>
            </div>
            <div className="absolute top-2 right-2 text-[9px] text-slate-650 font-mono cursor-help">ⓘ</div>
          </div>

          <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between h-28 relative shadow-lg">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Current Power Output</div>
              <Lock className="size-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-white font-mono leading-none">5.48 <span className="text-[10px] text-slate-400 font-sans font-normal ml-0.5">kW</span></div>
              <div className="text-[9px] text-emerald-400 font-semibold font-mono tracking-tight">+2.6% vs Yesterday</div>
            </div>
            <div className="absolute top-2 right-2 text-[9px] text-slate-650 font-mono cursor-help">ⓘ</div>
          </div>

          <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between h-28 relative shadow-lg">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">System Efficiency</div>
              <Leaf className="size-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-white font-mono leading-none">94 <span className="text-[10px] text-slate-400 font-sans font-normal ml-0.5">%</span></div>
              <div className="text-[9px] text-emerald-400 font-semibold font-mono tracking-tight">+2.6% vs Yesterday</div>
            </div>
            <div className="absolute top-2 right-2 text-[9px] text-slate-650 font-mono cursor-help">ⓘ</div>
          </div>

          <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between h-28 relative shadow-lg">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Estimated Revenue</div>
              <DollarSign className="size-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-white font-mono leading-none">$1,250 <span className="text-[10px] text-slate-400 font-sans font-normal ml-0.5 font-sans">/kwh</span></div>
              <div className="text-[9px] text-emerald-400 font-semibold font-mono tracking-tight">+2.6% vs Yesterday</div>
            </div>
            <div className="absolute top-2 right-2 text-[9px] text-slate-650 font-mono cursor-help">ⓘ</div>
          </div>

        </div>

        {/* Card Column 2: Panel Temperature Monitoring + Gauge */}
        <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between shadow-lg relative h-60">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Panel Temperature Monitoring</h3>
            <span className="text-[9px] text-slate-600 font-mono">ⓘ</span>
          </div>

          {/* Row Temperatures */}
          <div className="flex justify-between items-center text-center mt-1 border-b border-white/[0.04] pb-3">
            <div>
              <div className="text-lg font-bold text-slate-200 font-mono font-sans">35<span className="text-[10px] text-slate-400 ml-0.5">°C</span></div>
              <div className="text-[8px] text-slate-500 uppercase font-mono font-sans">Row 001</div>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div>
              <div className="text-lg font-bold text-amber-500 font-mono">87<span className="text-[10px] text-slate-400 ml-0.5">°C</span></div>
              <div className="text-[8px] text-slate-500 uppercase font-mono font-sans">Row 002</div>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div>
              <div className="text-lg font-bold text-slate-200 font-mono">57<span className="text-[10px] text-slate-400 ml-0.5">°C</span></div>
              <div className="text-[8px] text-slate-500 uppercase font-mono font-sans">Row 003</div>
            </div>
          </div>

          {/* Arc Gauge rendering */}
          <div className="relative flex-1 flex flex-col items-center justify-end mt-2 overflow-hidden h-28">
            <svg viewBox="0 0 100 50" className="w-36 h-18">
              {/* Gauge path background */}
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" strokeDasharray="1 1" />
              {/* Highlight active path */}
              <path d="M 10 50 A 40 40 0 0 1 70 50" fill="none" stroke="#64748b" strokeWidth="8" strokeDasharray="1.5 1.5" />
            </svg>
            
            {/* Center Gauge values and Button */}
            <div className="absolute bottom-0 flex flex-col items-center text-center space-y-1">
              <div className="flex space-x-6 text-[9px] text-slate-500 font-mono uppercase">
                <span>12°C <span className="text-[8px] text-slate-600 block">Min</span></span>
                <span>42°C <span className="text-[8px] text-slate-600 block">Max</span></span>
              </div>
              <button className="px-5 py-1.5 bg-[#1e1f22] border border-white/[0.08] hover:bg-[#25262a] transition-all rounded-full text-[9px] font-bold text-slate-200 uppercase tracking-widest cursor-pointer">
                Cooling Down
              </button>
            </div>
          </div>
        </div>

        {/* Card Column 3: Live Power Output + Panel Energy Distribution */}
        <div className="flex flex-col gap-4 h-60">
          {/* Top segment: Live Power Output */}
          <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between flex-1 shadow-lg relative">
            <div className="flex justify-between items-start">
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono font-sans">Live Power Output</h3>
              <span className="text-[9px] text-slate-600 font-mono">ⓘ</span>
            </div>
            
            <div className="flex items-end justify-between my-2">
              <div className="flex space-x-4 text-[9px] text-slate-400 font-mono">
                <span>25.5 <span className="text-slate-600 block text-[8px] font-sans">Min</span></span>
                <span>86.7 <span className="text-slate-600 block text-[8px] font-sans">Max</span></span>
              </div>
              
              {/* Code-like barcode bar chart */}
              <div className="flex items-end space-x-[2px] h-9">
                <div className="w-[1.5px] bg-slate-600 h-2" />
                <div className="w-[1.5px] bg-slate-600 h-3" />
                <div className="w-[1.5px] bg-slate-600 h-1.5" />
                <div className="w-[1.5px] bg-white/70 h-5" />
                <div className="w-[1.5px] bg-slate-600 h-4" />
                <div className="w-[1.5px] bg-slate-600 h-2.5" />
                <div className="w-[1.5px] bg-white h-7" />
                <div className="w-[1.5px] bg-slate-600 h-3.5" />
                <div className="w-[1.5px] bg-slate-600 h-5" />
                <div className="w-[1.5px] bg-slate-600 h-2" />
                <div className="w-[1.5px] bg-white/60 h-6" />
                <div className="w-[1.5px] bg-slate-600 h-3" />
                <div className="w-[1.5px] bg-slate-600 h-1.5" />
                <div className="w-[1.5px] bg-slate-600 h-4.5" />
                <div className="w-[1.5px] bg-white h-8" />
                <div className="w-[1.5px] bg-slate-600 h-3" />
                <div className="w-[1.5px] bg-slate-600 h-2.5" />
                <div className="w-[1.5px] bg-slate-600 h-4" />
                <div className="w-[1.5px] bg-white/40 h-5.5" />
                <div className="w-[1.5px] bg-slate-600 h-2" />
              </div>
            </div>
          </div>

          {/* Bottom segment: Panel Energy Distribution */}
          <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between flex-1 shadow-lg relative">
            <div className="flex justify-between items-start">
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Panel Energy Distribution</h3>
              <span className="text-[9px] text-slate-650 font-mono">ⓘ</span>
            </div>

            {/* Distribution segments */}
            <div className="flex items-end justify-between space-x-1.5 mt-2 h-7 relative">
              {/* Segment 001 */}
              <div className="flex-1 h-full bg-white/[0.02] border border-white/[0.04] rounded flex flex-col justify-between p-1">
                <span className="text-[7px] text-slate-500 font-mono uppercase">001</span>
                <div className="w-full h-1 bg-white/[0.03] rounded-sm overflow-hidden">
                  <div className="w-[45%] h-full bg-slate-400" />
                </div>
              </div>
              {/* Segment 002 */}
              <div className="flex-1 h-full bg-white/[0.02] border border-white/[0.04] rounded flex flex-col justify-between p-1">
                <span className="text-[7px] text-slate-500 font-mono uppercase">002</span>
                <div className="w-full h-1 bg-white/[0.03] rounded-sm overflow-hidden">
                  <div className="w-[85%] h-full bg-slate-400" />
                </div>
              </div>
              {/* Segment 003 */}
              <div className="flex-1 h-full bg-white/[0.02] border border-white/[0.04] rounded flex flex-col justify-between p-1">
                <span className="text-[7px] text-slate-500 font-mono uppercase">003</span>
                <div className="w-full h-1 bg-white/[0.03] rounded-sm overflow-hidden">
                  <div className="w-[20%] h-full bg-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Column 4: Energy Generated Today + Ring Gauge */}
        <div className="bg-[#18191b] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between shadow-lg relative h-60">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Energy Generated Today</h3>
            <span className="text-[9px] text-slate-655 font-mono">ⓘ</span>
          </div>

          {/* Stats subheaders */}
          <div className="flex justify-between items-center text-center mt-1 border-b border-white/[0.04] pb-3">
            <div>
              <div className="text-xs font-bold text-slate-200 font-mono">86.7 MWh</div>
              <div className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">Avg</div>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div>
              <div className="text-xs font-bold text-slate-200 font-mono font-sans">90.0 MWh</div>
              <div className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">Target</div>
            </div>
            <div className="w-px h-6 bg-white/[0.06]" />
            <div>
              <div className="text-xs font-bold text-rose-500 font-mono">-5.9%</div>
              <div className="text-[8px] text-slate-500 uppercase font-mono mt-0.5">Deviation</div>
            </div>
          </div>

          {/* Circular ring gauge */}
          <div className="relative flex-1 flex flex-col items-center justify-end mt-2 overflow-hidden h-28">
            <svg viewBox="0 0 100 100" className="w-24 h-24 absolute -bottom-4">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
              {/* Active ring path segment */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="6" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" className="-rotate-90 origin-center" />
            </svg>

            {/* Inner values and button */}
            <div className="absolute top-4 flex flex-col items-center text-center space-y-0.5">
              <div className="text-[8px] text-slate-550 font-mono uppercase">Total Energy</div>
              <div className="text-sm font-bold text-white font-mono leading-none">{energyGenerated}</div>
              <div className="text-[8px] text-slate-450 font-mono">MWh</div>
            </div>
            
            <button 
              onClick={handleRefreshEnergy}
              className="absolute bottom-0 px-5 py-1.5 bg-[#1e1f22] border border-white/[0.08] hover:bg-[#25262a] transition-all rounded-full text-[9px] font-bold text-slate-200 uppercase tracking-widest z-10 cursor-pointer"
            >
              Refresh Energy
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
