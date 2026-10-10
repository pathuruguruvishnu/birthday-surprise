import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Floating background emojis stream
const FLOATING_BG_ITEMS = [
  { id: 1, emoji: '💖', left: '6%', size: 28, duration: 11, delay: 0 },
  { id: 2, emoji: '🌸', left: '18%', size: 24, duration: 14, delay: 2 },
  { id: 3, emoji: '✨', left: '28%', size: 20, duration: 9, delay: 1 },
  { id: 4, emoji: '🦋', left: '42%', size: 26, duration: 13, delay: 3 },
  { id: 5, emoji: '💕', left: '55%', size: 22, duration: 10, delay: 0.5 },
  { id: 6, emoji: '🌷', left: '68%', size: 25, duration: 12, delay: 2.5 },
  { id: 7, emoji: '💫', left: '80%', size: 20, duration: 15, delay: 1.5 },
  { id: 8, emoji: '🎈', left: '92%', size: 26, duration: 12, delay: 4 },
  { id: 9, emoji: '⭐', left: '12%', size: 18, duration: 10, delay: 5 },
  { id: 10, emoji: '🎀', left: '34%', size: 22, duration: 13, delay: 4.5 },
  { id: 11, emoji: '🎉', left: '62%', size: 24, duration: 11, delay: 3.5 },
  { id: 12, emoji: '🌼', left: '74%', size: 22, duration: 14, delay: 6 },
  { id: 13, emoji: '✨', left: '86%', size: 18, duration: 9, delay: 2 },
  { id: 14, emoji: '💖', left: '48%', size: 26, duration: 12, delay: 6.5 },
  { id: 15, emoji: '🌸', left: '24%', size: 22, duration: 15, delay: 7 },
];

interface SurpriseSectionProps {
  onNext?: () => void;
  onReset?: () => void;
}

export default function SurpriseSection({ onNext, onReset }: SurpriseSectionProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);

    // Initial massive confetti burst
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#ffd700', '#ff85a1', '#ffd166', '#a18cd1', '#ff4d8d', '#ffffff'],
    });

    // Multi-stage confetti cannons
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors: ['#ff9a9e', '#fecfef', '#a18cd1', '#ffd700', '#f472b6', '#38bdf8'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
        colors: ['#ff9a9e', '#fecfef', '#a18cd1', '#ffd700', '#f472b6', '#38bdf8'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleAction = () => {
    if (onReset) {
      onReset();
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 z-10 bg-gradient-to-br from-[#120224] via-[#2a0845] to-[#0f0c29] text-white overflow-y-auto select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ==================================================== */}
      {/* 3D AMBIENT MORPHING GLOW ORBS IN BACKGROUND          */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 md:w-[480px] h-96 md:h-[480px] rounded-full bg-pink-500/25 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -35, 0],
            scale: [1, 1.25, 0.95, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 -right-20 w-96 md:w-[480px] h-96 md:h-[480px] rounded-full bg-purple-500/30 blur-[110px]"
        />
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.2, 1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 left-1/3 w-96 md:w-[480px] h-96 md:h-[480px] rounded-full bg-rose-500/25 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-400/20 blur-[120px]"
        />
      </div>

      {/* ==================================================== */}
      {/* STREAM OF FLOATING EMOJIS (LOVE THEME)               */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {FLOATING_BG_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: '105vh', opacity: 0, x: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.85, 0.85, 0],
              x: [0, 18, -18, 12, 0],
              rotate: [0, 20, -20, 15, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: item.left,
              fontSize: item.size,
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="gift"
            className="flex flex-col items-center cursor-pointer group relative z-10 my-auto py-10"
            onClick={handleOpen}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0, filter: 'blur(8px)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glowing spotlight halo behind gift */}
            <motion.div
              className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-pink-500/40 to-amber-400/40 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.95, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              animate={{
                rotate: [0, -6, 6, -6, 0],
                y: [0, -12, 0],
              }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="relative"
            >
              <Gift size={180} className="text-pink-300 drop-shadow-[0_20px_50px_rgba(244,114,182,0.8)] filter" />
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-3 -right-3 text-5xl block"
              >
                🎀
              </motion.span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-3">
              <span>Tap to Open Your Surprise</span>
              <span>🎁</span>
            </h2>

            <div className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg text-sm md:text-base font-bold text-pink-200">
              <Sparkles size={18} className="text-amber-300 animate-spin" />
              <span>A grand final celebration awaits you! ✨</span>
            </div>
          </motion.div>
        ) : (
          /* ==================================================== */
          /* 3D FINAL BIRTHDAY WISHES BY HER CHELLI SRAVANI       */
          /* ==================================================== */
          <motion.div
            key="wishes"
            className="max-w-4xl w-full text-center relative z-20 my-auto py-8 px-4 flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          >
            {/* Animated 3D Floating Crown & Embellishments */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex items-center justify-center gap-3 text-5xl sm:text-6xl md:text-7xl mb-3 select-none filter drop-shadow-[0_10px_25px_rgba(255,215,0,0.6)]"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, 0], y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                👑
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                💖
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.span>
            </motion.div>

            {/* Glowing celebratory badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-amber-400/20 to-purple-500/20 border border-amber-300/40 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-3 shadow-[0_0_20px_rgba(253,224,71,0.3)]"
            >
              <Sparkles size={14} className="animate-spin" />
              <span>THE GRAND FINAL BIRTHDAY WISHES</span>
              <Sparkles size={14} className="animate-spin" />
            </motion.div>

            {/* 3D MASSIVE CELEBRATION HEADING */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-wider leading-tight text-center my-3"
              style={{
                background: 'linear-gradient(135deg, #fff7b2 0%, #ffd700 25%, #ff6b8b 50%, #f43f5e 75%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 35px rgba(244,63,94,0.6), 0 0 70px rgba(253,224,71,0.5)',
                filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.9)) drop-shadow(0 10px 30px rgba(244,63,94,0.75))',
              }}
            >
              HAPPY BIRTHDAY, AKKA!
            </h1>

            {/* ==================================================== */}
            {/* 3D SIGNATURE CARD: BY HER CHELLI SRAVANI              */}
            {/* ==================================================== */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              className="mt-6 md:mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-pink-500/25 via-purple-600/30 to-rose-500/25 border-2 border-pink-300/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(244,63,94,0.45),inset_0_0_30px_rgba(255,255,255,0.2)] max-w-xl w-full mx-auto"
            >
              <p className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-pink-300 mb-2">
                ✨ WITH ALL MY LOVE & A LIFETIME OF BLESSINGS ✨
              </p>
              
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-handwriting font-bold tracking-wide text-white leading-snug"
                style={{
                  textShadow: '0 4px 15px rgba(0,0,0,0.85), 0 0 30px rgba(244,63,94,0.9)',
                }}
              >
                By Her Loving Chelli,{' '}
                <span className="text-amber-300 underline decoration-pink-400 decoration-wavy underline-offset-8">
                  Sravani
                </span>{' '}
                💖🧿
              </h2>

              <p className="text-sm sm:text-base text-pink-200/90 font-serif italic mt-3.5">
                "Forever your little sister, partner in crime & biggest cheerleader in life!"
              </p>
            </motion.div>

            {/* Replay Magical Journey Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 45px rgba(244,63,94,0.85)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAction}
                className="cursor-pointer bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl text-base md:text-lg flex items-center gap-3 border border-pink-300/50 tracking-wider"
              >
                <RotateCcw size={22} className="animate-spin-slow" />
                <span>Replay Our Magical Journey ↺</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
