const Ship = (type, length) => {
  const hitPositions = [];

  const getHitPositions = () => hitPositions;

  const getType = () => type;

  const hit = (coordinate) => hitPositions.push(coordinate);

  const isSunk = () => length === hitPositions.length;

  return {
    getHitPositions,
    getType,
    hit,
    isSunk,
  };
};

export default Ship;
