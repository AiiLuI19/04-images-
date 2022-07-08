import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/fetchImages';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from '../Loader';
import Modal from '../Modal';
import Button from '../Button';
import s from './ImageGallery.module.css';

const ImageGallery = ({ imgName }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => setPage(1), [imgName]);

  const fetchImages = useCallback(() => {
    if (!imgName) {
      return;
    }
    const { fetchImages } = api;
    setStatus('pending');
    fetchImages(imgName, page)
      .then(images => {
        setImages(prevState =>
          page > 1 ? [...prevState, ...images.hits] : images.hits
        );
        if (page === 1) {
          setTotalPages(Math.ceil(images.totalHits / 12));
        }
        setStatus('resolved');
        if (!images.hits.length) {
          setImages([]);
          setStatus('rejected');
          toast.error(`Sorry, not found`);
          return;
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imgName, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = img => {
    setShowModal(!showModal);
    setLargeImage(img);
  };

  return (
    <>
      {status === 'rejected' && <h1>{error}</h1>}

      <>
        <ul className={s.gallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id} className={s.item}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                tags={tags}
                onClickModal={() => toggleModal(largeImageURL)}
              />
            </li>
          ))}
        </ul>
        {status === 'pending' && <Loader />}
        {page !== totalPages && status === 'resolved' && (
          <Button onLoadMore={onLoadMore} />
        )}
      </>

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" className={s.modalImage} />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
};
export default ImageGallery;
