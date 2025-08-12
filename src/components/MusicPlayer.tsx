'use client';

import { useState, useRef, useEffect } from 'react';
import { Song } from '@/lib/types';

interface MusicPlayerProps {
  song: Song;
}

export default function MusicPlayer({ song }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Parse lyrics with timestamps
  const parsedLyrics = song.lyrics.split('\n').map(line => {
    const timeMatch = line.match(/\[(\d{2}):(\d{2})\]/);
    if (timeMatch) {
      const minutes = parseInt(timeMatch[1]);
      const seconds = parseInt(timeMatch[2]);
      const timeInSeconds = minutes * 60 + seconds;
      const text = line.replace(/\[\d{2}:\d{2}\]/, '').trim();
      return { time: timeInSeconds, text };
    }
    return { time: 0, text: line };
  }).filter(lyric => lyric.text);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Update current lyric based on time
  useEffect(() => {
    const currentLyric = parsedLyrics.findIndex((lyric, index) => {
      const nextLyric = parsedLyrics[index + 1];
      return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
    });
    
    if (currentLyric !== -1) {
      setCurrentLyricIndex(currentLyric);
    }
  }, [currentTime, parsedLyrics]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <audio ref={audioRef} src={song.audioUrl} />
      
      {/* Song Info */}
      <div className="flex items-center mb-6">
        <img
          src={song.cover}
          alt={song.name}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{song.name}</h2>
          <p className="text-gray-300">{song.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div 
          className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-100"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center mb-6">
        <button
          onClick={togglePlay}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Lyrics */}
      <div className="max-h-48 overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Lyrics</h3>
        <div className="space-y-2">
          {parsedLyrics.map((lyric, index) => (
            <p
              key={index}
              className={`transition-colors duration-300 ${
                index === currentLyricIndex 
                  ? 'text-purple-400 font-semibold' 
                  : 'text-gray-400'
              }`}
            >
              {lyric.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 