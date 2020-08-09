import styles from '../styles/Block.module.css';
import React from 'react';
import {
  useState,
  useEffect,
} from 'react';

function Block(props) {

  const {
    hasDiamond,
    isOpen,
    onDiamondFound,
    onBlockOpened,
  } = props

  const [blockState, setBlockState] = useState({
    isOpen: isOpen,
    hasDiamond: hasDiamond,
  })

  useEffect(() => {
    if (blockState.isOpen && blockState.hasDiamond)
      onDiamondFound();
    else if (blockState.isOpen)
      onBlockOpened();
  // eslint-disable-next-line
  },[blockState])

  const changeOpenState = () => {
    setBlockState(prevState => {
      let newState = prevState;
      newState.isOpen = true;
      return {...newState};
    })
  }
  

  return (
    <div className={styles.block + ' pointer'}
      onClick={changeOpenState}
    >
      {
        blockState.isOpen && blockState.hasDiamond && 'D'
      }
      {
        !blockState.isOpen && 'Q'
      }
    </div>
  )


}

export default Block;
