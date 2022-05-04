import Ship from './ship';

const Gameboard = () => {
  const ships = [];

  // Returns an array of positions based on initialCoor and shipLength and X axis
  const positionsXaxis = (shipLength, initialCoordinate) => {
    const positions = [];

    for (let i = 0; i < shipLength; i += 1) {
      positions.push([initialCoordinate[0], initialCoordinate[1] + 1 * i]);
    }

    return positions;
  };

  // Returns an array of positions based on initialCoor and shipLength and Y axis
  const positionsYaxis = (shipLength, initialCoordinate) => {
    const positions = [];

    for (let i = 0; i < shipLength; i += 1) {
      positions.push([initialCoordinate[0] + 10 * i, initialCoordinate[1]]);
    }

    return positions;
  };

  const placeOnGivenAxis = (shipLength, initialCoordinate, axis, type) => {
    let positions = [];
    if (axis === 'X') {
      positions = positionsXaxis(shipLength, initialCoordinate);
    } else {
      positions = positionsYaxis(shipLength, initialCoordinate);
    }

    ships.push({ ship: Ship(type, shipLength), positions });
  };

  const placeShip = (type, coordinate, axis) => {
    if (type === 'Patrol Boat') {
      placeOnGivenAxis(2, coordinate, axis, type);
    } else if (type === 'Submarine') {
      placeOnGivenAxis(3, coordinate, axis, type);
    }
  };

  const getShips = () => ships;

  return {
    placeShip,
    getShips,
  };
};

export default Gameboard;
