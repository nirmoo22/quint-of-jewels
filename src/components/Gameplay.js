import styles from '../styles/Gameplay.module.css';
import React from 'react';
import {
  useState,
  useEffect,
} from 'react';
import Block from './Block';
import constants from '../constants'

function Gameplay() {

  const [playGrid, setPlayGrid] = useState([])

  const [playState, setPlayState] = useState({
    score: constants.gameBlocks,
    diamondsLeftToFind: constants.diamondsToFind,
    won: false,
  })

  useEffect(() => {
    setPlayGrid(() => {
      let newGrid = [];

      for (let i = 0; i < constants.gameBlocks; i++) {
        newGrid.push({
          hasDiamond: i < constants.diamondsToFind ? true : false,
          isOpen: false,
        })
      }
      newGrid = shuffleGrid(newGrid)
      return newGrid;
    })
  }, [])

  useEffect(() => {
    if (playState.diamondsLeftToFind === 0) {
      setPlayState(prevState => {
        prevState.won = true;
        return {...prevState}
      })
    }
  }, [playState.diamondsLeftToFind])

  const onDiamondFound = () => {
    setPlayState(prevState => {
      prevState.diamondsLeftToFind -= 1;
      return {...prevState}
    });
  }

  const onBlockOpened = () => {
    setPlayState(prevState => {
      prevState.score -= 1;
      return {...prevState}
    })
  }

  const shuffleGrid = (grid) => {
    for(let i = grid.length - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * i);
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }
    return [...grid]
  }

  return (
    <>
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
      <div className={styles.infoArea}>
        Diamonds found:
        <span className={styles.score}>
          {constants.diamondsToFind - playState.diamondsLeftToFind}/
          {constants.diamondsToFind}
        </span>
      </div>
      {
        playState.won &&
        <div className={styles.infoArea}>
            Congratulations you won!!
            <span className={styles.score}>
              Score: {playState.score - 1}
            </span>
        </div>
      }
    </>
  )
}

export default Gameplay;
