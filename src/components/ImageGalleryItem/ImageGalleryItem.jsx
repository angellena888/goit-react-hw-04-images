import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, index, onImageClick }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        onClick={() => onImageClick(index)}
        alt=""
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
