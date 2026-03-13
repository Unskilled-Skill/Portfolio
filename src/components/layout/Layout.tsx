import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SkipToContent } from '../ui/SkipToContent';
import { BackToTop } from '../ui/BackToTop';
import { CustomCursor } from '../ui/CustomCursor';
import { ParticleField } from '../ui/ParticleField';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <ParticleField />
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
