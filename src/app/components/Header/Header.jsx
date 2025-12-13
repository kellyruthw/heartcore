'use client'
import { useState, useRef, useEffect } from 'react';
import styles from './header.module.scss';
import logo from '/public/svgs/logo-white.svg';
import Link from 'next/link';
import Image from 'next/image';
import Form from '../Form/Form';
import { useModal } from '../UI/Modal/ModalProvider';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(false);
    const menuPanelRef = useRef(null);
    const { openModal, hideModal } = useModal();

    // Scroll effect for logo
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 200);
            setActive(window.scrollY > 500);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (
                menuPanelRef.current &&
                !menuPanelRef.current.contains(e.target) &&
                !e.target.closest(`.${styles.menuButton}`)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    return (
        <header className={`${styles.header} ${active ? styles.active : ''}`}>
            <div className={styles.row}>
                <Link href="/" className={styles.logoLink} aria-label="Home">
                    <Image
                        src={logo}
                        alt="Heartcore Logo"
                        className={`${styles.logo} ${scrolled ? styles.visible : ''}`}
                        width={200}
                        height={30}
                    />
                </Link>
                <a
                    href="#"
                    className={`${styles.menuButton} ${open ? styles.active : ''}`}
                    onClick={e => {
                        e.preventDefault();
                        setOpen(o => !o);
                    }}
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    <span className={styles.menuText}>{open ? "Close" : "Menu"}</span>
                    <span className={`${styles.iconMenu} ${open ? styles.open : ''}`}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </span>
                </a>
            </div>
            <div
                ref={menuPanelRef}
                className={`${styles.menuPanel} ${open ? styles.open : ''}`}
            >
                <nav>
                    <ul>
                        <li>
                            <Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                }}>
                                Home
                            </Link>
                        </li>
                        <li><Link href="#work" onClick={() => setOpen(false)}>Work</Link></li>
                        <li><Link href="#services" onClick={() => setOpen(false)}>Services</Link></li>
                        <li><Link href="#testimonials" onClick={() => setOpen(false)}>Testimonials</Link></li>
                        <li><Link
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                                openModal();
                            }}>
                            Contact
                        </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header >
    );
};

export default Header;