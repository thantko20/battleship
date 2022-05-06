/* eslint-disable function-paren-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
import Ship from './ship';

/* Gameboard factory
 * @parameter - none
 * includes functions for placing and creating ships,
 * receiving attacks and registering them into hits or misses,
 * coveying hits to specific ships
 * @returns - an object
 */
const Gameboard = () => {
  let ships = [];
  const misses = [];

  const findShipIndex = (coordinate) =>
    ships
      .map((ship) => ship.coordinates)
      .findIndex((position) =>
        position.some((coor) => coor.toString() === coordinate.toString()),
      );

  const getShipsCoordinates = () =>
    ships.map((ship) => ship.coordinates).flat();

  const registerHit = (coordinate) => {
    const index = findShipIndex(coordinate);
    ships[index].ship.hit(coordinate);
  };

  const registerMiss = (coordinate) => misses.push(coordinate);

  const containsCoor = (coordinates) => {
    let contains = false;
    coordinates.forEach((coordinate) => {
      getShipsCoordinates().forEach((shipCoor) => {
        if (coordinate[0] === shipCoor[0] && coordinate[1] === shipCoor[1]) {
          contains = true;
        }
      });
    });

    return contains;
  };

  const checkWithinRange = (coordinates) => {
    let isWithinRange = true;

    coordinates.forEach((coordinate) => {
      const x = coordinate[0];
      const y = coordinate[1];

      if (!(x >= 0 && x <= 11 && y >= 0 && y <= 11)) {
        isWithinRange = false;
      }
    });

    return isWithinRange;
  };

  const placeShip = (type, coordinates) => {
    const ship = Ship(type, coordinates.length);
    ships.push({ ship, coordinates });
  };

  const getShips = () => ships;

  const canPlaceAt = (coordinates) =>
    !containsCoor(coordinates) && checkWithinRange(coordinates);

  const getMisses = () => misses;

  const receiveAttack = (coordinate) => {
    const shipsPositions = getShipsCoordinates();
    if (
      shipsPositions.some(
        (position) => position.toString() === coordinate.toString(),
      )
    ) {
      registerHit(coordinate);
    } else {
      registerMiss(coordinate);
    }
  };

  const getDamagedPositions = () =>
    ships.map((ship) => ship.ship.getHitPositions()).flat();

  // Unoptimized method. I'm too lazy to scaffold this code.
  const generateRandomCoordinates = (shipLength) => {
    while (true) {
      const coordinates = [];
      const axis = Math.random() >= 0.5 ? 'X' : 'Y';

      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const randomCoordinate = [x, y];

      for (let i = 0; i < shipLength; i += 1) {
        let coordinate;

        if (axis === 'X') {
          coordinate = [randomCoordinate[0], randomCoordinate[1] + i];
        } else {
          coordinate = [randomCoordinate[0] + i, randomCoordinate[1]];
        }
        coordinates.push(coordinate);
      }

      if (canPlaceAt(coordinates)) return coordinates;
    }
  };

  // Reset the board making ships array get rid of its items
  const reset = () => {
    ships = [];
  };

  // Experiment. Unstable, Unoptimized Method. (Also not tested :) )
  const autoPlaceShips = () => {
    // Place Patrol Boat
    placeShip('Patrol Boat', generateRandomCoordinates(2));
    // Submarine
    placeShip('Submarine', generateRandomCoordinates(3));
    // Destroyer
    placeShip('Destroyer', generateRandomCoordinates(3));
    // Battleship
    placeShip('Battleship', generateRandomCoordinates(4));
    // Carrier
    placeShip('Carrier', generateRandomCoordinates(5));
  };

  return {
    placeShip,
    getShips,
    canPlaceAt,
    getMisses,
    receiveAttack,
    getDamagedPositions,
    autoPlaceShips,
    getShipsCoordinates,
    reset,
  };
};

export default Gameboard;
