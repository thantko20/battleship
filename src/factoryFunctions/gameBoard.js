import Ship from './ship';

const Gameboard = () => {
  const ships = [];

  const placeShip = (type, coordinates) => {
    const ship = Ship(type, coordinates.length);
    ships.push({ ship, coordinates });
  };

  const getShips = () => ships;

  return {
    placeShip,
    getShips,
  };
};

export default Gameboard;
