import styles from '../styles/Block.module.css';
import React from 'react';
import diamondImg from '../assets/images/diamond.png';

function PeekingBlock(props) {

  const {
    hasDiamond,
  } = props

  return (
    <div className={styles.block}
    >
      {
        hasDiamond &&
        <img className={styles.blockImg} src={diamondImg} alt="Diamonds" />
      }
    </div>
  )


}

export default PeekingBlock;
