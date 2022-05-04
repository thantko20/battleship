import Gameboard from '../src/factoryFunctions/gameBoard';

describe('Gameboard', () => {
  describe('placeShip', () => {
    it('places a patrol boat vertically', () => {
      const board = Gameboard();
      board.placeShip('Patrol Boat', [0, 0], 'Y');
      const occupiedCoordinates = board.getShips()[0].positions;
      const expected = [
        [0, 0],
        [10, 0],
      ];
      expect(occupiedCoordinates).toEqual(expected);
    });
  });
});
