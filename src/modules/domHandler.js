/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable wrap-iife */
import Game from './game';
import Cell from '../component/cell';

const domHandler = (function () {
  // Queries for existing elements
  let axis = 'X';
  const playerBoardEl = document.querySelector('.player-board');
  const computerBoardEl = document.querySelector('.computer-board');
  const axisBtn = document.querySelector('.axis');
  const placeRandomBtn = document.querySelector('.random-place');

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
    const shipLength = Game.getShipToPlace().length;
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
    axisBtn.addEventListener('click', () => {
      axis = axis === 'X' ? 'Y' : 'X';
    });

    playerBoardEl.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('grid-cell', 'player')) {
        clearPlaceHoverEffect();
        placeHoverEffect(e.target);
      }
    });

    placeRandomBtn.addEventListener('click', () => {
      Game.placePlayerRandom();
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
