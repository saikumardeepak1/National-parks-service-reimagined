import React, { useState, useEffect } from 'react';

const BearAnimation = () => {
  const [phase, setPhase] = useState('entering'); // entering, pausing, exiting, hidden
  const [position, setPosition] = useState(110); // start off-screen right

  useEffect(() => {
    let interval;
    
    if (phase === 'entering') {
      interval = setInterval(() => {
        setPosition(prev => {
          if (prev <= 55) { // Stop slightly off-center for the pause
            setPhase('pausing');
            clearInterval(interval);
            return 55;
          }
          return prev - 0.15; // Moving Right to Left
        });
      }, 30);
    } else if (phase === 'pausing') {
      const timeout = setTimeout(() => {
        setPhase('exiting');
      }, 3000); 
      return () => clearTimeout(timeout);
    } else if (phase === 'exiting') {
      interval = setInterval(() => {
        setPosition(prev => {
          if (prev <= -30) { // Walk completely off-screen left
            setPhase('hidden');
            clearInterval(interval);
            return -30;
          }
          return prev - 0.18;
        });
      }, 30);
    } else if (phase === 'hidden') {
        const timeout = setTimeout(() => {
            setPosition(110);
            setPhase('entering');
        }, 15000); // Reappear every 15 seconds
        return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [phase]);

  const currentSource = '/assets/bear.mp4';

  if (phase === 'none') return null;

  return (
    <div 
      className="fixed bottom-[-60px] pointer-events-none z-0"
      style={{ 
        left: `${position}%`,
        opacity: (phase === 'hidden') ? 0 : 1,
        transform: 'scaleX(1)' // Use native direction (Left)
      }}
    >
      <video 
        src={currentSource}
        autoPlay
        loop
        muted
        playsInline
        className="w-[480px] h-auto mix-blend-multiply"
        style={{
            filter: 'contrast(1.08) brightness(1.02)'
        }}
      />
    </div>
  );
};

export default BearAnimation;
