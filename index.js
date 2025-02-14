const questions = [
  {
    questions: "What is the capital of France?",
    answers: [
      {
        text: "Paris",
        isCorrect: true,
      },
      {
        text: "Madrid",
        isCorrect: false,
      },
      {
        text: "London",
        isCorrect: false,
      },
      {
        text: "Berlin",
        isCorrect: false,
      },
    ],
  },
  {
    questions: "Who is the current Prime Minister of France?",
    answers: [
      {
        text: "Marie Antoinette",
        isCorrect: false,
      },
      {
        text: "Nicolas Sarkozy",
        isCorrect: true,
      },
      {
        text: "Emmanuel Macron",
        isCorrect: false,
      },
      {
        text: "François Hollande",
        isCorrect: false,
      },
    ],
  },
  {
    questions: "What is the largest desert in the world?",
    answers: [
      {
        text: "Sahara",
        isCorrect: false,
      },
      {
        text: "Arabian Desert",
        isCorrect: false,
      },
      {
        text: "Great Lakes Desert",
        isCorrect: false,
      },
      {
        text: "Gobi Desert",
        isCorrect: true,
      },
    ],
  },
  {
    questions:
      "Which country is the world's second-largest producer of coffee?",
    answers: [
      {
        text: "Brazil",
        isCorrect: false,
      },
      {
        text: "United States",
        isCorrect: true,
      },
      {
        text: "Vietnam",
        isCorrect: false,
      },
      {
        text: "Nigeria",
        isCorrect: false,
      },
    ],
  },
];
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const nextButton = document.querySelector(".next");

let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  renderQuestion();
}

function renderQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  question.textContent = `${questionNo}. ${currentQuestion.questions}`;

  currentQuestion.answers.forEach(answer => {
    const option = document.createElement("button");
    option.textContent = answer.text;
    option.classList.add("btn");
    options.appendChild(option);
    if (answer.isCorrect) {
      option.dataset.correct = answer.isCorrect;
    }
    option.addEventListener("click", selectOption);
  });
}


function selectOption(e) {
  const selectedOption = e.target;
  const correctOption = selectedOption.dataset.correct === "true";
  if (correctOption) {
    selectedOption.classList.add("correct");
    score++;
  } else {
    selectedOption.classList.add("wrong");
  }
  Array.from(options.children).forEach((option) => {
    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    }
    option.disabled = true;
  });
  nextButton.style.display = "block";
}



function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    showScore();
  }
});
function showScore() {
    resetState();
    question.textContent = `Game Over! Your final score is ${score} / ${questions.length}`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
  }

function resetState() {
    nextButton.style.display = "none";
    while (options.firstChild) {
      options.removeChild(options.firstChild);
    }
  }

startQuiz();
