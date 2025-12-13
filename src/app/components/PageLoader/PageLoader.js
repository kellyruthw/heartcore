'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './pageLoader.module.scss';
import logomark from '/public/svgs/logomark.svg';

// ...existing imports...
export default function PageLoader() {
  const [phase, setPhase] = useState('spin'); 

  useEffect(() => {
    const minSpin = 2000;  
    const wipeDur = 700;

    const t1 = setTimeout(() => setPhase('wipe'), minSpin);
    const t2 = setTimeout(() => {
      setPhase('done');
      window.dispatchEvent(new CustomEvent('page-loader:done'));

      setTimeout(() => {
        try { ScrollTrigger.refresh(); } catch {}
      }, 50);
    }, minSpin + wipeDur);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <div className={styles.loaderRoot}>
        {phase === 'spin' && (
          <div className={styles.centerWrap}>
            <div className={styles.spinner}>
              <Image src={logomark} alt="Loading" width={96} height={96} priority />
            </div>
          </div>
        )}
        {phase === 'wipe' && (
          <motion.div
            className={styles.wipePanel}
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        )}
      </div>
    </AnimatePresence>
  );
}