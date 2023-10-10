const gridSize = 5; // Change this to adjust the grid size
let grid = [];
const gridElement = document.getElementById('grid');

// Initialize the grid and display it
function initializeGrid() {
  grid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(false));
  renderGrid();
  toggleInitialGrid(grid);
}

// Toggle the lights and update the display
function toggleLights(row, col) {
  grid[row][col] = !grid[row][col];

  toggleCell(row, col);
  toggleAdjacent(row, col);
  console.log(grid, row, col);

  // Check for win condition
  if (checkWin()) {
    alert('You win!');
  }
}

//=====================================================================
// Calculate best move
// Idea is to calculate how many points I could get for every position
// So.. for now just make a function that calculates how many points
// I could get for selecting a certain position
//=====================================================================

/**
 *
 * @param {Array<boolean>} row
 * @param {Array<boolean>} col
 * Checks if cell that was selected has any adjacent cells, and changes their values accordingly
 */
function toggleAdjacent(row, col) {
  if (row > 0) {
    grid[row - 1][col] = !grid[row - 1][col];
    toggleCell(row - 1, col);
  }
  if (row < gridSize - 1) {
    grid[row + 1][col] = !grid[row + 1][col];
    toggleCell(row + 1, col);
  }
  if (col > 0) {
    grid[row][col - 1] = !grid[row][col - 1];
    toggleCell(row, col - 1);
  }
  if (col < gridSize - 1) {
    grid[row][col + 1] = !grid[row][col + 1];
    toggleCell(row, col + 1);
  }
}

// Toggle the appearance of a cell based on its state
function toggleCell(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  const isSelected = grid[row][col];
  cell.style.backgroundColor = isSelected ? 'black' : '#eee';
}

// Check if all lights are turned off
function checkWin() {
  return grid.every((row) => row.every((cell) => !cell));
}

// Render the grid on the web page
function renderGrid() {
  gridElement.innerHTML = '';

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener('click', () => toggleLights(i, j));
      gridElement.appendChild(cell);
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
function toggleInitialGrid(grid) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (randomBinary()) {
        grid[i][j] = !grid[i][j];
        toggleCell(i, j);
      }
    }
  }
}

// Reset the game
function resetGame() {
  initializeGrid();
}

// Initialize the game on page load
initializeGrid();
