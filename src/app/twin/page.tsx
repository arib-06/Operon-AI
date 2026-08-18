"use client";

import { Layers, Building2, Zap, BrainCircuit, Activity, Plus, Globe, ChevronRight, AlertTriangle } from "lucide-react";
import { useState } from "react";
import TranslateWidget from "@/components/TranslateWidget";

function MapCanvas() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom manually so it doesn't scroll the page
    const delta = e.deltaY * -0.002;
    setZoom(z => Math.max(0.5, Math.min(z + delta, 4)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrag(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrag) return;
    setPan(p => ({
      x: p.x + (e.clientX - lastPos.x),
      y: p.y + (e.clientY - lastPos.y)
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };
  const handlePointerUp = () => setIsDrag(false);

  return (
    <div 
      className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden z-0"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div 
        className="absolute inset-0 origin-center transition-transform duration-75"
        style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
      >
        {/* 1. MAP BACKGROUND (pointer-events-none is crucial so WE handle pans, not the iframe) */}
        <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=39.94%2C29.62%2C40.06%2C29.74&amp;layer=mapnik" 
            className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity grayscale pointer-events-none"
        ></iframe>

        {/* Light Grid Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{ backgroundImage: "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* 2. HEATMAP BLURS */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
           <div className="absolute top-[30%] left-[40%] w-64 h-64 bg-emerald-600/10 rounded-full blur-[60px]" />
           <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
        </div>

        {/* 3. INTERACTIVE PINS */}
        <div className="absolute inset-0 z-[10] pointer-events-none">
            {[
              { id: 1, top: "35%", left: "45%", color: "bg-white", name: "Inv-B2", type: "Inverter", status: "Critical" },
              { id: 2, top: "25%", left: "28%", color: "bg-white", name: "Dock Alpha", type: "Drone Base", status: "Active" },
              { id: 3, top: "28%", left: "65%", color: "bg-white", name: "Sub-4", type: "Substation", status: "Warning" },
              { id: 4, top: "52%", left: "68%", color: "bg-white", name: "WXT-50", type: "Sensor", status: "Nominal" },
              { id: 5, top: "60%", left: "55%", color: "bg-emerald-500", name: "Inv-C1", type: "Inverter", status: "Nominal" },
              { id: 6, top: "40%", left: "58%", color: "bg-emerald-500", name: "Inv-C2", type: "Inverter", status: "Nominal" },
              { id: 7, top: "65%", left: "35%", color: "bg-white", name: "Dock Beta", type: "Drone Base", status: "Active" },
              { id: 8, top: "70%", left: "45%", color: "bg-white", name: "WXT-51", type: "Sensor", status: "Nominal" },
              { id: 9, top: "48%", left: "32%", color: "bg-white", name: "Sub-2", type: "Substation", status: "Warning" },
              { id: 10, top: "30%", left: "50%", color: "bg-emerald-500", name: "Inv-B1", type: "Inverter", status: "Nominal" },
              { id: 11, top: "22%", left: "45%", color: "bg-emerald-500", name: "Inv-B3", type: "Inverter", status: "Nominal" },
              { id: 12, top: "66%", left: "60%", color: "bg-emerald-500", name: "Inv-C3", type: "Inverter", status: "Thermal Overload" },
            ].map((node) => (
                <div 
                  key={node.id} 
                  className="absolute flex flex-col items-center group pointer-events-auto cursor-pointer transition-all duration-300 hover:z-[60]"
                  style={{ top: node.top, left: node.left }}
                >
                     {/* Circle dot */}
                     <div className={`size-3 rounded-full ${node.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-150 shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                     
                     {/* Hover Tooltip (Large) */}
                     <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#010a05]/95 backdrop-blur-xl border border-emerald-500/50 rounded-lg p-3 w-40 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-2xl pointer-events-none">
                         <div className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest uppercase mb-1">{node.type}</div>
                         <div className="text-sm font-bold text-white mb-2 tracking-tight">{node.name}</div>
                         <div className="flex justify-between items-center text-[9px]">
                             <span className="text-slate-400 uppercase tracking-widest">Status</span>
                             <span className={`font-mono font-bold uppercase tracking-widest ${node.status === 'Nominal' || node.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>{node.status}</span>
                         </div>
                     </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function GeospatialTwinPage() {
  return (
    <div className="flex flex-col h-screen text-slate-300 font-sans p-4 md:p-6 lg:p-4 max-w-[1800px] mx-auto overflow-hidden">
        
        {/* Header echoing Ontora */}
        <header className="flex items-center justify-between text-xs text-slate-500 mb-4 px-2 tracking-widest uppercase font-sans">
           <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-300">Operon</span>
              <span>•</span>
              <span className="text-slate-400">Sakaka Digital Twin</span>
           </div>
           <div className="flex items-center space-x-3">
              <TranslateWidget />
              <span className="flex items-center bg-white/[0.04] px-3 py-1.5 rounded-md border border-white/[0.08] shadow-inner">
                  <div className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse mr-2" />
                  <span className="text-slate-300 font-sans font-semibold tracking-wide uppercase">Live Simulation</span>
              </span>
           </div>
        </header>

        {/* MAIN CANVAS wrapper matching Image 4 */}
        <div className="flex-1 rounded-xl relative overflow-hidden shadow-2xl flex flex-col bg-white/[0.01] border border-white/[0.08]">
            
            <MapCanvas />

            {/* Top Bar Floating left */}
            <div className="absolute top-4 left-4 z-20 flex items-start gap-4 pointer-events-auto">
                <div className="widget-hover rounded-lg p-3 w-80">
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3 mb-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                              <div className="bg-white/[0.05] p-1.5 rounded text-slate-300">
                                  <Globe className="size-4" />
                              </div>
                              <div>
                                  <h2 className="font-bold text-white tracking-tight text-[11px] uppercase">Sakaka Array Twin</h2>
                                  <div className="text-[9px] text-slate-500 font-sans tracking-wide uppercase">Region 4 · Active Modeling</div>
                              </div>
                          </div>
                          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                             <div className="size-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                             <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Live</span>
                         </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-white/[0.01] border border-white/[0.06] rounded p-2 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.03]">
                            <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest mb-1 flex items-center"><Zap className="size-2 mr-0.5"/>kW Out</span>
                            <span className="text-sm font-bold font-mono text-white">842K</span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.06] rounded p-2 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.03]">
                            <span className="text-[8px] text-amber-400 font-bold uppercase tracking-widest mb-1 flex items-center"><Layers className="size-2 mr-0.5"/>Nodes</span>
                            <span className="text-sm font-bold font-mono text-amber-100">145</span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.06] rounded p-2 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.03]">
                            <span className="text-[8px] text-rose-400 font-bold uppercase tracking-widest mb-1 flex items-center"><AlertTriangle className="size-2 mr-0.5"/>Stress</span>
                            <span className="text-sm font-bold font-mono text-rose-500">4</span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.06] rounded p-2 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.03]">
                            <span className="text-[8px] text-sky-400 font-bold uppercase tracking-widest mb-1 flex items-center"><Activity className="size-2 mr-0.5"/>Health</span>
                            <span className="text-sm font-bold font-mono text-sky-400">92%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Controls */}
            <div className="absolute top-4 right-4 z-20 w-64 space-y-3 pointer-events-auto max-h-screen overflow-y-auto pb-4">
                
                {/* 1. LAYER CONTROLS */}
                <div className="widget-hover rounded-lg overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-3 px-4 pb-2 border-b border-white/[0.06]">
                        Layer Controls
                    </div>
                    <div className="flex flex-col">
                        <button className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors border-b border-white/[0.06] text-xs">
                            <div className="flex items-center space-x-2 text-slate-300"><span className="text-slate-200 font-medium">Transformers</span></div>
                            <svg className="size-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </button>
                        <button className="flex items-center justify-between px-4 py-3 hover:bg-rose-950/40 transition-colors border-b border-white/[0.06] text-xs bg-rose-950/20">
                            <div className="flex items-center space-x-2"><span className="text-rose-400 font-medium">Inverters</span></div>
                            <svg className="size-3 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </button>
                        <button className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors border-b border-white/[0.06] text-xs">
                            <div className="flex items-center space-x-2"><span className="text-slate-200 font-medium">Drone Docks</span></div>
                            <svg className="size-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.14 10.14-1.99-1.99" /><path d="m13.86 13.86 1.99 1.99" /><path d="m10.14 13.86-1.99 1.99" /><path d="m13.86 10.14 1.99-1.99" /><circle cx="12" cy="12" r="2" /><path d="M22 12s-3-7-10-7-10 7-10 7 3 7 10 7 10-7 10-7Z" /></svg>
                        </button>
                    </div>
                </div>

                {/* 2. COMPONENT STRESS */}
                <div className="widget-hover rounded-lg overflow-hidden relative">
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-3 px-4 pb-2 border-b border-white/[0.06]">
                        Component Stress
                    </div>
                    <div className="p-4 space-y-4">
                        {/* Bars */}
                        <div className="group/bar cursor-crosshair">
                            <div className="flex justify-between items-center text-xs mb-1">
                                <span className="flex items-center text-slate-300 font-medium"><div className="size-1.5 rounded-full bg-sky-400 mr-2 shadow-[0_0_5px_rgba(56,189,248,0.8)]"/> Low Load</span>
                                <span className="font-mono text-sky-400">30%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.08]"><div className="h-full bg-sky-400 rounded-full group-hover/bar:bg-sky-300 transition-colors shadow-[0_0_10px_rgba(56,189,248,0.5)]" style={{ width: '30%' }}/></div>
                        </div>
                        <div className="group/bar cursor-crosshair">
                            <div className="flex justify-between items-center text-xs mb-1">
                                <span className="flex items-center text-slate-300 font-medium"><div className="size-1.5 rounded-full bg-amber-500 mr-2 shadow-[0_0_5px_currentColor]"/> Medium Load</span>
                                <span className="font-mono text-amber-500">50%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.08]"><div className="h-full bg-amber-500 rounded-full group-hover/bar:bg-amber-400 transition-colors shadow-[0_0_10px_currentColor]" style={{ width: '50%' }}/></div>
                        </div>
                        <div className="group/bar cursor-crosshair">
                            <div className="flex justify-between items-center text-xs mb-1">
                                <span className="flex items-center text-rose-100/80 font-bold"><div className="size-1.5 rounded-full bg-rose-500 mr-2 shadow-[0_0_5px_currentColor]"/> High Load</span>
                                <span className="font-mono text-rose-500">20%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.02] rounded-full overflow-hidden border border-white/[0.08]"><div className="h-full bg-rose-500 rounded-full group-hover/bar:bg-rose-400 transition-colors shadow-[0_0_10px_currentColor]" style={{ width: '20%' }}/></div>
                        </div>
                    </div>
                </div>

                {/* 3. SIMULATION ENGINE */}
                <div className="widget-hover rounded-lg overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-3 px-4 pb-2 border-b border-white/[0.06]">
                        Simulation Engine
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-semibold flex items-center tracking-wide uppercase text-[9px]"><Activity className="size-3 mr-1 text-slate-400"/> Simulation Vector</span>
                            <span className="font-mono text-slate-200 font-bold text-sm">2027</span>
                        </div>
                        <input type="range" min="2024" max="2032" defaultValue="2027" className="w-full h-1 bg-white/[0.02] border border-white/[0.08] rounded-lg appearance-none cursor-ew-resize accent-slate-400 hover:accent-slate-300 transition-colors" />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                            <span>2024</span><span>2032</span>
                        </div>
                        <button className="w-full flex items-center justify-center space-x-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-slate-200 py-3 rounded text-xs transition-all shadow-inner group cursor-pointer">
                            <Plus className="size-3 group-hover:scale-125 transition-transform" />
                            <span className="font-bold tracking-widest uppercase text-[10px]">Add Drone Dock (0)</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-5 widget-hover px-5 py-3 rounded-xl text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-sky-400 shadow-[0_0_5px_rgba(56,189,248,0.8)]" /> <span>Low Stress</span></div>
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-amber-500 shadow-[0_0_5px_currentColor]" /> <span>Medium Stress</span></div>
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-rose-500 shadow-[0_0_8px_currentColor]" /> <span className="text-rose-400 font-bold">High Stress</span></div>
                <div className="h-3 w-px bg-white/[0.08] mx-1" />
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-rose-500 border border-white/50" /> <span>Inverter</span></div>
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-blue-500 border border-white/50" /> <span>Drone Dock</span></div>
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-amber-500 border border-white/50" /> <span>Substation</span></div>
                <div className="flex items-center space-x-2"><div className="size-2 rounded-full bg-purple-500 border border-white/50" /> <span>Sensor</span></div>
            </div>

        </div>
    </div>
  );
}
