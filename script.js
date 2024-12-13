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
const correctLetters = ["a", "p", "p", "l", "e"];

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

displayWord();
