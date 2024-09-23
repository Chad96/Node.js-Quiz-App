const readline = require("readline");

// Multiple choice questions for the quiz
const questions = [
  {
    question: "What is the capital of France?",
    options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
    answer: "C"
  },
  {
    question: "Who created 'node.js'?",
    options: ["A) Brendan Eich", "B) Ryan Dahl", "C) Tim Berners-Lee", "D) James Gosling"],
    answer: "B"
  },
  {
    question: "What is the square root of 144?",
    options: ["A) 10", "B) 12", "C) 14", "D) 16"],
    answer: "B"
  },
  {
    question: "What does CPU stand for?",
    options: ["A) Central Process Unit", "B) Central Processing Unit", "C) Central Power Unit", "D) Computer Personal Unit"],
    answer: "B"
  },
  {
    question: "What does RAM stand for?",
    options: ["A) Random Access Memory", "B) Read And Memorize", "C) Run All Memory", "D) Real Access Memory"],
    answer: "A"
  }
];

let score = 0;
let currentQuestionIndex = 0;
const timePerQuestion = 20000; // 20 seconds per question
const totalQuizTime = 80000; // 80 seconds for the entire quiz

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Asks the current question and manages the time
function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    const { question, options, answer } = questions[currentQuestionIndex];
    let answered = false;

    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${question}`);
    options.forEach(option => console.log(option));
    
    let remainingTime = timePerQuestion / 1000;

    // Timer to display remaining time for the current question
    const timer = setInterval(() => {
      remainingTime--;
      process.stdout.write(`\rTime left: ${remainingTime} seconds  `);
      if (remainingTime <= 0) {
        clearInterval(timer);
        if (!answered) {
          console.log("\nTime's up for this question!");
          moveToNextQuestion(); // Move to the next question if time runs out
        }
      }
    }, 1000);

    // Get user input while timer is running
    rl.question("\nYour answer (A, B, C, D): ", (userAnswer) => {
      if (!answered) {
        answered = true;
        clearInterval(timer); // Stop the timer when the answer is received
        userAnswer = userAnswer.trim().toUpperCase(); // Normalize input

        if (["A", "B", "C", "D"].includes(userAnswer)) {
          if (userAnswer === answer) {
            console.log("Correct!");
            score++;
          } else {
            console.log(`Wrong! The correct answer was: ${answer}`);
          }
        } else {
          console.log("Invalid answer! Moving to the next question.");
        }
        moveToNextQuestion(); // Move to the next question after the user answers
      }
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
  rl.close(); // Close the readline interface
  process.exit();
}

// Overall quiz timeout
const quizTimeout = setTimeout(() => {
  console.log("\nTime's up for the entire quiz!");
  endQuiz();
}, totalQuizTime);

// Start the quiz
askQuestion();
