import Gameboard from '../src/factoryFunctions/gameBoard';

describe('Gameboard', () => {
  describe('placeShip', () => {
    it('places the patrol boat at given coordinates', () => {
      const board = Gameboard();
      const coordinates = [
        [0, 0],
        [0, 1],
      ];
      board.placeShip('Patrol Boat', coordinates);
      const placedCoordinates = board.getShips()[0].coordinates;

      expect(placedCoordinates).toBe(coordinates);
    });

    it('places the carrier at given coordinates', () => {
      const board = Gameboard();
      const coordinates = [
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
      ];
      board.placeShip('Carrier', coordinates);
      const placedCoordinates = board.getShips()[0].coordinates;

      expect(placedCoordinates).toBe(coordinates);
    });
  });

  describe('canPlaceAt', () => {
    it('returns true when the coordinates do not overlap with existing ships', () => {
      const board = Gameboard();
      const coordinates = [
        [1, 1],
        [2, 1],
        [3, 1],
      ];

      board.placeShip('Patrol Boat', [
        [2, 0],
        [3, 0],
      ]);

      const canPlaceAt = board.canPlaceAt(coordinates);
      expect(canPlaceAt).toBe(true);
    });
    it('returns false when the coordinates overlap with existing ships', () => {
      const board = Gameboard();
      const coordinates = [
        [1, 1],
        [2, 1],
        [3, 1],
      ];

      board.placeShip('Patrol Boat', [
        [2, 0],
        [2, 1],
      ]);

      const canPlaceAt = board.canPlaceAt(coordinates);
      expect(canPlaceAt).toBe(false);
    });

    it('returns false when one of the given coordinates is not in the board', () => {
      const board = Gameboard();
      const coordinates = [
        [10, 1],
        [11, 1],
        [12, 1],
      ];

      const canPlaceAt = board.canPlaceAt(coordinates);
      expect(canPlaceAt).toBe(false);
    });
  });

  describe('receive attack', () => {
    it('receives an attack and registers it as a miss', () => {
      const board = Gameboard();
      board.placeShip('Patrol Boat', [
        [0, 0],
        [0, 1],
      ]);
      board.receiveAttack([1, 1]);
      const misses = [[1, 1]];
      const result = board.getMisses();
      expect(result).toEqual(misses);
    });

    it('receives an attack and registers it as a hit to the ship', () => {
      const board = Gameboard();
      board.placeShip('Patrol Boat', [
        [0, 0],
        [0, 1],
      ]);
      board.receiveAttack([0, 1]);
      const hits = [[0, 1]];
      const result = board.getDamagedPositions();
      expect(result).toEqual(hits);
    });

    it('receives multiple attacks and registers them into miss or hit', () => {
      const board = Gameboard();
      board.placeShip('Patrol Boat', [
        [0, 0],
        [0, 1],
      ]);

      board.receiveAttack([0, 0]);
      board.receiveAttack([2, 1]);
      const hits = [[0, 0]];
      const misses = [[2, 1]];
      expect(board.getDamagedPositions()).toEqual(hits);
      expect(board.getMisses()).toEqual(misses);
    });
  });

  describe('autoPlaceShips', () => {
    it('auto places the ships', () => {
      const board = Gameboard();
      board.autoPlaceShips([
        { type: 'Patrol Boat', length: 2 },
        { type: 'Submarine', length: 3 },
        { type: 'Destroyer', length: 3 },
        { type: 'Battleship', length: 4 },
        { type: 'Carrier', length: 5 },
      ]);
      const shipCount = board.getShips().length;
      expect(shipCount).toBe(5);
    });
  });

  describe('reset', () => {
    it('resets the board,i.e, making ships array length back to 0', () => {
      const board = Gameboard();
      board.autoPlaceShips([
        { type: 'Patrol Boat', length: 2 },
        { type: 'Submarine', length: 3 },
        { type: 'Destroyer', length: 3 },
        { type: 'Battleship', length: 4 },
        { type: 'Carrier', length: 5 },
      ]);
      const before = board.getShips().length;

      expect(before).toBe(5);

      board.reset();
      const after = board.getShips().length;
      expect(after).toBe(0);
    });
  });

  describe('allShipsSunk', () => {
    it('returns true if all ships are sunk', () => {
      const board = Gameboard();
      board.placeShip('Patrol Boat', [
        [0, 0],
        [0, 1],
      ]);
      board.placeShip('Submarine', [
        [4, 0],
        [4, 1],
        [4, 2],
      ]);
      board.getShipsCoordinates().forEach((coordinate) => {
        board.receiveAttack(coordinate);
      });

      const result = board.allShipsSunk();
      expect(result).toBe(true);
    });

    it('returns false if not all ships are sunk', () => {
      const board = Gameboard();
      board.placeShip('Patrol Boat', [
        [0, 0],
        [0, 1],
      ]);
      board.placeShip('Submarine', [
        [4, 0],
        [4, 1],
        [4, 2],
      ]);
      board.receiveAttack([0, 0]);
      board.receiveAttack([0, 1]);
      const result = board.allShipsSunk();
      expect(result).toBe(false);
    });
  });
});
