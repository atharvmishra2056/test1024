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
        mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`; // Offset by half the cursor size (20px/2 = 10px)
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
        // Reduced border and size for a softer ripple
        ripple.className = 'absolute w-10 h-10 border-2 border-pink-300/60 rounded-full animate-ping pointer-events-none';
        ripple.style.left = `${e.clientX - 20}px`; // Adjust position to center ripple (10px * 2)
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
          mainCursorRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(0.8)`; // Softer scale down
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
      // Reduced factor for a slightly softer, more "lagging" trail.
      trailX += (mouseX - trailX) * 0.15; 
      trailY += (mouseY - trailY) * 0.15;

      if (trailCursorRef.current) {
        trailCursorRef.current.style.transform = `translate(${trailX - 6}px, ${trailY - 6}px)`; // Offset by half its size (12px/2 = 6px)
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
      {/* Main cursor element: A small core with multiple layers of blurred glow. */}
      {/* The `z-[9999]` ensures it stays on top of almost everything. */}
      {/* `pointer-events-none` prevents it from interfering with clicks on underlying elements. */}
      <div
        ref={mainCursorRef}
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{ willChange: 'transform' }} // Optimization hint for browser
      >
        <div className="relative">
          {/* Outer glow: Larger inset, reduced opacity and blur for softer effect. */}
          <div className="absolute -inset-5 bg-gradient-to-r from-pink-300/40 via-pink-200/50 to-pink-300/40 rounded-full blur-lg"></div>
          {/* Middle glow: Slightly smaller inset, further reduced opacity and blur. */}
          <div className="absolute -inset-2 bg-pink-200/60 rounded-full blur-md"></div>
          {/* Inner glow: Smallest inset, very subtle blur, moderate opacity. */}
          <div className="absolute -inset-0.5 bg-pink-100/70 rounded-full blur-sm"></div>
          {/* Core dot: The central visible part of the cursor, made smaller and softer. */}
          <div className="w-4 h-4 bg-gradient-to-br from-pink-100 to-pink-300 rounded-full shadow-sm"></div>
        </div>
      </div>

      {/* Trail cursor element: Follows the main cursor with a slight delay, also with glow layers. */}
      {/* `z-[9998]` places it just behind the main cursor. */}
      <div
        ref={trailCursorRef}
        className="fixed pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }} // Optimization hint for browser
      >
        <div className="relative">
          {/* Trail glow layers: Similar to main cursor but even more subtle. */}
          <div className="absolute -inset-3 bg-pink-200/30 rounded-full blur-md"></div>
          <div className="absolute -inset-1 bg-pink-300/40 rounded-full blur-sm"></div>
          {/* Trail core dot: Smaller and more transparent. */}
          <div className="w-3 h-3 bg-pink-200/50 rounded-full"></div>
        </div>
      </div>

      {/* Container for click ripple effects. */}
      {/* `z-[9997]` ensures ripples are behind the main cursor but still visible. */}
      <div ref={clickEffectsRef} className="fixed inset-0 pointer-events-none z-[9997]"></div>
    </>
  );
};

export default CursorFollower;
