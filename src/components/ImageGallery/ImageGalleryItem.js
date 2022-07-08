import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
function ImageGalleryItem({ webformatURL, tags, onClickModal }) {
  return (
    <img
      src={webformatURL}
      alt={tags}
      onClick={onClickModal}
      className={s.galleryImg}
    />
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
