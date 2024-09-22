const readlineSync = require('readline-sync');

// Questions for the quiz
const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
  { question: "What is the square root of 144?", answer: "12" },
];

let score = 0;
let currentQuestionIndex = 0;
const timePerQuestion = 10000; // 10 seconds for each question
const totalQuizTime = 30000; // 30 seconds for the entire quiz

// Asks the current question and manages the time
function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    const { question, answer } = questions[currentQuestionIndex];

    console.log(`Question ${currentQuestionIndex + 1}: ${question}`);
    let remainingTime = timePerQuestion / 1000;

    const timer = setInterval(() => {
      remainingTime--;
      console.log(`Time left: ${remainingTime} seconds`);
    }, 1000);

    // Timeout for the question
    const questionTimeout = setTimeout(() => {
      console.log("\nTime's up for this question!");
      clearInterval(timer);
      moveToNextQuestion();
    }, timePerQuestion);

    // User input
    const userAnswer = readlineSync.question("\nYour answer: ");
    clearInterval(timer);
    clearTimeout(questionTimeout);

    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      console.log("Correct!");
      score++;
    } else {
      console.log(`Wrong! The correct answer was: ${answer}`);
    }

    moveToNextQuestion();
  }
}

// Moves to the next question or ends the quiz
function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    askQuestion();
  } else {
    endQuiz();
  }
}

// Ends the quiz and shows the final score
function endQuiz() {
  console.log("\nQuiz finished!");
  console.log(`Your final score is: ${score}/${questions.length}`);
  process.exit();
}

// Overall quiz timeout
const quizTimeout = setTimeout(() => {
  console.log("\nTime's up for the entire quiz!");
  endQuiz();
}, totalQuizTime);

// Start the quiz
askQuestion();
