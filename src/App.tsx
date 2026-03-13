import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { Preloader } from './components/ui/Preloader';

const ProjectPage  = lazy(() => import('./pages/ProjectPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const NotFound     = lazy(() => import('./pages/NotFound'));

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2,  ease: 'easeIn'  as const } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/"                 element={<HomePage />} />
            <Route path="/projects"         element={<ProjectsPage />} />
            <Route path="/projects/:slug"   element={<ProjectPage />} />
            <Route path="*"                 element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <HelmetProvider>
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
