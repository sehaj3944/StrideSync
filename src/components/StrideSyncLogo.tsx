import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function StrideSyncLogo({ className = '', size = 'md' }: LogoProps) {
  // Support responsive square design for clean visual integration
  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-14 w-14',
    lg: 'h-24 w-24',
    xl: 'h-36 w-36',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,191,255,0.45)]"
      >
        <defs>
          {/* Cyan to Royal Blue primary gradient */}
          <linearGradient id="stride-logo-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffd1" />
            <stop offset="30%" stopColor="#00bfff" />
            <stop offset="100%" stopColor="#0055ff" />
          </linearGradient>
          {/* Deep energetic blue gradient for the interlocking base */}
          <linearGradient id="stride-logo-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bfff" />
            <stop offset="60%" stopColor="#0055ff" />
            <stop offset="100%" stopColor="#0022aa" />
          </linearGradient>
        </defs>

        {/* --- LEFT SPEED / TELEMETRY LINES (MATCHING THE UPLOADED DESIGN) --- */}
        {/* Left top thin indicator line */}
        <line x1="120" y1="285" x2="260" y2="285" stroke="#00bfff" strokeWidth="4.5" strokeLinecap="round" />
        {/* Left middle stacked telemetry lines */}
        <line x1="150" y1="300" x2="230" y2="300" stroke="#00bfff" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="165" y1="315" x2="228" y2="315" stroke="#00bfff" strokeWidth="4.5" strokeLinecap="round" />
        {/* Left bottom dynamic long line */}
        <line x1="130" y1="330" x2="335" y2="330" stroke="#0055ff" strokeWidth="7" strokeLinecap="round" />
        {/* Floating leftmost calibration dot */}
        <circle cx="70" cy="315" r="8" fill="#00bfff" className="animate-pulse" />


        {/* --- RIGHT TELEMETRY DASHES & DOTS (MATCHING THE UPLOADED DESIGN) --- */}
        {/* Right top thick dashes line */}
        <line x1="410" y1="270" x2="520" y2="270" stroke="#00bfff" strokeWidth="6" strokeDasharray="16 10" strokeLinecap="round" />
        {/* Right middle connecting fine circuit line */}
        <line x1="395" y1="285" x2="522" y2="285" stroke="#0055ff" strokeWidth="3" strokeLinecap="round" />
        <line x1="420" y1="300" x2="500" y2="300" stroke="#0055ff" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" />
        {/* Rightmost single floating target dot */}
        <circle cx="545" cy="285" r="8" fill="#00ffd1" className="animate-pulse" />


        {/* --- TOP RIBBON SEGMENT OF "S" (HIGH PERFORMANCE POLYGON WITH PARALLEL CURVED GLIDE) --- */}
        <path
          d="M 250 175 
             L 475 175 
             L 425 225 
             L 320 225 
             L 270 275 
             L 380 275 
             L 330 325 
             L 200 325 
             L 150 275 
             Z"
          fill="url(#stride-logo-grad-1)"
          stroke="rgba(0,255,209,0.15)"
          strokeWidth="1.5"
        />

        {/* --- BOTTOM INTERLOCKING RIBBON SEGMENT OF "S" (DARK LUXURY BLUE EMBLEM BASE) --- */}
        <path
          d="M 375 425 
             L 150 425 
             L 200 375 
             L 305 375 
             L 355 325 
             L 245 325 
             L 295 275 
             L 425 275 
             L 475 325 
             Z"
          fill="url(#stride-logo-grad-2)"
          stroke="rgba(0,191,255,0.15)"
          strokeWidth="1.5"
        />

      </svg>
    </div>
  );
}

