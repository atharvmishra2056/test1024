
import React, { useEffect, useRef } from 'react';

const CursorFollower = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const trailCursorRef = useRef<HTMLDivElement>(null);
  const clickEffectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update main cursor immediately
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Create click ripple effect
      if (clickEffectsRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute w-8 h-8 border-2 border-pink-300/60 rounded-full animate-ping pointer-events-none';
        ripple.style.left = `${e.clientX - 16}px`;
        ripple.style.top = `${e.clientY - 16}px`;
        
        clickEffectsRef.current.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
          if (clickEffectsRef.current && ripple.parentNode) {
            clickEffectsRef.current.removeChild(ripple);
          }
        }, 600);
      }

      // Scale down main cursor on click
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(0.8)`;
      }
    };

    const handleMouseUp = () => {
      // Scale back up main cursor
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(1)`;
      }
    };

    // Smooth trail animation using requestAnimationFrame
    const animateTrail = () => {
      // Lerp (linear interpolation) for smooth trailing
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      if (trailCursorRef.current) {
        trailCursorRef.current.style.transform = `translate(${trailX - 6}px, ${trailY - 6}px)`;
      }

      requestAnimationFrame(animateTrail);
    };

    // Start event listeners and animation
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor with soft pinkish glow */}
      <div
        ref={mainCursorRef}
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-300/40 via-pink-400/50 to-pink-300/40 rounded-full blur-md animate-pulse"></div>
          {/* Inner glow */}
          <div className="absolute -inset-1 bg-pink-400/60 rounded-full blur-sm"></div>
          {/* Core */}
          <div className="w-5 h-5 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Trail cursor - follows with delay */}
      <div
        ref={trailCursorRef}
        className="fixed pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      >
        <div className="relative">
          {/* Trail glow */}
          <div className="absolute -inset-1 bg-pink-300/30 rounded-full blur-sm"></div>
          {/* Trail core */}
          <div className="w-3 h-3 bg-pink-400/70 rounded-full"></div>
        </div>
      </div>

      {/* Click effects container */}
      <div ref={clickEffectsRef} className="fixed inset-0 pointer-events-none z-[9997]"></div>
    </>
  );
};

export default CursorFollower;
