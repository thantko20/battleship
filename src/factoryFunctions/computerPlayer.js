/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const ComputerPlayer = () => {
  const includes = (coordinates, coordinate) =>
    coordinates.some((cell) => cell.toString() === coordinate.toString());

  const genRandomCoordinate = () => [
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 12),
  ];
  // I can select random coordinate
  // and check if the random coordinate
  // has been hit or not
  // Or select random coordinate on first hit
  // Also check for the hit coordinates in board
  // Select around hit coordinates
  // I will have last hit target, based on that I'm gonna choose horizontally or
  // Vertically
  const attackIntelligence = (board) => {
    let coordinate;

    coordinate = genRandomCoordinate();
    const occupiedCells = board.getDamagedPositions().concat(board.getMisses());
    while (includes(occupiedCells, coordinate)) {
      coordinate = genRandomCoordinate();
    }

    return coordinate;
  };

  const attack = (board) => {
    const coordinate = attackIntelligence(board);
    board.receiveAttack(coordinate);
  };

  return {
    attack,
  };
};

export default ComputerPlayer;
