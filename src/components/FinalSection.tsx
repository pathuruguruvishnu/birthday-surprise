import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

export default function FinalSection({ onReset }: { onReset: () => void }) {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 bg-gradient-to-br from-[#120224] via-[#2a0845] to-[#0f0c29] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient Morphing Glow Orbs in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, -35, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.25, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-pink-500/25 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/4 -right-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-purple-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-300/20 blur-3xl"
        />
      </div>

      {/* Starry night glow */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              opacity: [Math.random() * 0.4 + 0.1, Math.random() * 0.9 + 0.3, Math.random() * 0.4 + 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="text-center z-20 max-w-4xl px-4 flex flex-col items-center">
        {/* Animated 3D Floating Emojis */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex items-center justify-center gap-3 text-5xl sm:text-6xl mb-3 filter drop-shadow-[0_10px_20px_rgba(255,215,0,0.6)]"
        >
          <span>👑</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💖
          </motion.span>
          <span>✨</span>
        </motion.div>

        {/* 3D Heading — single line (decreased by 4 pts) */}
        <motion.h1 
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-normal sm:tracking-wide leading-tight text-center my-3 whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #fff7b2 0%, #ffd700 25%, #ff6b8b 50%, #f43f5e 75%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.9)) drop-shadow(0 10px 30px rgba(244,63,94,0.75))',
          }}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          HAPPY BIRTHDAY, AKKA!
        </motion.h1>
        
        {/* 3D Signature Card: By Your Loving Chelli Sravani */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
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
            By Your Loving Chelli,{' '}
            <span className="text-amber-300 underline decoration-pink-400 decoration-wavy underline-offset-8">
              Sravani
            </span>{' '}
            💖🧿
          </h2>

          <p className="text-sm sm:text-base text-pink-200/90 font-serif italic mt-3.5">
            "Forever your little sister, partner in crime & biggest cheerleader in life!"
          </p>
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.06, boxShadow: '0 0 45px rgba(244,63,94,0.85)' }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl text-base md:text-lg flex items-center gap-3 border border-pink-300/50 tracking-wider mx-auto"
          >
            <RotateCcw size={22} className="animate-spin-slow" />
            <span>Replay Our Magical Journey ↺</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
