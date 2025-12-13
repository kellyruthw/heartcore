'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import styles from './imageCopyList.module.scss';
import webDesignImg from '/public/images/web-design.jpg';
import productDesignImg from '/public/images/wireframes.jpg';
import webDevImg from '/public/images/wordpress-dev.jpg';
import headlessDevImg from '/public/images/headless-dev.jpg';
import LinkCta from '../UI/LinkCta/LinkCta';
import { useModal } from '../UI/Modal/ModalProvider';


gsap.registerPlugin(ScrollTrigger);

const ImageCopyList = ({ id }) => {
    const sectionRef = useRef(null);
    const h3Ref = useRef(null);
    const pRef = useRef(null);
    const imgRef = useRef(null);

    const { openModal } = useModal();

    useGSAP(() => {
        const section = sectionRef.current;
        gsap.set([h3Ref.current, pRef.current], { opacity: 0, y: 20 });

        // Copy timeline (scrub between 80% -> 60%)
        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 40%',
                scrub: false,
            },
        })
            .to(h3Ref.current, { opacity: 1, y: 0, ease: 'none', duration: 0.2, })
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
        <section id={id} ref={sectionRef} className={styles.imageCopyList}>
            <div className={styles.row}>
                <div className={styles.copy}>
                    <p className={styles.preTitle}>(01)</p>
                    <div className={styles.textGroup}>
                        <h3 ref={h3Ref}>Web Design</h3>
                        <p ref={pRef}>Modern, artfully composed web experiences crafted to feel intuitive, intentional, and unmistakably premium</p>
                        <LinkCta href="#contact" value="Let's Design"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }} />
                    </div>
                </div>
                <div className={styles.imageContainer} ref={imgRef}>
                    <Image src={webDesignImg} alt="Figma Web Design and wireframe" width={750} height={350} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.copy}>
                    <p className={styles.preTitle}>(02)</p>
                    <div className={styles.textGroup}>
                        <h3 ref={h3Ref}>Product Design</h3>
                        <p ref={pRef}>High-performance product design that blends elegance, usability, and strategic clarity to move businesses forward.</p>
                        <LinkCta href="" value="Let's wireframe"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }} />
                    </div>
                </div>
                <div className={styles.imageContainer} ref={imgRef}>
                    <Image src={productDesignImg} alt="Product Design Flow" width={750} height={350} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.copy}>
                    <p className={styles.preTitle}>(03)</p>
                    <div className={styles.textGroup}>
                        <h3 ref={h3Ref}>WordPress Theme Development</h3>
                        <p ref={pRef}>Custom WordPress themes engineered for speed, precision, and flawless harmony with the brand’s visual system.</p>
                        <LinkCta href="#contact" value="Let's develop"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }} />
                    </div>
                </div>
                <div className={styles.imageContainer} ref={imgRef}>
                    <Image src={webDevImg} alt="WordPress Theme Development" width={750} height={350} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.copy}>
                    <p className={styles.preTitle}>(04)</p>
                    <div className={styles.textGroup}>
                        <h3 ref={h3Ref}>Headless CMS Development</h3>
                        <p ref={pRef}>Headless architectures designed for lightning-fast performance, effortless content management, and complete creative freedom.</p>
                        <LinkCta href="#contact" value="Let's build"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }} />
                    </div>
                </div>
                <div className={styles.imageContainer} ref={imgRef}>
                    <Image src={headlessDevImg} alt="Headless CMS Development" width={750} height={200} />
                </div>
            </div>
        </section>
    );
};

export default ImageCopyList;