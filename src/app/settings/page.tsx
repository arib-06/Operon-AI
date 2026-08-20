"use client";

import { Settings, Sliders, Shield, AlertTriangle, Zap, Server } from "lucide-react";
export default function SettingsPage() {
  return (
    <div className="text-slate-300 font-sans p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/[0.08] pb-6 font-sans">
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Settings className="size-6 text-slate-400" />
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">System Configuration</h1>
                </div>
                <p className="text-slate-400 text-sm">Tune the parameters of the Autonomous Decision Engine and localized environmental contexts.</p>
             </div>
         </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
            
            {/* AI Threshold Settings */}
            <div className="widget-hover rounded-xl p-6 space-y-6">
                <h3 className="text-sm font-semibold text-white flex items-center space-x-2 uppercase tracking-wider border-b border-white/[0.06] pb-3">
                  <Sliders className="size-4 text-slate-400" />
                  <span>AI Confidence Thresholds</span>
                </h3>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm text-slate-300">Auto-Dispatch Breakeven Override</label>
                            <span className="font-mono text-slate-200">1.2x</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-2 leading-relaxed tracking-wide">
                           The multiplier at which the AI will override scheduled action and force dispatch. Wait until loss = 1.2x Dispatch Cost.
                        </p>
                        <input
                            type="range"
                            min="1.0"
                            max="3.0"
                            step="0.1"
                            defaultValue="1.2"
                            className="w-full h-1 bg-white/[0.02] border border-white/[0.08] rounded-lg appearance-none cursor-pointer accent-slate-400"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm text-slate-300">Predictive Sandstorm Weight</label>
                            <span className="font-mono text-amber-500">85%</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-2 leading-relaxed tracking-wide">
                           How heavily the AI weights incoming meteorological data from local Saudi sensors (NCM) before preempting washes.
                        </p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="85"
                            className="w-full h-1 bg-white/[0.02] border border-white/[0.08] rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>
                </div>
            </div>

            {/* Simulated Fleet Settings */}
            <div className="widget-hover rounded-xl p-6 space-y-6">
                <h3 className="text-sm font-semibold text-white flex items-center space-x-2 uppercase tracking-wider border-b border-white/[0.06] pb-3">
                  <Server className="size-4 text-slate-400" />
                  <span>Fleet Integration</span>
                </h3>

                <div className="space-y-5">
                    <div className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.08] rounded-lg">
                        <div className="flex items-center space-x-3">
                           <Zap className="size-4 text-slate-400" />
                           <div>
                              <div className="text-sm text-slate-200">Robotic Drone Fleet</div>
                               <div className="text-[10px] text-slate-500">Cost: SAR 150/dispatch. Fast recovery.</div>
                            </div>
                         </div>
                         <div className="h-5 w-9 rounded-full bg-slate-800 flex items-center px-1 border border-slate-600 cursor-pointer">
                             <div className="size-3 rounded-full bg-white translate-x-4" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.08] rounded-lg">
                        <div className="flex items-center space-x-3">
                           <AlertTriangle className="size-4 text-amber-500" />
                           <div>
                              <div className="text-sm text-slate-200">Heavy Tractor Wash</div>
                               <div className="text-[10px] text-slate-500">Cost: SAR 500/dispatch. Thorough clean.</div>
                            </div>
                         </div>
                         <div className="h-5 w-9 rounded-full bg-slate-800 flex items-center px-1 border border-slate-600 cursor-pointer">
                             <div className="size-3 rounded-full bg-white translate-x-4" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Global Context */}
            <div className="lg:col-span-2 widget-hover rounded-xl p-6 mt-2">
                 <h3 className="text-sm font-semibold text-white flex items-center space-x-2 uppercase tracking-wider border-b border-white/[0.06] pb-3 mb-4">
                  <Shield className="size-4 text-slate-400" />
                  <span>Deployment Context</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white/[0.04] border border-white/[0.1] cursor-pointer transition-colors hover:bg-white/[0.06] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-5 blur-2xl rounded-full" />
                        <div className="text-sm font-bold text-slate-200 mb-1 flex items-center justify-between">
                            NEOM Alpha Array
                            <div className="size-1.5 rounded-full bg-sky-400" />
                        </div>
                        <div className="text-[10px] text-slate-500">Coastal desert simulation. High humidity & operon mixture.</div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.08] cursor-pointer transition-colors hover:bg-white/[0.03]">
                        <div className="text-sm font-bold text-slate-300 mb-1">Sakaka Solar Project</div>
                        <div className="text-[10px] text-slate-500">Inland arid conditions. Extreme thermal saturation model.</div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.08] cursor-pointer transition-colors hover:bg-white/[0.03]">
                        <div className="text-sm font-bold text-slate-300 mb-1">Sudair Solar PV</div>
                        <div className="text-[10px] text-slate-500">Mega-scale model. High capacity, micro-operon focus.</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}
