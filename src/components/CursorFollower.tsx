
import React, { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Create ripple effect
      const newRipple = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y
      };
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Main cursor follower */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-100 ease-out ${
          isClicking ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      >
        <div className="w-4 h-4 bg-school-red/30 rounded-full blur-sm animate-pulse"></div>
      </div>

      {/* Secondary follower - slightly delayed */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      >
        <div className="w-2 h-2 bg-school-red rounded-full opacity-60"></div>
      </div>

      {/* Click ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
          }}
        >
          <div className="w-10 h-10 border-2 border-school-red/50 rounded-full animate-ping opacity-75"></div>
        </div>
      ))}
    </>
  );
};

export default CursorFollower;
