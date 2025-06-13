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
    let animationFrameId: number; 

    // This function updates the position of the main cursor directly.
    // It's called immediately on mouse movement for responsiveness.
    const updateMainCursorPosition = () => {
      if (mainCursorRef.current) {
        // Offset by half the cursor size (main-cursor-core is 20px, so -10px)
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`; 
      }
    };

    // Handles mouse movement across the document.
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateMainCursorPosition(); // Update main cursor immediately
    };

    // Handles mouse button down event to trigger a click ripple.
    const handleMouseDown = (e: MouseEvent) => {
      // Create a new ripple element for the click effect
      if (clickEffectsRef.current) {
        const ripple = document.createElement('div');
        // Tailwind classes for the ripple: absolute positioning, size, border, rounded, and ping animation
        // Made thinner border and softer color for subtlety
        ripple.className = 'absolute w-10 h-10 border-2 border-pink-200/50 rounded-full animate-ping pointer-events-none';
        ripple.style.left = `${e.clientX - 20}px`; // Adjust position to center ripple
        ripple.style.top = `${e.clientY - 20}px`;   // Adjust position to center ripple
        
        clickEffectsRef.current.appendChild(ripple);
        
        // Remove the ripple element after its animation completes to prevent DOM clutter
        setTimeout(() => {
          if (clickEffectsRef.current && ripple.parentNode) {
            clickEffectsRef.current.removeChild(ripple);
          }
        }, 600); // Matches the animate-ping duration

        // Briefly scale down the main cursor to give a "press" feedback
        if (mainCursorRef.current) {
          mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(0.9)`; // Softer scale down
        }
      }
    };

    // Handles mouse button up event to reset the main cursor scale.
    const handleMouseUp = () => {
      // Reset main cursor scale to normal
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(1)`;
      }
    };

    // Animation loop for the trail cursor to follow smoothly.
    const animateTrail = () => {
      // Linear interpolation (lerp) for smooth following effect.
      // Adjusted factor for a softer, slightly more "lagging" trail.
      trailX += (mouseX - trailX) * 0.1; // Reduced from 0.15 for more lag
      trailY += (mouseY - trailY) * 0.1; // Reduced from 0.15 for more lag

      if (trailCursorRef.current) {
        // Offset by half its size (trail-core is 16px, so -8px)
        trailCursorRef.current.style.transform = `translate(${trailX - 8}px, ${trailY - 8}px)`; 
      }

      animationFrameId = requestAnimationFrame(animateTrail); 
    };

    // Set up all event listeners and start the animation loop when the component mounts.
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Start the trail animation loop only once.
    animationFrameId = requestAnimationFrame(animateTrail); 

    // Cleanup function: runs when the component unmounts.
    // Removes all event listeners and cancels the animation frame to prevent memory leaks.
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId) { 
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount.

  return (
    <>
      {/* Main cursor element: A hollow ring with multiple layers of very soft, blurred glow. */}
      {/* `z-[10000]` ensures it stays on top. `pointer-events-none` prevents blocking interactions. */}
      <div
        ref={mainCursorRef}
        className="fixed pointer-events-none z-[10000] transition-transform duration-100 ease-out"
        style={{ willChange: 'transform' }} // Optimization hint for browser
      >
        <div className="relative">
          {/* Outer glow: Larger inset, very soft blur, very low opacity. */}
          <div className="absolute -inset-8 bg-pink-300/10 rounded-full blur-xl"></div>
          {/* Middle glow: Slightly smaller inset, softer blur, low opacity. */}
          <div className="absolute -inset-4 bg-pink-200/20 rounded-full blur-lg"></div>
          {/* Inner glow: Smallest inset, subtle blur, slightly higher opacity. */}
          <div className="absolute -inset-2 bg-pink-100/30 rounded-full blur-md"></div>
          {/* Core ring: The central visible part of the cursor, now a hollow border. */}
          <div className="w-5 h-5 border-2 border-pink-300/70 rounded-full bg-transparent shadow-sm"></div>
        </div>
      </div>

      {/* Trail cursor element: Follows the main cursor with a slight delay, also with glow layers. */}
      {/* `z-[9999]` places it just behind the main cursor. */}
      <div
        ref={trailCursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }} // Optimization hint for browser
      >
        <div className="relative">
          {/* Trail glow layers: Even more subtle than main cursor's glows. */}
          <div className="absolute -inset-6 bg-pink-200/10 rounded-full blur-xl"></div>
          <div className="absolute -inset-3 bg-pink-100/20 rounded-full blur-lg"></div>
          {/* Trail ring: Smaller and more transparent hollow ring. */}
          <div className="w-4 h-4 border-2 border-pink-200/50 rounded-full bg-transparent"></div>
        </div>
      </div>

      {/* Container for click ripple effects. */}
      {/* `z-[9998]` ensures ripples are behind the main cursor but still visible. */}
      <div ref={clickEffectsRef} className="fixed inset-0 pointer-events-none z-[9998]"></div>
    </>
  );
};

export default CursorFollower;
