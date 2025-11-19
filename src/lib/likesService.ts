import { ref, get, set, onValue, off, increment } from 'firebase/database';
import { database } from '@/firebase';

export interface LikesData {
  count: number;
  userLikes: Record<string, boolean>; // userId -> liked status
}

export class LikesService {
  private static generateUserId(): string {
    // Simple user ID generation - in a real app, you'd use authentication
    let userId = localStorage.getItem('musicPlayer_userId');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('musicPlayer_userId', userId);
    }
    return userId;
  }

  static async getLikes(songId: string): Promise<LikesData> {
    try {
      const likesRef = ref(database, `songs/${songId}/likes`);
      const snapshot = await get(likesRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          count: data.count || 0,
          userLikes: data.userLikes || {}
        };
      }

      return { count: 0, userLikes: {} };
    } catch (error) {
      console.error('Error getting likes:', error);
      return { count: 0, userLikes: {} };
    }
  }

  static async toggleLike(songId: string): Promise<void> {
    const userId = this.generateUserId();
    const likesRef = ref(database, `songs/${songId}/likes`);
    const userLikeRef = ref(database, `songs/${songId}/likes/userLikes/${userId}`);

    try {
      // Get current likes data
      const likesData = await this.getLikes(songId);
      const isLiked = likesData.userLikes[userId];

      if (isLiked) {
        // Unlike: remove user from userLikes and decrement count
        await set(userLikeRef, null);
        const countRef = ref(database, `songs/${songId}/likes/count`);
        await set(countRef, Math.max(0, likesData.count - 1));
      } else {
        // Like: add user to userLikes and increment count
        await set(userLikeRef, true);
        const countRef = ref(database, `songs/${songId}/likes/count`);
        await set(countRef, likesData.count + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }

  static isLiked(songId: string): boolean {
    const userId = this.generateUserId();
    // This would need to be called after fetching likes data
    // For now, we'll handle this in the component
    return false;
  }

  static subscribeToLikes(songId: string, callback: (likesData: LikesData) => void): () => void {
    const likesRef = ref(database, `songs/${songId}/likes`);

    const unsubscribe = onValue(likesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callback({
          count: data.count || 0,
          userLikes: data.userLikes || {}
        });
      } else {
        callback({ count: 0, userLikes: {} });
      }
    });

    return () => off(likesRef);
  }
}
