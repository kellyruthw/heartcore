'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './pageLoader.module.scss';
import logomark from '/public/svgs/logomark.svg';

// ...existing code...
export default function PageLoader() {
    const [phase, setPhase] = useState('spin'); // 'spin' -> 'wipe' -> 'done'

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('wipe'), 500);
        const t2 = setTimeout(() => {
            setPhase('done');
            window.dispatchEvent(new CustomEvent('page-loader:done'));
        }, 500 + 700);
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
                        initial={{ y: '-100%' }}           // start above viewport
                        animate={{ y: '100%' }}            // move down through viewport
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />
                )}
            </div>
        </AnimatePresence>
    );
}
// ...existing code...