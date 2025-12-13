'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import styles from './imageCopy.module.scss';
import servicesImg from '/public/images/services-laptops.png';

gsap.registerPlugin(ScrollTrigger);

const ImageCopy = ({id}) => {
    const sectionRef = useRef(null);
    const h2Ref = useRef(null);
    const pRef = useRef(null);
    const imgRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        gsap.set([h2Ref.current, pRef.current], { opacity: 0, y: 20 });

        // Copy timeline (scrub between 80% -> 60%)
        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 40%',
                scrub: false,
            },
        })
            .to(h2Ref.current, { opacity: 1, y: 0, ease: 'none', duration: 0.2, })
            .to(pRef.current, { opacity: 1, y: 0, ease: 'none', duration: 0.2 });

        gsap.fromTo(
            imgRef.current,
            { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.7 },
            {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                ease: 'none',
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                },
            }
        );
    }, { scope: sectionRef });

    return (
        <section id={id} ref={sectionRef} className={styles.imageCopy}>
            <div className={styles.row}>
                <div className={styles.copy}>
                    <h2 ref={h2Ref}>Services</h2>
                    <p ref={pRef}>Heartcore Studio blends modern design with engineering precision to bring bold ideas to life. We partner with startups to craft digital experiences that not only look beautiful but perform seamlessly.</p>
                </div>
                <div className={styles.imageContainer} ref={imgRef}>
                    <Image src={servicesImg} alt="Services Image 1" width={1050} height={480} />
                </div>
            </div>
        </section>
    );
};

export default ImageCopy;