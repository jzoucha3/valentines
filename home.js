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

  heartContent.hidden = true;
  question.hidden = false;
  return;
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

  const heart = document.querySelector(".heart");
  if (!heart) return;

  function moveButton() {
    const rect = heart.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2 - 6;
    const angle = Math.random() * Math.PI * 2;
    const x = cx + Math.cos(angle) * radius - noButton.offsetWidth / 2;
    const y = cy + Math.sin(angle) * radius - noButton.offsetHeight / 2;

    noButton.style.position = "fixed";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  }

  function handleMove(event) {
    const rect = noButton.getBoundingClientRect();
    const nearX = event.clientX >= rect.left - 4 && event.clientX <= rect.right + 4;
    const nearY = event.clientY >= rect.top - 4 && event.clientY <= rect.bottom + 4;
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
