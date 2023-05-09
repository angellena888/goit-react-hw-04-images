import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'services/fetchImages';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export function App() {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImages(searchData, page);
        const data = response.data;
        if (data.hits.length === 0) {
          setError('Nothing found');
        } else {
          const newImages = data.hits.map(
            ({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })
          );
          setImages(images => [...images, ...newImages]);
          setError(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (page > 0) {
      fetchImagesData();
    }
  }, [searchData, page]);

  const onSubmit = searchData => {
    if (searchData.trim() === '') {
      setError('Enter the meaning for search');
      return;
    }
    setSearchData(searchData);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const onClick = () => {
    setPage(page => page + 1);
  };

  const onImageClick = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {error && <p>{error}</p>}
      {images.length !== 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && <Loader />}
      {images.length >= 12 && <Button onClick={onClick} />}
    </div>
  );
}
