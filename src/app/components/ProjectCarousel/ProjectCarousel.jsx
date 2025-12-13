'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './projectCarousel.module.scss';
import data from '../../data/projects';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import 'swiper/css/scrollbar';
import { Scrollbar, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Pill from '../UI/Pill/Pill';
import DragCursor from '../UI/DragCursor/DragCursor';
import LinkCta from '../UI/LinkCta/LinkCta';

gsap.registerPlugin(ScrollTrigger);

const PAUSE_FACTOR = 1.3; // 1.3 * 100vh = 30% extra scroll before next overlap
const SHRINK = { scale: 0.85, opacity: 0, borderRadius: '80px' };

const ProjectCarousel = ({ id }) => {
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const [showCursor, setShowCursor] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => setIsTablet(window.innerWidth <= 1024);
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  useGSAP(() => {
    const slides = slideRefs.current;
    if (!slides.length) return;

    // Kill previous triggers tied to this section
    ScrollTrigger.getAll()
      .filter(t => t.vars.trigger === sectionRef.current)
      .forEach(t => t.kill());

    if (isTablet) {
      // Remove GSAP-applied styles so slides render in normal flow
      gsap.killTweensOf(slides);
      gsap.set(slides, { clearProps: 'all' });
      return; // Skip creating ScrollTrigger on tablet
    }

    // Desktop: stacked panels with scroll pin
    gsap.set(slides, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'pc-main',
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${slides.length * (window.innerHeight * PAUSE_FACTOR)}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
      }
    });

    slides.forEach((slide, idx) => {
      const isLast = idx === slides.length - 1;

      if (idx > 0) {
        gsap.set(slide, { y: window.innerHeight });

        tl.to({}, { duration: PAUSE_FACTOR - 1 }) // Pause
          .to(slide, { y: 0, duration: 1, ease: 'none' })
          .to(slides[idx - 1], { ...SHRINK, duration: 1, ease: 'none' }, '<');
      }

      if (isLast) {
        tl.to({}, { duration: PAUSE_FACTOR - 1 }); // Final pause
      }
    });

    // Cleanup when component unmounts or deps change
    return () => {
      ScrollTrigger.getAll()
        .filter(t => t.vars.trigger === sectionRef.current)
        .forEach(t => t.kill());
      gsap.set(slides, { clearProps: 'all' });
    };
  }, [data.length, isTablet]);

  return (
    <>
      <section id={id} className={styles.projectCarousel} ref={sectionRef}>
        {data.map((project, idx) => (
          <div
            key={idx}
            className={styles.project}
            ref={el => (slideRefs.current[idx] = el)}
          >
            <div className={styles.overlay} style={{ backgroundColor: project.bgColor }}>
              {project.bgImage && (
                <Image
                  src={project.bgImage}
                  alt={project.headline}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            <div className={styles.slideContent}>
              <div className={`${styles.row} ${styles.projectHeader}`}>
                <h4>Project Highlight</h4>
                <div className={styles.pagination}>
                  {project.credits && (
                    <Link href={project.credits?.websiteLink || ""} className={styles.projectLink} target="_blank">
                      Design by {project.credits?.design}
                    </Link>
                  )}
                  {project.url && (
                    <LinkCta href={project.url || ""} value="View website" target="_blank" />
                  )}
                  <div className={`swiper-scrollbar ${styles.scrollbar} swiper-scrollbar-${idx}`}></div>
                </div>
              </div>
              <div
                className={`${styles.row} ${styles.carouselContainer}`}
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <Swiper
                  modules={[Pagination, Scrollbar]}
                  pagination={{
                    clickable: true,
                    el: `.swiper-pagination-${idx}`
                  }}
                  scrollbar={{
                    el: `.swiper-scrollbar-${idx}`,
                    draggable: true
                  }}
                  spaceBetween={24}
                  slidesPerView={2.5}
                  className={styles.images}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 1.5,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 1.2,
                      spaceBetween: 50,
                    },
                    1440: {
                      slidesPerView: 1.5,
                      spaceBetween: 24,
                    },
                    1728: {
                      slidesPerView: 1.8,
                      spaceBetween: 24,
                    },
                    2000: {
                      slidesPerView: 2.5,
                      spaceBetween: 24,
                    },
                  }}
                >
                  {project.images.map((item, imgIdx) => {
                    const isString = typeof item === 'string';
                    const mediaType = isString ? 'image' : item.mediaType;
                    const src = isString ? item : item.src;
                    const poster = !isString ? item.poster : undefined;

                    return (
                      <SwiperSlide key={imgIdx} className={styles.slide}>
                        <div className={styles.imageContainer}>
                          {mediaType === 'video' ? (
                            <video
                              className={styles.slideVideo}
                              src={src}
                              poster={poster}
                              playsInline
                              muted
                              loop
                              autoPlay
                            />
                          ) : (
                            <Image
                              src={src}
                              alt={project.headline}
                              className={styles.slideImage}
                              width="1050"
                              height="685"
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className={`${styles.row} ${styles.copyContainer}`}>
                <div className={styles.pillContainer}>
                  <Pill label={project.industry} color="white" />
                  <ul>
                    {project.roles.map((roleItem, roleIdx) => (
                      <Pill key={roleIdx} label={roleItem} color="pink" />
                    ))}
                  </ul>
                </div>
                <div className={styles.copy}>
                  <h3>{project.headline}</h3>
                  <p>{project.paragraph}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <DragCursor show={showCursor} />
    </>
  );
};

export default ProjectCarousel;