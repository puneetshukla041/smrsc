import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, Variants } from "framer-motion";

/**
 * Section1: Professional Hero Component for SMRSC 2026.
 * Adjusted: Drastically reduced container widths and added negative spacing to bring circles closer.
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
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
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
        {/* Video Hero Area */}
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
              <div className="w-full aspect-video bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
            </video>
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
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "-0.528px",
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
              className="mb-6 px-4"
              style={{
                color: "#FFF",
                textShadow: "0 4px 4px rgba(0, 0, 0, 0.40)",
                fontFamily: "Manrope",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "150%",
                letterSpacing: "-0.176px",
                textTransform: "capitalize",
              }}
            >
              Third global SS Innovations multi specialty robotic surgery conference
            </motion.p>

            {/* Timer Grid - Reduced gap and added negative spacing */}
            <div className="flex justify-center -space-x-1 md:-space-x-4 mb-10">
              <TimeUnit value={timeLeft.days} label="Days" progress={timeLeft.days / 365} />
              <TimeUnit value={timeLeft.hours} label="Hours" progress={timeLeft.hours / 24} />
              <TimeUnit value={timeLeft.minutes} label="Minutes" progress={timeLeft.minutes / 60} />
              <TimeUnit value={timeLeft.seconds} label="Seconds" progress={timeLeft.seconds / 60} />
            </div>

            <div className="flex items-center justify-center w-full opacity-40 hover:opacity-100 transition-opacity">
              <p className="text-[10px] tracking-[0.4em] text-white font-sans font-medium ">
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
  const radius = 42; // Slightly smaller radius to prevent clipping
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  const offset = circumference - (safeProgress * circumference);

  return (
    <motion.div className="flex flex-col items-center">
      {/* Reduced width from w-24 to w-20 on mobile 
          Reduced width from w-36 to w-28 on desktop 
      */}
      <div className="relative flex flex-col items-center justify-center w-20 h-24 md:w-28 md:h-36">
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
              transition={{ duration: 1, ease: "linear" }}
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
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "clamp(20px, 4vw, 32px)", // Slightly smaller text for tighter fit
                  fontWeight: 500,
                  lineHeight: "1",
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
              opacity: 0.7,
              fontFamily: "Manrope, sans-serif",
              fontSize: "10px", // Slightly smaller label
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}