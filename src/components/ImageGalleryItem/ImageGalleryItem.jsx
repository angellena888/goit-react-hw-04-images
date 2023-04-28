import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  // handleClick = () => {
  //   const { largeImageURL, onImageClick } = this.props;
  //   onImageClick(largeImageURL);
  // };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props;

    return (
      <div>
        <li
          className={css.ImageGalleryItem}
          onClick={this.toggleModal}
        >
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItem_image}
            // onClick={this.handleClick}
            width="280"
            height="240"
          />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" width="600 " height="450" />
          </Modal>
        )}
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
