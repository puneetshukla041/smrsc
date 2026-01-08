import React, { useState, useEffect } from "react";

/**
 * Section1: Hero component for SMRSC 2026.
 * Features:
 * - Background video implementation (Gradient.webm).
 * - Precisely positioned elements with minimized vertical gaps.
 * - Dynamic countdown timer to April 8th.
 * - Glassmorphism Registration Button.
 * - Blauer Nue & Manrope Typography.
 */
export default function Section1() {
  const [hasMounted, setHasMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setHasMounted(true);
    const targetDate = new Date("2026-04-08T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) return <section className="bg-[#02091A] w-full h-screen" />;

  return (
    <section className="relative bg-[#02091A] w-full h-screen overflow-hidden font-['Manrope']">
      
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/Gradient.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 z-1" />

      {/* Content Container (z-index 10 to stay above video) */}
      <div className="relative z-10 w-full h-full">
        {/* Conference Title Line */}
        <p 
          style={{ 
            position: 'absolute',
            top: '450px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '150%',
            letterSpacing: '-0.176px',
            color: '#FFFFFF',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.40)',
            textAlign: 'center',
            textTransform: 'capitalize',
            whiteSpace: 'nowrap'
          }}
        >
          Third global SS Innovations multi specialty robotic surgery conference
        </p>

        {/* Register Now Button */}
        <button
          style={{
            position: 'absolute',
            top: '490px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            borderRadius: '40px',
            border: '1px solid #FFF',
            background: `linear-gradient(0deg, #CE921B 0%, #CE921B 100%), 
                         radial-gradient(231% 135.8% at 0.9% 2.98%, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.20) 100%)`,
            backdropFilter: "blur(21px)",
            WebkitBackdropFilter: "blur(21px)",
            fontWeight: 500,
            fontStyle: "normal",
            fontFamily: "'Manrope', sans-serif",
            letterSpacing: "0.02em",
            color: '#FFFFFF'
          }}
          className="
            w-fit h-fit 
            text-[16px] 
            leading-[20px] 
            antialiased
            transition-transform active:scale-95 hover:brightness-110
          "
        >
          Register Now
        </button>

        {/* Countdown Section */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '580px', 
            left: '50%', 
            transform: 'translateX(-50%)' 
          }}
          className="flex gap-3 md:gap-6"
        >
          <TimeUnit value={timeLeft.days} label="Days" progress={timeLeft.days / 365} />
          <TimeUnit value={timeLeft.hours} label="Hours" progress={timeLeft.hours / 24} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" progress={timeLeft.minutes / 60} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" progress={timeLeft.seconds / 60} />
        </div>

        {/* Footer Line */}
        <p 
          style={{ 
            position: 'absolute',
            top: '720px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
            height: '24px',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '150%',
            letterSpacing: '-0.176px',
            color: '#FFFFFF',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.40)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          An event by <span style={{ marginLeft: '6px' }}>SSInnovations</span>
        </p>
      </div>

      {/* Ambient glow (kept to blend with the video) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CE921B]/5 rounded-full blur-[120px] pointer-events-none z-2" />
    </section>
  );
}

/**
 * TimeUnit component
 */
function TimeUnit({ value, label, progress }: { value: number; label: string; progress: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * circumference);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28">
        <svg className="absolute w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r={radius} className="stroke-white/5 fill-none" strokeWidth="1" />
          <circle
            cx="50%" cy="50%" r={radius}
            className="stroke-[#CE921B] fill-none transition-all duration-1000 ease-linear"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={isNaN(offset) ? 0 : offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center flex flex-col items-center">
          <span 
            className="block text-white tabular-nums"
            style={{ 
              fontFamily: "'Blauer Nue', sans-serif",
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '150%',
              letterSpacing: '-1.1%',
              width: '48px', 
              height: '36px',
              textAlign: 'center'
            }}
          >
            {value.toString().padStart(2, '0')}
          </span>
          <span 
            className="block text-white/40 capitalize"
            style={{ 
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '150%',
              letterSpacing: '-1.1%',
              textAlign: 'center',
              width: '86px',
              height: '18px'
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}