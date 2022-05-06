/* eslint-disable operator-linebreak */
const ComputerPlayer = () => {
  let turn = true;
  // let lastHitCoordinate = null;

  // const genCoorOnLastHit = (board) => {
  //   // Choose axis
  //   const possibleCoors = [
  //     [lastHitCoordinate[0] + 1, lastHitCoordinate[1]],
  //     [lastHitCoordinate[0] - 1, lastHitCoordinate[1]],
  //     [lastHitCoordinate[0], lastHitCoordinate[1] + 1],
  //     [lastHitCoordinate[0], lastHitCoordinate[1] - 1],
  //   ];

  //   const random = Math.floor(Math.random() * possibleCoors.length)
  //   return possibleCoors
  // };

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
    while (
      board.getDamagedPositions().includes(coordinate) ||
      board.getMisses().includes(coordinate)
    ) {
      coordinate = genRandomCoordinate();
    }

    return coordinate;
  };

  const attack = (board) => {
    const coordinate = attackIntelligence(board);
    board.receiveAttack(coordinate);
  };

  const changeTurn = () => {
    turn = !turn;
  };

  const isTurn = () => turn;

  return {
    attack,
    changeTurn,
    isTurn,
  };
};

export default ComputerPlayer;
