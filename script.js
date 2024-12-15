"use strict";

// Main game elements
const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");

// Interactive elements
const playAgainBtn = document.querySelector("#play-button");

// Modal elements
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

// Hangman parts
const figureParts = document.querySelectorAll(".figure-part");

// Global variables
let selectedWord = "";
const correctLetters = [];
const wrongLetters = [];
let gameActive = true; // Game state variable

// Fetch Random Word Function
async function fetchRandomWord() {
  const apis = [
    "https://random-word-api.herokuapp.com/word",
    "https://random-word-api.herokuapp.com/word",
  ];

  const fallbackWords = [
    "apple",
    "banana",
    "magic",
    "world",
    "code",
    "dream",
    "smile",
    "river",
  ];

  for (const apiUrl of apis) {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const words = await response.json();
      return words[0]; // Return the first word from the API response
    } catch (error) {
      console.error(`Failed to fetch from ${apiUrl}:`, error);
    }
  }

  return fallbackWords[Math.floor(Math.random() * fallbackWords.length)]; // Fallback
}

// Initialize Game
async function initializeGame() {
  popup.style.display = "none"; // Hide popup if it's visible
  selectedWord = await fetchRandomWord(); // Fetch a random word

  // Reset game state
  correctLetters.length = 0;
  wrongLetters.length = 0;
  gameActive = true; // Set game state to active

  // Reset figure parts
  figureParts.forEach((part) => {
    part.style.display = "none";
  });

  // Initial display
  displayWord();
  updateWrongLettersEl();
}

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
    finalMessage.innerText = "You won! 😎";
    popup.style.display = "flex";
    gameActive = false; // Set game state to inactive on win
  }
}

function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? `<p>Wrong Letters:</p>` : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}
    `;

  // Display hangman parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost! 😱";
    popup.style.display = "flex";
    gameActive = false; // Set game state to inactive on loss
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();

  // Check if the game is active and if the key is a letter (a-z)
  if (
    gameActive &&
    e.code.startsWith("Key") &&
    letter >= "a" &&
    letter <= "z"
  ) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification(); // Notify if the letter has already been guessed
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification(); // Notify if the letter has already been guessed
      }
    }
  }
});

// Restart game
playAgainBtn.addEventListener("click", initializeGame);

// Initial game start
initializeGame();
