import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, Variants } from "framer-motion";

/**
 * Section1: Professional Hero Component for SMRSC 2026.
 * Features a high-end cinematic reveal for the "Coming Soon" text after a short delay.
 * Updated: Video configuration updated to match user snippet (opacity-70, mix-blend-screen, /videos/Color.mp4).
 * Maintained: Refined Register Button styling and enlarged timer circles.
 */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 100);
    mouseY.set((clientY - innerHeight / 2) / 100);
  };

  useEffect(() => {
    const target = new Date("2026-04-08T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay check:", error);
      });
    }
  }, []);

  const uiContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6,
      },
    },
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(15px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.6,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const comingSoonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(10px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 2, 
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-black selection:bg-white/20 px-6"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-white/5 blur-[150px]" />
      </div>

      <motion.div 
        variants={uiContainerVariants}
        className="relative z-10 w-full h-full flex flex-col items-center"
      >
        {/* Video Hero Area - Updated to match snippet behavior */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[850px] flex justify-center items-center z-10">
          <motion.div 
            variants={fadeInUpVariants}
            style={{ x: smoothX, y: smoothY }}
            className="w-full flex justify-center relative"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-contain opacity-70 pointer-events-none mix-blend-screen z-10"
              style={{ filter: "contrast(1.2) brightness(1.2)" }}
            >
              <source src="/videos/Color.mp4" type="video/mp4" />
              {/* Fallback glow */}
              <div className="w-full aspect-video bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
            </video>
            {/* Ambient glow behind video */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-full aspect-video bg-white/10 rounded-full blur-[100px] opacity-40" />
            </div>
          </motion.div>
        </div>

        {/* Header Text */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 z-20 w-full pointer-events-none">
          <motion.div variants={comingSoonVariants} className="flex items-center justify-center gap-4 md:gap-8">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.2, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-8 md:w-24 bg-white/40 origin-right" 
            />
            <h1 
              style={{
                color: "#FFF",
                textAlign: "center",
                textShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: "clamp(32px, 8vw, 48px)",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "150%",
                letterSpacing: "-0.528px",
                textTransform: "uppercase",
              }}
              className="whitespace-nowrap"
            >
              Coming Soon!
            </h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.2, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] w-8 md:w-24 bg-white/20 origin-left" 
            />
          </motion.div>
        </div>

        {/* Footer Content */}
        <div className="mt-auto pb-12 md:pb-16 flex flex-col items-center text-center w-full max-w-5xl z-30 px-4">
          <motion.div 
            variants={fadeInUpVariants}
            className="w-full bg-white/[0.04] backdrop-blur-[40px] border border-white/20 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center"
          >
            <motion.p
              className="mb-8 px-4"
              style={{
                color: "#E5E5E5",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.40)",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "160%",
                letterSpacing: "0.1em",
              }}
            >
              Third global SS Innovations multi specialty robotic surgery conference
            </motion.p>

            <div className="mb-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: "#CE921B" }}
                className="relative cursor-pointer outline-none border border-white/60 rounded-full px-12 py-3 transition-all duration-300"
              >
                <span 
                  className="relative z-10 flex items-center justify-center"
                  style={{
                    color: "#FFF",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "20px"
                  }}
                >
                  Register Now
                </span>
              </motion.button>
            </div>

            {/* Timer Grid */}
            <div className="flex justify-center gap-2 md:gap-6 mb-10">
              <TimeUnit value={timeLeft.days} label="Days" progress={timeLeft.days / 365} />
              <TimeUnit value={timeLeft.hours} label="Hours" progress={timeLeft.hours / 24} />
              <TimeUnit value={timeLeft.minutes} label="Minutes" progress={timeLeft.minutes / 60} />
              <TimeUnit value={timeLeft.seconds} label="Seconds" progress={timeLeft.seconds / 60} />
            </div>

            <div className="flex items-center justify-center w-full opacity-40 hover:opacity-100 transition-opacity">
              <p className="text-[10px] tracking-[0.4em] text-white font-sans font-medium uppercase">
                An event by SSInnovations
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
  progress: number;
}

function TimeUnit({ value, label, progress }: TimeUnitProps) {
  const radius = 44; 
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  const offset = circumference - (safeProgress * circumference);

  return (
    <motion.div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center justify-center w-24 h-24 md:w-36 md:h-36">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full -rotate-90 overflow-visible">
            <circle 
              cx="50%" 
              cy="50%" 
              r={radius} 
              className="stroke-white/10 fill-none" 
              strokeWidth="1" 
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-[#CE921B] fill-none"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ 
                strokeDashoffset: isNaN(offset) ? circumference : offset,
              }}
              transition={{ 
                duration: 1, 
                ease: "linear", 
              }}
            />
          </svg>
        </div>

        <div className="relative flex flex-col items-center justify-center z-10">
          <div className="relative h-8 md:h-10 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  color: "#FFF",
                  textAlign: "center",
                  textShadow: "0 4px 4px rgba(0, 0, 0, 0.40)",
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "1",
                  letterSpacing: "-0.352px",
                  textTransform: "capitalize",
                }}
                className="tabular-nums block"
              >
                {value.toString().padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <span 
            className="mt-1"
            style={{ 
              color: "#FFF",
              textAlign: "center",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.40)",
              fontFamily: "Manrope, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
              letterSpacing: "-0.132px",
              textTransform: "capitalize",
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}