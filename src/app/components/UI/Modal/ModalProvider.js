'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import Modal from './Modal';
import Form from '../../Form/Form';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setOpen(false);
  }, []);


  return (
    <ModalContext.Provider value={{ openModal, hideModal }}>
      {children}
      <Modal open={open} onClose={hideModal}>
        <Form />
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    console.error('[useModal] No context found. Ensure ModalProvider wraps your app.');
    throw new Error('useModal must be used within ModalProvider');
  }
  return ctx;
}