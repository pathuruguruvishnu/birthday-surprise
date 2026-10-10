import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Typewriter hook — types text char by char after a delay
function useTypewriter(text: string, speed = 50, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    const start = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current++;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// 1. Initial State Wish (Before Blowing Candle)
function InitialWish({
  handleBlowCandles,
}: {
  handleBlowCandles: () => void;
}) {
  const label = 'Finally, I want to say...';
  const heading = 'Happy Birthday, Akka! ✨';

  const { displayed: labelText, done: labelDone } = useTypewriter(label, 50, 400);

  const [startHeading, setStartHeading] = useState(false);
  useEffect(() => {
    if (labelDone) {
      const t = setTimeout(() => setStartHeading(true), 300);
      return () => clearTimeout(t);
    }
  }, [labelDone]);

  const { displayed: h2Text, done: h2Done } = useTypewriter(
    startHeading ? heading : '',
    65,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center max-w-5xl w-full"
    >
      {/* Small label — typewriter */}
      <p className="text-white/85 text-xs md:text-sm tracking-[0.35em] uppercase mb-2 md:mb-3 font-light text-center min-h-[1.5em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
        {labelText}
        {!labelDone && <span className="animate-pulse">|</span>}
      </p>

      {/* Main gold heading — typewriter */}
      <h1
        className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-5 md:mb-6 text-center min-h-[1.2em] max-w-5xl"
        style={{
          background: 'linear-gradient(135deg, #fff3b0 0%, #f5d060 25%, #d4a017 50%, #f9e07a 75%, #c8860a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.9)) drop-shadow(0 2px 8px rgba(212,160,23,0.5))',
        }}
      >
        {h2Text}
        {startHeading && !h2Done && <span style={{ WebkitTextFillColor: '#f5d060', opacity: 0.9 }} className="animate-pulse">|</span>}
      </h1>

      {/* Button — appears after heading finishes */}
      <AnimatePresence>
        {h2Done && (
          <motion.button
            key="blow"
            onClick={handleBlowCandles}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,160,23,0.25)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="cursor-pointer px-10 py-3.5 border-2 border-[#d4a017] text-[#f5d060] text-xs md:text-sm uppercase font-semibold bg-black/40 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            style={{ letterSpacing: '0.3em' }}
          >
            Blow the Candles
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 2. Post-Blow Celebration Wish (Enlarged Typewriter & 3s Celebration)
function CelebrationWish({
  showNext,
  onNext,
}: {
  showNext: boolean;
  onNext: () => void;
}) {
  const wishText = 'HAPPY BIRTHDAY, AKKA!';
  const { displayed, done } = useTypewriter(wishText, 55, 200);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center max-w-5xl w-full"
    >
      {/* Celebratory badge */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-[#ffd700] text-xs md:text-sm tracking-[0.35em] uppercase mb-2 font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
      >
        ✨ CELEBRATING YOU TODAY & ALWAYS ✨
      </motion.p>

      {/* Birthday Wish — Typewriter (decreased by 4 points to keep faces clear) */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-wider leading-tight text-center min-h-[1.2em] mb-5 md:mb-6"
        style={{
          background: 'linear-gradient(135deg, #fff7b2 0%, #ffd700 25%, #f59e0b 50%, #fde68a 75%, #d97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 4px 22px rgba(0,0,0,0.95)) drop-shadow(0 0 30px rgba(245,158,11,0.6))',
        }}
      >
        {displayed}
        {!done && <span style={{ WebkitTextFillColor: '#ffd700', opacity: 0.9 }} className="animate-pulse">|</span>}
      </h1>

      {/* Walk Down Memory Lane Button — appears smoothly after 3s celebration */}
      <AnimatePresence>
        {showNext && (
          <motion.button
            key="next"
            initial={{ opacity: 0, y: 20, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,160,23,0.35)', boxShadow: '0 0 35px rgba(245,158,11,0.7)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.5 }}
            onClick={onNext}
            className="cursor-pointer px-10 py-4 border-2 border-[#d4a017] text-[#f5d060] text-xs md:text-sm uppercase font-bold bg-black/60 backdrop-blur-md transition-all duration-300 shadow-[0_0_25px_rgba(212,160,23,0.5)] flex items-center gap-3 tracking-[0.25em]"
          >
            <span>Walk Down Memory Lane</span>
            <span className="text-lg">🌸 →</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CelebrationSection({ onNext }: { onNext: () => void }) {
  const [candlesOut, setCandlesOut] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const handleBlowCandles = () => {
    setCandlesOut(true);

    // 1. Initial massive center explosion
    confetti({
      particleCount: 250,
      spread: 140,
      origin: { y: 0.55, x: 0.5 },
      colors: ['#ffd700', '#ff85a1', '#ffd166', '#a18cd1', '#ff4d8d', '#38bdf8', '#ffffff'],
    });

    // 2. Continuous multi-angle confetti cannons for the full 3 seconds
    const end = Date.now() + 3000;
    const interval = window.setInterval(() => {
      if (Date.now() > end) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      // Left cannon blast
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.7 },
        colors: ['#ffd700', '#ff85a1', '#f472b6', '#ffffff', '#38bdf8'],
      });
      // Right cannon blast
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.7 },
        colors: ['#ffd700', '#ffd166', '#a18cd1', '#ffffff', '#fb7185'],
      });
      // Center sky pop
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x: 0.5, y: 0.35 },
        colors: ['#ffd700', '#ffffff', '#ec4899', '#38bdf8'],
      });
    }, 220);
    intervalRef.current = interval;
  };

  // Exactly 3 seconds celebration timer before the walk through line button appears
  useEffect(() => {
    if (candlesOut) {
      const timer = setTimeout(() => setShowNext(true), 3000);
      return () => {
        clearTimeout(timer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [candlesOut]);

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* FULL-SCREEN PHOTO — high quality crystal clear */}
      <img
        src={`${import.meta.env.BASE_URL}pic.png`}
        alt="Birthday Akka"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
        decoding="sync"
      />

      {/* Gradient overlay: almost clear over faces at the top, soft dark contrast behind lower text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/70" />

      {/* Upward floating sparkles and confetti icons during celebration */}
      <AnimatePresence>
        {candlesOut && Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl pointer-events-none"
            style={{ left: `${Math.random() * 90 + 5}%`, top: '65%' }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: -360 }}
            transition={{ duration: Math.random() * 1.8 + 1.2, delay: Math.random() * 1.5 }}
          >
            {['✨', '🌟', '💫', '🎊', '🎉', '💖', '🎂'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content Container — positioned lower below faces */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-4 md:px-8 text-center z-20">
        <AnimatePresence mode="wait">
          {!candlesOut ? (
            <InitialWish key="initial" handleBlowCandles={handleBlowCandles} />
          ) : (
            <CelebrationWish key="celebration" showNext={showNext} onNext={onNext} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
