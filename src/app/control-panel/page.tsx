"use client";

import { Server, Database, Activity, Wifi, Cpu, Plug, Box, RefreshCw, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
function ServiceCard({ icon: Icon, title, status, ping, colorClass, dotColor }: any) {
    return (
        <div className="widget-hover rounded-lg p-5 flex flex-col justify-between h-32 cursor-pointer group relative">
            <div className="absolute top-4 right-4 size-2 rounded-full shadow-lg" style={{ backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />
            
            <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-white/[0.04] border border-white/[0.08] rounded-md transition-colors">
                    <Icon className={`size-4 ${colorClass}`} />
                </div>
            </div>
            
            <div>
                <h4 className="font-bold text-slate-200 tracking-tight text-sm mb-1">{title}</h4>
                <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: dotColor }}>
                        {status}
                    </div>
                    {ping && <div className={`text-[10px] font-mono ${colorClass}`}>{ping}ms</div>}
                    {!ping && <div className="text-[10px] font-mono text-slate-600">n/a</div>}
                </div>
            </div>
            
            <ChevronRight className="absolute bottom-4 right-4 size-3 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
    );
}

function HealthBar({ label, value, color }: any) {
    return (
        <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-300 w-32">{label}</span>
            <div className="flex-1 h-1.5 bg-white/[0.02] rounded-full mx-4 overflow-hidden border border-white/[0.08]">
                <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
            </div>
            <span className="text-xs font-mono font-bold" style={{ color }}>{value}%</span>
        </div>
    );
}

const CPU_DATA = [
    { time: "09:52:35", cpu: 40, lat: 25 }, { time: "09:52:39", cpu: 45, lat: 30 },
    { time: "09:52:42", cpu: 35, lat: 32 }, { time: "09:52:45", cpu: 48, lat: 35 },
    { time: "09:52:49", cpu: 42, lat: 30 }, { time: "09:52:52", cpu: 55, lat: 28 },
    { time: "09:52:56", cpu: 40, lat: 35 }, { time: "09:52:59", cpu: 46, lat: 40 },
    { time: "09:53:03", cpu: 52, lat: 45 }, { time: "09:53:08", cpu: 43, lat: 38 },
];

export default function ControlPanelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-300 font-sans p-4 md:p-6 lg:p-6 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Header echoing Ontora */}
        <header className="flex items-center justify-between text-xs text-slate-500 mb-6 font-sans">
           <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-300">Operon AI</span>
              <span>•</span>
              <span className="text-slate-400">Control Panel</span>
           </div>
           <div className="flex items-center space-x-3">
              <span className="flex items-center bg-white/[0.04] px-3 py-1.5 rounded-md border border-white/[0.08]">
                  <div className="size-1.5 rounded-full bg-sky-400 mr-2" />
                  <span className="text-slate-300 font-sans font-semibold tracking-wide uppercase">Live</span>
              </span>
           </div>
        </header>

        {/* Service Status Section */}
        <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-200 mb-1 flex items-center bg-white/[0.03] p-3 rounded-t-lg border border-white/[0.08] border-b-0 font-sans">
                <Server className="size-4 text-amber-500 mr-2" />
                Service Status
            </h2>
            <div className="bg-white/[0.02] border border-white/[0.08] border-t-0 rounded-b-lg p-5 shadow-xl">
                <div className="text-[10px] text-slate-500 mb-6 font-sans tracking-wide uppercase flex items-center">
                    6 services • <span className="text-sky-400 mx-2 font-bold">3 online</span> • <span className="text-amber-500 mr-2 font-bold">2 degraded</span> • <span className="text-rose-500 font-bold">1 offline</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <ServiceCard icon={Database} title="Sensor API Gateway" status="Operational" ping={12} colorClass="text-sky-400" dotColor="#38bdf8" />
                    <ServiceCard icon={Wifi} title="Drone Telemetry Link" status="Degraded" ping={184} colorClass="text-amber-500" dotColor="#f59e0b" />
                    <ServiceCard icon={Cpu} title="Operon Core Model" status="Operational" ping={45} colorClass="text-sky-400" dotColor="#38bdf8" />
                    
                    <ServiceCard icon={RefreshCw} title="Weather NCM Sync" status="Degraded" colorClass="text-amber-500" dotColor="#f59e0b" />
                    <ServiceCard icon={Plug} title="Inverter Modbus TCP" status="Offline" colorClass="text-rose-500" dotColor="#f43f5e" />
                    <ServiceCard icon={Box} title="Automated Dispatcher" status="Operational" ping={22} colorClass="text-sky-400" dotColor="#38bdf8" />
                </div>
            </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
            
            {/* CPU & Latency */}
            <div className="xl:col-span-3 widget-hover rounded-lg p-6 shadow-xl">
                <h3 className="text-xs font-semibold text-slate-400 mb-1 flex items-center">
                    <Cpu className="size-4 mr-2 text-amber-500" /> CPU & Latency — Live (30s)
                </h3>
                <p className="text-[10px] text-slate-600 mb-6">AI serving engine and orchestrator load</p>

                <div className="flex justify-between items-center mb-8 px-4 font-sans">
                    <div className="text-center">
                        <div className="text-2xl font-bold font-mono text-amber-500">46.1%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">CPU</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold font-mono text-cyan-400">157.38</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Req / min</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold font-mono text-sky-400">43.68ms</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Latency</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold font-mono text-rose-500">0.11%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Err%</div>
                    </div>
                </div>

                <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={CPU_DATA} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                            <XAxis dataKey="time" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                            <Line type="monotone" dataKey="cpu" stroke="#38bdf8" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                            <Line type="monotone" dataKey="lat" stroke="#f59e0b" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Infrastructure Health */}
            <div className="xl:col-span-2 widget-hover rounded-lg p-6 shadow-xl flex flex-col">
                 <h3 className="text-xs font-semibold text-slate-400 mb-1 flex items-center">
                    <Activity className="size-4 mr-2 text-cyan-500" /> Infrastructure Health
                </h3>
                <p className="text-[10px] text-slate-600 mb-8 pb-4 border-b border-white/[0.06]">Live health scores from array backends</p>

                <div className="flex-1 flex flex-col justify-center space-y-2">
                    <HealthBar label="Event Bus (Kafka)" value={94} color="#38bdf8" />
                    <HealthBar label="Sensor Graph DB" value={91} color="#38bdf8" />
                    <HealthBar label="ML Inference Pipes" value={87} color="#38bdf8" />
                    <HealthBar label="Vector Search" value={89} color="#38bdf8" />
                    <HealthBar label="Batch Sync Jobs" value={92} color="#38bdf8" />
                </div>
            </div>

        </div>

    </div>
  );
}
