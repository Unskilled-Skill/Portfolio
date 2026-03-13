import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 700);
    }, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-display text-5xl font-bold tracking-tight text-white">
              RF
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '48px' }}
              transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
              className="h-px bg-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
