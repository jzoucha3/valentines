const QUOTES = [
  "Women make the world go round.",
  "Here's to strong women. May we know them. May we be them. May we raise them.",
  "There is no distance I wouldn't drive for you, no amount of money I wouldn't spend to get to you, and no time I wouldn't be there for you.",
  "If you could see what you looked like through my eyes you would never question how beautiful you were.",
  "I wouldn't change anything of how we met or what lead me to you.",
  "You feel like all the love I've given out came back to me in human form.",
  "I hope beautiful things happen to you and you realize you deserve all of them.",
  "You're the sweetest most amazing person that I and everyone else is lucky to have in our lives.",
  "If I were to kiss you and go to hell I would. Then I could brag to the devil I saw heaven without every entering it.",
  "You're my favorite place to go when my mind searches for peace.",
  "Do you like me? Just a lot.",
  "Koi no yokan."
];

const QUOTE_START_DATE = "2026-02-02"; // One new quote per day; all unlocked by Feb 14.

function daysBetween(a, b) {
  const ms = 24 * 60 * 60 * 1000;
  const aMid = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bMid = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((bMid - aMid) / ms);
}

function getUnlockedCount() {
  const start = new Date(`${QUOTE_START_DATE}T00:00:00`);
  const today = new Date();
  if (today < start) return 0;
  const days = daysBetween(start, today);
  return Math.min(QUOTES.length, days + 1);
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function renderQuotes() {
  const quoteText = document.getElementById("quoteText");
  const status = document.getElementById("quoteStatus");
  const list = document.getElementById("quoteList");
  if (!quoteText || !status || !list) return;

  const unlockedCount = getUnlockedCount();
  list.innerHTML = "";

  if (unlockedCount === 0) {
    const start = new Date(`${QUOTE_START_DATE}T00:00:00`);
    quoteText.textContent = "A new quote unlocks soon.";
    status.textContent = `First quote unlocks ${formatDate(start)}`;
    return;
  }

  const latestIndex = unlockedCount - 1;
  quoteText.textContent = QUOTES[latestIndex];
  status.textContent = `${unlockedCount} of ${QUOTES.length} unlocked`;

  for (let i = 0; i < unlockedCount; i++) {
    const item = document.createElement("div");
    item.className = "quote-item" + (i === latestIndex ? " active" : "");
    item.textContent = `Quote ${i + 1}`;
    item.addEventListener("click", () => {
      quoteText.textContent = QUOTES[i];
      document.querySelectorAll(".quote-item").forEach((el, idx) => {
        el.classList.toggle("active", idx === i);
      });
    });
    list.appendChild(item);
  }
}

document.addEventListener("DOMContentLoaded", renderQuotes);
