'use client';
import { useEffect, useState } from 'react';
import styles from './modal.module.scss';
import LinkCta from '../LinkCta/LinkCta';

export default function Modal({ open, onClose, children }) {
  const [animateIn, setAnimateIn] = useState(false);

  return (
    <div className={`${styles.modal} ${open ? styles.open : ''}`} role="dialog" aria-modal="true">
      <div className={styles.row}>
          <LinkCta href="#" value="Close" className={styles.closeButton} onClick={(e) => { e.preventDefault(); onClose(); }} aria-label="Close modal" />
      </div>
      <div className={styles.row}>
        {children}
      </div>
    </div >
  );
}