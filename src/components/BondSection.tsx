import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
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

const CARDS = [
  {
    id: 1,
    title: "My First Best Friend",
    desc: "Before I even knew what friendship was, I had you. You taught me how to play, how to share, and how to love.",
    icon: "👯‍♀️",
    floatAnim: {
      y: [0, -8, 0],
      rotate: [-5, 5, -5],
      transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  {
    id: 2,
    title: "My Partner in Every Crime",
    desc: "From stealing snacks from the kitchen to covering up each other's mistakes, we've always been a team.",
    icon: "🕵️‍♀️",
    floatAnim: {
      x: [-4, 4, -4],
      rotate: [-8, 8, -8],
      scale: [1, 1.06, 1],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  {
    id: 3,
    title: "My Secret Keeper",
    desc: "You know things about me that no one else does. With you, my secrets are always safe.",
    icon: "🤫",
    floatAnim: {
      scale: [1, 1.15, 1],
      y: [0, -5, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  {
    id: 4,
    title: "My Happiness in Every Situation",
    desc: "No matter how bad my day is, one conversation with you can make everything better.",
    icon: "🌈",
    floatAnim: {
      y: [0, -7, 0],
      rotate: [-6, 6, -6],
      scale: [1, 1.08, 1],
      transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  {
    id: 5,
    title: "My Forever Support System",
    desc: "You always stand by me, believe in me even when I doubt myself, and push me to be my best.",
    icon: "🛡️",
    floatAnim: {
      scale: [1, 1.12, 1],
      y: [0, -4, 0],
      rotate: [-4, 4, -4],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  {
    id: 6,
    title: "My Favorite Person, Always",
    desc: "Life is just better because you're in it. I couldn't have asked for a better sister.",
    icon: "💖",
    floatAnim: {
      scale: [1, 1.25, 1, 1.16, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
    }
  }
];

export default function BondSection({ onNext }: { onNext: () => void }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (id: number) => {
    setActiveCard(id === activeCard ? null : id);
    if (id !== activeCard) {
      setViewedCards(prev => {
        const next = new Set(prev).add(id);
        if (next.size === CARDS.length && prev.size < CARDS.length) {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff85a1', '#ffd166', '#a18cd1', '#f472b6', '#38bdf8'],
          });
        }
        return next;
      });
    }
  };

  const allViewed = viewedCards.size === CARDS.length;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 z-10 overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.8 }}
    >
      {/* ==================================================== */}
      {/* LIVE BACKGROUND: AMBIENT MORPHING GRADIENT ORBS      */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, -35, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-pink-400/25 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.25, 0.9, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/4 -right-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-purple-400/25 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, -45, 0],
            y: [0, -35, 45, 0],
            scale: [1, 1.15, 1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-16 left-1/3 w-80 md:w-96 h-80 md:h-96 rounded-full bg-rose-300/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[600px] h-[450px] md:h-[600px] rounded-full bg-amber-200/20 blur-3xl"
        />
      </div>

      {/* ==================================================== */}
      {/* LIVE BACKGROUND: CONTINUOUS STREAM OF FLOATING EMOJIS */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {FLOATING_BG_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: '105vh', opacity: 0, x: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0],
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
      {/* MAIN CONTENT AREA                                    */}
      {/* ==================================================== */}
      <div className="relative max-w-5xl w-full mx-auto mt-16 md:mt-0 pt-6 pb-20 flex flex-col items-center z-10">

        {/* Header with live motion title emoji */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-2"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-purple-700 flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: [0, 180, 360], scale: [1, 1.25, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="text-2xl md:text-3xl text-pink-500 inline-block"
            >
              ✨
            </motion.span>
            <span>Our Beautiful Bond</span>
            <motion.span
              animate={{
                scale: [1, 1.3, 1, 1.22, 1],
                rotate: [0, -12, 12, -6, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block cursor-default select-none text-3xl md:text-4xl"
            >
              💕
            </motion.span>
          </h2>
        </motion.div>

        {/* Live glowing subtitle pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm mb-9 text-gray-700 text-sm md:text-base font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <span>Click on each card to read why you mean the world to me</span>
          <Sparkles size={16} className="text-pink-500 animate-pulse" />
        </motion.div>

        {/* ==================================================== */}
        {/* INTERACTIVE CARDS WITH LIVE EMOJI & DESIGN MOTIONS   */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
          {CARDS.map((card, index) => {
            const isActive = activeCard === card.id;
            const isViewed = viewedCards.has(card.id);

            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => handleCardClick(card.id)}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
                className={`cursor-pointer relative overflow-hidden p-6 rounded-3xl transition-all duration-300 backdrop-blur-xl ${
                  isActive
                    ? 'bg-white/70 shadow-[0_20px_45px_rgba(236,72,153,0.3)] ring-3 ring-pink-400 z-20 scale-[1.02]'
                    : isViewed
                    ? 'bg-white/50 hover:bg-white/65 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgba(244,114,182,0.22)] border border-white/70'
                    : 'bg-white/35 hover:bg-white/55 shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(244,114,182,0.18)] border border-white/50'
                }`}
              >
                {/* Live Shimmer Glow Reflection */}
                <motion.div
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-20"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)',
                  }}
                />

                {/* Top Corner Badge for viewed cards */}
                <div className="absolute top-4 right-4 z-10">
                  {isViewed ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs shadow-sm"
                      title="Read"
                    >
                      <Heart size={13} className="fill-pink-500 text-pink-500" />
                    </motion.span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-pink-300/60 block" />
                  )}
                </div>

                {/* Live Animated Emoji with Glowing Aura */}
                <div className="relative flex justify-center items-center mb-4 pt-1">
                  <motion.div
                    className="absolute w-16 h-16 rounded-full bg-pink-300/30 blur-md pointer-events-none"
                    animate={{
                      scale: isActive ? [1, 1.45, 1] : [1, 1.15, 1],
                      opacity: isActive ? [0.6, 0.9, 0.6] : [0.25, 0.5, 0.25],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Individual live emoji movement */}
                  <motion.div
                    animate={isActive ? { scale: [1.2, 1.35, 1.2], rotate: [0, -10, 10, 0] } : card.floatAnim}
                    transition={isActive ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : card.floatAnim.transition}
                    className="text-5xl select-none relative z-10 filter drop-shadow-sm"
                  >
                    {card.icon}
                  </motion.div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-gray-800 text-center mb-1 font-display tracking-wide relative z-10">
                  {card.title}
                </h3>

                {/* Tap to reveal prompt when card is closed */}
                {!isActive && (
                  <p className="text-xs text-purple-600/70 text-center font-sans tracking-wide mt-2">
                    {isViewed ? 'Tap to reread 💖' : 'Tap to open ✨'}
                  </p>
                )}

                {/* Expandable heartfelt message */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="mt-4 pt-3 border-t border-pink-200/50">
                        <p className="text-gray-800 text-center font-handwriting text-2xl leading-relaxed">
                          "{card.desc}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Walk down memory lane button */}
        <AnimatePresence>
          {allViewed && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mt-12 mb-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(236,72,153,0.7)' }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168,85,247,0.4)',
                    '0 0 32px rgba(244,114,182,0.7)',
                    '0 0 20px rgba(168,85,247,0.4)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                onClick={onNext}
                className="cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-bold py-3.5 px-9 rounded-full text-xl shadow-xl transition-all duration-300 flex items-center gap-3 tracking-wide"
              >
                <span>Walk Down Memory Lane</span>
                <span className="text-2xl animate-bounce">🌸</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
