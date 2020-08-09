import styles from '../styles/Button.module.css';
import React from 'react';

function Button(props) {

  const {
    className,
    ...rest
  } = props;

  return (
    <button 
      className={
        (className ? className : ' ') + ' ' + 
        styles.btn
      }
      {...rest}
    >
      {props.children}
    </button>
  )

}

export default Button;
