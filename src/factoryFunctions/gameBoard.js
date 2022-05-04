import Ship from './ship';

const Gameboard = () => {
  const ships = [];

  // Returns an array of positions based on initialCoor and shipLength and X axis
  const positionsXaxis = (shipLength, initialCoordinate) => {
    const positions = [initialCoordinate];

    for (let i = 0; i < shipLength; i += 1) {
      positions.push([initialCoordinate[0], initialCoordinate[1] + 1]);
    }

    return positions;
  };

  // Returns an array of positions based on initialCoor and shipLength and Y axis
  const positionsYaxis = (shipLength, initialCoordinate) => {
    const positions = [initialCoordinate];

    for (let i = 0; i < shipLength; i += 1) {
      positions.push([initialCoordinate[0] + 10, initialCoordinate[1]]);
    }

    return positions;
  };

  const positionsOnGivenAxis = (shipLength, initialCoordinate, axis) => {
    if (axis === 'X') {
      return positionsXaxis(shipLength, initialCoordinate);
    }

    return positionsYaxis(shipLength, initialCoordinate);
  };

  const placeShip = (type, coordinate, axis) => {
    if (type === 'Patrol Boat') {
      const positions = positionsOnGivenAxis(1, coordinate, axis);

      ships.push({ ship: Ship(type, 2), positions });
    }
  };

  const getShips = () => ships;

  return {
    placeShip,
    getShips,
  };
};

export default Gameboard;
