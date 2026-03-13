import { useState, useCallback } from 'react';
import type { GalleryImage } from '../../types';
import { Lightbox } from './Lightbox';

interface ProjectGridProps {
  images: GalleryImage[];
  fillHeight?: boolean;
}

function GridImage({ image }: { image: GalleryImage }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 will-change-transform"
        onLoad={() => setLoaded(true)}
      />
      {/* Blur-to-sharp: opaque surface overlay that fades once image is decoded */}
      <div
        className="absolute inset-0 bg-surface transition-opacity duration-700 pointer-events-none"
        style={{ opacity: loaded ? 0 : 1 }}
      />
    </>
  );
}

export function ProjectGrid({ images, fillHeight = false }: ProjectGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    // 3D perspective tilt on the cell
    e.currentTarget.style.transition = 'transform 0.1s linear';
    e.currentTarget.style.transform  =
      `perspective(600px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.03)`;

    // Parallax on the image
    const img = e.currentTarget.querySelector('img');
    if (img) img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    e.currentTarget.style.transform  = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';

    const img = e.currentTarget.querySelector('img');
    if (img) {
      img.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      img.style.transform  = 'scale(1) translate(0, 0)';
    }
  }, []);

  const gridClass = fillHeight
    ? 'grid h-full grid-cols-3 grid-rows-2'
    : 'grid grid-cols-2 gap-3 sm:grid-cols-3';

  const itemClass = fillHeight
    ? 'group relative cursor-pointer overflow-hidden'
    : 'group relative cursor-pointer overflow-hidden rounded-lg aspect-[4/3]';

  return (
    <>
      <div className={gridClass}>
        {images.map((image, index) => (
          <div
            key={index}
            className={itemClass}
            style={{ transformStyle: 'preserve-3d' }}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleMouseLeave}
            onClick={() => setLightboxIndex(index)}
          >
            <GridImage image={image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-2 left-3 right-3 text-sm font-light text-white opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              {image.overlay}
            </span>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
