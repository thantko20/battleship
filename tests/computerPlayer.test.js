import ComputerPlayer from '../src/factoryFunctions/computerPlayer';

describe('ComputerPlayer', () => {
  describe('attack', () => {
    const board = {
      damagedPositions: [],
      misses: [],
      getDamagedPositions: function () {
        return this.damagedPositions;
      },
      getMisses: function () {
        return this.misses;
      },
      receiveAttack: function (coordinate) {
        this.damagedPositions.push(coordinate);
      },
    };

    const player = ComputerPlayer();
    it('attacks at random position', () => {
      player.attack(board);
      const hitCount = board.getDamagedPositions().length;
      expect(hitCount).toBe(1);
    });
  });
});
