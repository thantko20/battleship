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
        [9, 1],
        [10, 1],
        [11, 1],
      ];

      const canPlaceAt = board.canPlaceAt(coordinates);
      expect(canPlaceAt).toBe(false);
    });
  });
});
