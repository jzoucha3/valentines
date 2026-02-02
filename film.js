const FILM_IMAGES = [
  "Pictures/original-31BA8778-EAA3-4C63-AF01-FEFE6A714761.jpeg",
  "Pictures/processed-274AD07F-E2E3-4194-955E-02D5AD550CFE.jpeg",
  "Pictures/processed-4490EE43-0F92-46C7-A5A3-31BDFB481E07.jpeg",
  "Pictures/processed-51D9963B-1635-4943-9FB7-E53A8DDDCE7C.jpeg",
  "Pictures/processed-6C650D9D-17E0-4167-9F76-33024BCF3B6E.jpeg",
  "Pictures/processed-851C4D87-B7B5-4BA1-BDE2-57086EA0A885.jpeg",
  "Pictures/processed-92DC6C89-1C7B-4AE1-BB98-580646B1C467.jpeg",
  "Pictures/processed-C6603D08-BBE7-4452-A5CB-18E6D00B3D3D.jpeg",
  "Pictures/processed-D188409D-7703-4C86-B580-FE12D561DD81.jpeg",
  "Pictures/processed-EA3B31BE-42DE-4AE7-99DC-2CDF5CAA1970.jpeg"
];

let currentIndex = 0;
let timerId = null;

function renderSlide(index) {
  const image = document.getElementById("slideImage");
  const dots = document.querySelectorAll(".dot");
  if (!image) return;
  image.src = FILM_IMAGES[index];
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function buildDots() {
  const dotsContainer = document.getElementById("dots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  FILM_IMAGES.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.addEventListener("click", () => {
      currentIndex = i;
      renderSlide(currentIndex);
      restartTimer();
    });
    dotsContainer.appendChild(dot);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % FILM_IMAGES.length;
  renderSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + FILM_IMAGES.length) % FILM_IMAGES.length;
  renderSlide(currentIndex);
}

function restartTimer() {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(nextSlide, 4000);
}

function setupControls() {
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  if (prev) prev.addEventListener("click", () => { prevSlide(); restartTimer(); });
  if (next) next.addEventListener("click", () => { nextSlide(); restartTimer(); });

  const slideshow = document.getElementById("slideshow");
  if (slideshow) {
    slideshow.addEventListener("mouseenter", () => timerId && clearInterval(timerId));
    slideshow.addEventListener("mouseleave", restartTimer);
    slideshow.addEventListener("touchstart", () => timerId && clearInterval(timerId));
    slideshow.addEventListener("touchend", restartTimer);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildDots();
  renderSlide(currentIndex);
  setupControls();
  restartTimer();
});
