import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  const handleClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
