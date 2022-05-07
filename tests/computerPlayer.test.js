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
    it('attacks at random position and it hits the ship', () => {
      player.attack(board);
      const hitCount = board.getDamagedPositions().length;
      expect(hitCount).toBe(1);
    });

    it('attacks at random position and it misses', () => {
      board.receiveAttack = function (coordinate) {
        this.getMisses().push(coordinate);
      };
      player.attack(board);
      const missCount = board.getMisses().length;
      expect(missCount).toBe(1);
    });
  });
});
