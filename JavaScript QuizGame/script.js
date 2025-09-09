const startScreen = document.getElementById("start_screen");
const quizScreen = document.getElementById("quiz_screen");
const resultScreen = document.getElementById("result_screen");
const startButton = document.getElementById("start_btn");
const questionText = document.getElementById("question_text");
const answersContainer = document.getElementById("answer_container");
const currentQuestionSpan = document.getElementById("current_question");
const totalQuestionsSpan = document.getElementById("total_questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final_score");
const maxScoreSpan = document.getElementById("max_score");
const resultMessage = document.getElementById("result_msg");
const restartButton = document.getElementById("restart_btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();

}

function showQuestion() {
  answerDisabled = false;
  const current_question = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";
  questionText.textContent = current_question.question;

  answersContainer.innerHTML = "";
  current_question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer_btn")
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);

  })

}

function selectAnswer(event) {
  if (answerDisabled) return
  answerDisabled = true

  const selectButton = event.target;
  const isCorrect = selectButton.dataset.correct == "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    else if(button===selectButton) {
      button.classList.add("incorrect");
    }
  });

  if(isCorrect)
  {
    score++;
    scoreSpan.textContent=score
    }

    setTimeout(()=>{
      currentQuestionIndex++;
      if(currentQuestionIndex<quizQuestions.length){
        showQuestion()
      }else{
         showResults();
      }
    },1000);

  }


function showResults() {
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")
  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }

}






function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}