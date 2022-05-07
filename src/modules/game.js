/* eslint-disable implicit-arrow-linebreak */
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

  let shipIdToPlace = 0;
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();
  computerBoard.autoPlaceShips();
  const player = Player();
  const computerPlayer = ComputerPlayer();

  const allShipsPlaced = () => shipTypes.length === shipIdToPlace;

  const getShipToPlace = () => {
    const ship = shipTypes[shipIdToPlace];
    return ship;
  };

  const getPlayerMisses = () => playerBoard.getMisses();

  const getPlayerHits = () => playerBoard.getDamagedPositions();

  const getComputerMisses = () => computerBoard.getMisses();

  const getComputerHits = () => computerBoard.getDamagedPositions();

  const resetPlayerBoard = () => {
    shipIdToPlace = 0;
    playerBoard.reset();
  };

  const placePlayerRandom = () => {
    resetPlayerBoard();
    playerBoard.autoPlaceShips();
    shipIdToPlace = shipTypes.length;
  };

  const placePlayerShip = (coordinate) => {
    const shipType = shipTypes[shipIdToPlace].type;
    shipIdToPlace += 1;
    playerBoard.placeShip(shipType, coordinate);
  };

  const getPlayerShipsPositions = () => playerBoard.getShipsCoordinates();

  const availablePositions = (coordinates) =>
    playerBoard.canPlaceAt(coordinates);

  return {
    allShipsPlaced,
    getShipToPlace,
    getPlayerMisses,
    getPlayerHits,
    getComputerMisses,
    getComputerHits,
    placePlayerRandom,
    getPlayerShipsPositions,
    resetPlayerBoard,
    placePlayerShip,
    availablePositions,
  };
})();

export default Game;
