import { useState, useEffect } from 'react';
import constants from '../constants';

// Assuming grid will always be square.
const blocksPerRow = Math.sqrt(constants.gameBlocks);

/**
 * 
 * @param {Array} diamondLocations Array containing the indexes of the diamonds 
 *  in the Playgrid.
 * @param {Number} blockLocation The index of the block in the playring grid.
 * @param {boolean} blockHasDiamond Whether the current box has diamonds.
 */
function useFindNearestDiamond(diamondLocations, blockLocation, blockHasDiamond) {

  const [nearestDiamondLocation, setNearestDiamondLocation] = useState('')

  useEffect(() => {
    if (blockHasDiamond)
      setNearestDiamondLocation('')
    else {
      const blockRow = getBlockRow(blockLocation);
      const blockCol = getBlockColumn(blockLocation);
      let distance = {
        x: Infinity,
        y: Infinity,
        absX: Infinity,
        absY: Infinity,
      }

      for (const location of diamondLocations) {
        const diamondRow = getBlockRow(location);
        const diamondCol = getBlockColumn(location);

        const distX = diamondRow - blockRow;
        const distY = diamondCol - blockCol;

        const currDistance = {
          x: distX,
          y: distY,
          absX: Math.abs(distX),
          absY: Math.abs(distY)
        }

        // Take minimum of |x1 + y1| & |x2 + y2|
        if (
          currDistance.absX + currDistance.absY <
          distance.absX + distance.absY
        ) {
          distance = currDistance;
        }
      }
      const locationString = getDiamondPositionFromDistance(distance);
      setNearestDiamondLocation(locationString)
    }

    return (() => {
      setNearestDiamondLocation('')
    })

  // eslint-disable-next-line
  }, [diamondLocations])

  return nearestDiamondLocation;
}

// Will return row based on the index of the block
const getBlockRow = (blockLocation) => {
  return Math.floor(blockLocation / blocksPerRow)
}

// Will return column based on the index of the block
const getBlockColumn = (blockLocation) => {
  return blockLocation % blocksPerRow
}

const getDiamondPositionFromDistance = (distance) => {
  let locationString = '';
  
  if (distance.x < 0)
    locationString += 'top '
  else if (distance.x > 0)
    locationString += 'bottom '
  
  if (distance.y < 0)
    locationString += 'left '
  else if (distance.y > 0)
    locationString += 'right '

  return locationString;
}

export default useFindNearestDiamond;
