import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import fetchImages from '../../services/fetchImages';
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

  useEffect(() => {
    if (!imgName) {
      return;
    }
    setStatus('pending');

    fetchImages
      .fetchImages(imgName, page)
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
// class ImageGallery extends Component {
//   state = {
//     images: [],
//     error: null,
//     status: 'idle',
//     page: 1,
//     totalPages: 1,
//     showModal: false,
//     largeImage: '',
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.imgName;
//     const nextName = this.props.imgName;
//     const { page } = this.state;
//     if (prevName !== nextName || prevState.page !== page) {
//       this.setState({ status: 'pending' });

//       fetchImages
//         .fetchImages(nextName, page)
//         .then(images => {
//           this.setState(prevState => ({
//             // images: [...images.hits],
//             images: [...prevState.images, ...images.hits],
//             totalPages: Math.ceil(images.totalHits / 12),
//             status: 'resolved',
//           }));
//           if (prevName !== nextName) {
//             this.setState({
//               images: [...images.hits],
//               status: 'resolved',
//             });
//           }
//           if (!images.hits.length) {
//             this.setState({ images: [], status: 'rejected' });
//             toast.error(`Sorry, ${nextName} not found`);
//             return;
//           }
//         })

//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   onLoadMore = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };
//   toggleModal = img => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeImage: img,
//     }));
//   };
//   render() {
//     const { images, error, status, page, totalPages, showModal, largeImage } =
//       this.state;
//     return (
//       <>
//         {status === 'rejected' && <h1>{error}</h1>}

//         <>
//           <ul className={s.gallery}>
//             {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//               <li key={id} className={s.item}>
//                 <ImageGalleryItem
//                   webformatURL={webformatURL}
//                   tags={tags}
//                   onClickModal={() => this.toggleModal(largeImageURL)}
//                 />
//               </li>
//             ))}
//           </ul>
//           {status === 'pending' && <Loader />}
//           {page !== totalPages && status === 'resolved' && (
//             <Button onLoadMore={this.onLoadMore} />
//           )}
//         </>

//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImage} alt={this.tags} className={s.modalImage} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
};
export default ImageGallery;
