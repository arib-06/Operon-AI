"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Activity,
  BatteryCharging,
  ChevronDown,
  CircleHelp,
  DollarSign,
  Expand,
  Leaf,
  LockKeyhole,
  Map,
  Maximize2,
  RefreshCw,
  Sun,
  Thermometer,
} from "lucide-react";

const card = "rounded-xl border border-white/[0.09] bg-[#24292a] shadow-[0_18px_45px_rgba(0,0,0,.18)]";
const muted = "text-[11px] uppercase tracking-[0.12em] text-slate-400";

function InfoDot() {
  return <CircleHelp className="size-3.5 text-slate-500" aria-label="More information" />;
}

function SmallMetric({ icon: Icon, label, value, unit }: { icon: typeof Sun; label: string; value: string; unit: string }) {
  return (
    <div className={`${card} flex min-h-32 flex-col justify-between p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05]"><Icon className="size-4 text-slate-300" /></div>
        <InfoDot />
      </div>
      <div>
        <p className={muted}>{label}</p>
        <p className="mt-2 font-mono text-xl font-medium tracking-tight text-white">{value} <span className="font-sans text-[10px] text-slate-400">{unit}</span></p>
        <p className="mt-1 text-[10px] text-emerald-300">+2.6% vs yesterday</p>
      </div>
    </div>
  );
}

function Bars({ count = 28 }: { count?: number }) {
  return <div className="flex h-12 items-center gap-1 overflow-hidden">{Array.from({ length: count }, (_, i) => <span key={i} className="w-1 shrink-0 rounded-full bg-slate-300/80" style={{ height: `${35 + ((i * 17) % 60)}%` }} />)}</div>;
}

export default function DataLakePage() {
  const [panelOnline, setPanelOnline] = useState(true);
  const [energy, setEnergy] = useState(847.3);
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-[#101416] p-3 text-slate-200 md:p-5 lg:p-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#0d1011] px-4 py-3">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 font-semibold text-white"><Sun className="size-5 fill-white" /> Soleil</div>
            <span className="text-slate-600">/</span><span className="text-slate-400">Batu Farm</span><span className="text-slate-600">/</span>
            <button className="flex items-center gap-1 text-slate-300">Soleil Headquarter 01 <ChevronDown className="size-3" /></button>
          </div>
          <div className="flex items-center gap-2"><button aria-label="Notifications" className="rounded-lg p-2 text-slate-400 hover:bg-white/10"><Activity className="size-4" /></button><button aria-label="Settings" className="rounded-lg p-2 text-slate-400 hover:bg-white/10"><LockKeyhole className="size-4" /></button><button className="rounded-lg bg-white/[0.12] px-3 py-2 text-xs text-slate-100 hover:bg-white/[0.18]">Export Report</button><button className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-900">Share Overview</button><div className="flex size-7 items-center justify-center rounded-full bg-slate-500 text-xs font-semibold text-white">O</div></div>
        </header>

        <section className="grid gap-3 lg:grid-cols-[295px_minmax(0,1fr)]">
          <aside className={`${card} flex flex-col justify-between p-4`}>
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between border-b border-white/[0.08] pb-4"><div><h1 className="text-sm font-medium text-white">Soleil Headquarter Farm</h1><p className="mt-1 text-[10px] text-slate-400">Batu, Malang • 6 active fields</p></div><div className="text-right"><strong className="font-mono text-base text-white">120 <small className="font-sans text-[10px] text-slate-400">kWp</small></strong><p className="text-[9px] text-slate-500">Last updated 07:45</p></div></div>
              <div className="flex flex-col gap-3 text-xs"><div className="flex justify-between"><span className="text-slate-400">Active Inverters</span><b>6 / 6 <small className="font-normal text-slate-500">Online</small></b></div><div className="flex justify-between"><span className="text-slate-400">Panels Reporting</span><b>96 / 96 <small className="font-normal text-slate-500">Panels</small></b></div><div className="flex justify-between"><span className="text-slate-400">Active Alerts</span><b>0 <small className="font-normal text-slate-500">Alerts</small></b></div></div>
              <div><div className="mb-3 flex items-center justify-between"><p className={muted}>Power Flow</p><InfoDot /></div><div className="grid grid-cols-3 gap-2">{[["12.4","Solar Array","MW"],["Stable","Connection",""],["87","Battery","%"]].map(([value, label, unit]) => <div key={label} className="rounded-lg border border-white/[0.06] bg-black/10 p-2 text-center"><p className="text-[9px] text-slate-500">{label}</p><p className="mt-2 font-mono text-xs font-semibold text-white">{value} <small className="font-sans text-[9px] text-slate-400">{unit}</small></p><div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-slate-300" style={{ width: label === "Battery" ? "87%" : label === "Connection" ? "100%" : "66%" }} /></div></div>)}</div></div>
            </div>
            <div className="mt-5 rounded-lg border border-white/[0.08] bg-white/[0.04] p-3"><div className="flex justify-between"><p className={muted}>AI Summary</p><span className="rounded border border-emerald-400/20 px-2 py-1 text-[8px] font-semibold uppercase text-emerald-300">Operation normal</span></div><p className="mt-3 text-xs leading-relaxed text-slate-300">Energy output, efficiency, and thermal conditions are stable across all active fields.</p><div className="mt-3 flex justify-between border-t border-white/[0.08] pt-3 text-[9px] text-slate-400"><span>High<br /><small className="text-slate-600">Stability</small></span><span>Low<br /><small className="text-slate-600">Efficiency risk</small></span><span>None<br /><small className="text-slate-600">Maintenance</small></span></div></div>
          </aside>

          <div className={`${card} relative min-h-[470px] overflow-hidden bg-[#424847]`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(255,255,255,.22),transparent_52%)]" />
            <div className="absolute left-4 top-4 z-10"><h2 className="text-sm font-medium text-white">Soleil Headquarter Cubiq 1</h2><p className="mt-1 font-mono text-[9px] text-slate-300/70">SOL001-SOL015</p></div>
            <div className="absolute right-4 top-4 z-10"><button aria-label="Fullscreen view" onClick={() => setExpanded(!expanded)} className="rounded-lg border border-white/10 bg-black/20 p-2 text-slate-200 backdrop-blur hover:bg-black/40"><Maximize2 className="size-4" /></button></div>
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12"><div className="relative aspect-square w-full max-w-[660px] -rotate-[1deg]"><Image src="/3d_solar_panel_array.jpg" alt="Isometric solar panel array" fill className="rounded-xl object-contain mix-blend-screen" priority />{[["28%","54%"],["38%","44%"],["48%","34%"],["20%","64%"],["33%","73%"],["44%","61%"]].map(([top,left], i) => <span key={i} className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/20 shadow-[0_0_0_5px_rgba(255,255,255,.12)]" style={{ top, left }} />)}</div></div>
            <div className="absolute bottom-4 left-4 z-10 flex gap-2"><button aria-label="Center map" className="rounded-lg border border-white/10 bg-black/20 p-2 backdrop-blur hover:bg-black/40"><Map className="size-4" /></button><button aria-label="Expand map" onClick={() => setExpanded(!expanded)} className="rounded-lg border border-white/10 bg-black/20 p-2 backdrop-blur hover:bg-black/40"><Expand className="size-4" /></button></div>
            <div className="absolute right-4 top-20 z-10 w-[min(285px,calc(100%-2rem))] rounded-xl border border-white/10 bg-[#242729]/90 p-4 shadow-2xl backdrop-blur-xl"><div className="flex justify-between border-b border-white/10 pb-3"><div><h3 className="text-xs font-semibold text-white">Panel 006</h3><p className="mt-1 text-[9px] text-slate-400">Array B • 12 Panels</p></div><div className="text-right"><b className="font-mono text-sm text-emerald-300">4.92 <small className="font-sans text-[9px] text-slate-400">kW</small></b><p className="text-[8px] text-slate-500">Last updated 07:45</p></div></div><div className="grid grid-cols-2 gap-3 py-3"><div className="flex items-center gap-2"><Activity className="size-4 text-slate-300" /><span className="font-mono text-xs">91.4%<small className="block font-sans text-[8px] text-slate-500">Efficiency</small></span></div><div className="flex items-center gap-2"><Thermometer className="size-4 text-slate-300" /><span className="font-mono text-xs">42°C<small className="block font-sans text-[8px] text-slate-500">Temperature</small></span></div></div><div className="rounded-lg border border-white/[0.07] bg-black/20 p-3"><p className="text-[8px] uppercase tracking-widest text-slate-500">AI Summary</p><p className="mt-1 text-[11px] leading-relaxed text-slate-300">Slight efficiency drop likely caused by surface dust accumulation.</p></div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => setPanelOnline(!panelOnline)} className={`rounded-lg border py-2 text-[10px] font-semibold uppercase tracking-wider ${panelOnline ? "border-white/10 bg-[#151819] text-slate-200" : "border-emerald-400 bg-emerald-400 text-slate-950"}`}>{panelOnline ? "Turn Off" : "Turn On"}</button><button onClick={() => setEnergy((value) => Number((value + 0.4).toFixed(1)))} className="rounded-lg border border-white/15 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-200 hover:bg-white/10">Refresh</button></div></div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="grid grid-cols-2 gap-3"><SmallMetric icon={Sun} label="Energy Generated" value="25,482" unit="kWh" /><SmallMetric icon={BatteryCharging} label="Current Power Output" value="5.48" unit="kW" /><SmallMetric icon={Leaf} label="System Efficiency" value="94" unit="%" /><SmallMetric icon={DollarSign} label="Estimated Revenue" value="$1,250" unit="/kWh" /></div>
          <div className={`${card} min-h-64 p-4`}><div className="flex justify-between"><p className={muted}>Panel Temperature Monitoring</p><InfoDot /></div><div className="mt-6 flex justify-between text-center">{[["35","Row 001"],["87","Row 002"],["57","Row 003"]].map(([value,label]) => <div key={label}><p className="font-mono text-lg text-white">{value}<small className="text-[9px] text-slate-400">°C</small></p><p className="text-[9px] text-slate-500">{label}</p></div>)}</div><div className="relative mt-5 flex justify-center overflow-hidden"><div className="h-28 w-56 rounded-t-full border-[8px] border-b-0 border-dashed border-slate-300/80"><div className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-lg bg-[#151819] px-4 py-2 text-[10px] text-slate-200">Cooling Down</div></div></div></div>
          <div className="flex min-h-64 flex-col gap-3"><div className={`${card} flex-1 p-4`}><div className="flex justify-between"><p className={muted}>Live Power Output</p><InfoDot /></div><p className="mt-2 font-mono text-lg text-white">25.5 <small className="text-[9px] text-slate-400">MIN</small> <span className="ml-3">86.7 <small className="text-[9px] text-slate-400">MAX</small></span></p><Bars /></div><div className={`${card} flex-1 p-4`}><div className="flex justify-between"><p className={muted}>Panel Energy Distribution</p><InfoDot /></div><Bars count={18} /></div></div>
          <div className={`${card} min-h-64 p-4`}><div className="flex justify-between"><p className={muted}>Energy Generated Today</p><InfoDot /></div><div className="mt-5 flex justify-between text-center"><span className="font-mono text-lg text-white">86.7<small className="block text-[9px] text-slate-500">Avg MWh</small></span><span className="font-mono text-lg text-white">90.0<small className="block text-[9px] text-slate-500">Target MWh</small></span><span className="font-mono text-lg text-white">-5.9%<small className="block text-[9px] text-slate-500">Deviation</small></span></div><div className="mx-auto mt-4 flex size-36 items-center justify-center rounded-full border-[8px] border-b-transparent border-l-slate-400 border-r-slate-300 border-t-slate-200"><div className="text-center"><p className="text-[9px] text-slate-500">Total Energy</p><p className="font-mono text-lg text-white">{energy}</p><p className="text-[9px] text-slate-500">MWh</p></div></div><button onClick={() => setEnergy((value) => Number((value + 0.4).toFixed(1)))} className="mx-auto mt-2 flex items-center gap-2 rounded-lg bg-[#151819] px-3 py-2 text-[10px] text-slate-200"><RefreshCw className="size-3" /> Refresh Energy</button></div>
        </section>
      </div>
    </main>
  );
}
