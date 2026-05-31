import { useState, useEffect } from 'react';
import { Smartphone, RefreshCw, Flame, ArrowUpRight, Scale, Layers } from 'lucide-react';

type ActivityState = 'running' | 'resting' | 'corrective';

export default function LiveDashboard() {
  const [activity, setActivity] = useState<ActivityState>('running');
  const [stepCount, setStepCount] = useState(12840);
  const [postureScore, setPostureScore] = useState(94);
  const [balanceX, setBalanceX] = useState(0); // -100 to 100
  const [balanceY, setBalanceY] = useState(10); // -100 to 100
  const [fatigueLevel, setFatigueLevel] = useState(24);
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulate subtle real-time bio-telemetry fluctuations
  useEffect(() => {
    let baseSteps = 12840;
    const interval = setInterval(() => {
      setStepCount((prev) => {
        if (activity === 'running') {
          return prev + Math.floor(Math.random() * 3) + 1;
        }
        return prev;
      });

      // Wobble balance marginally to simulate muscle adjustments
      if (activity === 'running') {
        setBalanceX((Math.random() * 8) - 4);
        setBalanceY(12 + (Math.random() * 6 - 3));
        setPostureScore((prev) => Math.max(91, Math.min(97, prev + (Math.random() > 0.5 ? 1 : -1))));
      } else if (activity === 'corrective') {
        setBalanceX(-15 + (Math.random() * 4 - 2)); // Shift left to indicate correction needed
        setBalanceY(-20 + (Math.random() * 4 - 2));
        setPostureScore(78);
      } else {
        // Resting
        setBalanceX(0);
        setBalanceY(2);
        setPostureScore(98);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [activity]);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-stretch">
      
      {/* Informative Side Card (6 grid cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/30 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Layers className="h-4 w-4 text-[#00bfff]" />
            <span className="text-xs font-mono text-slate-300">Biometric Interfacing</span>
          </div>
          
          <h3 className="text-3xl font-bold font-display tracking-tight text-white leading-tight">
            The StrideSync <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ffd1]">Companion App</span>
          </h3>
          
          <p className="text-sm text-slate-400 leading-relaxed">
            Harness the power of AI diagnostics in your pocket. StrideSync seamlessly sends over 120 biomechanical data points per second directly to your device via low-latency Bluetooth.
          </p>

          <p className="text-sm text-slate-400">
            Select an orthopedic telemetry profile below to see how StrideSync dynamically monitors and corrective-maps real foot performance.
          </p>
        </div>

        {/* Profile Selector Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              setActivity('running');
              setPostureScore(94);
              setFatigueLevel(38);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              activity === 'running'
                ? 'bg-[#0055ff]/10 border-[#00bfff]/30 text-white shadow-sm'
                : 'bg-[#030712]/50 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="block text-xs font-mono uppercase tracking-wider font-semibold">Jogging</span>
            <span className="text-[10px] text-slate-500 block mt-1">94% Stability</span>
          </button>

          <button
            onClick={() => {
              setActivity('resting');
              setPostureScore(98);
              setFatigueLevel(10);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              activity === 'resting'
                ? 'bg-[#00ffd1]/10 border-[#00ffd1]/30 text-white shadow-sm'
                : 'bg-[#030712]/50 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="block text-xs font-mono uppercase tracking-wider font-semibold">Sitting</span>
            <span className="text-[10px] text-slate-500 block mt-1">Recalibrating</span>
          </button>

          <button
            onClick={() => {
              setActivity('corrective');
              setPostureScore(72);
              setFatigueLevel(62);
            }}
            className={`p-3 rounded-xl border text-center transition-all ${
              activity === 'corrective'
                ? 'bg-red-500/10 border-red-500/30 text-white shadow-sm'
                : 'bg-[#030712]/50 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="block text-xs font-mono uppercase tracking-wider font-semibold">Arch Strain</span>
            <span className="text-[10px] text-slate-500 block mt-1">Alert Trigger</span>
          </button>
        </div>

        {/* Stat highlight */}
        <div className="p-4 rounded-xl bg-[#030712]/60 border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-500 block">AI RECOMMENDATION</span>
            <span className="text-[#00ffd1] font-mono text-sm font-semibold mt-1 block">
              {activity === 'corrective' 
                ? 'Increase Arch Torsional Flex by 12%' 
                : activity === 'resting' 
                ? 'Posture aligned. Rest optimal.'
                : 'Slight pronation detected. Shift foot vectors.'}
            </span>
          </div>
          <ArrowUpRight className="h-5 w-5 text-[#00ffd1]" />
        </div>
      </div>

      {/* Futuristic Mobile Phone Frame Shell (7 grid cols) */}
      <div className="lg:col-span-7 flex justify-center items-center">
        <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-[#020617] rounded-[48px] p-4 border-[6px] border-[#1e293b] shadow-[0_25px_60px_-15px_rgba(0,191,255,0.2)] overflow-hidden">
          
          {/* Lens Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e293b] rounded-b-2xl z-40 flex items-center justify-center">
            <div className="w-12 h-1 bg-black rounded-full" />
            <div className="w-3 h-3 bg-[#0c1329] rounded-full ml-3 border border-slate-800" />
          </div>

          {/* Subtly glowing back light leak */}
          <div className="absolute -top-40 -left-40 h-80 w-80 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 bg-[radial-gradient(circle_at_center,rgba(0,255,209,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          {/* App header bar */}
          <div className="pt-6 pb-2 px-3 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-white/5">
            <span className="flex items-center gap-1">
              <Smartphone className="h-3.5 w-3.5 text-[#00bfff]" /> STRIDELINK V1.4
            </span>
            <button 
              id="sync-telemetry"
              onClick={triggerSync} 
              disabled={isSyncing}
              className="flex items-center gap-1 hover:text-[#00ffd1] transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin text-[#00ffd1]' : ''}`} />
              {isSyncing ? 'SYNCING...' : 'SYNCED'}
            </button>
          </div>

          {/* Inside App Content */}
          <div className="py-4 px-3 space-y-4">
            
            {/* Unified Health Core Ring Widget */}
            <div className="relative flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">POSTURE METRIC</span>
                <span className="text-3xl font-bold text-white font-display">
                  {postureScore}<span className="text-sm font-light text-slate-400">%</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Status: {postureScore >= 90 ? 'Perfect Alignment' : 'Correction Advised'}
                </span>
              </div>

              {/* Graphical representation Ring */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Outer ring path */}
                  <path
                    className="text-slate-800"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Ring path */}
                  <path
                    className="transition-all duration-1000"
                    strokeWidth="3.5"
                    strokeDasharray={`${postureScore}, 100`}
                    strokeLinecap="round"
                    stroke={postureScore >= 90 ? '#00ffd1' : '#f43f5e'}
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute font-mono text-[10px] text-white font-bold">
                  {postureScore}%
                </div>
              </div>
            </div>

            {/* Grid display for primary trackers */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Box 1: Dynamic steps */}
              <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5">
                <span className="text-[8px] font-mono text-slate-500 uppercase block">Step telemetry</span>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  {stepCount.toLocaleString()}
                </div>
                <div className="text-[9px] text-[#00bfff] font-mono mt-1 flex items-center gap-1">
                  <Flame className="h-2.5 w-2.5 animate-pulse text-orange-400" /> +320kcal burned
                </div>
              </div>

              {/* Box 2: Fatigue Index */}
              <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5">
                <span className="text-[8px] font-mono text-slate-500 uppercase block">Fatigue coefficient</span>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  {fatigueLevel}%
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00bfff] to-[#00ffd1] transition-all duration-1000"
                    style={{ width: `${fatigueLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Real-time Balancing Plane Vector Radar Map */}
            <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">GRAV-BALANCE ANALYZER</span>
                <Scale className="h-3.5 w-3.5 text-slate-500" />
              </div>

              {/* Balance Radar Display */}
              <div className="relative w-full aspect-[4/3] rounded-lg bg-black/60 border border-white/5 flex items-center justify-center overflow-hidden my-2">
                
                {/* Horizontal crosshair */}
                <div className="absolute w-full h-[1px] bg-slate-800/40" />
                <div className="absolute w-[1px] h-full bg-slate-800/40" />
                
                {/* Safe boundaries zone */}
                <div className="absolute w-[40px] h-[40px] rounded-full border border-[#00ffd1]/20 bg-[#00ffd1]/5" />
                <div className="absolute w-[80px] h-[80px] rounded-full border border-slate-800/60" />
                <div className="absolute w-[120px] h-[120px] rounded-full border border-slate-900" />

                {/* Tracking cursor representational vector marker */}
                <div 
                  className={`absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-all duration-700 ease-out flex items-center justify-center`}
                  style={{
                    transform: `translate(${balanceX}px, ${balanceY}px)`,
                    backgroundColor: postureScore >= 90 ? '#00ffd1' : '#f43f5e',
                    boxShadow: `0 0 12px ${postureScore >= 90 ? '#00ffd1' : '#f43f5e'}`
                  }}
                >
                  <div className="w-1 h-1 bg-black rounded-full" />
                </div>
              </div>

              <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1">
                <span>LEFT HEEL STRIPE</span>
                <span>RIGHT OUTSOLE PLANE</span>
              </div>
            </div>

            {/* Insole Connection Health Indicator */}
            <div className="p-3 bg-gradient-to-r from-[#0055ff]/10 to-[#00ffd1]/5 rounded-xl border border-[#00ffd1]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-2 w-2">
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-[#00ffd1] animate-ping" />
                  <div className="relative h-2 w-2 rounded-full bg-[#00ffd1]" />
                </div>
                <span className="text-[10px] font-mono text-slate-300">STRIDELINK PAIR: ACTIVE</span>
              </div>
              <span className="text-[9px] font-mono text-[#00ffd1]">L: 98% | R: 97%</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
