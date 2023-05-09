import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

function Modal({ largeImage, toggleModal }) {
  const handleEscape = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;