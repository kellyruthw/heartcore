'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import styles from './dragCursor.module.scss';
import leftArrow from '/public/svgs/icon-left-arrow-white.svg';
import rightArrow from '/public/svgs/icon-right-arrow-white.svg';
import Image from 'next/image';

const DragCursor = ({ show }) => {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    // Smooth follow
    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });

    useEffect(() => {
        const move = e => {
            x.set(e.clientX - 40); // Center the cursor (80px/2)
            y.set(e.clientY - 40);
        };
        if (show) {
            window.addEventListener('mousemove', move);
        }
        return () => window.removeEventListener('mousemove', move);
    }, [show, x, y]);

    return (
        <motion.div
            className={styles.dragCursor}
            style={{
                x: springX,
                y: springY,
                opacity: show ? 1 : 0,
                pointerEvents: 'none',
            }}
        >
            <Image src={leftArrow} alt="Left Arrow" />
            <span> Drag </span>
            <Image src={rightArrow} alt="Right Arrow" />
        </motion.div>
    );
};

export default DragCursor;