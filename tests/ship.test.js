import Ship from '../src/factoryFunctions/ship';

describe('Ship', () => {
  describe('hit', () => {
    it('records a hit', () => {
      const ship = Ship('Destroyer', 3);
      ship.hit([1, 2]);
      const hitPositions = ship.getHitPositions();
      expect(hitPositions).toEqual([[1, 2]]);
    });
  });

  describe('isSunk', () => {
    it('returns true if the length is equal to the length of the hit array', () => {
      const ship = Ship('Patrol Boat', 2);
      ship.hit([0, 0]);
      ship.hit([0, 1]);
      const isSunk = ship.isSunk();

      expect(isSunk).toBeTruthy();
    });

    it('returns false if the length is not equal to the length of the hit array', () => {
      const ship = Ship('Submarine', 3);
      ship.hit([0, 0]);
      ship.hit([0, 1]);
      const isSunk = ship.isSunk();

      expect(isSunk).not.toBeTruthy();
    });
  });
});
