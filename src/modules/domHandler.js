/* eslint-disable operator-linebreak */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable wrap-iife */
import Game from './game';
import Cell from '../component/cell';

const domHandler = (function () {
  let ship = Game.getShipToPlace();
  // Queries for existing elements
  let axis = 'X';
  const playerBoardEl = document.querySelector('.player-board');
  const computerBoardEl = document.querySelector('.computer-board');
  const gameStage = document.querySelector('.game-stage-title');
  const axisBtn = document.querySelector('.axis');
  const placeRandomBtn = document.querySelector('.random-place');
  const resetBoardBtn = document.querySelector('.reset-board');

  const renderPlayerBoard = () => {
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const div = Cell('player', [i, j]);
        playerBoardEl.appendChild(div);
      }
    }
  };

  const renderComputerBoard = () => {
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const div = Cell('computer', [i, j]);
        computerBoardEl.appendChild(div);
      }
    }
  };

  const placeHoverEffect = (target) => {
    if (!ship) return;
    const shipType = ship.type;
    const shipLength = ship.length;
    gameStage.textContent = `Place Your ${shipType}`;
    const coordinate = target
      .getAttribute('coordinate')
      .split(',')
      .map((ordinate) => parseInt(ordinate, 10));

    for (let i = 0; i < shipLength; i++) {
      if (axis === 'X') {
        const updatedCoor = [coordinate[0], coordinate[1] + i];
        const candidateCell = playerBoardEl.querySelector(
          `.grid-cell[coordinate="${updatedCoor[0]},${updatedCoor[1]}"]`,
        );

        if (candidateCell) candidateCell.setAttribute('hover', '');
      } else {
        const updatedCoor = [coordinate[0] + i, coordinate[1]];
        const candidateCell = playerBoardEl.querySelector(
          `.grid-cell[coordinate="${updatedCoor[0]},${updatedCoor[1]}"]`,
        );

        if (candidateCell) candidateCell.setAttribute('hover', '');
      }
    }
  };

  const clearPlayerShips = () => {
    const cells = playerBoardEl.querySelectorAll(".grid-cell[empty='false'");
    if (!cells) return;
    cells.forEach((cell) => cell.setAttribute('empty', true));
  };

  const renderPlayerShips = () => {
    const coordinates = Game.getPlayerShipsPositions();

    coordinates.forEach((coordinate) => {
      const cell = playerBoardEl.querySelector(
        `.grid-cell[coordinate="${coordinate[0]},${coordinate[1]}"]`,
      );
      cell.setAttribute('empty', false);
    });
  };

  const clearPlaceHoverEffect = () => {
    const effectedCells = playerBoardEl.querySelectorAll('.grid-cell[hover]');
    if (!effectedCells) return;
    effectedCells.forEach((effCell) => {
      effCell.removeAttribute('hover');
    });
  };

  // Binding events to dynamically generated elements
  const bindEvents = () => {
    // Change the axis; X or Y
    axisBtn.addEventListener('click', () => {
      axis = axis === 'X' ? 'Y' : 'X';
    });

    // Hover effects when placing the ships.
    playerBoardEl.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('grid-cell', 'player')) {
        clearPlaceHoverEffect();
        placeHoverEffect(e.target);
      }
    });

    // Place the ship on the board
    playerBoardEl.addEventListener('click', (e) => {
      if (Game.allShipsPlaced()) return;
      const cell = e.target;
      if (!cell) return;

      if (
        cell.classList.contains('grid-cell') &&
        cell.getAttribute('empty') === 'true'
      ) {
        const coordinate = cell
          .getAttribute('coordinate')
          .split(',')
          .map((ordinate) => parseInt(ordinate, 10));

        const tile = [];

        for (let i = 0; i < ship.length; i++) {
          if (axis === 'X') {
            const updatedCoor = [coordinate[0], coordinate[1] + i];
            const candidateCell = playerBoardEl.querySelector(
              `.grid-cell[coordinate="${updatedCoor[0]},${updatedCoor[1]}"]`,
            );

            if (!candidateCell) return;
            tile.push(updatedCoor);
          } else {
            const updatedCoor = [coordinate[0] + i, coordinate[1]];
            const candidateCell = playerBoardEl.querySelector(
              `.grid-cell[coordinate="${updatedCoor[0]},${updatedCoor[1]}"]`,
            );

            if (!candidateCell) return;
            tile.push(updatedCoor);
          }
        }

        Game.placePlayerShip(tile);
        renderPlayerShips();
        ship = Game.getShipToPlace();
      }
    });

    // Event for placing the ships on the board randomly
    placeRandomBtn.addEventListener('click', () => {
      Game.placePlayerRandom();
      clearPlayerShips();
      renderPlayerShips();
    });

    // Reset the board
    resetBoardBtn.addEventListener('click', () => {
      Game.resetPlayerBoard();
      ship = Game.getShipToPlace();
      clearPlayerShips();
      renderPlayerShips();
    });
  };

  const init = () => {
    renderPlayerBoard();
    renderComputerBoard();
    bindEvents();
  };

  return {
    init,
  };
})();

export default domHandler;
