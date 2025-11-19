'use client';

import { useLikes } from '@/hooks/useLikes';

interface LikeButtonProps {
  songId: string;
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const { likesCount, isLiked, isLoading, isToggling, toggleLike } = useLikes(songId);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleLike}
      disabled={isToggling}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isLiked
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-200 ${
          isLiked ? 'scale-110' : ''
        }`}
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="text-sm font-medium">
        {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
      </span>
    </button>
  );
}
