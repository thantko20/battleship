/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
import Ship from './ship';

const Gameboard = () => {
  const ships = [];

  const getShipsCoordinates = () => {
    const eachShipCoor = ships.map((ship) => ship.coordinates);
    return eachShipCoor.flat();
  };

  const placeShip = (type, coordinates) => {
    const ship = Ship(type, coordinates.length);
    ships.push({ ship, coordinates });
  };

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

  const canPlaceAt = (coordinates) =>
    !containsCoor(coordinates) && checkWithinRange(coordinates);

  const getShips = () => ships;

  return {
    placeShip,
    getShips,
    canPlaceAt,
  };
};

export default Gameboard;
