// Intended unlock dates (not enforced yet):
// Game1 Feb 2, Game2 Feb 5, Game3 Feb 8, Game4 Feb 11, Game5 Feb 14

const PHRASE = "under the sea";
let guessed = new Set();
let wrong = 0;

const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function drawHangman() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#b52d3e";
  ctx.lineWidth = 3;

  // Base & pole
  ctx.beginPath();
  ctx.moveTo(20, 200);
  ctx.lineTo(140, 200);
  ctx.moveTo(50, 200);
  ctx.lineTo(50, 20);
  ctx.lineTo(140, 20);
  ctx.lineTo(140, 40);
  ctx.stroke();

  if (wrong > 0) {
    ctx.beginPath();
    ctx.arc(140, 55, 15, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (wrong > 1) {
    ctx.beginPath();
    ctx.moveTo(140, 70);
    ctx.lineTo(140, 120);
    ctx.stroke();
  }
  if (wrong > 2) {
    ctx.beginPath();
    ctx.moveTo(140, 80);
    ctx.lineTo(115, 100);
    ctx.stroke();
  }
  if (wrong > 3) {
    ctx.beginPath();
    ctx.moveTo(140, 80);
    ctx.lineTo(165, 100);
    ctx.stroke();
  }
  if (wrong > 4) {
    ctx.beginPath();
    ctx.moveTo(140, 120);
    ctx.lineTo(120, 150);
    ctx.stroke();
  }
  if (wrong > 5) {
    ctx.beginPath();
    ctx.moveTo(140, 120);
    ctx.lineTo(160, 150);
    ctx.stroke();
  }
}

function renderWord() {
  const display = PHRASE.split("").map((char) => {
    if (char === " ") return "  ";
    return guessed.has(char) ? char : "_";
  }).join(" ");
  const wordEl = document.getElementById("hangmanWord");
  if (wordEl) wordEl.textContent = display;
}

function renderAlphabet() {
  const alphabet = document.getElementById("alphabet");
  if (!alphabet) return;
  alphabet.innerHTML = "";
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((letter) => {
    const button = document.createElement("button");
    button.className = "pill";
    button.textContent = letter.toUpperCase();
    button.disabled = guessed.has(letter);
    button.addEventListener("click", () => handleGuess(letter));
    alphabet.appendChild(button);
  });
}

function handleGuess(letter) {
  if (guessed.has(letter)) return;
  guessed.add(letter);

  if (!PHRASE.includes(letter)) {
    wrong += 1;
  }

  drawHangman();
  renderWord();
  renderAlphabet();

  const message = document.getElementById("hangmanMessage");
  if (!message) return;

  if (wrong >= 6) {
    message.textContent = "Oh no! Try again 💛";
    setTimeout(resetGame, 1200);
  } else if (isSolved()) {
    message.textContent = "You did it! Dinner hint unlocked!" 
  } else {
    message.textContent = "";
  }
}

function isSolved() {
  return PHRASE.split("").every((char) => char === " " || guessed.has(char));
}

function resetGame() {
  guessed = new Set();
  wrong = 0;
  drawHangman();
  renderWord();
  renderAlphabet();
  const message = document.getElementById("hangmanMessage");
  if (message) message.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  drawHangman();
  renderWord();
  renderAlphabet();
});
