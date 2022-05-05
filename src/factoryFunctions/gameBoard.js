/* eslint-disable function-paren-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
import Ship from './ship';

/* Gameboad factory
 * @parameter - none
 * includes functions for placing and creating ships,
 * receiving attacks and registering them into hits or misses,
 * coveying hits to specific ships
 * @returns - an object
 */
const Gameboard = () => {
  const ships = [];
  const misses = [];

  const findShipIndex = (coordinate) =>
    ships
      .map((ship) => ship.coordinates)
      .findIndex((position) =>
        position.some((coor) => coor.toString() === coordinate.toString()),
      );

  const getShipsCoordinates = () => {
    const eachShipCoor = ships.map((ship) => ship.coordinates);
    return eachShipCoor.flat();
  };

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

      if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
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

  return {
    placeShip,
    getShips,
    canPlaceAt,
    getMisses,
    receiveAttack,
    getDamagedPositions,
  };
};

export default Gameboard;
