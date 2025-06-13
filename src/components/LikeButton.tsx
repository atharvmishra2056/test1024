
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useLike } from '../hooks/useLike';
import { Button } from './ui/button';

const LikeButton = () => {
  const { likeCount, isLiked, isLoading, incrementLike } = useLike();
  const [showAnimations, setShowAnimations] = useState(false);

  // Control animation visibility
  useEffect(() => {
    if (isLiked && !showAnimations) {
      setShowAnimations(true);
      // Hide animations after 3 seconds
      const timer = setTimeout(() => {
        setShowAnimations(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLiked, showAnimations]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <div className="relative group">
        {/* Outer glow ring that pulses when liked */}
        <div className={`absolute -inset-2 rounded-full transition-all duration-500 ${
          isLiked && showAnimations
            ? 'bg-gradient-to-r from-school-red/40 via-pink-400/40 to-school-red/40 animate-pulse blur-sm' 
            : 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 blur-sm group-hover:from-school-red/30 group-hover:to-pink-400/30'
        }`}></div>
        
        {/* Moving border animation */}
        <div className="absolute -inset-1 rounded-full overflow-hidden">
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isLiked && showAnimations
              ? 'bg-gradient-to-r from-transparent via-school-red to-transparent animate-border-move opacity-60'
              : 'bg-gradient-to-r from-transparent via-gray-400/50 to-transparent animate-border-move opacity-0 group-hover:opacity-40'
          }`}></div>
        </div>
        
        <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
          <Button
            onClick={incrementLike}
            disabled={isLiked || isLoading}
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto p-3 rounded-full hover:bg-school-red/10 transition-all duration-300 relative"
          >
            {/* Heart with enhanced animations */}
            <div className="relative">
              <Heart 
                size={24} 
                className={`transition-all duration-500 transform ${
                  isLiked 
                    ? `text-school-red fill-school-red scale-110 ${showAnimations ? 'animate-pop-twice' : ''}` 
                    : 'text-gray-600 hover:text-school-red hover:scale-110'
                } ${isLoading ? 'animate-pulse' : ''}`}
              />
              
              {/* Sparkle effect when liked - only show during animation period */}
              {isLiked && showAnimations && (
                <>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping animation-delay-200"></div>
                  <div className="absolute top-0 left-0 w-1 h-1 bg-red-400 rounded-full animate-ping animation-delay-400"></div>
                </>
              )}
            </div>
            
            {/* Like count with smooth number transition */}
            <span className={`text-xs font-bold transition-all duration-300 ${
              isLiked ? 'text-school-red scale-110' : 'text-gray-600 group-hover:text-school-red'
            }`}>
              {likeCount}
            </span>
            
            {/* Loading spinner overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-school-red border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LikeButton;
