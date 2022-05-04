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
});
