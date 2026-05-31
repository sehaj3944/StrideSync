import { useState } from 'react';
import { Activity, Shield, Cpu, Zap, Footprints } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  type: string;
  metric: string;
  desc: string;
  cx: string;
  cy: string;
  color: string;
}

export default function InteractiveInsole() {
  const [activeMode, setActiveMode] = useState<'circuit' | 'heatmap' | 'orthotics'>('circuit');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('sensor-metatarsal');

  const hotspots: Hotspot[] = [
    {
      id: 'sensor-toes',
      name: 'Toes Sensor Apex',
      type: 'Dynamic Pressure',
      metric: 'Balance Force: 84g/cm²',
      desc: 'Tracks propulsion vectors and takeoff stability during fast runs.',
      cx: '50%',
      cy: '15%',
      color: '#00ffd1',
    },
    {
      id: 'sensor-metatarsal',
      name: 'Metatarsal Sensor Matrix',
      type: 'AI Gate Tracker',
      metric: 'Peak Loading: 142g/cm²',
      desc: 'Measures foot strike angles and corrects subtle under-pronation tendencies.',
      cx: '46%',
      cy: '32%',
      color: '#00bfff',
    },
    {
      id: 'stabilizer-arch',
      name: 'Medial Arch Dynamic Stabilization',
      type: 'Torsional Support',
      metric: 'Angle Integrity: 38°',
      desc: 'Rigid composite fiber matrix that adaptive-flexes to avoid arch collapse.',
      cx: '58%',
      cy: '54%',
      color: '#a855f7',
    },
    {
      id: 'sensor-heel',
      name: 'Heel Strike Shock Buffer',
      type: 'Impact Attentuation',
      metric: 'Impact Recovery: 96.8%',
      desc: 'Porous graphene padding that absorbs severe shock waves and charts heel load.',
      cx: '50%',
      cy: '78%',
      color: '#ef4444',
    }
  ];

  const currentHotspot = hotspots.find(h => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-center bg-slate-950/40 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
      
      {/* Control Panel Toggles (LHS) */}
      <div className="lg:col-span-4 flex flex-col gap-5 justify-center h-full">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#00ffd1] uppercase font-semibold">
            Real-Time Interface
          </span>
          <h3 className="text-2xl font-semibold font-display text-white mt-1">
            Visualizer Engine
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            Toggle telemetry structures to analyze internal layers and biomechanical tracking.
          </p>
        </div>

        {/* Diagnostic Mode Toggles */}
        <div className="flex flex-col gap-3">
          <button
            id="toggle-circuit"
            onClick={() => setActiveMode('circuit')}
            className={`flex items-center gap-3 w-full p-4 rounded-xl border text-left transition-all ${
              activeMode === 'circuit'
                ? 'bg-slate-950 border-[#00bfff]/40 text-white shadow-[0_0_15px_rgba(0,191,255,0.15)]'
                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Cpu className={`h-5 w-5 ${activeMode === 'circuit' ? 'text-[#00bfff]' : 'text-slate-400'}`} />
            <div>
              <div className="text-sm font-semibold">Schematic Circuits</div>
              <div className="text-xs text-slate-500">Sensor grid and micro-processor layout.</div>
            </div>
          </button>

          <button
            id="toggle-heatmap"
            onClick={() => setActiveMode('heatmap')}
            className={`flex items-center gap-3 w-full p-4 rounded-xl border text-left transition-all ${
              activeMode === 'heatmap'
                ? 'bg-slate-950 border-[#00ffd1]/40 text-white shadow-[0_0_15px_rgba(0,255,209,0.15)]'
                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Footprints className={`h-5 w-5 ${activeMode === 'heatmap' ? 'text-[#00ffd1]' : 'text-slate-400'}`} />
            <div>
              <div className="text-sm font-semibold">Pressure Heatmap</div>
              <div className="text-xs text-slate-500">Biomechanical pressure load profiling.</div>
            </div>
          </button>

          <button
            id="toggle-orthotics"
            onClick={() => setActiveMode('orthotics')}
            className={`flex items-center gap-3 w-full p-4 rounded-xl border text-left transition-all ${
              activeMode === 'orthotics'
                ? 'bg-slate-950 border-purple-500/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Shield className={`h-5 w-5 ${activeMode === 'orthotics' ? 'text-purple-400' : 'text-slate-400'}`} />
            <div>
              <div className="text-sm font-semibold">Orthotic Structural Frame</div>
              <div className="text-xs text-slate-500">Arch support, posture, and balance planes.</div>
            </div>
          </button>
        </div>
      </div>

      {/* SVG Footbed Smart Insole Visualizer (Center) */}
      <div className="lg:col-span-4 flex items-center justify-center relative min-h-[420px] bg-slate-950/50 rounded-2xl p-4 border border-white/5 overflow-hidden">
        
        {/* Subtle holographic grid background inside visualizer */}
        <div className="absolute inset-0 bg-grid-cyber-fine opacity-40" />

        {/* Abstract scanning line */}
        <div className="absolute inset-x-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent top-0 animate-pulse pointer-events-none" 
             style={{ animation: 'scanline 5s infinite linear' }} />

        {/* SVG Foot outline container */}
        <div className="relative w-64 h-[380px] z-10">
          <svg
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,191,255,0.1)]"
            viewBox="0 0 200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base Footwear Insole Contour */}
            <path
              d="M 100 15 
                 C 135 15, 148 45, 142 90 
                 C 138 120, 150 160, 155 200 
                 C 160 230, 156 265, 148 300 
                 C 140 330, 134 380, 100 380 
                 C 66 380, 60 330, 52 300 
                 C 44 265, 40 230, 48 200 
                 C 55 160, 68 125, 62 90 
                 C 57 45, 65 15, 100 15 Z"
              fill="#060b26"
              stroke={
                activeMode === 'circuit'
                  ? 'rgba(0, 191, 255, 0.4)'
                  : activeMode === 'heatmap'
                  ? 'rgba(0, 255, 209, 0.4)'
                  : 'rgba(168, 85, 247, 0.4)'
              }
              strokeWidth="2.5"
              className="transition-colors duration-500"
            />

            {/* MODE 1: Circuit Overlay */}
            {activeMode === 'circuit' && (
              <>
                {/* Circuit Traces */}
                <path
                  d="M 100 150 L 100 80 M 100 80 L 75 60 L 75 40 M 100 80 L 125 60 L 125 40"
                  stroke="rgba(0, 191, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                <path
                  d="M 100 240 L 120 270 L 115 310"
                  stroke="rgba(0, 191, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                <path
                  d="M 100 240 L 80 270 L 85 310"
                  stroke="rgba(0, 191, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                <path
                  d="M 100 150 L 100 310"
                  stroke="rgba(0, 191, 255, 0.35)"
                  strokeWidth="2"
                />

                {/* Microprocessor Core Node */}
                <g className="cursor-pointer">
                  <circle cx="100" cy="180" r="16" fill="#080e32" stroke="#00bfff" strokeWidth="2" />
                  <circle cx="100" cy="180" r="8" fill="#00bfff" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx="100" cy="180" r="4" fill="#00bfff" />
                </g>
              </>
            )}

            {/* MODE 2: Pressure Heatmap */}
            {activeMode === 'heatmap' && (
              <>
                {/* Heel Hotspot Glow */}
                <circle cx="100" cy="310" r="32" fill="url(#heelHeat)" className="opacity-80" />
                {/* Arch Support Heatmap (No contact/Cold blue) */}
                <path
                  d="M 115 210 Q 130 230 110 250"
                  stroke="url(#coldBlue)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                {/* Lateral Contact Support */}
                <path
                  d="M 85 200 Q 75 230 80 260"
                  stroke="url(#medHeat)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  className="opacity-80"
                />
                {/* Metatarsal Grid */}
                <ellipse cx="100" cy="120" rx="36" ry="18" fill="url(#metatarsalHeat)" className="opacity-90 animate-pulse" />
                <ellipse cx="100" cy="120" rx="20" ry="10" fill="url(#metatarsalCore)" className="opacity-95" />
                {/* Toes (Pulsing sensor dots) */}
                <circle cx="100" cy="50" r="12" fill="url(#toeHeat)" />
                <circle cx="78" cy="58" r="8" fill="url(#toeHeatMed)" />
                <circle cx="122" cy="58" r="8" fill="url(#toeHeatMed)" />
                <circle cx="64" cy="74" r="6" fill="url(#toeHeatLow)" />
                <circle cx="136" cy="74" r="6" fill="url(#toeHeatLow)" />

                {/* Heatmap Gradients Definitions */}
                <defs>
                  <radialGradient id="heelHeat" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="metatarsalHeat" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#ef4444" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ebf8ff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="metatarsalCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="coldBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00bfff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="medHeat" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                  </linearGradient>
                  <radialGradient id="toeHeat" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="toeHeatMed" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="toeHeatLow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </>
            )}

            {/* MODE 3: Orthotics Structures */}
            {activeMode === 'orthotics' && (
              <>
                {/* Lateral Outsole Guide Lines */}
                <path
                  d="M 64 80 Q 75 180 62 280"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  strokeDasharray="3,3"
                />
                {/* Medial Arch Lift Arch Contour */}
                <path
                  d="M 136 100 C 120 160, 115 220, 134 290"
                  stroke="#c084fc"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Secondary stability ribs */}
                <path d="M 124 160 Q 112 180 128 200" stroke="#a855f7" strokeWidth="1.5" />
                <path d="M 126 195 Q 114 215 130 235" stroke="#a855f7" strokeWidth="1.5" />
                <path d="M 127 230 Q 116 250 131 270" stroke="#a855f7" strokeWidth="1.5" />

                {/* Heel Cradle Deep Cup Vector */}
                <path
                  d="M 72 320 C 72 355, 128 355, 128 320"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                  fill="none"
                />
              </>
            )}

            {/* Reactive Interactive Sensor Hotspots */}
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot === spot.id;
              return (
                <g
                  key={spot.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedHotspot(spot.id)}
                >
                  {/* Glowing halo */}
                  <circle
                    cx={spot.cx}
                    cy={spot.cy}
                    r={isSelected ? '14' : '8'}
                    fill="transparent"
                    stroke={spot.color}
                    strokeWidth="1.5"
                    className="transition-all duration-300 animate-pulse"
                  />
                  {/* Central Core */}
                  <circle
                    cx={spot.cx}
                    cy={spot.cy}
                    r={isSelected ? '6' : '4'}
                    fill={spot.color}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Contextual Hotspot Bio-feedback Details (RHS) */}
      <div className="lg:col-span-4 flex flex-col justify-center h-full bg-slate-900/40 p-6 rounded-2xl border border-white/5 md:min-h-[380px]">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-[#00ffd1] animate-pulse" />
          <span className="text-xs font-mono text-[#00ffd1] uppercase tracking-wider font-semibold">
            Telemetry Feed
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold text-white font-display">
              {currentHotspot.name}
            </h4>
            <div className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold bg-white/5 border border-white/10 text-slate-300">
              {currentHotspot.type}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <span className="text-xs font-mono text-slate-500 block uppercase">
              Current Micro-Data
            </span>
            <span className="text-base font-semibold font-mono text-white glow-blue mt-1 block">
              {currentHotspot.metric}
            </span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            {currentHotspot.desc}
          </p>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Core Version: V2.4</span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-yellow-400" /> Pairing Active
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
