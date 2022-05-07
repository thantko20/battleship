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
  const gameOverMsg = document.querySelector('.gameOver-msg');
  const modalOverlay = document.querySelector('.modal-overlay');
  const playAgainBtn = document.querySelector('.replay');

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

  const popUpBtns = (...btns) => {
    btns.forEach((btn) => btn.classList.remove('btn-hidden'));
  };

  const hideBtns = (...btns) => {
    btns.forEach((btn) => btn.classList.add('btn-hidden'));
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

      if (Game.allShipsPlaced()) popUpBtns(startBtn);
    }
  };

  const clearPlayerShips = () => {
    const cells = playerBoardEl.querySelectorAll(".grid-cell[empty='false']");
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

  const toggleBoardPointerEvents = (board, action) => {
    if (action === 'add') {
      board.classList.add('playing');
    } else {
      board.classList.remove('playing');
    }
  };

  const popComputerDisplay = () => {
    const computerArena = document.querySelector('.computer-arena');
    computerArena.classList.remove('hide-arena');
  };

  const hideComputerDisplay = () => {
    const computerArena = document.querySelector('.computer-arena');
    computerArena.classList.add('hide-arena');
  };

  const startGame = () => {
    gameStage.textContent = '';
    toggleBoardPointerEvents(playerBoardEl, 'add');
    clearPlaceHoverEffect();
    popComputerDisplay();
    hideBtns(resetBoardBtn, placeRandomBtn, startBtn, axisBtn);
  };

  const renderHits = (board, boardType) => {
    const hits =
      boardType === 'player' ? Game.getPlayerHits() : Game.getComputerHits();

    hits.forEach((hit) => {
      const cell = board.querySelector(
        `.grid-cell[coordinate="${hit[0]},${hit[1]}"]`,
      );

      cell.classList.add('hit');
    });
  };

  const renderMisses = (board, boardType) => {
    const misses =
      boardType === 'player'
        ? Game.getPlayerMisses()
        : Game.getComputerMisses();

    misses.forEach((miss) => {
      const cell = board.querySelector(
        `.grid-cell[coordinate="${miss[0]},${miss[1]}"]`,
      );

      cell.classList.add('miss');
    });
  };
  // rendering hits into red and misses into bluish colour
  // From given board
  const renderHitsMisses = (board, boardType) => {
    renderHits(board, boardType);
    renderMisses(board, boardType);
  };

  // Sends coordinate to Game
  // render after it.
  // also check game over logic
  const conveyAttacks = (coordinate) => {
    Game.playerAttack(coordinate);
    renderHitsMisses(computerBoardEl, 'computer');

    if (Game.isGameOver('computer')) {
      gameOverMsg.textContent = 'You won!';
      modalOverlay.classList.add('active');
      return;
    }

    Game.computerAttack();
    renderHitsMisses(playerBoardEl, 'player');

    if (Game.isGameOver('player')) {
      gameOverMsg.textContent = 'You lost!';
      modalOverlay.classList.add('active');
    }
  };

  const startAttack = (event) => {
    const cell = event.target;

    if (cell.className === 'grid-cell computer') {
      const coordinate = cell
        .getAttribute('coordinate')
        .split(',')
        .map((ordinate) => parseInt(ordinate, 10));

      conveyAttacks(coordinate);
    }
  };

  const clearBoard = (board) => {
    while (board.firstChild) board.firstChild.remove();
  };

  // Go back to initial state
  // Literally hardcode it to go back to initial state
  const replay = () => {
    Game.reload();
    clearBoard(playerBoardEl);
    clearBoard(computerBoardEl);
    popUpBtns(resetBoardBtn, placeRandomBtn, axisBtn);
    gameStage.textContent = 'Place the Ships';
    renderComputerBoard();
    renderPlayerBoard();
    hideComputerDisplay();
    modalOverlay.classList.remove('active');
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
      if (Game.allShipsPlaced()) popUpBtns(startBtn);
    });

    // Reset the board
    resetBoardBtn.addEventListener('click', () => {
      toggleBoardPointerEvents(playerBoardEl, 'remove');
      clearPlaceHoverEffect();
      Game.resetPlayerBoard();
      ship = Game.getShipToPlace();
      clearPlayerShips();
      renderPlayerShips();
      hideBtns(startBtn);
    });

    startBtn.addEventListener('click', startGame);

    computerBoardEl.addEventListener('click', startAttack);

    playAgainBtn.addEventListener('click', replay);
  };

  const init = () => {
    gameStage.textContent = 'Place the Ships';
    renderPlayerBoard();
    renderComputerBoard();
    bindEvents();
  };

  return {
    init,
  };
})();

export default domHandler;
