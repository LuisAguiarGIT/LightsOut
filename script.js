const cpu = {
  move: {
    row: 1,
    col: 0,
  },
  resetMove: function () {
    this.move.row = 1;
    this.move.col = 0;
  },
};

const lookup = {
  '[2,3,4]': [3],
  '[1,3]': [1, 4],
  '[1,2,4]': [0],
  '[0,4]': [3, 4],
  '[0,2,3]': [4],
  '[0,1,3,4]': [2],
  '[0,1,2]': [1],
};

const gridSize = 5; // Change this to adjust the grid size
let playerGrid = [];
let cpuGrid = [];
const playerGridElement = document.getElementById('player-grid');
const cpuGridElement = document.getElementById('cpu-grid');

// Initialize the grid and display it
function initializeGrid() {
  playerGrid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(false));
  renderGrid();
  randomizeGrid(playerGrid);
  cloneMatrix();
  renderCPUGrid();
}

// Toggle the lights and update the display
function toggleLights(grid, row, col) {
  grid[row][col] = !grid[row][col];

  toggleCell(grid, row, col);
  toggleAdjacent(grid, row, col);

  // Check for win condition
  if (checkWin()) {
    alert('You win!');
  }
}

/**
 *
 * @param {Array<boolean>} row
 * @param {Array<boolean>} col
 * Checks if cell that was selected has any adjacent cells, and changes their values accordingly
 */
function toggleAdjacent(grid, row, col) {
  if (row > 0) {
    grid[row - 1][col] = !grid[row - 1][col];
    toggleCell(grid, row - 1, col);
  }
  if (row < gridSize - 1) {
    grid[row + 1][col] = !grid[row + 1][col];
    toggleCell(grid, row + 1, col);
  }
  if (col > 0) {
    grid[row][col - 1] = !grid[row][col - 1];
    toggleCell(grid, row, col - 1);
  }
  if (col < gridSize - 1) {
    grid[row][col + 1] = !grid[row][col + 1];
    toggleCell(grid, row, col + 1);
  }
}

// Toggle the appearance of a cell based on its state
function toggleCell(grid, row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  const isSelected = grid[row][col];
  cell.style.backgroundColor = isSelected ? 'transparent' : '#eee';
}

function toggleCPUCell(grid, row, col) {
  const cell = document.getElementById(`cpu-cell-${row}-${col}`);
  const isSelected = grid[row][col];
  cell.style.backgroundColor = isSelected ? 'transparent' : '#eee';
}

// Check if all lights are turned off
function checkWin() {
  return playerGrid.every((row) => row.every((cell) => !cell));
}

// Render the grid on the web page
function renderGrid() {
  playerGridElement.innerHTML = '';

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener('click', () => toggleLights(playerGrid, i, j));
      playerGridElement.appendChild(cell);
    }
  }
  // renderCPUGrid();
}

function renderCPUGrid() {
  cpuGridElement.innerHTML = '';

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `cpu-cell-${i}-${j}`;
      cpuGridElement.appendChild(cell);
      if (cpuGrid[i][j]) toggleCPUCell(cpuGrid, i, j);
    }
  }
}

/**
 *
 * @returns {number} binary value
 */
function randomBinary() {
  const randNr = Math.random();
  const binaryVal = Math.round(randNr);

  return binaryVal;
}

/**
 *
 * @param {Array<Array<boolean>>} grid
 * @returns fully randomized grid and updates its appearance
 */
function randomizeGrid(grid) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (randomBinary()) {
        grid[i][j] = !grid[i][j];
        toggleCell(grid, i, j);
      }
    }
  }
}

// Reset the game
function resetGame() {
  initializeGrid();
}

/**
 *
 * @param {Object} cpuMove
 * @param {Array<Array<boolean>>} grid
 * @param {Number} gridSize
 * @description Employs the chase the lights strategy
 */
function chaseTheLights(cpuMove, grid, gridSize) {
  try {
    if (cpuMove?.row === gridSize) {
      console.log("I'm done!");
      cpu.resetMove();
      stopChasingLights(chaseLightsInterval);
      const stateAfterChase = JSON.stringify(getStateAfterChasing(playerGrid));
      if (lookup[stateAfterChase]) {
        console.log(stateAfterChase, 'Lookup!');
      } else {
        console.log(stateAfterChase, 'nooo');
      }
    }
    if (cpuMove.col === gridSize) {
      cpuMove.row++;
      cpuMove.col = 0;
    }
    if (grid[cpuMove.row - 1][cpuMove.col]) {
      if (cpuMove.row === 5) return;
      toggleLights(grid, cpuMove.row, cpuMove.col);
    }

    cpuMove.col++;
  } catch (ex) {
    console.log(ex, grid, cpu);
  }
}

function getStateAfterChasing(grid) {
  const state = [];
  for (let i = 0; i < gridSize; i++) {
    if (grid[4][i]) {
      state.push(i);
    }
  }
  return state;
}

// Initialize the game on page load
initializeGrid();

// let chaseLightsInterval;

// Start chasing lights
// chaseLightsInterval = setInterval(
//   () => chaseTheLights(cpu.move, playerGrid, gridSize),
//   250
// );

// // Clear the interval when the game is won or reset
// function stopChasingLights() {
//   clearInterval(chaseLightsInterval);
// }

function cloneMatrix() {
  for (let i = 0; i < gridSize; i++) {
    let rowCopy = [];
    for (let j = 0; j < gridSize; j++) {
      let gridElement = playerGrid[i][j] ? true : false;
      rowCopy.push(gridElement);
    }
    cpuGrid.push(rowCopy);
  }
  // console.log('PLAYER GRID: ', playerGrid);
  // console.log('CPU GRID: ', cpuGrid);
}
