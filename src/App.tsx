import { useEffect, useState, useRef } from 'react';
import { 
  Activity, Cpu, Shield, Footprints, Smartphone, 
  Zap, Award, CheckCircle, Mail, 
  MapPin, Phone, Instagram, Twitter, MessageCircle, 
  Flame, ArrowUpRight
} from 'lucide-react';

import GlowCursor from './components/GlowCursor';
import InteractiveInsole from './components/InteractiveInsole';
import LiveDashboard from './components/LiveDashboard';
import OrderModal from './components/OrderModal';
import StrideSyncLogo from './components/StrideSyncLogo';
import { Feature, Benefit, Testimonial, InsoleLayer } from './types';

export default function App() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [skeletalComparison, setSkeletalComparison] = useState<'typical' | 'corrected'>('corrected');
  
  // Testimonials list
  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'Marcus Vance',
      role: 'Professional Ultra-Marathon Runner',
      quote: 'StrideSync transformed my ultra training cycle. Correcting my lateral heel loading alignment real-time from the dashboard shaved 4 minutes off my half-marathon split, but more importantly: zero knee fatigue.',
      rating: 5,
      avatarUrl: 'MV',
      impactMetric: '4.2% Endurance Gain'
    },
    {
      id: 't-2',
      name: 'Dr. Evelyn Carter',
      role: 'Podiatric Biomechanist & Specialist',
      quote: 'Typical orthotics are static and generic. StrideSync acts as a dynamic clinical advisor. It measures actual peak load distribution profiles in absolute real-world movement and adjusts biomechanical awareness.',
      rating: 5,
      avatarUrl: 'EC',
      impactMetric: 'Over-Pronation Solved'
    },
    {
      id: 't-3',
      name: 'Devon Takahashi',
      role: 'Lead UX Engineer & Standing Desk Activist',
      quote: 'Standing 8 hours a day for standups left me with severe heel pain. The Comfort Mesh config realigned my arches, and the app balance gauge keeps me perfectly distributed. High-tech and beautiful design.',
      rating: 5,
      avatarUrl: 'DT',
      impactMetric: '90% Fatigue Reduction'
    }
  ];

  // Features List
  const features: Feature[] = [
    {
      id: 'f-1',
      title: 'AI Posture Tracking',
      description: 'Continuous biomechanical skeletal monitoring identifies pelvic tilt and alerts you to structural misalignment.',
      iconName: 'Shield',
      metric: '0.01s Latency'
    },
    {
      id: 'f-2',
      title: 'Real-Time Step Counter',
      description: 'More than simple accelerometer counting. Measures step tempo, toe launch angles, and kinetic load ratios.',
      iconName: 'Activity',
      metric: '99.8% Precision'
    },
    {
      id: 'f-3',
      title: 'Pressure & Comfort Detection',
      description: '32 medical-grade dynamic pressure sensors chart your weight distribution curves to prevent joint strain.',
      iconName: 'Footprints',
      metric: '32 Dynamic Nodes'
    },
    {
      id: 'f-4',
      title: 'Lightweight & Waterproof',
      description: 'Engineered with hydrophobic IP68 graphene mesh. Only 4mm thick, completely dust, water, and sweat resistant.',
      iconName: 'Zap',
      metric: 'IP68 Graphene'
    },
    {
      id: 'f-5',
      title: 'Mobile App Connectivity',
      description: 'Low Energy dual Bluetooth transmits posture balance guides, historical heatmaps, and wellness reminders.',
      iconName: 'Smartphone',
      metric: 'BLE Dual-Grid'
    }
  ];

  // Benefits List
  const benefits: Benefit[] = [
    {
      id: 'b-1',
      title: 'Improves Posture Alignment',
      description: 'Actively monitors your body center of gravity. Syncing coordinates correct pelvic tilt and spine slouching to improve everyday posture.',
      highlight: 'Skeletal Correction',
      iconName: 'Award'
    },
    {
      id: 'b-2',
      title: 'Reduces Chronic Foot Fatigue',
      description: 'Shock attenuation layers with porous graphene structures absorb impact forces, protecting knees, ankles, and hips from long days on your feet.',
      highlight: 'Dynamic Shock Cushion',
      iconName: 'Cpu'
    },
    {
      id: 'b-3',
      title: 'Tracks Biomechanical Progress',
      description: 'Stores up to 6 months of diagnostic movement logs locally so you can review real gait improvements over weeks of training.',
      highlight: '6-Month Local Storage',
      iconName: 'Activity'
    },
    {
      id: 'b-4',
      title: 'Custom-Fits Any Profession',
      description: 'Specifically programmed for elite marathons, casual student commutes, or high-standing standing-desk workers.',
      highlight: 'Multivariate Adaptation',
      iconName: 'Smartphone'
    }
  ];

  // Insole Layer specs inside shoe
  const insoleLayers: InsoleLayer[] = [
    {
      id: 'layer-1',
      name: 'Cyber Mesh Conductive Layer',
      thickness: '0.8mm',
      description: 'Anti-microbial and highly breathable nano-knit with embedded silver conductive fibers for structural grounding.',
      color: 'from-cyan-400 to-blue-500',
      specs: ['IP68 hydrophobic mesh', 'High sweat dissipation', 'Deodorizing microtrace fibers']
    },
    {
      id: 'layer-2',
      name: '32-Node Gold-plated Sensor Circuitry',
      thickness: '1.2mm',
      description: 'Ultra thin printed flex circuits featuring 32 microscopic, resilient pressure sensor arrays targeting core reflex arcs.',
      color: 'from-[#00ffd1] to-teal-400',
      specs: ['Gold contact points', '100Hz responsive tracking', 'Micro-flexible copper routing']
    },
    {
      id: 'layer-3',
      name: 'AI Graphene Controller Frame',
      thickness: '0.5mm',
      description: 'The computational core. An integrated dual-core BLE microship that processes on-board gait vectors and balances energy consumption.',
      color: 'from-[#00bfff] to-[#0055ff]',
      specs: ['6-Axis IMU sensor', 'ARM Cortex ultra-low power', 'Inductive recharge support']
    },
    {
      id: 'layer-4',
      name: 'Adaptive G-Flex Orthotic Core',
      thickness: '1.5mm',
      description: 'A structural carbon-graphene plate that rigidifies the medial arch while flexing on heel strikes, redistributing load evenly.',
      color: 'from-purple-500 to-indigo-600',
      specs: ['Corrective arch lift', 'High torsional strength', 'Impact dissipation matrix']
    }
  ];

  // Unified Intersection Observer for Scroll elements
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            // Smoothly visual exit rules if needed
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-space-dark text-slate-100 overflow-x-hidden selection:bg-[#00ffd1] selection:text-black antialiased bg-grid-cyber pb-0">
      
      {/* Background Animated Stardust/Telemetry particles (Strictly passive & lightweight) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20vh] left-[15%] w-2.5 h-2.5 rounded-full bg-[#00ffd1] blur-xs animate-pulse opacity-40" />
        <div className="absolute top-[60vh] right-[10%] w-1.5 h-1.5 rounded-full bg-[#00bfff] blur-xs animate-pulse opacity-50" />
        <div className="absolute top-[120vh] left-[8%] w-2 h-2 rounded-full bg-purple-500 blur-xs animate-pulse opacity-30" />
        <div className="absolute top-[210vh] right-[25%] w-2 h-2 rounded-full bg-[#00ffd1] blur-xs animate-pulse opacity-40" />
        <div className="absolute top-[280vh] left-[20%] w-1.5 h-1.5 rounded-full bg-[#00bfff] blur-xs animate-pulse opacity-50" />
      </div>

      {/* Global Cursor Glowing Halo */}
      <GlowCursor />

      {/* Top Header / Brand Nav */}
      <header className="sticky top-0 z-40 bg-space-dark/75 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Name */}
          <a href="#" className="flex items-center gap-1 group">
            <StrideSyncLogo size="sm" className="scale-125 origin-center select-none" />
            <span className="text-xl font-bold font-display tracking-widest text-white group-hover:text-[#00ffd1] transition-colors ml-1">
              STRIDE<span className="text-[#00bfff]">SYNC</span>
            </span>
          </a>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">HOW IT WORKS</a>
            <a href="#product-showcase" className="hover:text-white transition-colors">SHOWCASE</a>
            <a href="#benefits" className="hover:text-white transition-colors">ALIGNMENT</a>
            <a href="#testimonials" className="hover:text-white transition-colors">TESTIMONIALS</a>
          </nav>

          {/* Header Action Button */}
          <button 
            id="nav-buy-btn"
            onClick={() => setIsOrderOpen(true)}
            className="relative overflow-hidden p-2.5 px-6 rounded-lg text-xs font-semibold font-display tracking-widest uppercase bg-slate-900 text-white border border-t-[#00ffd1] border-[#00bfff]/20 hover:border-[#00ffd1]/40 hover:bg-slate-900/80 active:scale-95 transition-all"
          >
            BUY NOW
          </button>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#00bfff] to-[#00ffd1] transition-all"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-[4vh] md:pt-[10vh] pb-[10vh] px-4 md:px-8 z-10 overflow-hidden">
        {/* Subtle big glowing orb background */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,191,255,0.04)_0%,rgba(2,6,23,0)_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Header Copy / CTAs (7 columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0055ff]/10 border border-[#00bfff]/20 rounded-full">
              <Zap className="h-4 w-4 text-[#00ffd1]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#00ffd1]">
                MILITARY-GRADE KINETIC INTERFACING
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-[1.1] text-white tracking-tight">
              Walk Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] via-[#00ffd1] to-white glow-blue">
                Live Better.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed font-sans">
              AI-powered smart insoles that track posture, steps, comfort, and movement in real time. Fit StrideSync into any sneaker or running shoe to realign your balance dynamically.
            </p>

            {/* Quick Metrics highlight row */}
            <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-5 max-w-lg">
              <div>
                <span className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">32</span>
                <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider mt-0.5">Biocompatible Nodes</span>
              </div>
              <div className="border-l border-white/5 pl-4">
                <span className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">100Hz</span>
                <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider mt-0.5">Frequency Cycle</span>
              </div>
              <div className="border-l border-white/5 pl-4">
                <span className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">0.01s</span>
                <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider mt-0.5">Diagnostic Speed</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-buy-btn"
                onClick={() => setIsOrderOpen(true)}
                className="p-4 px-8 rounded-xl bg-gradient-to-r from-[#0055ff] to-[#00ffd1] text-black font-semibold font-display tracking-widest text-xs uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,191,255,0.25)] active:scale-98 transition-all"
              >
                Buy Now
              </button>
              <a
                href="#features"
                className="p-4 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold font-display tracking-widest text-xs border border-white/10 uppercase transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Futuristic Shoe + Glow insole Visual representation (5 columns) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Ambient Background Aura elements */}
            <div className="absolute h-80 w-80 rounded-full bg-[#00bfff]/10 blur-3xl animate-pulse" />

            {/* Showcase Stand panel and Floating sneaker outline */}
            <div className="relative w-full max-w-[400px] aspect-square rounded-3xl bg-slate-900/20 border border-white/5 p-6 backdrop-blur-md flex flex-col items-center justify-between overflow-hidden shadow-inner group">
              <div className="absolute inset-0 bg-grid-cyber-fine opacity-30" />
              
              {/* Dynamic status indicators on border corners */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[8px] font-mono text-slate-500">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00ffd1] animate-ping" />
                SYSTEM_LIVE
              </div>
              <div className="absolute top-4 right-4 text-[8px] font-mono text-slate-500">
                NODE_01_OK
              </div>

              {/* The Hover Interactive Sneaker Diagram! */}
              <div className="relative h-64 w-62 flex items-center justify-center my-auto transition-transform duration-500 group-hover:scale-105">
                
                {/* Simulated Glowing circular radar waves behind */}
                <span className="absolute h-40 w-40 rounded-full border border-[#00bfff]/20 animate-ping" style={{ animationDuration: '4s' }} />
                <span className="absolute h-52 w-52 rounded-full border border-[#00ffd1]/10 animate-ping" style={{ animationDuration: '6s' }} />

                {/* Combined vector athletic sneakers outline and sliding illuminated insole */}
                <svg className="w-full h-full relative z-10" viewBox="0 0 200 200" fill="none">
                  
                  {/* Glowing neon halo bounding the foot strike center */}
                  <circle cx="104" cy="115" r="32" fill="url(#coreGlow)" className="opacity-75 animate-pulse" />
                  
                  {/* Dynamic Neon Insole Slide Graphic: slides out upwards slightly on hover */}
                  <g className="transition-transform duration-700 ease-out translate-y-1 group-hover:-translate-y-4">
                    {/* Glowing Insole base */}
                    <path
                      d="M 60 110
                         C 75 110, 85 92, 105 92
                         C 125 92, 140 100, 155 102
                         C 165 103, 175 92, 160 112
                         C 142 135, 120 134, 100 136
                         C 78 138, 55 125, 60 110 Z"
                      fill="#03102d"
                      stroke="#00ffd1"
                      strokeWidth="2.5"
                      className="filter drop-shadow-[0_0_8px_rgba(0,255,209,0.5)]"
                    />
                    
                    {/* Interactive Circuit copper node lines */}
                    <path
                      d="M 80 115 H 140 M 110 115 V 104"
                      stroke="rgba(0, 191, 255, 0.6)"
                      strokeWidth="1.5"
                    />

                    {/* Laser nodes */}
                    <circle cx="85" cy="115" r="2.5" fill="#00ffd1" />
                    <circle cx="110" cy="104" r="2.5" fill="#00bfff" />
                    <circle cx="130" cy="115" r="2.5" fill="#00ffd1" />
                  </g>

                  {/* Wireframe Transparent Sneaker Contour - acts as frame */}
                  <path
                    d="M 40 100 
                       C 40 85, 55 85, 70 85 
                       C 80 75, 92 50, 106 50 
                       C 114 50, 122 68, 122 84
                       C 134 85, 148 85, 160 92
                       C 172 98, 185 114, 180 128
                       C 174 138, 160 138, 148 138
                       C 130 138, 100 138, 80 138
                       C 60 138, 40 135, 40 115 
                       C 40 105, 38 100, 40 100 Z"
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    className="transition-colors group-hover:stroke-slate-500/35 duration-500"
                  />

                  {/* Shoe Outer Sole tread visual */}
                  <path
                    d="M 40 130 Q 110 135 180 132"
                    stroke="rgba(0, 191, 255, 0.3)"
                    strokeWidth="3.5"
                  />

                  {/* Gradient shaders */}
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00bfff" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Overlay contextual indicators */}
                <div className="absolute bottom-4 select-none pointer-events-none p-2 py-1 px-3 bg-slate-950/80 border border-white/5 rounded-lg text-[10px] font-mono text-slate-400 flex items-center gap-1.5 uppercase tracking-wider backdrop-blur-sm">
                  <span>Hover to extract insole telemetry</span>
                </div>
              </div>

              {/* Specs tags displayed below */}
              <div className="w-full flex justify-between text-[10px] font-mono text-slate-500 border-t border-white/5 pt-4">
                <span className="flex items-center gap-1 text-[#00ffd1]"><Activity className="h-3 w-3" /> Gait-sync Active</span>
                <span>Power: 92%</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: FEATURES SECTION */}
      <section id="features" className="py-[12vh] px-4 md:px-8 border-t border-white/5 relative z-10">
        
        {/* Subtle geometric neon background details */}
        <div className="absolute top-0 right-10 h-96 w-96 bg-[radial-gradient(ellipse_at_center,rgba(0,255,209,0.02)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section title */}
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-on-scroll">
            <span className="text-xs font-mono font-bold uppercase text-[#00ffd1] tracking-widest block">
              DIAGNOSTIC ECOSYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Biometric Tracking. <br />
              <span className="text-[#00bfff]">No Friction.</span>
            </h2>
            <p className="text-sm text-slate-400">
              Each feature is meticulously engineered into a 4mm paper-thin structure, packing medical-grade tracking directly under your footbed.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feat) => (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                className="group relative p-6 bg-slate-950/40 border border-white/5 hover:border-[#00ffd1]/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,191,255,0.1)] flex flex-col justify-between hover:-translate-y-1 reveal-on-scroll text-left"
              >
                <div>
                  {/* Premium Glowing vector icon container */}
                  <div className="h-12 w-12 rounded-xl bg-slate-900 border border-white/10 group-hover:border-[#00ffd1]/40 flex items-center justify-center mb-6 shadow-inner transition-colors">
                    {feat.iconName === 'Shield' && <Shield className="h-5 w-5 text-[#00ffd1] group-hover:animate-pulse" />}
                    {feat.iconName === 'Activity' && <Activity className="h-5 w-5 text-[#00bfff] group-hover:scale-110 transition-transform" />}
                    {feat.iconName === 'Footprints' && <Footprints className="h-5 w-5 text-[#00ffd1]" />}
                    {feat.iconName === 'Zap' && <Zap className="h-5 w-5 text-yellow-400 group-hover:animate-bounce" />}
                    {feat.iconName === 'Smartphone' && <Smartphone className="h-5 w-5 text-[#00bfff]" />}
                  </div>

                  <h3 className="text-lg font-bold font-display text-white group-hover:text-[#00ffd1] transition-colors leading-tight mb-2">
                    {feat.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                    {feat.description}
                  </p>
                </div>

                {feat.metric && (
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>INDEX METER</span>
                    <span className="text-[#00ffd1] font-bold">{feat.metric}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section id="how-it-works" className="py-[12vh] px-4 md:px-8 bg-slate-950/30 border-t border-white/5 relative z-10">
        <div className="absolute bottom-0 left-[20%] h-[350px] w-[350px] bg-[radial-gradient(circle,rgba(0,191,255,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-on-scroll">
            <span className="text-xs font-mono font-bold uppercase text-[#00ffd1] tracking-widest block">
              Biomechanical Connection Protocol
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
              Surgical <span className="text-[#00bfff]">Integration</span>
            </h2>
            <p className="text-sm text-slate-400">
              Integrating StrideSync into your active lifestyle takes less than 60 seconds.
            </p>
          </div>

          {/* 3 Step Visual Representation */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Background Vector Line tracing path between steps (Desktop only) */}
            <div className="hidden md:block absolute top-[28%] left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-transparent via-[#00ffd1]/20 to-transparent pointer-events-none" />

            {/* Step 1 */}
            <div className="relative space-y-4 p-6 bg-slate-900/10 border border-white/5 rounded-2xl backdrop-blur-xs hover:border-[#00bfff]/20 transition-colors text-left reveal-on-scroll">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl font-black font-mono text-slate-800 tracking-tighter">01</span>
                <span className="text-[10px] font-mono py-1 px-2.5 rounded bg-white/5 text-slate-400 uppercase tracking-wider">
                  Form Factor
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">Insert Insoles</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Slip StrideSync underneath your standard factory athletic shoe liner. Designed with high-density anti-slip patterns to lock perfectly in place during explosive athletic steps.
              </p>
              {/* Feature Icon Indicator */}
              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-[#00ffd1]">
                <Footprints className="h-4 w-4" /> Fits US size 6 - 13
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative space-y-4 p-6 bg-slate-900/10 border border-white/5 rounded-2xl backdrop-blur-xs hover:border-[#00ffd1]/20 transition-colors text-left reveal-on-scroll">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl font-black font-mono text-slate-800 tracking-tighter">02</span>
                <span className="text-[10px] font-mono py-1 px-2.5 rounded bg-[#00ffd1]/10 text-[#00ffd1] uppercase tracking-wider">
                  BLE Signal
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">Connect Mobile App</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Boot up the StrideSync companion app on iOS or Android. Low energy Bluetooth connects near-instantly to synchronize dual insole calibration data cycles securely.
              </p>
              {/* Feature Icon Indicator */}
              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-[#00bfff]">
                <Smartphone className="h-4 w-4" /> Dual BLE Sync Active
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative space-y-4 p-6 bg-slate-900/10 border border-white/5 rounded-2xl backdrop-blur-xs hover:border-purple-500/20 transition-colors text-left reveal-on-scroll">
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl font-black font-mono text-slate-800 tracking-tighter">03</span>
                <span className="text-[10px] font-mono py-1 px-2.5 rounded bg-purple-500/15 text-purple-400 uppercase tracking-wider">
                  AI Realignment
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">Track Health / Gait</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Run, walk, or do stance-balancing cycles. Analyze real-time heat maps, posture balance indexes, and receive ambient correction suggestions to decrease back fatigue.
              </p>
              {/* Feature Icon Indicator */}
              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-purple-400">
                <Activity className="h-4 w-4" /> 100+ telemetry vectors
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: PRODUCT SHOWCASE */}
      <section id="product-showcase" className="py-[12vh] px-4 md:px-8 border-t border-white/5 relative z-10-grid">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-on-scroll">
            <span className="text-xs font-mono font-bold uppercase text-[#00ffd1] tracking-widest block">
              Biomedical Anatomy
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Biomechanical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ffd1]">Telemetry System</span>
            </h2>
            <p className="text-sm text-slate-400">
              Interactive diagnostic deck: explore features on the left and hover sensor zones on the custom foot schematic to view clinical metrics.
            </p>
          </div>

          {/* Interactive Insole component integration */}
          <div className="reveal-on-scroll">
            <InteractiveInsole />
          </div>

          {/* Layer explainer subsection (Cross Section Explained) */}
          <div className="reveal-on-scroll mt-16 p-6 md:p-8 bg-slate-900/10 border border-white/5 rounded-3xl backdrop-blur-md">
            <h3 className="text-2xl font-bold font-display text-white text-center mb-10">
              Micro-Layered Orthotics Composite
            </h3>

            <div className="grid md:grid-cols-4 gap-4">
              {insoleLayers.map((layer, index) => {
                const isActive = activeLayer === index;
                return (
                  <div
                    key={layer.id}
                    id={`layer-box-${layer.id}`}
                    onMouseEnter={() => setActiveLayer(index)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative text-left flex flex-col justify-between ${
                      isActive 
                        ? 'bg-slate-950 border-[#00bfff] shadow-[0_0_20px_rgba(0,191,255,0.15)] scale-[1.02]' 
                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      {/* Interactive indicator scale */}
                      <div className="flex justify-between items-center mb-4 text-xs font-mono">
                        <span className="text-slate-500">LAYER 0{index + 1}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isActive ? 'bg-[#00bfff]/20 text-[#00bfff]' : 'bg-slate-900 text-slate-500'}`}>
                          {layer.thickness}
                        </span>
                      </div>

                      <h4 className={`text-base font-bold font-display leading-snug duration-300 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {layer.name}
                      </h4>
                      
                      <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                        {layer.description}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-4 space-y-1">
                      {layer.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                          <span className="h-1 w-1 rounded-full bg-[#00ffd1]" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Glowing highlight anchor */}
                    <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${layer.color} transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: BENEFITS SECTION */}
      <section id="benefits" className="py-[12vh] px-4 md:px-8 border-t border-white/5 bg-slate-950/20 relative z-10">
        
        {/* Soft background light leak */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,209,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-on-scroll">
            <span className="text-xs font-mono font-bold uppercase text-[#00ffd1] tracking-widest block">
              POSTURAL BIO-ALIGNMENT
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Re-Establish Your <span className="text-[#00bfff]">Kinetic Foundation</span>
            </h2>
            <p className="text-sm text-slate-400">
              StrideSync coordinates the skeletal chain from the ground up, reducing long-term strain, hip torsion, and muscular fatigue.
            </p>
          </div>

          {/* Core Postural Realignment Compare Panel */}
          <div className="reveal-on-scroll grid lg:grid-cols-12 gap-8 items-center bg-slate-900/10 border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-md">
            
            {/* Realtime Skeletal realign comparison simulator (LHS: Graphics) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-semibold">
                  SKELETAL SEGMENT CORRECTOR
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSkeletalComparison('typical')}
                    id="skeletal-typical-btn"
                    className={`px-3 py-1 text-[10px] font-mono rounded-lg border transition-all ${
                      skeletalComparison === 'typical' 
                        ? 'bg-red-500/10 border-red-500/40 text-red-400 font-bold' 
                        : 'bg-transparent border-white/5 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    GENERIC INSOLE
                  </button>
                  <button
                    onClick={() => setSkeletalComparison('corrected')}
                    id="skeletal-corrected-btn"
                    className={`px-3 py-1 text-[10px] font-mono rounded-lg border transition-all ${
                      skeletalComparison === 'corrected' 
                        ? 'bg-[#00ffd1]/15 border-[#00ffd1]/40 text-[#00ffd1] font-bold shadow-[0_0_12px_rgba(0,255,209,0.15)]' 
                        : 'bg-transparent border-white/5 text-slate-200 hover:text-white'
                    }`}
                  >
                    STRIDESYNC ACTIVE
                  </button>
                </div>
              </div>

              {/* Skeletal Vector representation */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-cyber-fine opacity-20" />
                
                {/* Calibration metrics overlaid */}
                <div className="absolute top-4 left-4 text-left font-mono text-[9px] text-slate-500 space-y-0.5">
                  <div>ANOMALY_ALGORITHM: V2.4</div>
                  <div>ANGLE_INTERRUPT: {skeletalComparison === 'typical' ? '7.4° DEV' : '0.2° OPTIMAL'}</div>
                </div>

                <div className="absolute top-4 right-4 text-right font-mono text-[9px] text-slate-500">
                  {skeletalComparison === 'typical' ? (
                    <span className="text-red-400 font-semibold uppercase animate-pulse">● Misaligned Pivot alert</span>
                  ) : (
                    <span className="text-[#00ffd1] font-semibold uppercase">● Posture alignment verified</span>
                  )}
                </div>

                {/* Animated vector bones diagram representing legs centering gait */}
                <svg className="w-40 h-[220px]" viewBox="0 0 100 200" fill="none">
                  {/* Pelvis line */}
                  <line 
                    x1="20" y1={skeletalComparison === 'typical' ? '30' : '25'} 
                    x2="80" y2="25" 
                    stroke={skeletalComparison === 'typical' ? '#ef4444' : '#00ffd1'} 
                    strokeWidth="3" 
                    className="transition-all duration-700"
                  />
                  {/* Pelvic joint indicator stars */}
                  <circle cx="20" cy={skeletalComparison === 'typical' ? '30' : '25'} r="4" fill="white" className="transition-all duration-700" />
                  <circle cx="80" cy="25" r="4" fill="white" />

                  {/* Left thigh femur bone */}
                  <line 
                    x1="20" y1={skeletalComparison === 'typical' ? '30' : '25'} 
                    x2={skeletalComparison === 'typical' ? '25' : '20'} y2="100" 
                    stroke="rgba(255,255,255,0.7)" 
                    strokeWidth="2.5" 
                    className="transition-all duration-700"
                  />
                  {/* Right thigh femur bone */}
                  <line 
                    x1="80" y1="25" 
                    x2="80" y2="100" 
                    stroke="rgba(255,255,255,0.7)" 
                    strokeWidth="2.5" 
                  />

                  {/* Knee joints */}
                  <circle cx={skeletalComparison === 'typical' ? '25' : '20'} cy="100" r="3.5" fill="#00bfff" className="transition-all duration-700" />
                  <circle cx="80" cy="100" r="3.5" fill="#00bfff" />

                  {/* Left shin tibia bone */}
                  <line 
                    x1={skeletalComparison === 'typical' ? '25' : '20'} y1="100" 
                    x2={skeletalComparison === 'typical' ? '40' : '20'} y2="175" 
                    stroke="rgba(255,255,255,0.7)" 
                    strokeWidth="2.5" 
                    className="transition-all duration-700"
                  />
                  {/* Right shin tibia bone */}
                  <line 
                    x1="80" y1="100" 
                    x2="80" y2="175" 
                    stroke="rgba(255,255,255,0.7)" 
                    strokeWidth="2.5" 
                  />

                  {/* Feet base / Pressure dots */}
                  <circle cx={skeletalComparison === 'typical' ? '40' : '20'} cy="175" r="5" fill={skeletalComparison === 'typical' ? '#ef4444' : '#00ffd1'} className="transition-all duration-700" />
                  <circle cx="80" cy="175" r="5" fill="#00ffd1" />

                  {/* Vertical guides mapping centering */}
                  <line x1="50" y1="10" x2="50" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
                </svg>

              </div>
            </div>

            {/* Benefits Content columns (RHS) */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6 text-left">
              {benefits.map((ben) => (
                <div 
                  key={ben.id} 
                  id={`benefit-pane-${ben.id}`}
                  className="space-y-2 p-4 bg-slate-950/40 rounded-xl border border-white/5 hover:border-[#00ffd1]/10 transition-colors"
                >
                  <div className="h-9 w-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                    {ben.iconName === 'Award' && <Award className="h-4 w-4 text-[#00ffd1]" />}
                    {ben.iconName === 'Cpu' && <Cpu className="h-4 w-4 text-purple-400" />}
                    {ben.iconName === 'Activity' && <Activity className="h-4 w-4 text-[#00bfff]" />}
                    {ben.iconName === 'Smartphone' && <Smartphone className="h-4 w-4 text-[#00ffd1]" />}
                  </div>

                  <h3 className="text-sm font-semibold font-display text-white mt-2">
                    {ben.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {ben.description}
                  </p>

                  <div className="pt-2 text-[10px] font-mono text-[#00ffd1]">
                    {ben.highlight}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Interactive Mobile Companion Section (App telemetry preview integration) */}
          <div className="reveal-on-scroll">
            <LiveDashboard />
          </div>

        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section id="testimonials" className="py-[12vh] px-4 md:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section titles */}
          <div className="text-center space-y-3 max-w-2xl mx-auto reveal-on-scroll">
            <span className="text-xs font-mono font-bold uppercase text-[#00ffd1] tracking-widest block">
              ATHLETE & SCIENCE ENDORSED
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Validated By <span className="text-[#00bfff]">Real Performance</span>
            </h2>
            <p className="text-sm text-slate-400">
              Trusted by professional marathons riders, biomechanical podiatrists, and high performance specialists globally.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                id={`testimonial-card-${test.id}`}
                className="p-6 bg-slate-950/40 border border-white/5 hover:border-[#00ffd1]/20 rounded-2xl backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,255,209,0.08)] transition-all duration-300 flex flex-col justify-between text-left reveal-on-scroll"
              >
                <div className="space-y-4">
                  {/* Symmetrical glowing card borders & quotes */}
                  <div className="flex justify-between items-center">
                    {/* AVATAR Initial Circle */}
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#0055ff]/30 to-[#00ffd1]/30 border border-[#00ffd1]/30 flex items-center justify-center font-bold text-white text-xs font-mono">
                      {test.avatarUrl}
                    </div>

                    {/* Star ratings */}
                    <div className="flex gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <span key={i} className="text-xs text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">{test.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{test.role}</span>
                  </div>
                  {test.impactMetric && (
                    <div className="px-2.5 py-1 rounded bg-[#00ffd1]/10 border border-[#00ffd1]/20 text-[9px] font-mono text-[#00ffd1] font-bold">
                      {test.impactMetric}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: CTA SECTION */}
      <section className="py-[12vh] px-4 md:px-8 bg-slate-950/40 border-t border-white/5 relative z-10-grid overflow-hidden">
        
        {/* Dynamic sweeping spotlight gradient effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] bg-[radial-gradient(ellipse_at_center,rgba(0,191,255,0.05)_0%,rgba(2,6,23,0)_75%)] blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto p-10 md:p-14 bg-gradient-to-tr from-slate-950 to-slate-900 border border-white/10 rounded-3xl text-center relative overflow-hidden reveal-on-scroll">
          
          <div className="absolute inset-0 bg-grid-cyber-fine opacity-20 pointer-events-none" />

          {/* Symmetrical glowing laser dots on visual borders */}
          <span className="absolute top-0 left-10 w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#00ffd1] to-transparent" />
          <span className="absolute bottom-0 right-10 w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#00bfff] to-transparent" />

          <div className="space-y-6 relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase text-[#00ffd1] tracking-widest block">
              PRE-ORDER AQUISITION CALIBRATION
            </span>
            
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Upgrade Every Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ffd1]">With StrideSync</span>
            </h2>

            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Equip your skeletal foundation with real-time biometric tracking. Enjoy customized posture calibrations, reduced joint strain, and a 60-day satisfaction guarantee.
            </p>

            <button
              id="cta-order-today-btn"
              onClick={() => setIsOrderOpen(true)}
              className="p-4 px-10 rounded-xl bg-gradient-to-r from-[#0055ff] via-[#00ffd1] to-[#00bfff] text-black font-bold font-display tracking-widest text-xs uppercase hover:brightness-110 shadow-[0_0_25px_rgba(0,191,255,0.25)] hover:scale-[1.02] active:scale-98 transition-all"
            >
              Order Today
            </button>

            <div className="pt-4 flex justify-center gap-6 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-[#00ffd1]" /> Posture Guarantee</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-[#00ffd1]" /> IP68 Waterproof</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-[#00ffd1]" /> 60-Day Trial Offer</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="bg-[#020512] border-t border-white/5 py-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
          
          {/* Logo Brand Brief Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-1">
              <StrideSyncLogo size="sm" className="scale-110 origin-center select-none" />
              <span className="text-lg font-bold font-display tracking-widest text-white ml-1">
                STRIDE<span className="text-[#00bfff]">SYNC</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Merging podiatric science with machine learning. StrideSync manufactures military-grade biomechanic products that fit seamlessly within active and luxury lifestyles.
            </p>

            <div className="flex gap-3 pt-2">
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-[#00ffd1] hover:border-[#00ffd1]/40 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-[#00bfff] hover:border-[#00bfff]/40 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-[#00ffd1] hover:border-[#00ffd1]/40 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links Columns (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">ECOSYSTEM</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><a href="#features" className="hover:text-white transition-colors">Tracking App</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Clinics Hub</a></li>
                <li><a href="#product-showcase" className="hover:text-white transition-colors">Sensors Layout</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate wellness</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">SUPPORT</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">Size guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Clinicians network</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy telemetry</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Order Tracker</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Details Column (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">CENTRAL COMMUNICATOR</h4>
            
            <div className="space-y-2.5 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#00ffd1]" />
                <a href="mailto:support@stridesync.ai" className="hover:text-white">support@stridesync.ai</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#00bfff]" />
                <span>+1 (800) 555-KNTK</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>200 Biometrics Way, Palo Alto, CA</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 text-[9px] font-mono text-slate-500">
              STATION TIME: {new Date().toLocaleTimeString()} UTC
            </div>
          </div>

        </div>

        {/* Global Copyright Bottom band */}
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-600 gap-4">
          <span>&copy; {new Date().getFullYear()} STRIDESYNC LABS INC. ALL BIOMETRIC RIGHTS PERSIST.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">TERMS OF OPERATION</a>
            <a href="#" className="hover:text-white">TELEMETRY PRIVACY PROTOCOL</a>
          </div>
        </div>
      </footer>

      {/* Pre-order acquisition modal */}
      <OrderModal 
        isOpen={isOrderOpen} 
        onClose={() => setIsOrderOpen(false)} 
      />

    </div>
  );
}
