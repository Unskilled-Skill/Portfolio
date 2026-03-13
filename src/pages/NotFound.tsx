import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(228,76,101,0.06)_0%,_transparent_60%)]" />

      <div className="relative z-10 text-center px-6">
        <p className="mb-2 text-sm font-light uppercase tracking-[0.3em] text-accent">
          Error 404
        </p>
        <h1 className="mb-4 text-[8rem] font-thin leading-none tracking-tight text-white/10 md:text-[12rem]">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-thin tracking-tight md:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mb-10 max-w-md font-light text-white/45">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 font-light text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-dark"
          >
            <Home size={16} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-8 py-3 font-light text-white/70 transition-all duration-300 hover:border-accent/50 hover:text-white"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
