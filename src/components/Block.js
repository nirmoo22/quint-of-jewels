import styles from '../styles/Block.module.css';
import React from 'react';
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import useFindNearestDiamond from '../hooks/useFindNearestDiamond';
import diamondImg from '../assets/images/diamond.png';
import questionImg from '../assets/images/question.png';
import arrowImg from '../assets/images/arrow.png';

function Block(props) {

  const {
    blockLocation,
    hasDiamond,
    isOpen,
    onDiamondFound,
    onBlockOpened,
    diamondLocations,
    won,
    activeBlockLocation,
  } = props

  const [blockState, setBlockState] = useState({
    isOpen: isOpen,
    hasDiamond: hasDiamond,
  })

  const nearestDiamondLocation = useFindNearestDiamond(
    diamondLocations, blockLocation, blockState.hasDiamond
  )

  const blockElt = useRef(null);
  const [blockMinHeight, setBlockMinHeight] = useState(null);

  useEffect(() => {
    if (blockState.isOpen && blockState.hasDiamond)
      onDiamondFound(blockLocation);
    else if (blockState.isOpen)
      onBlockOpened(blockLocation);
  // eslint-disable-next-line
  },[blockState])


  useEffect(() => {
    // Get offset height and assign it, to prevent flex item from collapsing
    // if row has no images.
    if (blockElt.current && blockElt.current.offsetHeight)
      setBlockMinHeight(blockElt.current.offsetHeight)
  }, [blockElt])

  const changeOpenState = () => {
    if (!won && !blockState.isOpen) {
      setBlockState(prevState => {
        let newState = prevState;
        newState.isOpen = true;
        return {...newState};
      })
    }
  }

  /**
   * Gets appropriate class to rotate the arrow head.
   */
  const getClassForLocation = () => {
    switch(nearestDiamondLocation.trim()) {
      case 'top': return styles.top
      case 'bottom': return styles.bottom
      case 'left': return styles.left
      case 'right': return styles.right
      case 'top left': return styles.topLeft
      case 'top right': return styles.topRight
      case 'bottom left': return styles.bottomLeft
      case 'bottom right': return styles.bottomRight
      default: return ''
    }
  }

  const showHint = () => {
    return blockState.isOpen && !blockState.hasDiamond &&
      activeBlockLocation === blockLocation
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
        showHint() &&
        <img 
          className={styles.blockImg + ' ' + getClassForLocation()} 
          src={arrowImg} alt="Nearest" 
        />
      }
      {
        !blockState.isOpen &&
        <img className={styles.blockImg} src={questionImg} alt="Not open" />
      }
    </div>
  )


}

export default Block;
