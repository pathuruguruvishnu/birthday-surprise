import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart, Star, Coffee, Camera, Crown, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

// Floating background emojis stream
const FLOATING_BG_ITEMS = [
  { id: 1, emoji: '💖', left: '6%', size: 28, duration: 11, delay: 0 },
  { id: 2, emoji: '🌸', left: '18%', size: 24, duration: 14, delay: 2 },
  { id: 3, emoji: '✨', left: '28%', size: 20, duration: 9, delay: 1 },
  { id: 4, emoji: '🦋', left: '40%', size: 26, duration: 13, delay: 3 },
  { id: 5, emoji: '💕', left: '54%', size: 22, duration: 10, delay: 0.5 },
  { id: 6, emoji: '🌷', left: '66%', size: 25, duration: 12, delay: 2.5 },
  { id: 7, emoji: '💫', left: '78%', size: 20, duration: 15, delay: 1.5 },
  { id: 8, emoji: '🎈', left: '90%', size: 26, duration: 12, delay: 4 },
  { id: 9, emoji: '⭐', left: '12%', size: 18, duration: 10, delay: 5 },
  { id: 10, emoji: '🎀', left: '33%', size: 22, duration: 13, delay: 4.5 },
  { id: 11, emoji: '🎉', left: '60%', size: 24, duration: 11, delay: 3.5 },
  { id: 12, emoji: '🌼', left: '72%', size: 22, duration: 14, delay: 6 },
  { id: 13, emoji: '✨', left: '85%', size: 18, duration: 9, delay: 2 },
  { id: 14, emoji: '💖', left: '47%', size: 26, duration: 12, delay: 6.5 },
  { id: 15, emoji: '🌸', left: '23%', size: 22, duration: 15, delay: 7 },
];

interface TreasureItem {
  id: number;
  icon: typeof Gift;
  emoji: string;
  title: string;
  hint: string;
  message: string;
  badge: string;
  color: string;
  bgGlow: string;
  top: string;
  left: string;
}

const TREASURES: TreasureItem[] = [
  {
    id: 1,
    icon: Gift,
    emoji: '🎁',
    title: 'The Secret Birthday Gift',
    hint: 'A special surprise for you...',
    message: 'You are the greatest gift life has given me. Every memory with you is wrapped in pure love, laughter, and lifelong gratitude.',
    badge: 'Special Surprise 🎀',
    color: 'text-pink-500',
    bgGlow: 'bg-pink-400/30',
    top: '18%',
    left: '18%',
  },
  {
    id: 2,
    icon: Star,
    emoji: '⭐',
    title: 'The Wishing Star',
    hint: 'A shining star in the sky...',
    message: 'You shine so bright and light up my world every single day. On your birthday, my biggest wish is for endless joy in your heart!',
    badge: "Akka's Shine ✨",
    color: 'text-amber-500',
    bgGlow: 'bg-amber-400/30',
    top: '25%',
    left: '78%',
  },
  {
    id: 3,
    icon: Coffee,
    emoji: '☕',
    title: 'Midnight Coffee Chat',
    hint: 'Our endless midnight talks...',
    message: "To our late-night coffee dates, endless deep chats, silly gossips, and shared secrets that only the two of us understand.",
    badge: 'Sister Memories 🌙',
    color: 'text-orange-600',
    bgGlow: 'bg-orange-400/30',
    top: '72%',
    left: '16%',
  },
  {
    id: 4,
    icon: Heart,
    emoji: '💖',
    title: 'The Heart of Sisterhood',
    hint: 'Pure unconditional love...',
    message: 'My heart always feels full whenever we are together. Through every high and low, our sisterly bond remains unbreakable forever.',
    badge: 'Infinite Love 💕',
    color: 'text-rose-500',
    bgGlow: 'bg-rose-400/30',
    top: '65%',
    left: '68%',
  },
  {
    id: 5,
    icon: Camera,
    emoji: '📸',
    title: 'Candid Smiles Reel',
    hint: 'Unforgettable moments...',
    message: 'Every selfie, every candid click, and every journey with you is etched as a golden chapter in my heart!',
    badge: 'Picture Perfect 📸',
    color: 'text-purple-500',
    bgGlow: 'bg-purple-400/30',
    top: '44%',
    left: '46%',
  },
  {
    id: 6,
    icon: Crown,
    emoji: '👑',
    title: 'The Sister Queen Crown',
    hint: 'For the queen herself...',
    message: 'To the queen of our family, my protector, my mentor, and the most incredible sister anyone could ever ask for!',
    badge: 'Birthday Queen 👑',
    color: 'text-yellow-500',
    bgGlow: 'bg-yellow-400/30',
    top: '74%',
    left: '42%',
  },
];

export default function AdventureSection({ onNext }: { onNext: () => void }) {
  const [discovered, setDiscovered] = useState<Set<number>>(new Set());
  const [activeItem, setActiveItem] = useState<TreasureItem | null>(null);

  const handleInteract = (item: TreasureItem) => {
    setActiveItem(item);
    setDiscovered((prev) => {
      const next = new Set(prev).add(item.id);
      if (next.size === TREASURES.length && prev.size < TREASURES.length) {
        confetti({
          particleCount: 180,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#ff85a1', '#ffd166', '#a18cd1', '#f472b6', '#ff4d8d', '#38bdf8'],
        });
      } else {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ff85a1', '#ffd166', '#f472b6'],
        });
      }
      return next;
    });
  };

  const allFound = discovered.size === TREASURES.length;

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-gradient-to-br from-[#fed7e2] via-[#f3e8ff] to-[#fce7f3] text-gray-800 overflow-y-auto overflow-x-hidden flex flex-col items-center select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ==================================================== */}
      {/* LIVE 3D AMBIENT MORPHING GRADIENT ORBS (LOVE THEME)  */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, -35, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.25, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-pink-400/35 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/4 -right-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-purple-400/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, -45, 0],
            y: [0, -35, 45, 0],
            scale: [1, 1.15, 1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-16 left-1/3 w-80 md:w-96 h-80 md:h-96 rounded-full bg-rose-300/35 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-200/25 blur-3xl"
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
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* ==================================================== */}
      {/* HEADER & PROGRESS DISCOVERY STATUS                   */}
      {/* ==================================================== */}
      <div className="text-center pt-8 md:pt-10 mb-4 relative z-20 px-4 max-w-2xl">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-extrabold text-purple-800 flex items-center justify-center gap-2 drop-shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            animate={{ rotate: [0, 180, 360], scale: [1, 1.25, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="text-pink-500 text-2xl md:text-3xl inline-block"
          >
            ✨
          </motion.span>
          <span>An Interactive Sister Adventure</span>
          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-2xl md:text-3xl inline-block"
          >
            🎀
          </motion.span>
        </motion.h2>

        {/* Discovery Tracker Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2 mt-3 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-sm font-medium text-gray-700"
        >
          <span className="flex items-center gap-1.5 font-bold text-pink-600">
            <Heart size={16} className="fill-pink-500 text-pink-500 animate-pulse" />
            {discovered.size} of {TREASURES.length} Secrets Found
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-purple-700">Click objects around the room! ✨</span>
        </motion.div>
      </div>

      {/* ==================================================== */}
      {/* THE INTERACTIVE 3D MAGICAL SISTER ROOM               */}
      {/* ==================================================== */}
      <div className="relative w-full h-[65vh] max-h-[560px] max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-white/50 via-white/40 to-pink-100/60 backdrop-blur-xl border-2 border-white/80 overflow-hidden shadow-[0_20px_60px_rgba(236,72,153,0.25)] z-10 my-auto">
        {/* Shimmer light sweep on room canvas */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-25"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 60%)',
          }}
        />

        {/* Floating stardust inside the room */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-pink-400/40 blur-[1px]"
              style={{
                width: (i % 3) * 4 + 4,
                height: (i % 3) * 4 + 4,
                left: `${(i * 19) % 90 + 5}%`,
                top: `${(i * 29) % 85 + 5}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + (i % 3) * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* 6 Interactive Discoverable Objects */}
        {TREASURES.map((item) => {
          const Icon = item.icon;
          const isFound = discovered.has(item.id);

          return (
            <motion.button
              key={item.id}
              className={`absolute p-4 md:p-5 rounded-3xl cursor-pointer group transition-all duration-300 backdrop-blur-xl border-2 ${
                isFound
                  ? 'bg-white/85 border-pink-400 shadow-[0_10px_30px_rgba(236,72,153,0.4)] scale-110'
                  : 'bg-white/55 hover:bg-white/80 border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(244,114,182,0.3)] hover:scale-120'
              }`}
              style={{ top: item.top, left: item.left }}
              onClick={() => handleInteract(item)}
              whileHover={{ rotate: [-6, 6, -6], scale: 1.22 }}
              whileTap={{ scale: 0.95 }}
              animate={
                isFound
                  ? { y: [0, -8, 0] }
                  : { y: [0, -5, 0], scale: [1, 1.05, 1] }
              }
              transition={{
                repeat: Infinity,
                duration: 2.2 + (item.id % 3) * 0.4,
                ease: 'easeInOut',
              }}
            >
              {/* Soft glowing ambient light aura */}
              <motion.div
                className={`absolute inset-0 rounded-3xl ${item.bgGlow} blur-lg pointer-events-none`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Found Heart Badge */}
              {isFound && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md z-20"
                >
                  <Heart size={12} className="fill-white" />
                </motion.div>
              )}

              {/* Interactive Icon with Live Physics */}
              <div className="relative z-10 flex flex-col items-center">
                <Icon size={38} className={`${item.color} filter drop-shadow-sm`} />
                <span className="text-[11px] font-sans font-bold text-gray-700 tracking-wide mt-1 block">
                  {item.emoji}
                </span>
              </div>

              {/* Hover Tooltip */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/90 backdrop-blur-md text-white text-xs font-sans font-semibold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
                {isFound ? `Reopen ${item.title}` : item.hint}
              </span>
            </motion.button>
          );
        })}

        {/* MODAL: DISCOVERED TREASURE 3D CARD VIEW */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setActiveItem(null)}
            >
              {/* 3D Ambient Light Glow behind Modal */}
              <div className="absolute w-80 h-80 rounded-full bg-pink-400/40 blur-3xl pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_30px_rgba(244,114,182,0.4)] text-center border-2 border-white/90 max-w-md w-full relative z-10 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Animated Treasure Icon with 3D Aura */}
                <div className="relative inline-flex items-center justify-center mb-3">
                  <motion.div
                    className="absolute w-20 h-20 rounded-full bg-pink-300/40 blur-lg pointer-events-none"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-6xl select-none relative z-10 filter drop-shadow-md"
                  >
                    {activeItem.emoji}
                  </motion.div>
                </div>

                {/* Badge */}
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-sans font-bold tracking-wider uppercase">
                    <Sparkles size={12} className="text-pink-500" />
                    {activeItem.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  {activeItem.title}
                </h3>

                {/* Heartfelt Letter Text */}
                <p className="text-gray-800 font-handwriting text-2xl md:text-3xl leading-relaxed my-2">
                  "{activeItem.message}"
                </p>

                {/* Keep & Continue Button */}
                <div className="mt-5 pt-3 border-t border-pink-100">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="cursor-pointer px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-sans font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Cherish This Memory 💖
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================================================== */}
      {/* FINAL UNLOCKED ACTION BUTTON                         */}
      {/* ==================================================== */}
      <AnimatePresence>
        {allFound && !activeItem && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-6 mb-8 z-20 relative"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(236,72,153,0.75)' }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(236,72,153,0.4)',
                  '0 0 35px rgba(236,72,153,0.8)',
                  '0 0 20px rgba(236,72,153,0.4)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              onClick={onNext}
              className="cursor-pointer bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold py-3.5 px-9 rounded-full shadow-2xl text-lg md:text-xl flex items-center gap-3 tracking-wide"
            >
              <span>I Have Something Special for You</span>
              <Heart size={22} className="fill-white animate-pulse" />
              <ArrowRight size={22} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
