function getNextValentines() {
  const now = new Date();
  const year = now.getFullYear();
  const valentinesThisYear = new Date(year, 1, 14, 0, 0, 0);
  return now > valentinesThisYear
    ? new Date(year + 1, 1, 14, 0, 0, 0)
    : valentinesThisYear;
}

function isValentinesDay(date) {
  return date.getMonth() === 1 && date.getDate() === 14;
}

function updateCountdown() {
  const daysValue = document.getElementById("daysValue");
  const hoursValue = document.getElementById("hoursValue");
  const minutesValue = document.getElementById("minutesValue");
  const secondsValue = document.getElementById("secondsValue");
  const heartContent = document.getElementById("heartContent");
  const question = document.getElementById("question");
  if (!daysValue || !hoursValue || !minutesValue || !secondsValue || !heartContent || !question) return;

  const now = new Date();
  if (isValentinesDay(now)) {
    heartContent.hidden = true;
    question.hidden = false;
    return;
  }

  const valentines = getNextValentines();
  const diff = valentines - now;
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysValue.textContent = String(days).padStart(2, "0");
  hoursValue.textContent = String(hours).padStart(2, "0");
  minutesValue.textContent = String(minutes).padStart(2, "0");
  secondsValue.textContent = String(seconds).padStart(2, "0");
}

function setupYesButtons() {
  document.querySelectorAll("[data-yes]").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "yes.html";
    });
  });
}

function setupNoButton() {
  const noButton = document.getElementById("noButton");
  if (!noButton) return;

  function moveButton() {
    const padding = 20;
    const maxX = window.innerWidth - noButton.offsetWidth - padding;
    const maxY = window.innerHeight - noButton.offsetHeight - padding;
    const x = Math.max(padding, Math.floor(Math.random() * maxX));
    const y = Math.max(padding + 72, Math.floor(Math.random() * maxY));

    noButton.style.position = "fixed";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  }

  function handleMove(event) {
    const rect = noButton.getBoundingClientRect();
    const nearX = event.clientX >= rect.left - 120 && event.clientX <= rect.right + 120;
    const nearY = event.clientY >= rect.top - 120 && event.clientY <= rect.bottom + 120;
    if (nearX && nearY) moveButton();
  }

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    handleMove(touch);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  setupYesButtons();
  setupNoButton();
});
