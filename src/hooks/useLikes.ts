import { useState, useEffect } from 'react';
import { LikesService, LikesData } from '@/lib/likesService';

export function useLikes(songId: string) {
  const [likesData, setLikesData] = useState<LikesData>({ count: 0, userLikes: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const userId = typeof window !== 'undefined' ? localStorage.getItem('musicPlayer_userId') || '' : '';
  const isLiked = userId ? likesData.userLikes[userId] || false : false;

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupSubscription = async () => {
      try {
        // Initial load
        const initialData = await LikesService.getLikes(songId);
        setLikesData(initialData);
        setIsLoading(false);

        // Set up real-time subscription
        unsubscribe = LikesService.subscribeToLikes(songId, (data) => {
          setLikesData(data);
        });
      } catch (error) {
        console.error('Error setting up likes subscription:', error);
        setIsLoading(false);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [songId]);

  const toggleLike = async () => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      await LikesService.toggleLike(songId);
      // The real-time subscription will update the UI automatically
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return {
    likesCount: likesData.count,
    isLiked,
    isLoading,
    isToggling,
    toggleLike
  };
}
