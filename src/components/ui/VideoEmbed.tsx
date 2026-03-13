import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
}

export function VideoEmbed({ youtubeId, title }: VideoEmbedProps) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black shadow-2xl">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        {active ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1`}
            title={`${title} — Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setActive(true)}
            aria-label={`Play ${title}`}
            className="absolute inset-0 h-full w-full group"
          >
            {/* Thumbnail */}
            <img
              src={thumb}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Dark overlay */}
            <span className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/25" />
            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 shadow-lg shadow-accent/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:shadow-accent/50">
                <Play size={28} className="translate-x-0.5 text-white" fill="white" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
