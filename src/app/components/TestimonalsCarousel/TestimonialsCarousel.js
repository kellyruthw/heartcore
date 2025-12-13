'use client';
import { useEffect, useState } from 'react';
import styles from './testimonialsCarousel.module.scss';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import Testimonial from '../UI/Testimonial/Testimonial';
import TESTIMONIALS_DATA from '../../data/testimonials';
import LOGOS from '../../data/clientLogos';
import Image from 'next/image';


const TIMER_INTERVAL = 4000;

const TestimonialsCarousel = ({ id }) => {
    const slideClasses = (bgColorClass) => {
        return `${styles.testimonialSlide} ${[bgColorClass]}`;
    }
    const [assetList, setAssetList] = useState([]);
    const [unusedAssets, setUnusedAssets] = useState([...LOGOS]);
    const [intervalTrigger, setIntervalTrigger] = useState(0);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkTablet = () => setIsTablet(window.innerWidth <= 1280);
        checkTablet();
        window.addEventListener('resize', checkTablet);
        return () => window.removeEventListener('resize', checkTablet);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const generateAssetList = (assets, count) => {
        const selectedAssets = [];
        let remainingAssets = [...assets];
        for (let i = 0; i < count; i++) {
            const selectedAssetIndex = Math.floor(Math.random() * remainingAssets.length);
            selectedAssets.push(remainingAssets[selectedAssetIndex]);
            remainingAssets = remainingAssets.filter((_, index) => index !== selectedAssetIndex);
        }
        return { selectedAssets, remainingAssets };
    }

    const updateAssetList = (currentAssets, unusedAssets, numToReplace) => {
        const newAssetList = [...currentAssets];
        const newUnusedAssets = [];



        // let indicesToReplace = [];
        // while (indicesToReplace.length < numToReplace) {
        //     const randomIndex = Math.floor(Math.random() * currentAssets.length);
        //     indicesToReplace.push(randomIndex);
        //     indicesToReplace = [...new Set(indicesToReplace)];
        // }


        let indicesToReplace = [];
        while (indicesToReplace.length < numToReplace) {
            //hack
            let randomIndex;
            if (!indicesToReplace.length) {
                randomIndex = Math.floor(Math.random() * currentAssets.length / 2);
            } else {
                randomIndex = Math.floor(Math.random() * currentAssets.length / 2) + Math.floor(currentAssets.length / 2);
            }
            indicesToReplace.push(randomIndex);
            indicesToReplace = [...new Set(indicesToReplace)];
        }

        // const indicesToReplaceWith = new Set();
        // while (indicesToReplaceWith.size < numToReplace) {
        //     const randomIndex = Math.floor(Math.random() * unusedAssets.length);
        //     indicesToReplaceWith.add(randomIndex);
        // }

        let indicesToReplaceWith = [];
        while (indicesToReplaceWith.length < numToReplace) {
            const randomIndex = Math.floor(Math.random() * unusedAssets.length);
            indicesToReplaceWith.push(randomIndex);
            indicesToReplaceWith = [...new Set(indicesToReplaceWith)];
        }

        [...indicesToReplace].forEach((indexToReplace, i) => {
            newUnusedAssets.push(newAssetList[indexToReplace]);
            newAssetList[indexToReplace] = [...unusedAssets][[...indicesToReplaceWith][i]];
        });
        return { newAssetList, newUnusedAssets };


    }

    //initialize the asset list on component mount
    useEffect(() => {
        const { selectedAssets, remainingAssets } = generateAssetList(LOGOS, 12);
        setAssetList(selectedAssets);
        setUnusedAssets(remainingAssets);
        const intervalId = setInterval(() => {
            setIntervalTrigger(prevId => prevId + 1);
        }, TIMER_INTERVAL);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!intervalTrigger) return;
        const { newAssetList, newUnusedAssets } = updateAssetList(assetList, unusedAssets, 2);
        setAssetList(newAssetList);
        setUnusedAssets(newUnusedAssets);

    }, [intervalTrigger]);


    // const row1Assets = assetList.slice(0, 6);
    // const row2Assets = assetList.slice(6, 12);

    return (
        <section id={id} className={styles.testimonalsCarousel}>
            <div className={styles.row}>
                {!isTablet && <LogoBlock asset={assetList[0]} />}
                {!isTablet && <LogoBlock asset={assetList[1]} />}
                {!isMobile && <LogoBlock asset={assetList[2]} />}
                <LogoBlock asset={assetList[3]} />
                <LogoBlock asset={assetList[4]} />
                <LogoBlock asset={assetList[5]} />
            </div>
            <div className={styles.row}>
                <Swiper
                    modules={[Autoplay, A11y]}
                    slidesPerView={2.5}
                    spaceBetween={24}
                    navigation={false}
                    a11y={{ enabled: true }}
                    loop={TESTIMONIALS_DATA.length > 1}
                    speed={8000}
                    freeMode={true}
                    autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
                    allowTouchMove={false}
                    className={`${styles.testimonialsSwiper} ${styles.linearEasing}`}
                    breakpoints={{
                        0: { slidesPerView: 1.1 },
                        769: { slidesPerView: 1.5 },
                        1480: { slidesPerView: 2 },
                        1728: { slidesPerView: 2.2 },
                    }}
                >
                    {TESTIMONIALS_DATA.map((testimonial, idx) => (
                        <SwiperSlide key={idx} className={slideClasses(testimonial.bgColorClass)}>
                            <Testimonial
                                quote={testimonial.quote}
                                name={testimonial.name}
                                company={testimonial.company}
                                textColorClass={testimonial.textColorClass}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.row}>
                {!isTablet && <LogoBlock asset={assetList[6]} delay={TIMER_INTERVAL / 2} />}
                {!isTablet && <LogoBlock asset={assetList[7]} delay={TIMER_INTERVAL / 2} />}
                {!isMobile && <LogoBlock asset={assetList[8]} delay={TIMER_INTERVAL / 2} />}
                <LogoBlock asset={assetList[9]} delay={TIMER_INTERVAL / 2} />
                <LogoBlock asset={assetList[10]} delay={TIMER_INTERVAL / 2} />
                <LogoBlock asset={assetList[11]} delay={TIMER_INTERVAL / 2} />
            </div>
        </section>
    );
}

const LogoBlock = ({ asset, delay = 0 }) => {
    const [loadedAsset, setLoadedAsset] = useState(null);
    const [isAssetFadingOut, setIsAssetFadingOut] = useState(false);
    const [isAssetFadingIn, setIsAssetFadingIn] = useState(false);



    useEffect(() => {
        if (!loadedAsset && asset) {
            setLoadedAsset(asset);
            return;
        }
        if (loadedAsset === asset || !asset) {
            return;
        }
        const fadeOutTimeout = setTimeout(() => {
            setIsAssetFadingOut(true);
        }, delay);

        const fadeInTimeout = setTimeout(() => {
            setIsAssetFadingOut(false);
            setIsAssetFadingIn(true);
            setLoadedAsset(asset);
        }, 1000 + delay);
        return () => {
            clearTimeout(fadeOutTimeout);
            clearTimeout(fadeInTimeout);
        };
    }, [asset]);

    if (!loadedAsset) {
        return;
    }

    return <div className={styles.column}>
        <div className={`${styles.imageContainer} ${isAssetFadingOut ? styles.fadeOut : ''} ${isAssetFadingIn ? styles.fadeIn : ''}`}>
            <Image src={loadedAsset} alt="Client logo" width={140} height={50} />
        </div>
    </div>
}

export default TestimonialsCarousel;