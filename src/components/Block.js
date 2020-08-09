import styles from '../styles/Block.module.css';
import React from 'react';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import diamondImg from '../assets/images/diamond.png';
import questionImg from '../assets/images/question.png';

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

  const blockElt = useRef(null);
  const [blockMinHeight, setBlockMinHeight] = useState(null);

  useEffect(() => {
    if (blockState.isOpen && blockState.hasDiamond)
      onDiamondFound();
    else if (blockState.isOpen)
      onBlockOpened();
  // eslint-disable-next-line
  },[blockState])


  useEffect(() => {
    // Get offset height and assign it, to prevent flex item from collapsing
    // if row has no images.
    if (blockElt.current && blockElt.current.offsetHeight)
      setBlockMinHeight(blockElt.current.offsetHeight)
  }, [blockElt])

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
      ref={blockElt}
      style={{minHeight: blockMinHeight || 'initial'}}
    >
      {
        blockState.isOpen && blockState.hasDiamond && 
        <img className={styles.blockImg} src={diamondImg} alt="Diamonds" />
      }
      {
        !blockState.isOpen &&
        <img className={styles.blockImg} src={questionImg} alt="Not open" />
      }
    </div>
  )


}

export default Block;
