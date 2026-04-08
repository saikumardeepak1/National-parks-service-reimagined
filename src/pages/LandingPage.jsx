import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasTriggered = React.useRef(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnter = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    sessionStorage.setItem('nps_entered', '1');
    setIsFadingOut(true);
    setTimeout(() => navigate('/home'), 1200);
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) handleEnter();
  };

  return (
    <div
      onClick={handleEnter}
      onWheel={handleWheel}
      className={`transition-opacity duration-[1200ms] ${isFadingOut ? 'opacity-0' : 'opacity-100'} w-screen h-screen overflow-hidden select-none relative bg-black cursor-pointer`}
    >
      {/* Hero Background */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-[2000ms] ease-out ${isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        style={{ backgroundImage: 'url(/assets/landing-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="grain-overlay" />

      {/* NPS Logo */}
      <div className="fixed top-8 left-8 z-[60]">
        <img alt="NPS Logo" className="w-16 h-auto drop-shadow-lg" src="/assets/nps-logo-official.svg" />
      </div>

      {/* Hero Title */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-4">
        <div className={`transition-all duration-[1500ms] delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="main-title tracking-tighter leading-none whitespace-nowrap text-[clamp(2.5rem,8vw,9rem)] text-white drop-shadow-2xl">
            Where Wild Still Breathe
          </h1>
        </div>

        {/* Subtle interaction hint */}
        <div className={`mt-16 transition-all duration-[1000ms] delay-[1200ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-label text-[10px] tracking-[0.45em] uppercase text-white/40">
            Click or scroll to explore
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-[1px] h-8 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      <footer className={`fixed bottom-10 left-0 w-full text-center z-50 transition-all duration-[1000ms] delay-[1500ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <p className="font-label text-[9px] uppercase tracking-[0.25em] text-white/45 drop-shadow-md">
          Established 1916 · Preserving the Wilderness
        </p>
      </footer>
    </div>
  );
}
