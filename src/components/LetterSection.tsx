import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ArrowRight } from 'lucide-react';
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

// Structured Letter Content
const LETTER_SECTIONS = [
  {
    id: 'header',
    type: 'heading',
    text: '❤️ To My Monkey, Na Akka, Na Forever Best Friend 🫂🥹',
  },
  {
    id: 'p1',
    type: 'p',
    text: "Akka, nee last birthday roju jarigina vishayam ippatiki na heart lo undipoyindi. First, aa roju nee birthday status lo ninnu wish cheyyananduku I'm sorry, Akka. 🥺 Nenu nee meeda kopam tho ala cheyyaledu. Nuvvu chesina pani valla chala hurt ayya. Nenu feelings ni sarigga express cheyyalenu kada, anduke na badha neeku ela cheppalo teliyaka ala silent ga undipoya. ❤️🩹",
  },
  {
    id: 'p2',
    type: 'p',
    text: "Neeku gurthunda, nuvvu OG movie ki mana street lo unna ammayilandaritho vellav, kaani nannu, na chinna sister ni matram pilavaledu. 🥹 Neeku telusu kada, naaku PSPK ante entha istamo, aayana movies neetho kalisi choodalani nenu entha excited ga untaano. Nuvvu vallatho vellavani naaku badha ledu, Monkey. Kaani naaku ishtamaina hero movie ki andharitho vellina nuvvu, kaneesam naaku cheppakunda vellinanduke chala hurt ayya.",
  },
  {
    id: 'p3',
    type: 'p',
    text: 'Manam ekkadiki vellina kalise veltham ani andhariki telusu. Alantidi aa roju nuvvu nannu, na chinna sister ni vadilesi vellinappudu, nenu chala lonely ga feel ayya. Andharu nannu, "Nuvvu enduku vellaledu?" ani adigaru. Amma, Nanna kuda badhapaddaru. Kaani nenu enduku hurt ayyaano evariki sarigga cheppalekapoya.',
  },
  {
    id: 'p4',
    type: 'p',
    text: "Neeku adi just oka movie plan ayyi undochu, kaani naaku adi neetho share chesukovalani entho aashapadina oka moment. Aa roju na feelings neetho cheppakunda silent ga undipoyi, nee birthday status lo wish cheyyananduku I'm sorry, Akka. Kaani naa silence venuka kopam kanna badha ekkuva undi. ❤️🩹",
  },
  {
    id: 'p5',
    type: 'p',
    text: 'Monkey, nuvvu na sister maatrame kaadu, na childhood best friend vi kuda. Na school days lo nuvvu na tuition teacher ga unna rojulu naaku eppatiki marchipoleni memories. Aa rojulu malli tirigi raavu, kaani aa memories eppatiki na heart lo untayi. ❤️',
  },
  {
    id: 'p6',
    type: 'p',
    text: 'Ippudu manam mundula ekkuvaga maatladakapoyina, mana madhya gap vachindani anukoku. Adi just time lekapovadam anthe, mana madhya unna love taggipovadam kaadu. Neeku eppudu em problem vachina, nuvvu eppudaina naatho maatladachu. Neeku oka sister ga, oka friend ga nenu eppudu untaanu. Nee happiness aina, sadness aina, edaina naatho share chesuko. 🫂❤️',
  },
  {
    id: 'p7',
    type: 'p',
    text: 'Inko vishayam, Monkey... Andharini tondaraga nammeyaku. Nee kindness chala manchidi, kaani prathi daniki oka limit untundi. Manchiga undatam tho paatu, nee boundaries nuvvu maintain cheyyi. Evaru nee manchithananni advantage ga teesukokunda nee heart ni jagrathaga chusuko. Neeku nuvvu deserve chese happiness, love, respect anni dorakalani korukuntunna. ❤️🧿',
  },
  {
    id: 'quote',
    type: 'quote',
    text: 'Na heart lo nee place ni evaru replace cheyyaleru, Akka. Mana bond ni evaru break cheyyaleru. ❤️',
  },
  {
    id: 'p8',
    type: 'p',
    text: 'Nuvvu prathi chota naathone undalani kaadu, nannu andarikanna ekkuva choose chesukovalani kuda kaadu. Mana bond neeku kuda eppatiki special ga undalani maatrame korukuntunna. Neeku deserve chese happiness antha nenu ivvagaligithe entha baguntundo ani anipistundi. Mana madhya edaina misunderstanding vachina, adi mana love kanna peddadi avvakudadhu.',
  },
  {
    id: 'p9',
    type: 'p',
    text: 'Aa roju naa badhani express chesina vidhananiki sorry, Monkey. Nenu ninnu entha premisthaano maatallo cheppalenu. Life entha busy ayina, manam entha perigina, nuvvu eppatiki na Akka vi, na childhood best friend vi, naaku evaritho compare cheyyaleni special person vi.',
  },
  {
    id: 'wish',
    type: 'wish',
    text: 'Happy Birthday, na Monkey! 🎂❤️🫂',
  },
  {
    id: 'p10',
    type: 'p',
    text: 'Na heart lo oka special place eppatiki neekosame untundi. Adi evaru teesukoleru, evaru replace cheyyaleru.',
  },
  {
    id: 'closing',
    type: 'closing',
    text: 'Love you so much, Akka. Eppatiki nuvvu na favourite person vi! ❤️🧿',
  },
];

// Precalculate offsets for seamless typewriter progression
let cumulativeOffset = 0;
const PREPARED_SECTIONS = LETTER_SECTIONS.map((sec) => {
  const start = cumulativeOffset;
  const end = cumulativeOffset + sec.text.length;
  cumulativeOffset = end;
  return { ...sec, start, end };
});
const TOTAL_CHARS = cumulativeOffset;

export default function LetterSection({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const lastScrollTime = useRef(0);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ffd166', '#f472b6', '#a18cd1'],
    });
  };

  // Typewriter effect at a comfortable, medium reading speed (1 character every 38ms)
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCharCount((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_CHARS) {
          clearInterval(interval);
          setIsComplete(true);
          setShowNextButton(true);
          return TOTAL_CHARS;
        }
        return next;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Smooth auto-scroll following the cursor down the letter
  useEffect(() => {
    if (!isOpen || isComplete) return;

    const now = Date.now();
    if (now - lastScrollTime.current > 280 && cursorRef.current && containerRef.current) {
      const container = containerRef.current;
      const cursor = cursorRef.current;
      const containerRect = container.getBoundingClientRect();
      const cursorRect = cursor.getBoundingClientRect();

      // When the cursor reaches below the comfortable upper/middle area, scroll down smoothly
      if (cursorRect.bottom > containerRect.top + containerRect.height * 0.55) {
        lastScrollTime.current = now;
        cursor.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [charCount, isOpen, isComplete]);

  // Instant skip typing function
  const skipTyping = () => {
    setCharCount(TOTAL_CHARS);
    setIsComplete(true);
    setShowNextButton(true);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 flex flex-col items-center ${
        isOpen ? 'justify-start pt-6 sm:pt-10' : 'justify-center'
      } p-4 md:p-6 z-10 bg-gradient-to-br from-[#fce7f3] via-[#f3e8ff] to-[#fed7e2] text-gray-800 overflow-y-auto scroll-smooth`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* ==================================================== */}
      {/* LIVE 3D AMBIENT MORPHING ORBS BACKGROUND (LOVE THEME) */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, -35, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.25, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 -left-16 w-80 md:w-96 h-80 md:h-96 rounded-full bg-pink-400/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.2, 0.9, 1],
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
          className="absolute -bottom-16 left-1/3 w-80 md:w-96 h-80 md:h-96 rounded-full bg-rose-300/35 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
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

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <div className="min-h-full flex flex-col items-center justify-center py-12">
            <motion.div
              key="envelope"
              className="flex flex-col items-center cursor-pointer group relative z-10"
              onClick={handleOpen}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0, filter: 'blur(10px)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glowing envelope halo */}
              <motion.div
                className="absolute w-56 h-56 rounded-full bg-pink-400/35 blur-2xl pointer-events-none"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative">
                <Mail className="text-pink-300 w-48 h-48 md:w-60 md:h-60 drop-shadow-[0_15px_35px_rgba(244,114,182,0.6)] group-hover:text-pink-400 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 1.28, 1, 1.18, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Heart className="text-rose-500 fill-rose-500 w-14 h-14 md:w-16 md:h-16 drop-shadow-md" />
                  </motion.div>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-purple-900 mt-6 group-hover:text-pink-700 transition-colors flex items-center gap-2">
                <span>A Little Letter for My Akka</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  💌
                </motion.span>
              </h2>

              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm text-sm font-semibold text-pink-600">
                <Sparkles size={14} className="animate-spin" />
                <span>Tap the envelope to unfold my heart</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="letter"
            className="max-w-3xl w-full mx-auto relative z-20 my-6 pb-12"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          >
            {/* Radiant halo behind open letter */}
            <div className="absolute inset-0 rounded-3xl bg-pink-300/30 blur-2xl pointer-events-none" />

            <div className="bg-[#fffdf8] p-6 sm:p-9 md:p-12 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] relative border-2 border-amber-200/70 transform rotate-[-0.3deg] overflow-hidden">
              
              {/* Top Letterhead: "LETTER FROM MY HEART" with refined typography & seal */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-rose-200/90 pb-3.5 mb-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-xl sm:text-2xl animate-pulse">💌</span>
                  <h2 className="font-serif text-sm sm:text-base md:text-lg font-black tracking-[0.25em] uppercase text-rose-700 drop-shadow-xs">
                    LETTER FROM MY HEART
                  </h2>
                </div>

                <div className="flex items-center gap-2.5">
                  {!isComplete && (
                    <button
                      onClick={skipTyping}
                      className="cursor-pointer text-xs font-bold px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition-all border border-pink-200 shadow-xs flex items-center gap-1 active:scale-95"
                      title="Skip typing animation"
                    >
                      <span>Skip</span>
                      <span>⚡</span>
                    </button>
                  )}
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-500 text-white flex items-center justify-center font-serif font-bold text-sm shadow-md border-2 border-rose-300">
                    🧿
                  </span>
                </div>
              </div>

              {/* Dynamic Typewriter Letter Body */}
              <div className="font-handwriting text-xl sm:text-2xl md:text-[26px] text-gray-800 leading-relaxed space-y-5">
                {PREPARED_SECTIONS.map((sec) => {
                  if (charCount < sec.start) return null;

                  const isCurrent = charCount >= sec.start && charCount < sec.end;
                  const visibleLength = isComplete
                    ? sec.text.length
                    : Math.min(sec.text.length, Math.max(0, charCount - sec.start));
                  const displayText = sec.text.slice(0, visibleLength);

                  if (sec.type === 'heading') {
                    return (
                      <h3
                        key={sec.id}
                        className="font-handwriting text-2xl sm:text-3xl md:text-4xl mb-5 text-purple-900 font-bold leading-snug"
                      >
                        {displayText}
                        {isCurrent && (
                          <span ref={cursorRef} className="animate-pulse text-rose-500 font-bold ml-1">|</span>
                        )}
                      </h3>
                    );
                  }

                  if (sec.type === 'quote') {
                    return (
                      <div key={sec.id} className="py-2">
                        <div className="bg-pink-50/80 border-l-4 border-pink-500 px-4 py-3 rounded-r-xl shadow-xs">
                          <p className="font-bold text-pink-700 text-xl sm:text-2xl md:text-[27px]">
                            {displayText}
                            {isCurrent && (
                              <span ref={cursorRef} className="animate-pulse text-rose-500 font-bold ml-1">|</span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  if (sec.type === 'wish') {
                    return (
                      <div key={sec.id} className="pt-2">
                        <p className="font-bold text-purple-900 text-2xl sm:text-3xl">
                          {displayText}
                          {isCurrent && (
                            <span ref={cursorRef} className="animate-pulse text-rose-500 font-bold ml-1">|</span>
                          )}
                        </p>
                      </div>
                    );
                  }

                  if (sec.type === 'closing') {
                    return (
                      <div key={sec.id} className="pt-3 pb-1 border-t border-pink-200/60 mt-4">
                        <p className="font-bold text-pink-600 text-2xl sm:text-3xl leading-snug">
                          {displayText}
                          {isCurrent && (
                            <span ref={cursorRef} className="animate-pulse text-rose-500 font-bold ml-1">|</span>
                          )}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p key={sec.id}>
                      {displayText}
                      {isCurrent && (
                        <span ref={cursorRef} className="animate-pulse text-rose-500 font-bold ml-1">|</span>
                      )}
                    </p>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {showNextButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-8 pb-4"
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
                    <span>One Last Surprise for You...</span>
                    <span className="text-xl animate-bounce">🎁</span>
                    <ArrowRight size={22} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
