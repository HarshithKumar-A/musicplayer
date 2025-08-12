import Link from 'next/link';
import { songs } from '@/lib/data';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Music Player
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => {
          // Handle "Coming Soon" card differently
          if (song.id === 'coming-soon') {
            return (
              <div key={song.id} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 opacity-75 cursor-not-allowed">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg relative">
                    <img
                      src={song.cover}
                      alt={song.name}
                      className="w-full h-full object-cover grayscale"
                    />
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">
                          COMING SOON
                        </div>
                        <div className="text-sm text-white/80">
                          Stay Tuned!
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {song.name}
                  </h2>
                  
                  <p className="text-gray-300 text-sm overflow-hidden text-ellipsis">
                    {song.description.length > 60 ? song.description.substring(0, 60) + '...' : song.description}
                  </p>
                </div>
              </div>
            );
          }

          // Regular clickable cards for other songs
          return (
            <Link 
              key={song.id} 
              href={`/song/${song.id}`}
              className="group block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={song.cover}
                    alt={song.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h2 className="text-xl font-semibold text-white mb-2">
                  {song.name}
                </h2>
                
                <p className="text-gray-300 text-sm overflow-hidden text-ellipsis">
                  {song.description.length > 60 ? song.description.substring(0, 60) + '...' : song.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 