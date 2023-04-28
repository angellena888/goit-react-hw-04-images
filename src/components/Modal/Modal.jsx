import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }


  render() {
    const { isOpen, onClose, children } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={css.Overlay} onClick={onClose}>
        <div className={css.Modal}>
          <button onClick={onClose}>X</button>
          <div>{children}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
