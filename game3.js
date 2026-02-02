// Intended unlock dates (not enforced yet):
// Game1 Feb 2, Game2 Feb 5, Game3 Feb 8, Game4 Feb 11, Game5 Feb 14

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let ship = { x: 300, y: 300, size: 14 };
let asteroids = [];
let lastSpawn = 0;
let startTime = 0;
let playing = true;
let animationId = null;
const duration = 30000;

function resizeCanvas() {
  if (!canvas) return;
  const maxWidth = Math.min(620, window.innerWidth - 80);
  canvas.width = maxWidth;
  canvas.height = Math.min(400, maxWidth * 0.6);
  ship.x = canvas.width / 2;
  ship.y = canvas.height * 0.75;
}

function spawnAsteroid() {
  const size = 12 + Math.random() * 18;
  const x = Math.random() * (canvas.width - size * 2) + size;
  const speed = 1.6 + Math.random() * 2.2 + (Date.now() - startTime) / 20000;
  asteroids.push({ x, y: -size, size, speed });
}

function drawShip() {
  ctx.fillStyle = "#ffdd55";
  ctx.beginPath();
  ctx.moveTo(ship.x, ship.y - ship.size);
  ctx.lineTo(ship.x - ship.size, ship.y + ship.size);
  ctx.lineTo(ship.x + ship.size, ship.y + ship.size);
  ctx.closePath();
  ctx.fill();
}

function drawAsteroids() {
  ctx.fillStyle = "#b52d3e";
  asteroids.forEach((rock) => {
    ctx.beginPath();
    ctx.arc(rock.x, rock.y, rock.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateAsteroids(delta) {
  asteroids.forEach((rock) => {
    rock.y += rock.speed * delta;
  });
  asteroids = asteroids.filter((rock) => rock.y < canvas.height + rock.size);
}

function checkCollisions() {
  return asteroids.some((rock) => {
    const dx = rock.x - ship.x;
    const dy = rock.y - ship.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < rock.size + ship.size * 0.8;
  });
}

function drawProgress() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(1, elapsed / duration);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillRect(12, 12, canvas.width - 24, 10);
  ctx.fillStyle = "#ffdd55";
  ctx.fillRect(12, 12, (canvas.width - 24) * progress, 10);
}

function gameLoop(timestamp) {
  if (!playing) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const delta = Math.min(2, (timestamp - (gameLoop.lastTime || timestamp)) / 16);
  gameLoop.lastTime = timestamp;

  if (timestamp - lastSpawn > 700) {
    spawnAsteroid();
    lastSpawn = timestamp;
  }

  updateAsteroids(delta);
  drawAsteroids();
  drawShip();
  drawProgress();

  if (checkCollisions()) {
    endGame(false);
    return;
  }

  if (Date.now() - startTime >= duration) {
    endGame(true);
    return;
  }

  animationId = requestAnimationFrame(gameLoop);
}

function endGame(won) {
  playing = false;
  if (animationId) cancelAnimationFrame(animationId);
  const message = document.getElementById("spaceMessage");
  const hint = document.getElementById("spaceHint");
  const retry = document.getElementById("spaceRetry");

  if (won) {
    message.textContent = "";
    hint.hidden = false;
    retry.hidden = true;
  } else {
    message.textContent = "Asteroid hit!";
    hint.hidden = true;
    retry.hidden = false;
  }
}

function resetGame() {
  asteroids = [];
  playing = true;
  startTime = Date.now();
  lastSpawn = 0;
  const hint = document.getElementById("spaceHint");
  const message = document.getElementById("spaceMessage");
  const retry = document.getElementById("spaceRetry");
  if (hint) hint.hidden = true;
  if (message) message.textContent = "";
  if (retry) retry.hidden = true;
  animationId = requestAnimationFrame(gameLoop);
}

function setupControls() {
  window.addEventListener("keydown", (event) => {
    const step = 14;
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") ship.x -= step;
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") ship.x += step;
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") ship.y -= step;
    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") ship.y += step;

    ship.x = Math.max(ship.size, Math.min(canvas.width - ship.size, ship.x));
    ship.y = Math.max(ship.size, Math.min(canvas.height - ship.size, ship.y));
  });

  canvas.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    const rect = canvas.getBoundingClientRect();
    ship.x = touch.clientX - rect.left;
    ship.y = touch.clientY - rect.top;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!canvas || !ctx) return;
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  setupControls();

  const retry = document.getElementById("spaceRetry");
  if (retry) retry.addEventListener("click", resetGame);

  resetGame();
});
