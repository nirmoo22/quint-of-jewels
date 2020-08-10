import { useEffect, useState } from 'react';

function useGetDiamondLocations(grid, diamondsFoundAt, activeBlockLocation) {
  const [diamondLocations, setDiamondLocations] = useState([]);

  useEffect(() => {

    const newDiamondLocations = [];
    grid.forEach((block, idx) => {
      if (block.hasDiamond && !diamondsFoundAt[idx])
          newDiamondLocations.push(idx);
    })
    setDiamondLocations(newDiamondLocations);
    return () => {
      setDiamondLocations([])
    }
  // eslint-disable-next-line
  }, [grid, activeBlockLocation])

  return diamondLocations;

}

export default useGetDiamondLocations;
