// Game configuration and state variables
const GOAL_CANS = 25;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;          // Holds the interval for spawning items
let timer = 30;             // Timer in seconds
let timerInterval;          // Holds the interval for timer countdown

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square
    grid.appendChild(cell);
  }
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');
  
  // Clear all cells before spawning a new water can
  cells.forEach(cell => (cell.innerHTML = ''));

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;

  // Add click event to the water can for +1 point
  const waterCan = randomCell.querySelector('.water-can');
  if (waterCan) {
    waterCan.addEventListener('click', function handleCanClick(e) {
      // Prevent multiple clicks on the same can
      if (!gameActive) return;
      currentCans += 1; // Increment score
      // Optionally update score display if present
      const scoreDisplay = document.getElementById('score');
      if (scoreDisplay) {
        scoreDisplay.textContent = currentCans;
      }
      // Remove the can after click
      waterCan.parentElement.remove();
    });
  }
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  gameActive = true;
  timer = 30; // Reset timer
  createGrid(); // Set up the game grid
  spawnInterval = setInterval(spawnWaterCan, 1000); // Spawn water cans every second
  // Start timer countdown
  const timerDisplay = document.getElementById('timer');
  if (timerDisplay) timerDisplay.textContent = timer;
  timerInterval = setInterval(() => {
    timer--;
    if (timerDisplay) timerDisplay.textContent = timer;
    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(timerInterval); // Stop timer countdown
}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);
