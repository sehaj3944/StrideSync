import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Edition = 'performance' | 'comfort' | 'recovery';

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [edition, setEdition] = useState<Edition>('performance');
  const [gender, setGender] = useState<'men' | 'women'>('men');
  const [shoeSize, setShoeSize] = useState<string>('9.5');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const editionsInfo = {
    performance: {
      name: 'StrideSync Performance Pro',
      price: 149,
      tag: 'CARBON FIBER EXOSKELETON',
      features: ['32 dynamic sensor nodes', 'Real-time gait correction', 'Ultra-light carbon shell']
    },
    comfort: {
      name: 'StrideSync Everyday Comfort',
      price: 119,
      tag: 'PNEUMATIC MEMORY FOAM',
      features: ['Posture tracking focus', 'Medial arch realignment', 'Full day kinetic relief']
    },
    recovery: {
      name: 'StrideSync Elite Recovery',
      price: 139,
      tag: 'KINETIC MASSAGE PATHWAY',
      features: ['Heel buffer protection', 'Plantar fasciitis release', 'Orthopedic heat trace map']
    }
  };

  const currentEdition = editionsInfo[edition];
  const sizeOptions = gender === 'men' 
    ? ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '13']
    : ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !address) return;
    
    setSubmitting(true);
    // Simulate smart biometric block validation
    setTimeout(() => {
      setSubmitting(false);
      setIsOrdered(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Ambient Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-x-0 inset-y-0 bg-[#020617]/85 backdrop-blur-md pointer-events-auto" 
      />

      {/* Main Glassmorphic Panel content wrapper */}
      <div className="relative w-full max-w-2xl bg-slate-950 border border-white/10 rounded-3xl overflow-hidden z-10 shadow-[0_0_50px_rgba(0,191,255,0.25)] flex flex-col md:max-h-[90vh]">
        
        {/* Subtle running laser overlay in headers */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00ffd1] to-transparent animate-pulse" />

        {/* Header bar */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-white">STRIDESYNC ACQUISITION STATION</h3>
            <span className="text-[10px] font-mono text-[#00ffd1]">FUTURISTIC PHYSICAL PRODUCT ORTHOTICS</span>
          </div>
          <button 
            id="close-modal-btn"
            onClick={onClose}
            className="p-1 px-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-mono"
          >
            ESC ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {!isOrdered ? (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column: Product Selection */}
              <div className="space-y-6">
                {/* 1. Edition selector */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">1. Select Bio-Grid Edition</span>
                  <div className="grid grid-cols-1 gap-2">
                    {(Object.keys(editionsInfo) as Edition[]).map((key) => {
                      const item = editionsInfo[key];
                      const isSelected = edition === key;
                      return (
                        <div
                          key={key}
                          onClick={() => setEdition(key)}
                          id={`select-edition-${key}`}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-[#0055ff]/10 border-[#00bfff] text-white shadow-[0_0_15px_rgba(0,191,255,0.1)]' 
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">{item.name}</span>
                            <span className="text-sm font-mono font-bold glow-blue">${item.price}</span>
                          </div>
                          <span className="block text-[9px] font-mono text-slate-500 mt-1 uppercase">
                            {item.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Sizing configuration */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">2. Configure Sizing</span>
                    <div className="flex gap-2 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setGender('men')}
                        className={`px-2 py-0.5 rounded border transition-colors ${
                          gender === 'men' ? 'bg-[#00bfff]/20 text-white border-[#00bfff]/40' : 'bg-transparent text-slate-500 border-white/5'
                        }`}
                      >
                        MEN
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('women')}
                        className={`px-2 py-0.5 rounded border transition-colors ${
                          gender === 'women' ? 'bg-[#00ffd1]/20 text-white border-[#00ffd1]/40' : 'bg-transparent text-slate-500 border-white/5'
                        }`}
                      >
                        WOMEN
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1">
                    {sizeOptions.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setShoeSize(size)}
                        id={`size-${size}`}
                        className={`p-2 rounded text-xs font-mono border transition-all ${
                          shoeSize === size 
                            ? 'bg-[#00bfff] text-black border-[#00bfff] font-bold font-mono' 
                            : 'bg-slate-950 text-slate-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    *StrideSync is flexible and fits all major performance running footbeds. True to standard shoe sizing.
                  </span>
                </div>
              </div>

              {/* Right Column: Checkout Info & Pre-order Details */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">3. Biometric Ship Destination</span>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">RECIPIENT FULL NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bfff] transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">SECURE NOTIFICATION EMAIL</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bfff] transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">SHIPPING METROPOLIS ADDRESS</label>
                      <input
                        type="text"
                        required
                        placeholder="100 Smart Blvd, City Center"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bfff] transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Quote and Price breakdown */}
                <div className="p-4 bg-slate-900 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>{currentEdition.name}</span>
                    <span>${currentEdition.price}.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>AI Orthotics Customization</span>
                    <span className="text-[#00ffd1] uppercase tracking-wider font-semibold">FREE INCLUDED</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>Priority Smart Delivery</span>
                    <span className="text-[#00ffd1] uppercase tracking-wider font-semibold">FREE INCLUDED</span>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase">TOTAL INTEGRATION PRICE</span>
                    <span className="text-lg font-bold font-mono text-white glow-blue">
                      ${currentEdition.price}.00
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  id="order-checkout-submit"
                  disabled={submitting}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-[#0055ff] to-[#00ffd1] text-black font-semibold text-sm font-display tracking-widest uppercase hover:brightness-110 active:scale-98 transition-all duration-300 shadow-[0_0_20px_rgba(0,191,255,0.3)] flex items-center justify-center gap-2 placeholder-slate-700"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      VALIDATING BIOMETRICS...
                    </span>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" /> SECURE ORDER INSOLE NOW
                    </>
                  )}
                </button>
              </div>

            </form>
          ) : (
            /* Successful Receipt Order Box */
            <div className="text-center py-8 space-y-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#00ffd1]/20 border border-[#00ffd1]/40 mb-2">
                <CheckCircle2 className="h-10 w-10 text-[#00ffd1]" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold font-display text-white">STRIDELINK ESTABLISHED</h4>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  A verification transmission has been piped to <span className="text-[#00ffd1] font-mono">{email}</span>. Your personalized medical-grade orthotic grid formulation has begun production.
                </p>
              </div>

              {/* Physical Receipt Slip layout */}
              <div className="max-w-md mx-auto p-5 bg-slate-900 border border-white/5 rounded-2xl text-left space-y-3 font-mono relative overflow-hidden">
                {/* Visual side barcodes */}
                <div className="absolute top-0 right-0 h-full w-2.5 bg-gradient-to-b from-transparent via-[#00bfff]/30 to-transparent flex flex-col gap-1 justify-around py-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-0.5 bg-[#00bfff]" style={{ width: i % 2 === 0 ? '100%' : '50%' }} />
                  ))}
                </div>

                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>ORDER SPEC_ID</span>
                  <span>#{Math.floor(Math.random() * 900000000 + 100000000)}Y</span>
                </div>

                <div className="space-y-1 text-xs text-white">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient:</span>
                    <span className="font-semibold text-right">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Insole Spec:</span>
                    <span className="font-semibold text-right">{currentEdition.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scale Geometry:</span>
                    <span className="font-semibold text-[#00ffd1] uppercase text-right">Gender {gender} (US {shoeSize})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Price:</span>
                    <span className="font-semibold text-white">${currentEdition.price}.00</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-3.5 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 text-[#00ffd1]">
                    <Truck className="h-3.5 w-3.5" /> Next-Day Dispatch
                  </div>
                  <div className="flex items-center gap-1.5 text-[#00bfff]">
                    <Sparkles className="h-3.5 w-3.5" /> Posture Guarantee
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-white/5 hover:border-white/20 text-slate-300 font-mono text-xs hover:text-white transition-colors"
                >
                  DISMISS TERMINAL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info inside modal */}
        <div className="p-4 px-6 bg-slate-900/60 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00ffd1]" /> 256-BIT CRYPTOGRAPHY SECURE CHANNEL
          </span>
          <span>SYSTEM CHRONO: {new Date().toLocaleDateString()}</span>
        </div>

      </div>
    </div>
  );
}
