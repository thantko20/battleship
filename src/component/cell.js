const Cell = (playerType, coorindate, empty = true) => {
  const container = document.createElement('div');
  container.className = `grid-cell ${playerType}`;
  container.setAttribute('empty', empty);
  container.setAttribute('coordinate', `${coorindate[0]},${coorindate[1]}`);

  return container;
};

export default Cell;
