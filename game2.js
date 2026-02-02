// Intended unlock dates (not enforced yet):
// Game1 Feb 2, Game2 Feb 5, Game3 Feb 8, Game4 Feb 11, Game5 Feb 14

const CORRECT = new Set(["cuddles", "warmth", "scratches", "affirmation"]);
const WORDS = [
  "cuddles", "warmth", "scratches", "affirmation",
  "fan", "window", "mouthguard", "snoring",
  "chocolate", "water", "sugar", "scary movies"
];

const selected = new Set();

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderTable() {
  const grid = document.getElementById("wordTable");
  if (!grid) return;
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = "repeat(4, minmax(120px, 1fr))";

  const shuffled = shuffle(WORDS);
  shuffled.forEach((word) => {
    const cell = document.createElement("button");
    cell.className = "table-cell";
    cell.textContent = word;
    cell.addEventListener("click", () => toggleWord(word, cell));
    grid.appendChild(cell);
  });
}

function toggleWord(word, cell) {
  if (selected.has(word)) {
    selected.delete(word);
    cell.classList.remove("selected");
  } else if (selected.size < 4) {
    selected.add(word);
    cell.classList.add("selected");
  }

  const check = document.getElementById("checkGroup");
  if (check) check.hidden = selected.size !== 4;
}

function checkGroup() {
  const message = document.getElementById("groupMessage");
  const reveal = document.getElementById("groupReveal");
  if (!message || !reveal) return;

  const isCorrect = selected.size === 4 && Array.from(selected).every((word) => CORRECT.has(word));
  if (isCorrect) {
    message.textContent = "";
    reveal.hidden = false;
  } else {
    message.textContent = "Not quite. Try again!";
    reveal.hidden = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  const check = document.getElementById("checkGroup");
  if (check) check.addEventListener("click", checkGroup);
});
