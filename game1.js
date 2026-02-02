// Intended unlock dates (not enforced yet):
// Game1 Feb 2, Game2 Feb 5, Game3 Feb 8, Game4 Feb 11, Game5 Feb 14

const WORDS = ["red", "green", "picked", "vase", "water", "sunlight"];

const GRID = [
  ["R","E","D","X","X","X","W","X","B","X"],
  ["X","X","R","X","O","X","A","X","X","X"],
  ["X","G","X","X","X","I","T","X","X","X"],
  ["X","R","X","T","X","X","E","X","T","X"],
  ["X","E","X","X","Y","X","R","X","X","L"],
  ["X","E","X","X","X","X","X","P","X","X"],
  ["X","N","X","X","X","X","X","X","O","X"],
  ["V","A","S","E","X","P","X","X","X","X"],
  ["X","X","V","T","I","I","X","G","X","X"],
  ["Q","X","X","X","X","C","X","X","X","S"],
  ["A","X","X","X","X","K","X","X","X","U"],
  ["R","T","X","X","N","E","X","X","J","N"],
  ["X","X","L","X","X","D","X","X","X","L"],
  ["S","Y","X","W","X","X","X","X","X","I"],
  ["X","X","X","X","X","Z","X","W","X","G"],
  ["X","H","X","X","X","X","Z","X","X","H"],
  ["X","X","F","X","U","X","X","V","X","T"]
];

const found = new Set();
const selected = new Set();

function buildGrid() {
  const gridEl = document.getElementById("wordGrid");
  if (!gridEl) return;
  gridEl.style.gridTemplateColumns = `repeat(${GRID[0].length}, 1fr)`;

  GRID.forEach((row, r) => {
    row.forEach((letter, c) => {
      const cell = document.createElement("button");
      cell.className = "word-cell";
      cell.textContent = letter;
      cell.dataset.row = String(r);
      cell.dataset.col = String(c);
      cell.addEventListener("click", () => toggleCell(cell));
      gridEl.appendChild(cell);
    });
  });
}

function toggleCell(cell) {
  if (cell.classList.contains("found")) return;
  const key = `${cell.dataset.row},${cell.dataset.col}`;
  if (selected.has(key)) {
    selected.delete(key);
    cell.classList.remove("selected");
  } else {
    selected.add(key);
    cell.classList.add("selected");
  }
  checkSelection();
}

function getSelectedCells() {
  return Array.from(document.querySelectorAll(".word-cell.selected"));
}

function isStraightLine(cells) {
  if (cells.length < 2) return false;
  const coords = cells.map((cell) => [
    parseInt(cell.dataset.row, 10),
    parseInt(cell.dataset.col, 10)
  ]);

  coords.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));

  const dr = coords[1][0] - coords[0][0];
  const dc = coords[1][1] - coords[0][1];
  const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
  const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

  if (!(stepR === 0 || stepC === 0 || Math.abs(stepR) === Math.abs(stepC))) return false;

  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    if (curr[0] - prev[0] !== stepR || curr[1] - prev[1] !== stepC) return false;
  }

  return true;
}

function selectionToWord(cells) {
  const forward = cells.map((cell) => cell.textContent.toLowerCase()).join("");
  const backward = cells.slice().reverse().map((cell) => cell.textContent.toLowerCase()).join("");
  return { forward, backward };
}

function checkSelection() {
  const cells = getSelectedCells();
  const message = document.getElementById("wordMessage");
  if (message) message.textContent = "";

  if (cells.length === 0) return;
  if (!isStraightLine(cells)) return;

  const { forward, backward } = selectionToWord(cells);
  const match = WORDS.find((word) => word === forward || word === backward);
  if (!match || found.has(match)) return;

  found.add(match);
  cells.forEach((cell) => {
    cell.classList.remove("selected");
    cell.classList.add("found");
    const key = `${cell.dataset.row},${cell.dataset.col}`;
    selected.delete(key);
  });

  showFoundWord(match);
  if (message) message.textContent = "Nice find!";

  if (found.size === WORDS.length) {
    const reveal = document.getElementById("wordReveal");
    if (reveal) reveal.hidden = false;
  }
}

function showFoundWord(word) {
  const container = document.getElementById("foundWords");
  const list = document.getElementById("foundList");
  if (!container || !list) return;
  container.hidden = false;

  const item = document.createElement("div");
  item.textContent = word;
  list.appendChild(item);
}

document.addEventListener("DOMContentLoaded", () => {
  buildGrid();
});
