'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './textBlock.module.scss';
import VideoDiv from '../UI/Video/VideoDiv';

gsap.registerPlugin(ScrollTrigger);

function splitWords(text) {
    const words = text.split(' ');
    return words.map((word, i) => (
        <span key={i} data-word className={styles.word}>
            {word}{i < words.length - 1 ? ' ' : ''}
        </span>
    ));
}

const TextBlock = ({id}) => {
    const sectionRef = useRef(null);
    const smallGraphicRef = useRef(null);
    const largeGraphicRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const smallGraphic = smallGraphicRef.current;
        const largeEl = section.querySelector(`.${styles.large}`);
        const largeGraphic = section.querySelector(`.${styles.largeMedia}`);

        // Initial states
        gsap.set(largeEl.querySelectorAll('[data-word]'), { opacity: 0.2, display: 'inline-block' });

        // Text scroll-trigger (independent)
        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'top 50%',
                scrub: true,
            },
        }).to(largeEl.querySelectorAll('[data-word]'), {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
        });

        // Small graphic scroll-trigger (independent)
        gsap.fromTo(
            smallGraphic,
            { opacity: 0 },
            {
                opacity: 1,
                ease: 'none',
                duration: 0.6,
                scrollTrigger: {
                    trigger: smallGraphic,
                    start: 'top 80%',
                    end: 'top 60%',
                    scrub: false,
                },
            });

        // Large graphic scroll-trigger (independent)
        gsap.fromTo(largeGraphic, 
            {opacity: 0, yPercent: 10, ease: 'none'},
            {
            opacity: 1,
            yPercent: 0,
            ease: 'none',
            duration: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'center 80%',
                end: 'top top',
                scrub: false,
            },
        });
    }, { scope: sectionRef });

    return (
        <section id={id} ref={sectionRef} className={styles.textBlock}>
            <div className={styles.row}>
                <p className={styles.large}>
                    {splitWords('Heartcore Studio blends modern design with engineering precision to bring bold ideas to life. We partner with startups to craft digital experiences that not only look beautiful but perform seamlessly.')}
                </p>
            </div>
            <div className={styles.row}>
                <div className={styles.smallImage}>
                    <VideoDiv src="/videos/colorfulwaves.mp4" ref={smallGraphicRef} />
                </div>
                {/* <div className={styles.largeMedia} ref={largeGraphicRef}>
                    <Image src={studio} alt="Studio FPO" width={1190} height={715} />
                </div> */}
            </div>
        </section>
    );
};

export default TextBlock;