import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IntroSectionProps {
  onNext: () => void;
  onStartBgMusic?: () => void;
}

export default function IntroSection({ onNext, onStartBgMusic }: IntroSectionProps) {
  // Live countdown timer calculation
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const target = new Date();
    target.setHours(23, 59, 59, 999);
    const diff = Math.max(0, target.getTime() - now.getTime());
    return {
      days: 0,
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  // State for 3-2-1 countdown before video
  const [countdownStep, setCountdownStep] = useState<number | null>(null);

  // Fullscreen video state
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Live countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStartSurprise = () => {
    // Start playing background song from the beginning right as countdown begins
    onStartBgMusic?.();
    // Start countdown at 3
    setCountdownStep(3);
  };

  // 3 -> 2 -> 1 countdown logic, then immediately launches video while song continues
  useEffect(() => {
    if (countdownStep === null) return;

    if (countdownStep > 1) {
      const timeout = setTimeout(() => {
        setCountdownStep(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (countdownStep === 1) {
      // Once 1 finishes, IMMEDIATELY show and play the video while song continues
      const timeout = setTimeout(() => {
        setCountdownStep(null);
        setShowVideo(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [countdownStep]);

  // Video autoplay listener (video is muted so background song plays uninterrupted)
  useEffect(() => {
    if (!showVideo) return;

    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.muted = true;
      vid.play().catch(e => console.error("Video play failed:", e));
    }
  }, [showVideo]);

  // When video ends, transition to next section
  const handleFinishVideo = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ffd166', '#a18cd1', '#ff9a9e', '#fecfef'],
    });
    setShowVideo(false);
    onNext();
  };

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center z-10 select-none overflow-hidden"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Dreamy soft pastel background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fed7e2] via-[#fee2e2] to-[#fce7f3] pointer-events-none" />

      {/* Floating background glowing sparkles & soft orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/45 mix-blend-overlay"
            style={{
              width: Math.random() * 20 + 8,
              height: Math.random() * 20 + 8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -110, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Glassmorphic Welcome & Countdown Card */}
      <motion.div 
        className="glass-panel p-8 md:p-14 rounded-3xl max-w-2xl w-full mx-auto relative overflow-hidden shadow-2xl border border-white/70 bg-white/40 backdrop-blur-xl"
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div 
          className="absolute -top-10 -right-10 text-pink-300 opacity-40 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={130} />
        </motion.div>

        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-700 text-xs md:text-sm font-medium mb-6 backdrop-blur-sm">
          <Clock size={16} className="text-pink-600 animate-spin-slow" />
          <span>The Magical Birthday Countdown ✨</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-gray-800 leading-tight">
          Someone <span className="text-gradient font-extrabold">Very Special</span> <br/>
          Was Born Today... <Heart className="inline text-pink-500 fill-pink-500 animate-pulse ml-1" size={32} />
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-sans text-gray-600 mb-8 font-light max-w-lg mx-auto">
          Every second brings us closer to celebrating the most wonderful sister in the world.
        </p>

        {/* Live Timer Countdown Grid (Days, Hours, Minutes, Seconds) */}
        <div className="grid grid-cols-4 gap-2.5 md:gap-4 max-w-md mx-auto mb-8">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-white/55 backdrop-blur-md rounded-2xl p-2.5 md:p-3.5 border border-white/70 shadow-[0_8px_20px_rgba(255,182,193,0.32)] flex flex-col items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl md:text-3xl font-display font-bold text-purple-900 tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs font-sans tracking-widest text-pink-600 font-semibold mt-1">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          onClick={handleStartSurprise}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 text-white font-sans font-semibold py-3.5 md:py-4 px-8 md:px-10 rounded-full shadow-[0_0_35px_rgba(236,72,153,0.55)] hover:shadow-[0_0_55px_rgba(236,72,153,0.75)] transition-all duration-300 text-base md:text-lg flex items-center justify-center gap-3 mx-auto cursor-pointer"
        >
          <Sparkles size={22} className="animate-pulse" />
          <span>Open Your Birthday Surprise ✨</span>
        </motion.button>
      </motion.div>

      {/* 3 -> 2 -> 1 Countdown Overlay */}
      <AnimatePresence>
        {countdownStep !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/65 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={countdownStep}
              initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.8, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-6"
            >
              <div className="relative">
                {/* Glowing background ring */}
                <motion.div 
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 opacity-80 blur-xl absolute -inset-2"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-[0_0_50px_rgba(255,105,180,0.8)]">
                  <span className="text-7xl md:text-9xl font-display font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                    {countdownStep}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* PURE FULL-SCREEN VIDEO + SKIP BUTTON                 */}
      {/* ==================================================== */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}vedio.mp4`}
              playsInline
              autoPlay
              muted
              onEnded={handleFinishVideo}
              className="w-full h-full object-contain md:object-cover"
            />

            {/* Skip button — top right corner */}
            <motion.button
              onClick={handleFinishVideo}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute top-5 right-6 z-50 flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer"
            >
              Skip
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
