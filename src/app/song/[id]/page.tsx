import Link from 'next/link';
import { notFound } from 'next/navigation';
import { songs } from '@/lib/data';
import MusicPlayer from '@/components/MusicPlayer';

interface PageProps {
  params: {
    id: string;
  };
}

export default function SongPage({ params }: PageProps) {
  const song = songs.find(s => s.id === params.id);

  if (!song) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/"
        className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back to Home
      </Link>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img
            src={song.cover}
            alt={song.name}
            className="w-64 h-64 mx-auto rounded-lg shadow-2xl object-cover mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-2">{song.name}</h1>
          <p className="text-xl text-gray-300">{song.description}</p>
        </div>

        <MusicPlayer song={song} />
      </div>
    </div>
  );
} 