const triviaItems = [
  {
    question: "1) What is your bf's birthday?",
    answer: "07/15/1996",
    normalize: (value) => value.trim(),
  },
  {
    question: "2) What superhero does your bf enjoy seeing get hurt?",
    answer: "spiderman",
  },
  {
    question: "3) What is your bf's sister's name?",
    answer: "alexis",
  },
  {
    question: "4) What is your bf's favorite aquatic animal?",
    answer: "porpoise",
  },
  {
    question: "5) Who is your bf's male bestfriend?",
    answer: "aidan",
  },
  {
    question: "6) Where was your bf born?",
    answer: "oceanside",
  },
  {
    question: "7) If he didn't study statistics, what other stem science would your bf pursue?",
    answer: "physics",
  },
  {
    question: `8) Compute each definite integral.
Each upper limit and variable are ASCII codes.
Convert the codes to characters, then solve to reveal the message:
1) integral from 0 to 117 of 1 d117
2) integral from 0 to 114 of 1 d114
3) integral from 0 to 97 of 1 d97
4) integral from 0 to 113 of 1 d113
5) integral from 0 to 116 of 1 d116`,
    answer: "u r a q t",
    normalize: (value) => value.trim().toLowerCase().replace(/\s+/g, ""),
  },
  {
    question: "9) Of all your physical features, what is your bf's favorite?",
    answer: "eyes",
  },
  {
    question: "10) Who does your bf yearn for?",
    answer: "danielle marie preuschl",
  },
];

const FINAL_HINT = "Hint: if he wanted to he would type of sunset walk, ring ya later bestie!";

function normalizeDefault(value) {
  return value.trim().toLowerCase();
}

function getExpectedValue(item) {
  const normalizer = item.normalize || normalizeDefault;
  return normalizer(item.answer);
}

function getUserValue(item, value) {
  const normalizer = item.normalize || normalizeDefault;
  return normalizer(value);
}

function initTrivia() {
  const progressEl = document.getElementById("triviaProgress");
  const questionEl = document.getElementById("triviaQuestion");
  const formEl = document.getElementById("triviaForm");
  const inputEl = document.getElementById("triviaAnswer");
  const messageEl = document.getElementById("triviaMessage");
  const hintEl = document.getElementById("triviaHint");

  if (!progressEl || !questionEl || !formEl || !inputEl || !messageEl || !hintEl) return;

  let index = 0;

  function render() {
    const item = triviaItems[index];
    progressEl.textContent = `Question ${index + 1} of ${triviaItems.length}`;
    questionEl.textContent = item.question;
    inputEl.value = "";
    inputEl.focus();
  }

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const item = triviaItems[index];
    const actual = getUserValue(item, inputEl.value);
    const expected = getExpectedValue(item);

    if (actual !== expected) {
      messageEl.textContent = "Not quite. Try again.";
      return;
    }

    index += 1;

    if (index >= triviaItems.length) {
      messageEl.textContent = "All answers correct!";
      hintEl.hidden = false;
      formEl.hidden = true;
      progressEl.textContent = "Completed";
      questionEl.textContent = "You unlocked the hint!";
      alert(FINAL_HINT);
      return;
    }

    messageEl.textContent = "Correct!";
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", initTrivia);
