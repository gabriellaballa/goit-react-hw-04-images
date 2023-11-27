import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick, label }) => {
  return (
    <button className={css.loadmorebtn} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
