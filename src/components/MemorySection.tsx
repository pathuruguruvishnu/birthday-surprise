import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Grid, Layers, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

// Floating background emojis stream
const FLOATING_BG_ITEMS = [
  { id: 1, emoji: '💖', left: '5%', size: 28, duration: 11, delay: 0 },
  { id: 2, emoji: '🌸', left: '16%', size: 24, duration: 14, delay: 2 },
  { id: 3, emoji: '✨', left: '26%', size: 20, duration: 9, delay: 1 },
  { id: 4, emoji: '🦋', left: '39%', size: 26, duration: 13, delay: 3 },
  { id: 5, emoji: '💕', left: '52%', size: 22, duration: 10, delay: 0.5 },
  { id: 6, emoji: '🌷', left: '65%', size: 25, duration: 12, delay: 2.5 },
  { id: 7, emoji: '💫', left: '78%', size: 20, duration: 15, delay: 1.5 },
  { id: 8, emoji: '🎈', left: '90%', size: 26, duration: 12, delay: 4 },
  { id: 9, emoji: '⭐', left: '10%', size: 18, duration: 10, delay: 5 },
  { id: 10, emoji: '🎀', left: '32%', size: 22, duration: 13, delay: 4.5 },
  { id: 11, emoji: '🎉', left: '58%', size: 24, duration: 11, delay: 3.5 },
  { id: 12, emoji: '🌼', left: '72%', size: 22, duration: 14, delay: 6 },
  { id: 13, emoji: '✨', left: '84%', size: 18, duration: 9, delay: 2 },
  { id: 14, emoji: '💖', left: '46%', size: 26, duration: 12, delay: 6.5 },
  { id: 15, emoji: '🌸', left: '22%', size: 22, duration: 15, delay: 7 },
];

// All 37 real photos from the photos folder
const ALL_PHOTOS = Array.from({ length: 37 }).map((_, i) => {
  const id = i + 1;
  const captions = [
    "Where our sweetest memories began... 🌸",
    "My forever partner in crime 👯‍♀️",
    "Your smile always lights up my world ✨",
    "Laughing together until our stomachs hurt! 😆",
    "The most beautiful sister inside and out 💖",
    "Countless memories, one unbreakable bond ♾️",
    "Always by my side through thick and thin 🛡️",
    "Dressed up and creating unforgettable memories 👗",
    "Every single day with you is a blessing 🌷",
    "My secret keeper and best friend forever 🤫",
    "Sharing silly jokes and endless laughter 🌟",
    "Two sisters, two hearts, one soul 💕",
    "Through every season of life, always together 🍂",
    "My favorite person to take selfies with 📸",
    "The one who knows me better than anyone else 💗",
    "Making ordinary moments feel like magic ✨",
    "A sister like you is life's greatest gift 🎁",
    "Forever grateful for your love and care 🌹",
    "Our bond gets stronger with every passing year 💫",
    "Late night conversations that mean the world 🌙",
    "My protector, my mentor, my sister 👑",
    "No distance or time could ever change us 🌈",
    "Smiles that come straight from the heart 😊",
    "Celebrating you today and every single day 🎂",
    "From childhood giggles to grown-up dreams 🧸",
    "You bring so much sunshine into my life ☀️",
    "My cheerleader in everything I do 📣",
    "Unconditional love in human form 💖",
    "Happiness is having you as my elder sister 🎀",
    "Every memory with you is etched in my heart 💎",
    "Partners in mischief, sisters by destiny 🎈",
    "To the moon and back, I love you Akka 🌙",
    "Forever and always, my favorite human 💕",
    "Bright smiles that make my whole world glow ✨",
    "The pure joy of having you in my life 💖",
    "Forever cherishing these precious moments with you 🌸",
    "My greatest blessing and dearest sister always 💕"
  ];

  return {
    id,
    src: `${import.meta.env.BASE_URL}photos/photo-${id}.jpg`,
    title: `Memory #${id}`,
    caption: captions[i % captions.length],
    category: id % 3 === 0 ? "Sisterhood" : id % 2 === 0 ? "Fun Times" : "Special Days"
  };
});

export default function MemorySection({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof ALL_PHOTOS[0] | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const handleNextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % ALL_PHOTOS.length);
  };

  const handlePrevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
  };

  const toggleLike = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedPhotos((prev) => {
      const next = new Set(prev);
      const isNowLiked = !next.has(id);
      if (isNowLiked) {
        next.add(id);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff85a1', '#ffd166', '#f472b6', '#ff4d8d'],
        });
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  // Keyboard navigation for enlarged photo modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowRight') {
        const nextId = selectedPhoto.id === ALL_PHOTOS.length ? 1 : selectedPhoto.id + 1;
        setSelectedPhoto(ALL_PHOTOS[nextId - 1]);
      } else if (e.key === 'ArrowLeft') {
        const nextId = selectedPhoto.id === 1 ? ALL_PHOTOS.length : selectedPhoto.id - 1;
        setSelectedPhoto(ALL_PHOTOS[nextId - 1]);
      } else if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  const currentPhoto = ALL_PHOTOS[currentIndex];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col z-10 bg-gradient-to-br from-[#1e0735] via-[#431c77] to-[#831843] text-white overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1 }}
    >
      {/* ==================================================== */}
      {/* LIVE 3D AMBIENT LIGHTING BACKGROUND ORBS             */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.25, 0.95, 1],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-pink-500/25 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 45, 0],
            y: [0, 55, -35, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-purple-500/25 blur-[110px]"
        />
        <motion.div
          animate={{
            x: [0, 45, -50, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.2, 1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-24 left-1/3 w-[450px] h-[450px] rounded-full bg-rose-400/30 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-300/15 blur-[120px]"
        />
      </div>

      {/* ==================================================== */}
      {/* LIVE STREAM OF FLOATING EMOJIS IN BACKGROUND         */}
      {/* ==================================================== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {FLOATING_BG_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: '105vh', opacity: 0, x: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.85, 0.85, 0],
              x: [0, 20, -20, 15, 0],
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
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* ==================================================== */}
      {/* TOP HEADER & VIEW MODE CONTROLS                      */}
      {/* ==================================================== */}
      <div className="z-20 pt-5 pb-2 px-6 flex flex-col items-center text-center">
        {/* Dynamic Badge with live sparkle */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-pink-200 text-xs md:text-sm font-medium mb-2 shadow-sm"
        >
          <motion.span
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="text-yellow-300"
          >
            ✨
          </motion.span>
          <span>{ALL_PHOTOS.length} Real Moments With My Akka 🌸</span>
        </motion.div>

        {/* Title with live beating heart 💕 and spinning star ✨ */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] tracking-wide flex items-center justify-center gap-2">
          <motion.span
            animate={{ rotate: [0, 180, 360], scale: [1, 1.25, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="text-yellow-300 text-2xl md:text-3xl inline-block"
          >
            ✨
          </motion.span>
          <span>Our Magical Memory World</span>
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

        {/* View Switcher Tabs with 3D pill */}
        <div className="flex items-center gap-2 mt-3.5 bg-black/35 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-[0_0_15px_rgba(244,114,182,0.6)]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Grid size={15} />
            <span>All {ALL_PHOTOS.length} Photos</span>
          </button>

          <button
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              viewMode === 'carousel'
                ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-[0_0_15px_rgba(244,114,182,0.6)]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers size={15} />
            <span>3D Showcase</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MODE 1: 3D CAROUSEL / SHOWCASE                       */}
      {/* ==================================================== */}
      {viewMode === 'carousel' && (
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 relative z-20">
          {/* Main Floating Polaroid Card with 3D Light Glow */}
          <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] flex items-center justify-center">
            {/* Background 3D stack cards effect */}
            <div className="absolute w-[88%] h-[92%] rounded-3xl bg-white/10 backdrop-blur-sm -rotate-6 transform scale-95 border border-white/20 pointer-events-none shadow-xl" />
            <div className="absolute w-[92%] h-[94%] rounded-3xl bg-white/15 backdrop-blur-sm rotate-4 transform scale-98 border border-white/20 pointer-events-none shadow-xl" />

            {/* Radiant 3D ambient light halo behind active card */}
            <div className="absolute w-72 h-72 rounded-full bg-pink-500/40 blur-3xl pointer-events-none" />

            {/* Active Polaroid Card with 3D Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotate: 5 }}
                transition={{ duration: 0.45, type: 'spring', bounce: 0.25 }}
                onClick={() => setSelectedPhoto(currentPhoto)}
                className="w-full h-full bg-gradient-to-b from-white via-white to-pink-50/90 p-4 md:p-5 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_25px_rgba(236,72,153,0.3)] border-2 border-white/80 flex flex-col cursor-pointer group hover:scale-[1.02] transition-transform relative overflow-hidden"
              >
                {/* 3D Glass Light Sweep */}
                <motion.div
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 60%)',
                  }}
                />

                {/* Photo Image Frame */}
                <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-black/5">
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    decoding="sync"
                  />
                  {/* Heart Like Button */}
                  <button
                    onClick={(e) => toggleLike(currentPhoto.id, e)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/85 backdrop-blur-md shadow-lg text-pink-500 hover:scale-115 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={18}
                      className={likedPhotos.has(currentPhoto.id) ? 'fill-pink-500 text-pink-500 animate-pulse' : 'text-gray-400'}
                    />
                  </button>
                </div>

                {/* Polaroid Bottom Caption */}
                <div className="pt-3 pb-1 text-center relative z-10">
                  <span className="text-[11px] font-sans font-semibold tracking-wider text-pink-500 uppercase block">
                    {currentPhoto.title} of {ALL_PHOTOS.length} • {currentPhoto.category}
                  </span>
                  <p className="text-gray-800 font-handwriting text-xl md:text-2xl mt-0.5 leading-snug">
                    {currentPhoto.caption}
                  </p>
                  <p className="text-[11px] text-purple-600/70 font-sans tracking-wide mt-1">
                    Click to view crystal clear in full size ✨
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Previous Button */}
            <button
              onClick={handlePrevPhoto}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/25 hover:bg-white/45 backdrop-blur-md text-white border border-white/35 shadow-xl transition-all hover:scale-110 cursor-pointer z-30"
              title="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/25 hover:bg-white/45 backdrop-blur-md text-white border border-white/35 shadow-xl transition-all hover:scale-110 cursor-pointer z-30"
              title="Next Photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Thumbnail Progress Dot Bar */}
          <div className="flex items-center gap-1.5 mt-5 max-w-xs overflow-x-auto py-1.5 px-3 bg-black/25 backdrop-blur-md rounded-full border border-white/15">
            {ALL_PHOTOS.map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all rounded-full cursor-pointer ${
                  i === currentIndex ? 'w-5 h-2 bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Jump to Photo ${photo.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODE 2: 3D FRAMED GRID OF ALL 37 PHOTOS              */}
      {/* ==================================================== */}
      {viewMode === 'grid' && (
        <div className="flex-1 w-full max-w-6xl mx-auto overflow-y-auto px-4 md:px-6 py-4 z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4 pb-20">
            {ALL_PHOTOS.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-gradient-to-b from-white via-white to-pink-50/90 p-2 md:p-2.5 rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.45),0_0_15px_rgba(244,114,182,0.25)] border-2 border-white/80 cursor-pointer flex flex-col group relative overflow-hidden transition-all duration-300"
              >
                {/* 3D Glass Light Sweep */}
                <motion.div
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)',
                  }}
                />

                {/* Photo Image Frame with 3D Depth */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 shadow-inner border border-black/5">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Corner Heart Like Button */}
                  <div className="absolute top-1.5 right-1.5 z-10">
                    <button
                      onClick={(e) => toggleLike(photo.id, e)}
                      className="p-1.5 rounded-full bg-white/85 text-pink-500 hover:scale-115 transition-transform shadow-md"
                    >
                      <Heart
                        size={13}
                        className={likedPhotos.has(photo.id) ? 'fill-pink-500 text-pink-500 animate-pulse' : 'text-gray-400'}
                      />
                    </button>
                  </div>
                </div>

                {/* Caption below photo */}
                <div className="pt-2 text-center relative z-10">
                  <span className="text-[10px] font-sans font-bold text-pink-600 block tracking-wide">
                    #{photo.id}
                  </span>
                  <p className="text-gray-700 font-handwriting text-xs truncate mt-0.5">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* BOTTOM ACTION BAR                                    */}
      {/* ==================================================== */}
      <div className="z-20 pb-5 pt-2 flex items-center justify-center">
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
          className="flex items-center gap-2.5 px-9 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 text-white font-sans font-bold text-base md:text-lg transition-all cursor-pointer shadow-xl tracking-wide"
        >
          <span>Continue Our Sister Adventure</span>
          <span className="text-xl animate-bounce">🎀</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>

      {/* ==================================================== */}
      {/* LIGHTBOX MODAL: FULL RESOLUTION CRYSTAL-CLEAR PHOTO  */}
      {/* ==================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 md:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* 3D Radiant Ambient Light Halo behind modal */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-pink-500/30 blur-[130px] pointer-events-none" />

            {/* Modal Card with 3D Framing & High Resolution Visibility */}
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-2xl p-4 md:p-6 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_40px_rgba(244,114,182,0.35)] border-2 border-white/80 relative text-gray-800 z-10"
            >
              {/* Floating Previous Arrow on desktop */}
              <button
                onClick={() => {
                  const nextId = selectedPhoto.id === 1 ? ALL_PHOTOS.length : selectedPhoto.id - 1;
                  setSelectedPhoto(ALL_PHOTOS[nextId - 1]);
                }}
                className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 shadow-2xl transition-all hover:scale-110 cursor-pointer"
                title="Previous Photo (Left Arrow key)"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Floating Next Arrow on desktop */}
              <button
                onClick={() => {
                  const nextId = selectedPhoto.id === ALL_PHOTOS.length ? 1 : selectedPhoto.id + 1;
                  setSelectedPhoto(ALL_PHOTOS[nextId - 1]);
                }}
                className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 shadow-2xl transition-all hover:scale-110 cursor-pointer"
                title="Next Photo (Right Arrow key)"
              >
                <ChevronRight size={28} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/10 hover:bg-black/20 text-gray-700 transition-colors cursor-pointer z-20"
                title="Close (Escape key)"
              >
                <X size={20} />
              </button>

              {/* Crystal-Clear Photo Display Frame with 3D Depth */}
              <div className="relative flex-1 w-full max-h-[72vh] md:max-h-[75vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner border border-black/10">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[72vh] md:max-h-[75vh] object-contain rounded-xl select-none"
                  loading="eager"
                  decoding="sync"
                />
              </div>

              {/* Caption & Navigation Controls */}
              <div className="pt-3.5 text-center">
                <span className="text-xs font-sans font-bold text-pink-600 uppercase tracking-widest block">
                  {selectedPhoto.title} of {ALL_PHOTOS.length} • {selectedPhoto.category}
                </span>
                <p className="font-handwriting text-2xl md:text-3xl text-gray-800 mt-1">
                  "{selectedPhoto.caption}"
                </p>

                <div className="flex items-center justify-center gap-4 mt-2.5">
                  {/* Prev Button (Mobile & Desktop) */}
                  <button
                    onClick={() => {
                      const nextId = selectedPhoto.id === 1 ? ALL_PHOTOS.length : selectedPhoto.id - 1;
                      setSelectedPhoto(ALL_PHOTOS[nextId - 1]);
                    }}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer shadow-sm"
                    title="Previous Photo"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(selectedPhoto.id)}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-all font-sans font-semibold text-sm cursor-pointer shadow-sm"
                  >
                    <Heart
                      size={18}
                      className={likedPhotos.has(selectedPhoto.id) ? 'fill-pink-500 text-pink-500 animate-pulse' : 'text-gray-400'}
                    />
                    <span>{likedPhotos.has(selectedPhoto.id) ? 'Loved 💖' : 'Love This'}</span>
                  </button>

                  {/* Next Button (Mobile & Desktop) */}
                  <button
                    onClick={() => {
                      const nextId = selectedPhoto.id === ALL_PHOTOS.length ? 1 : selectedPhoto.id + 1;
                      setSelectedPhoto(ALL_PHOTOS[nextId - 1]);
                    }}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer shadow-sm"
                    title="Next Photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
