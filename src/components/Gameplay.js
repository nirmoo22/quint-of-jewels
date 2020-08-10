import styles from '../styles/Gameplay.module.css';
import React from 'react';
import {
  useState,
  useEffect,
} from 'react';
import Block from './Block';
import constants from '../constants'
import Button from './Button';
import useCreateGameplayGrid from '../hooks/useCreateGameplayGrid';
import useGetDiamondLocations from '../hooks/useGetDiamondLocations';

function Gameplay(props) {

  const {
    onReplayGame
  } = props;

  const [playState, setPlayState] = useState({
    score: constants.gameBlocks - constants.diamondsToFind,
    diamondsLeftToFind: constants.diamondsToFind,
    won: false,
    activeBlockLocation: -1,
    diamondsFoundAt: {}
  })

  const playGrid = useCreateGameplayGrid();
  const diamondLocations = useGetDiamondLocations(
    playGrid, playState.diamondsFoundAt, playState.activeBlockLocation
  );

  useEffect(() => {
    if (playState.diamondsLeftToFind === 0) {
      setPlayState(prevState => {
        prevState.won = true;
        return {...prevState}
      })
    }
  }, [playState.diamondsLeftToFind])

  const onDiamondFound = (newActiveBlockLocation) => {
    setPlayState(prevState => {
      prevState.diamondsLeftToFind -= 1;
      prevState.activeBlockLocation = newActiveBlockLocation
      prevState.diamondsFoundAt[newActiveBlockLocation] = true;
      return {...prevState}
    });
  }

  const onBlockOpened = (newActiveBlockLocation) => {
    setPlayState(prevState => {
      prevState.score -= 1;
      prevState.activeBlockLocation = newActiveBlockLocation
      return {...prevState}
    })
  }

  const replayGame = () => {
    onReplayGame();
  }

  return (
    <>
      <div className={styles.ratioMaintainer}>
        <div className={styles.grid}>
          {
            playGrid.map((blockState, idx) => (
              <Block
                key={idx}
                blockLocation={idx}
                hasDiamond={blockState.hasDiamond}
                isOpen={blockState.isOpen}
                onDiamondFound={onDiamondFound}
                onBlockOpened={onBlockOpened}
                diamondLocations={diamondLocations}
                won={playState.won}
                activeBlockLocation={playState.activeBlockLocation}
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
        <>
          <div className={styles.infoArea}>
              Congratulations you found all the diamonds!!
              <span className={styles.score}>
                Score: {playState.score}
              </span>
          </div>
          <div className={styles.infoArea}>
            <Button
              className = {styles.replayBtn}
              onClick={replayGame}
            >
              Replay
            </Button>
          </div>
        </>
      }
    </>
  )
}

export default Gameplay;
