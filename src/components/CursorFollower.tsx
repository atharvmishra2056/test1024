import React, { useEffect, useRef } from 'react';
import { useAppSettings } from '../contexts/AppSettingsContext'; // Import the context hook

const CursorFollower = () => {
  const { isCursorFollowerEnabled } = useAppSettings(); // Get the state from context
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const trailCursorRef = useRef<HTMLDivElement>(null);
  const clickEffectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the cursor is disabled, remove event listeners and stop animation.
    if (!isCursorFollowerEnabled) {
      // Hide cursors when disabled
      if(mainCursorRef.current) mainCursorRef.current.style.opacity = '0';
      if(trailCursorRef.current) trailCursorRef.current.style.opacity = '0';
      return;
    }
    
    // Show cursors when enabled
    if(mainCursorRef.current) mainCursorRef.current.style.opacity = '1';
    if(trailCursorRef.current) trailCursorRef.current.style.opacity = '1';

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let animationFrameId: number;

    const updateMainCursorPosition = () => {
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateMainCursorPosition();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (clickEffectsRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute w-10 h-10 border-2 border-pink-200/50 rounded-full animate-ping pointer-events-none';
        ripple.style.left = `${e.clientX - 20}px`;
        ripple.style.top = `${e.clientY - 20}px`;
        
        clickEffectsRef.current.appendChild(ripple);
        
        setTimeout(() => {
          if (clickEffectsRef.current && ripple.parentNode) {
            clickEffectsRef.current.removeChild(ripple);
          }
        }, 600);

        if (mainCursorRef.current) {
          mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(0.9)`;
        }
      }
    };

    const handleMouseUp = () => {
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(1)`;
      }
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      if (trailCursorRef.current) {
        trailCursorRef.current.style.transform = `translate(${trailX - 8}px, ${trailY - 8}px)`;
      }

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    animationFrameId = requestAnimationFrame(animateTrail);

    // Cleanup function removes event listeners when component unmounts or state changes
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isCursorFollowerEnabled]); // The effect now depends on the enabled state

  return (
    // The component always renders, but its elements will be hidden via opacity if disabled.
    <>
      <div
        ref={mainCursorRef}
        className="fixed pointer-events-none z-[10000] transition-opacity duration-300"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative">
          <div className="absolute -inset-8 bg-pink-300/10 rounded-full blur-xl"></div>
          <div className="absolute -inset-4 bg-pink-200/20 rounded-full blur-lg"></div>
          <div className="absolute -inset-2 bg-pink-100/30 rounded-full blur-md"></div>
          <div className="w-5 h-5 border-2 border-pink-300/70 rounded-full bg-transparent shadow-sm"></div>
        </div>
      </div>
      <div
        ref={trailCursorRef}
        className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative">
          <div className="absolute -inset-6 bg-pink-200/10 rounded-full blur-xl"></div>
          <div className="absolute -inset-3 bg-pink-100/20 rounded-full blur-lg"></div>
          <div className="w-4 h-4 border-2 border-pink-200/50 rounded-full bg-transparent"></div>
        </div>
      </div>
      <div ref={clickEffectsRef} className="fixed inset-0 pointer-events-none z-[9998]"></div>
    </>
  );
};

export default CursorFollower;
