import css from './Button.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <div className={css.Button_div}>
      <button className={css.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
