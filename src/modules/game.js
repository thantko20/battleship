import ComputerPlayer from '../factoryFunctions/computerPlayer';
import Gameboard from '../factoryFunctions/gameBoard';
import Player from '../factoryFunctions/player';

/* eslint-disable wrap-iife */
const Game = (function () {
  const shipTypes = [
    { type: 'Patrol Boat', length: 2 },
    { type: 'Submarine', length: 3 },
    { type: 'Destroyer', length: 3 },
    { type: 'Battleship', length: 4 },
    { type: 'Carrier', length: 5 },
  ];

  const shipToPlace = shipTypes[0];
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();
  const player = Player();
  const computerPlayer = ComputerPlayer();

  const getShipToPlace = () => shipToPlace;

  const getPlayerMisses = () => playerBoard.getMisses();

  const getPlayerHits = () => playerBoard.getDamagedPositions();

  const getComputerMisses = () => computerBoard.getMisses();

  const getComputerHits = () => computerBoard.getDamagedPositions();

  return {
    getShipToPlace,
    getPlayerMisses,
    getPlayerHits,
    getComputerMisses,
    getComputerHits,
  };
})();

export default Game;
