import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'services/fetchImages';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export class App extends Component {
  state = {
    searchData: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchData = prevState.searchData;
    const { searchData, page, images } = this.state;
    if (prevPage !== page || prevSearchData !== searchData) {
      try {
        this.setState({ isLoading: true });
        const response = fetchImages(searchData, page);
        response.then(data => {
          data.data.hits.length === 0
            ? this.setState({ error: 'Nothing found' })
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }

  onSubmit = searchData => {
    if (searchData.trim() === '') {
      return this.setState({ error: 'Enter the meaning for search' });
    } else if (searchData === this.state.searchData) {
      return;
    }
    this.setState({
      searchData: searchData,
      page: 1,
      images: [],
      error: null,
    });
  };

  onClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onImageClick = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { toggleModal, onImageClick, onClick, onSubmit } = this;
    const { images, isLoading, largeImage, showModal, error } = this.state;

    return (
      <div>
        <Searchbar onSubmit={onSubmit} />
        {error && <p>{error}</p>}
        {images.length !== 0 && (
          <ImageGallery images={images} onImageClick={onImageClick} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        {images.length >= 12 && <Button onClick={onClick} />}
      </div>
    );
  }
}