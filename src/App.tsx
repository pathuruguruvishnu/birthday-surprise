import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroSection from './components/IntroSection';
import CelebrationSection from './components/CelebrationSection';
import BondSection from './components/BondSection';
import MemorySection from './components/MemorySection';
import AdventureSection from './components/AdventureSection';
import LetterSection from './components/LetterSection';
import SurpriseSection from './components/SurpriseSection';
import FinalSection from './components/FinalSection';
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(`${import.meta.env.BASE_URL}song.mp3`);
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startBgMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`${import.meta.env.BASE_URL}song.mp3`);
      audioRef.current.loop = true;
    }
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(e => console.error("Audio play failed:", e));
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSection = () => {
    if (currentSection === 1 && !isPlaying) {
      // Autoplay on first interaction if not already playing
      toggleAudio();
    }
    setCurrentSection(prev => prev + 1);
  };

  const goToSection = (section: number) => setCurrentSection(section);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-magical-peach via-magical-pink to-magical-lavender">
      
      {/* Audio Control */}
      <button 
        onClick={toggleAudio}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/50 text-purple-800 hover:bg-white/50 transition-all duration-300"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <IntroSection 
            key="s1" 
            onNext={nextSection} 
            onStartBgMusic={startBgMusic}
          />
        )}
        {currentSection === 2 && <CelebrationSection key="s2" onNext={nextSection} />}
        {currentSection === 3 && <BondSection key="s3" onNext={nextSection} />}
        {currentSection === 4 && <MemorySection key="s4" onNext={nextSection} />}
        {currentSection === 5 && <AdventureSection key="s5" onNext={nextSection} />}
        {currentSection === 6 && <LetterSection key="s6" onNext={nextSection} />}
        {currentSection === 7 && <SurpriseSection key="s7" onNext={nextSection} onReset={() => goToSection(1)} />}
        {currentSection === 8 && <FinalSection key="s8" onReset={() => goToSection(1)} />}
      </AnimatePresence>

      {/* Magical Particles Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 blur-[1px]"
            style={{
              width: (i % 4) * 3 + 4,
              height: (i % 4) * 3 + 4,
              left: `${(i * 17) % 95 + 2}%`,
              top: `${(i * 23) % 90 + 5}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + (i % 5) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
