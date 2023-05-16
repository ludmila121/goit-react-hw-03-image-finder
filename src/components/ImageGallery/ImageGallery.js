import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({images, onOpenModal}) => (
    <ul className={s.ImageGallery}>
        {images.map(image => {
            const {id, webformatURL, tags} = image;
            return <ImageGalleryItem key={id} src={webformatURL} alt={tags} id={id} onOpenModal= {onOpenModal}/>
        })}
    </ul>
);
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL:PropTypes.string.isRequired,
            tags:PropTypes.string.isRequired,
        }),
    )
};
export default ImageGallery;