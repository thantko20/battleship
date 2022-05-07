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
  const startBtn = document.querySelector('.start');

  const changeAxis = () => {
    axis = axis === 'X' ? 'Y' : 'X';
  };

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

  const renderPlayerShips = () => {
    const coordinates = Game.getPlayerShipsPositions();

    coordinates.forEach((coordinate) => {
      const cell = playerBoardEl.querySelector(
        `.grid-cell[coordinate="${coordinate[0]},${coordinate[1]}"]`,
      );
      cell.setAttribute('empty', false);
    });
  };

  const generateTile = (coordinate) => {
    const temp = [];

    if (axis === 'X') {
      for (let i = 0; i < ship.length; i++) {
        temp.push([coordinate[0], coordinate[1] + i]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        temp.push([coordinate[0] + i, coordinate[1]]);
      }
    }

    return temp;
  };

  // Cool stuff; hovering effect when placing ships
  const placeHoverEffect = (target) => {
    if (Game.allShipsPlaced()) return;

    gameStage.textContent = `Place Your ${ship.type}`;
    const coordinate = target
      .getAttribute('coordinate')
      .split(',')
      .map((ordinate) => parseInt(ordinate, 10));

    const tile = generateTile(coordinate);

    tile.forEach((cell) => {
      const candidateCell = playerBoardEl.querySelector(
        `.grid-cell[coordinate="${cell[0]},${cell[1]}"]`,
      );

      if (candidateCell) candidateCell.setAttribute('hover', '');
    });
  };

  const popUpBtn = (btn) => {
    btn.classList.remove('btn-hidden');
  };

  const hideBtn = (btn) => {
    btn.classList.add('btn-hidden');
  };

  const placeShip = (event) => {
    if (Game.allShipsPlaced()) return;
    const cell = event.target;

    if (
      cell.classList.contains('grid-cell') &&
      cell.getAttribute('empty') === 'true'
    ) {
      const coordinate = cell
        .getAttribute('coordinate')
        .split(',')
        .map((ordinate) => parseInt(ordinate, 10));

      const tile = generateTile(coordinate);

      if (!Game.availablePositions(tile)) return;

      Game.placePlayerShip(tile);
      renderPlayerShips();
      ship = Game.getShipToPlace();

      if (Game.allShipsPlaced()) popUpBtn(startBtn);
    }
  };

  const clearPlayerShips = () => {
    const cells = playerBoardEl.querySelectorAll(".grid-cell[empty='false'");
    if (!cells) return;
    cells.forEach((cell) => cell.setAttribute('empty', true));
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
    axisBtn.addEventListener('click', changeAxis);

    // Hover effects when placing the ships.
    playerBoardEl.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('grid-cell', 'player')) {
        clearPlaceHoverEffect();
        placeHoverEffect(e.target);
      }
    });

    // Place the ship on the board
    playerBoardEl.addEventListener('click', placeShip);

    // Event for placing the ships on the board randomly
    placeRandomBtn.addEventListener('click', () => {
      Game.placePlayerRandom();
      clearPlayerShips();
      renderPlayerShips();
      if (Game.allShipsPlaced()) popUpBtn(startBtn);
    });

    // Reset the board
    resetBoardBtn.addEventListener('click', () => {
      Game.resetPlayerBoard();
      ship = Game.getShipToPlace();
      clearPlayerShips();
      renderPlayerShips();
      hideBtn(startBtn);
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
