/* Guess The Number Game Logic */

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

const input = document.getElementById('guess-input');
const feedback = document.getElementById('guess-feedback');
const submitBtn = document.getElementById('submit-guess');
const resetBtn = document.getElementById('reset');
const heartContainer = document.getElementById('heart-container');
const guessDisplay = document.getElementById('user-guess-display');
const instruction = document.getElementById('instruction');

// update heart/attempts
function updateHearts() {
    heartContainer.textContent = '❤️'.repeat(attemptsLeft);
}

// click event when the user guess
submitBtn.addEventListener('click', () => {
    instruction.textContent = "Your previous guess: "
    const guess = Number(input.value);
    console.log('user input: ', guess);

    if (!guess || guess < 1 || guess > 100) {
        feedback.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    guessDisplay.textContent = guess;

    attemptsLeft--;
    updateHearts();

    if (guess === randomNumber) {
        feedback.textContent = "Correct! You guessed the number!";
        input.disabled = true;
        submitBtn.disabled = true;
    } else if (attemptsLeft === 0) {
        feedback.textContent = `You lost! The number was ${randomNumber}.`;
        input.disabled = true;
        submitBtn.disabled = true;
    } else {
        feedback.textContent = guess < randomNumber ? "Your Guess is Too low!" : "Your Guess is Too high!";
    }
});

// reset button click event
resetBtn.addEventListener('click', () => {
    console.log('reset clicked');
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    updateHearts();
    input.value = '';
    input.disabled = false;
    submitBtn.disabled = false;
    feedback.textContent = "Make a guess!";
    guessDisplay.textContent = '--';
    instruction.innerHTML = "We have chosen a random number between 1-100. You have 10 attempts. <br> Guess it with the hints below the input box!"
});

updateHearts();