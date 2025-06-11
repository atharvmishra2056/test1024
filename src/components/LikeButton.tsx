
import React from 'react';
import { Heart } from 'lucide-react';
import { useLike } from '../hooks/useLike';
import { Button } from './ui/button';

const LikeButton = () => {
  const { likeCount, isLiked, isLoading, incrementLike } = useLike();

  return (
    <div className="fixed right-4 top-1/2 -translate-y-12 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300">
        <Button
          onClick={incrementLike}
          disabled={isLiked || isLoading}
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto p-3 rounded-full hover:bg-school-red/10 transition-colors"
        >
          <Heart 
            size={24} 
            className={`transition-colors ${
              isLiked 
                ? 'text-school-red fill-school-red' 
                : 'text-gray-600 hover:text-school-red'
            }`}
          />
          <span className={`text-xs font-medium ${
            isLiked ? 'text-school-red' : 'text-gray-600'
          }`}>
            {likeCount}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default LikeButton;
