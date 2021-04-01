import styles from '../styles/Block.module.css';
import React from 'react';
import diamondImg from '../assets/images/diamond.png';
import constants from '../constants';

function PeekingBlock(props) {

  const {
    hasDiamond,
  } = props

  return (
    <div className={styles.block}
      // change height to something better
      style={{ minHeight: constants.gameBlocks + 'px' }}
    >
      {
        hasDiamond &&
        <img className={styles.blockImg} src={diamondImg} alt="Diamonds" />
      }
    </div>
  )


}

export default PeekingBlock;
