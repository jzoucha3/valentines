function formatUnlockDate(date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function applyGameLocks() {
  const cards = document.querySelectorAll(".game-card[data-unlock]");
  if (!cards.length) return;

  const now = new Date();
  cards.forEach((card) => {
    const unlock = card.getAttribute("data-unlock");
    const unlockDate = new Date(`${unlock}T00:00:00`);
    const isUnlocked = now >= unlockDate;
    const button = card.querySelector(".btn");
    const note = card.querySelector(".unlock-note");

    if (!button) return;

    const originalHref = button.getAttribute("href") || button.dataset.href;
    if (originalHref) button.dataset.href = originalHref;

    if (isUnlocked) {
      card.classList.remove("locked");
      button.classList.remove("locked");
      button.setAttribute("aria-disabled", "false");
      if (button.dataset.href) button.setAttribute("href", button.dataset.href);
      if (note) note.textContent = "";
    } else {
      card.classList.add("locked");
      button.classList.add("locked");
      button.setAttribute("aria-disabled", "true");
      button.removeAttribute("href");
      if (note) note.textContent = `Unlocks ${formatUnlockDate(unlockDate)}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", applyGameLocks);
