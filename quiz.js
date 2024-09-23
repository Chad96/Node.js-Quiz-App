const readline = require('readline');

// Questions for the quiz
const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Who created 'node.js'?", answer: "Ryan Dahl" },
  { question: "What is the square root of 144?", answer: "12" },
];

let score = 0;
let currentQuestionIndex = 0;
const timePerQuestion = 10000; // 10 seconds for each question
const totalQuizTime = 30000; // 30 seconds for the entire quiz

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Asks the current question and manages the time
function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    const { question, answer } = questions[currentQuestionIndex];

    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${question}`);
    let remainingTime = timePerQuestion / 1000;

    const timer = setInterval(() => {
      remainingTime--;
      process.stdout.write(`\rTime left: ${remainingTime} seconds`);
      if (remainingTime <= 0) {
        clearInterval(timer);
        console.log("\nTime's up for this question!");
        moveToNextQuestion();
      }
    }, 1000);

    // Get user input while timer is running
    rl.question("\nYour answer: ", (userAnswer) => {
      clearInterval(timer);
      if (userAnswer.toLowerCase() === answer.toLowerCase()) {
        console.log("Correct!");
        score++;
      } else {
        console.log(`Wrong! The correct answer was: ${answer}`);
      }
      moveToNextQuestion();
    });
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
  rl.close();  // Close the readline interface
  process.exit();
}

// Overall quiz timeout
const quizTimeout = setTimeout(() => {
  console.log("\nTime's up for the entire quiz!");
  endQuiz();
}, totalQuizTime);

// Start the quiz
askQuestion();
