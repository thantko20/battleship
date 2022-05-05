const Player = () => {
  let turn = true;

  const attack = (coordinate, board) => board.receiveAttack(coordinate);

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

export default Player;
