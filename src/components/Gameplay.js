import styles from '../styles/Gameplay.module.css';
import React from 'react';
import {
  useState,
  useEffect,
} from 'react';
import Block from './Block';


const gameBlocks = 8 * 8;

function Gameplay() {

  const [playGrid, setPlayGrid] = useState([{
    hasDiamond: false,
    isOpen: false,
  }])

  const [playState, setPlayState] = useState({
    score: gameBlocks,
    diamondsLeftToFind: 8
  })

  useEffect(() => {
    setPlayGrid(() => {
      let newGrid = [];

      for (let i = 0; i < gameBlocks; i++) {
        newGrid.push({
          hasDiamond: i < 8 ? true : false,
          isOpen: false,
        })
      }
      newGrid = shuffleGrid(newGrid)
      return newGrid;
    })
  }, [])

  useEffect(() => {
    if (playState.diamondsLeftToFind === 0) {
      console.log('All diamonds found');
    }
  }, [playState.diamondsLeftToFind])

  const onDiamondFound = () => {
    setPlayState(prevState => {
      prevState.diamondsLeftToFind -= 1;
      return {...prevState}
    });
  }

  const onBlockOpened = (hasDiamond) => {
    setPlayState(prevState => {
      prevState.score -= 1;
      return {...prevState}
    })
  }

  const shuffleGrid = (grid) => {
    for(let i = grid.length - 1; i >= 1; i--) {
      let j = Math.round(Math.random() * i);
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }
    return grid
  }

  return (
    <div className={styles.ratioMaintainer}>
      <div className={styles.grid}>
        {
          playGrid.map((blockState, idx) => (
            <Block
              key={idx}
              hasDiamond={blockState.hasDiamond}
              isOpen={blockState.isOpen}
              onDiamondFound={onDiamondFound}
              onBlockOpened={onBlockOpened}
            >
            </Block>
          ))
        }
      </div>
    </div>
  )
}

export default Gameplay;
