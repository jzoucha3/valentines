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

let quoteIndex = 0;
let quoteTimer = null;

function renderQuote() {
  const quoteText = document.getElementById("quoteText");
  const dots = document.querySelectorAll("#quoteDots .dot");
  if (!quoteText) return;
  quoteText.textContent = QUOTES[quoteIndex];
  dots.forEach((dot, i) => dot.classList.toggle("active", i === quoteIndex));
}

function buildDots() {
  const dotsContainer = document.getElementById("quoteDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  QUOTES.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.addEventListener("click", () => {
      quoteIndex = i;
      renderQuote();
      restartTimer();
    });
    dotsContainer.appendChild(dot);
  });
}

function nextQuote() {
  quoteIndex = (quoteIndex + 1) % QUOTES.length;
  renderQuote();
}

function prevQuote() {
  quoteIndex = (quoteIndex - 1 + QUOTES.length) % QUOTES.length;
  renderQuote();
}

function restartTimer() {
  if (quoteTimer) clearInterval(quoteTimer);
  quoteTimer = setInterval(nextQuote, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  buildDots();
  renderQuote();
  restartTimer();

  const prev = document.getElementById("prevQuote");
  const next = document.getElementById("nextQuote");
  if (prev) prev.addEventListener("click", () => { prevQuote(); restartTimer(); });
  if (next) next.addEventListener("click", () => { nextQuote(); restartTimer(); });

  const show = document.getElementById("quoteShow");
  if (show) {
    show.addEventListener("mouseenter", () => quoteTimer && clearInterval(quoteTimer));
    show.addEventListener("mouseleave", restartTimer);
    show.addEventListener("touchstart", () => quoteTimer && clearInterval(quoteTimer));
    show.addEventListener("touchend", restartTimer);
  }
});
