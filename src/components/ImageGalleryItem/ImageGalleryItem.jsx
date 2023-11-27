import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };

  return (
    <li className={css.galleryItem} onClick={handleClick}>
      <img className={css.galleryImage} src={image.webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
