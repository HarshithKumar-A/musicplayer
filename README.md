# Music Player

A minimal web music player built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Page**: Displays all songs with cover images in a responsive grid
- **Song Details Page**: Shows selected song with cover, title, description, and interactive music player
- **Music Player**: 
  - Play/pause controls
  - Interactive progress bar
  - Time-synced lyrics highlighting
  - Responsive design

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Server-Side Rendering (SSR)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Structure

The music data follows this structure:

```typescript
interface Song {
  id: string;
  name: string;
  description: string;
  lyrics: string; // With timestamps like "[00:30] Lyric line"
  audioUrl: string; // Path to audio file in public/audio/
  cover: string;  // Cover image URL or base64
}
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page (song listing)
│   ├── song/[id]/page.tsx    # Song details page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── MusicPlayer.tsx       # Music player component
└── lib/
    ├── types.ts              # TypeScript interfaces
    └── data.ts               # Hardcoded song data
```

## Features in Detail

### Home Page
- Responsive grid layout
- Hover effects on song cards
- Cover image display
- Song name and description preview

### Song Details Page
- Large cover image display
- Back navigation to home
- Integrated music player component

### Music Player
- Real-time progress tracking
- Clickable progress bar for seeking
- Time-synchronized lyrics with highlighting
- Play/pause toggle with icons
- Time display (current/total)

## Customization

To add new songs:
1. Place your audio files (mp3, wav, etc.) in the `public/audio/` directory
2. Edit `src/lib/data.ts` and add new song objects to the `songs` array following the defined interface
3. Set the `audioUrl` to `/audio/your-filename.ext`

## Current Songs

The application currently includes:
- **Abu ser** - A beautiful musical piece with soulful melodies
- **മിഥുൻ ഭായ്** - A melodious composition with rich cultural heritage (Malayalam lyrics) 