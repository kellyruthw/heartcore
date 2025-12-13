'use client'

import Image from 'next/image';
import styles from './homeHero2.module.scss';
import logomark from '/public/svgs/logomark.svg';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from '../UI/Modal/ModalProvider';
import Button from '../UI/Button/Button';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const HomeHero = ({ id }) => {
    const sectionRef = useRef(null);
    const logomarkRef = useRef(null);
    const firstHeadlineRef = useRef(null);
    const secondHeadlineRef = useRef(null);

    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkTablet = () => setIsTablet(window.innerWidth <= 1280);
        checkTablet();
        window.addEventListener('resize', checkTablet);
        return () => window.removeEventListener('resize', checkTablet);
    }, []);

    const { openModal } = useModal();

    useGSAP(() => {

        const onLoaderDone = () => {
            const tl = gsap.timeline();
            tl.fromTo(firstHeadlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 0)
                .fromTo(logomarkRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.3);
        };

        window.addEventListener('page-loader:done', onLoaderDone);
        return () => window.removeEventListener('page-loader:done', onLoaderDone);
    }, []);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=180%',
                scrub: true,
                pin: true,
                anticipatePin: 1,

            }
        })
            .fromTo(
                firstHeadlineRef.current,
                { opacity: 1, y: "0" },
                { opacity: 0, y: "100", ease: "none", duration: 0.2 },
                0.2 // start at 10%
            )
            .fromTo(
                secondHeadlineRef.current,
                { opacity: 0, y: "100" },
                { opacity: 1, y: "0", ease: "none", duration: 0.3 },
                0.3 // start at 20%
            )
            .fromTo(
                logomarkRef.current,
                { x: "0", rotate: "0deg", y: "0" },
                { x: "100vw", rotate: "90deg", ease: "none", y: "-600" },
                0.0 // start at 10%
            );
    }, []);

    return (
        <section id={id} className={styles.homeHero} ref={sectionRef}>
            <div className={styles.logomark} ref={logomarkRef}>
                <Image src={logomark} alt="Heartcore Logo Mark" className={styles.logoMark} />
            </div>
            <div className={styles.row}>
                <div className={`${styles.copy} ${styles.display}`} ref={firstHeadlineRef}>
                    <h1 ref={firstHeadlineRef}>Heartcore is a <br /><span>boutique digital studio</span><br />specializing in high-end web experiences.</h1>

                    <div className={styles.buttonContainer}>
                        <p>Uniquely designed. Expertly built.</p>
                        <Button
                            color="outline"
                            href=""
                            buttonValue="Get in touch"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }} />
                    </div>
                </div>
                <div className={`${styles.copy} ${styles.xl}`} ref={secondHeadlineRef}>
                    <p>
                        Combining custom web design with editor-friendly headless CMS development, we help brands connect with their audience by transforming their vision into a digital reality.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;