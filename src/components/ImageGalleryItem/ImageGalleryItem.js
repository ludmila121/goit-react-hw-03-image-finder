import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, id, onOpenModal, largeImageURL }) => {
  return (
    <>
      <li
        className={s.ImageGalleryItem}
        onClick={() => onOpenModal({ largeImageURL, alt })}
      >
        <img className={s.ImageGalleryItemImage} src={src} alt={alt} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
