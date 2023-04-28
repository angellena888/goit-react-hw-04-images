import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showModal: false,
    largeImageURL: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const API_KEY = '34508452-be9fd8685a6af31007ab8f46e';
    const BASE_URL = 'https://pixabay.com/api/';
    const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = largeImageURL => {
    this.setState({
      largeImageURL,
      showModal: true,
    });
  };

  render() {
    const { images, showModal, isLoading, error, largeImageURL } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <p>Something went wrong. Please try again.</p>}
        <ImageGallery images={images} onClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
