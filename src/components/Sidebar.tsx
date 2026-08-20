"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  Home,
  Map,
  Layers,
  Settings,
  Shield,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

function GlassMenuItem({ item, isActive }: { item: any; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group",
        isActive 
          ? "bg-white/[0.08] border border-white/10 text-white"
          : "text-slate-400 border border-transparent hover:bg-white/[0.05] hover:text-white"
      )}
    >
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-0.5 bg-amber-400 rounded-r" />}
      
      <item.icon className={cn("size-4 relative z-10", isActive && "text-amber-400")} />
      <span className="text-[13px] tracking-wide font-medium relative z-10">{item.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const commandItems = [
    { label: "Strategic Overview", href: "/", icon: Home },
  ];

  const analysisItems = [
    { label: "Geospatial Intel", href: "/geospatial", icon: Map },
    { label: "Digital Twin", href: "/twin", icon: Layers },
  ];

  const infrastructureItems = [
    { label: "Data Lake", href: "/data-lake", icon: Database },
    { label: "Control Panel", href: "/control-panel", icon: Settings },
    { label: "Security & Governance", href: "/security", icon: Shield },
  ];

  return (
    <div className="w-64 bg-[#13141a]/60 backdrop-blur-xl border-r border-white/[0.05] flex flex-col h-screen fixed top-0 left-0 hidden md:flex z-50 transition-all duration-300">
      
      {/* Top Left Logo */}
      <div className="px-6 pt-6 pb-5 border-b border-white/[0.05] flex flex-col space-y-4">
        
        <div className="flex items-center space-x-3">
          <div className="size-8 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <BrainCircuit className="text-slate-300 size-5" />
          </div>
          <div>
            <h1 className="text-slate-100 font-bold tracking-wider text-sm">Operon <span className="text-amber-500 tracking-normal ml-0.5">AI</span></h1>
            <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">Autonomous Operator</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto no-scrollbar">
        {/* COMMAND */}
        <div>
          <h2 className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mb-3 px-2">
            COMMAND
          </h2>
          <nav className="space-y-1">
            {commandItems.map((item) => (
              <GlassMenuItem key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>
        </div>

        {/* ANALYSIS */}
        <div>
          <h2 className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mb-3 px-2">
            ANALYSIS
          </h2>
          <nav className="space-y-1">
            {analysisItems.map((item) => (
              <GlassMenuItem key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>
        </div>

        {/* INFRASTRUCTURE */}
        <div>
          <h2 className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mb-3 px-2">
            INFRASTRUCTURE
          </h2>
          <nav className="space-y-1">
            {infrastructureItems.map((item) => (
              <GlassMenuItem key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-white/[0.06] bg-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.03]">
        <div className="text-[10px] text-slate-500 mb-2 tracking-widest uppercase">System Status</div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Data Ingestion</span>
                <div className="flex items-center space-x-2">
                   <div className="size-1.5 rounded-full bg-sky-400" />
                   <span className="text-[10px] text-sky-400 font-mono tracking-widest uppercase">Online</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Knowledge Graph</span>
                <div className="flex items-center space-x-2">
                   <div className="size-1.5 rounded-full bg-amber-500" />
                   <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase">Sync</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
