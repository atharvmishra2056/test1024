import React, { useState, useEffect } from 'react';
import { ChevronUp, Rocket } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [shouldPop, setShouldPop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const atBottom = scrollTop + windowHeight >= documentHeight - 10;
      
      if (atBottom && !isAtBottom) {
        setIsAtBottom(true);
        setShouldPop(true);
        setTimeout(() => setShouldPop(false), 1000);
      } else if (!atBottom) {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isAtBottom]);

  const scrollToTop = () => {
    setShowPopup(true);

    const duration = 800; // Animation duration in milliseconds
    const startPosition = window.pageYOffset;
    let startTime: number | null = null;

    // Easing function for a smooth acceleration and deceleration effect
    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animationStep = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      
      window.scrollTo(0, startPosition - startPosition * easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animationStep);
      } else {
        // Ensure it ends exactly at the top
        window.scrollTo(0, 0);
        setTimeout(() => {
          setShowPopup(false);
        }, 500);
      }
    };

    requestAnimationFrame(animationStep);
  };

  return (
    <>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl animate-scale-in">
            <Rocket size={48} className="text-school-red mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-school-red mb-2">Free Ride Up!</h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-school-red rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-school-red rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-school-red rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-school-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transform hover:scale-110 transition-all duration-300 z-40 border-2 border-white ${
          isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
        } ${shouldPop ? 'animate-pop-twice' : ''}`}
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default BackToTop;
