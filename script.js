"use strict";

let myNumber = Math.floor(Math.random() * 10) + 1;
let numDimentions = [1, 10];
let n = 1;
let num = 10;
let currentScore = Number(document.querySelector(".score-num").textContent);
let highscore = 0;
let gameWon = false;

function handleReplay() {
  myNumber = Math.floor(Math.random() * num) + 1;
  console.log("new num is " + myNumber);
  currentScore = 20;

  document.querySelector("body").classList.remove("new-body");
  document.getElementById("message").classList.remove("message-for-win");
  document.getElementById("message").classList.add("message");

  document.getElementById("message-icon").style.width = "50px";
  document.getElementById("game-info").style.gap = "140px";

  document.querySelector(".message label").textContent = "PLAY!";
  document.querySelector(".the-number").textContent = "?";
  document.querySelector(".score .score-num").textContent =
    String(currentScore);

  gameWon = false;
}

function handleGameMode() {
  switch (n) {
    case 0:
      num = 10;
      break;
    case 1:
      num = 50;
      break;
    case 2:
      num = 100;
      break;
    case 3:
      num = 1000;
      break;
  }
  n++;
  if (n === 4) {
    n = 0;
  }

  document.getElementById("mode-btn").textContent = `<Mode 1-${num}>`;
  numDimentions = [1, num];
  handleReplay();
}

function handleCheckNumber() {
  const guess = Number(document.querySelector(".guess-box").value);
  console.log("num is " + myNumber);

  if (handleCorrectNumberInput(guess)) {
    document.querySelector(".guess-box").value = "";
    return;
  }

  if (gameWon) {
    return;
  }

  if (currentScore <= 1) {
    handleLoseGame();
    return;
  }

  if (myNumber === guess) {
    handleCorrectGuess();
  } else if (myNumber > guess) {
    handleWrongGuessTooLow();
  } else if (myNumber < guess) {
    handleWrongGuessTooHigh();
  }
  document.querySelector(".guess-box").value = "";
}

function handleCorrectNumberInput(guess) {
  if (!guess) {
    document.querySelector(".message label").textContent = "NO NUMBER!";
    return true;
  }
  if (guess > numDimentions[1]) {
    alert("You are playing in Mode 1-" + numDimentions[1] + "!");
    document.querySelector(".message label").textContent = "TRY AGAIN!";
    return true;
  }
  return false;
}

function handleCorrectGuess() {
  document.querySelector(".message label").textContent = "YOU WON!";
  if (highscore < currentScore) {
    highscore = currentScore;
  }
  document.querySelector(".highscore .score-num").textContent = highscore;
  document.querySelector(".the-number").textContent = myNumber;

  document.querySelector("body").classList.add("new-body");
  document.querySelector(".check-btn").style.color = "#cb32ed";
  document.getElementById("message").classList.add("message-for-win");
  document.getElementById("message").classList.remove("message");

  document.getElementById("message-icon").style.width = "80px";
  document.getElementById("game-info").style.gap = "100px";

  gameWon = true;
}

function handleWrongGuessTooLow() {
  document.querySelector(".message label").textContent = "GO HIGHER!";
  currentScore--;
  document.querySelector(".score .score-num").textContent = currentScore;
}

function handleWrongGuessTooHigh() {
  document.querySelector(".message label").textContent = "GO LOWER!";
  currentScore--;
  document.querySelector(".score .score-num").textContent = currentScore;
}

function handleLoseGame() {
  document.querySelector(".message label").textContent = "YOU LOST!";
  document.querySelector(".guess-box").value = "";

  currentScore = 0;
  document.querySelector(".score .score-num").textContent = currentScore;
  document.getElementById("message").classList.add("message-for-win");
  document.getElementById("message").classList.remove("message");

  document.getElementById("message-icon").style.width = "80px";
  document.getElementById("game-info").style.gap = "100px";
}

document.querySelector(".check-btn").addEventListener("click", handleCheckNumber);
document.querySelector(".guess-box").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      handleCheckNumber();
    }
  });
document.getElementById("mode-btn").addEventListener("click", handleGameMode);
document.getElementById("replay-btn").addEventListener("click", handleReplay);
