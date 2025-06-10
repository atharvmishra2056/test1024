
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

interface LikeResponse {
  websiteName: string;
  likeCount: number;
}

const API_BASE_URL = 'https://timesofindia.indiatimes.com/student-ai-masterclass/api/like';

export const useLike = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Extract website name from current URL
  const getWebsiteName = () => {
    const hostname = window.location.hostname;
    return hostname.replace('www.', '');
  };

  // Fetch current like count
  const fetchLikeCount = async () => {
    try {
      const websiteName = getWebsiteName();
      const response = await fetch(`${API_BASE_URL}?websiteName=${encodeURIComponent(websiteName)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch like count');
      }
      
      const data: LikeResponse = await response.json();
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error('Error fetching like count:', error);
      toast({
        title: "Error",
        description: "Failed to load like count",
        variant: "destructive"
      });
    }
  };

  // Increment like count
  const incrementLike = async () => {
    if (isLiked || isLoading) return;

    setIsLoading(true);
    try {
      const websiteName = getWebsiteName();
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteName,
          increment: 1
        })
      });

      if (!response.ok) {
        throw new Error('Failed to increment like count');
      }

      // Update local state
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
      
      // Store in localStorage to prevent multiple likes
      localStorage.setItem(`liked_${websiteName}`, 'true');
      
      toast({
        title: "Thank you!",
        description: "Your like has been recorded"
      });
    } catch (error) {
      console.error('Error incrementing like:', error);
      toast({
        title: "Error",
        description: "Failed to record your like",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has already liked on component mount
  useEffect(() => {
    const websiteName = getWebsiteName();
    const hasLiked = localStorage.getItem(`liked_${websiteName}`) === 'true';
    setIsLiked(hasLiked);
    fetchLikeCount();
  }, []);

  return {
    likeCount,
    isLiked,
    isLoading,
    incrementLike
  };
};
