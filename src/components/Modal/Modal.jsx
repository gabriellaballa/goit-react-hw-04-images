import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  const handleClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
