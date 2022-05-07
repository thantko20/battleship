const Player = () => {
  const attack = (coordinate, board) => board.receiveAttack(coordinate);

  return {
    attack,
  };
};

export default Player;
