"use strict";

// Main game elements
const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");

// Interactive elements
const playAgainBtn = document.querySelector("#play-again");

// Modal elements
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

// Hangman parts
const figureParts = document.querySelectorAll("figure-part");

// Local Words Array (For Development)
// TODO - Implement a function to fetch a random valid word from API
// https://random-word-api.herokuapp.com/home
const words = [
  "apple",
  "banana",
  "melon",
  "lemon",
  "candy",
  "pearl",
  "daisy",
  "charm",
  "dream",
  "cloud",
  "stone",
  "flame",
  "river",
  "ocean",
  "music",
  "light",
  "magic",
  "frost",
  "night",
  "storm",
  "whale",
  "crane",
  "piano",
  "glove",
  "brace",
  "bloom",
  "crisp",
  "jolly",
  "zebra",
  "swing",
  "tweet",
  "voice",
  "globe",
  "sugar",
  "table",
  "chair",
  "water",
  "heart",
  "smile",
  "peace",
  "crown",
  "wonder",
  "picture",
  "journey",
  "friend",
  "inspire",
  "harmony",
  "beautiful",
  "adventure",
  "imagine",
  "fantastic",
  "chocolate",
  "discovery",
  "enthusiastic",
  "extraordinary",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// Correct letters array
const correctLetters = [];

// Wrong letters array
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `<span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                 </span>`
    )
    .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😎";
    popup.style.display = "flex";
  }
}

// Update wrongs letters
function updateWrongLettersEl() {
  console.log("Update wrong");
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();

  if (letter >= "a" && letter <= "z") {
    console.log(`You pressed the letter: ${letter}`);
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();

// commit msg "Add game functionality"
