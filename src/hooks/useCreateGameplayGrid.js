import { useEffect, useState } from 'react';
import constants from '../constants';

function useCreateGameplayGrid() {
  const [playGrid, setPlayGrid] = useState([])

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

  return playGrid;
}

// Fisher-Yates Shuffle
const shuffleGrid = (grid) => {
  for(let i = grid.length - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * i);
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  return [...grid]
}

export default useCreateGameplayGrid;
