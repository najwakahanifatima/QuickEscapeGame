const choices = ['stone', 'paper', 'scissor'];
const userImg = document.getElementById('user-choice');
const computerImg = document.getElementById('computer-choice');
const state = document.getElementById('rps-status');
const buttons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset');
const resultImages = document.getElementById('rps-results');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const userChoice = btn.dataset.choice;
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        // update images
        userImg.src = `/assets/rps-${userChoice}.png`;
        userImg.alt = userChoice;
        computerImg.src = `/assets/rps-${computerChoice}.png`;
        computerImg.alt = computerChoice;

        // determine winner
        const result = getResult(userChoice, computerChoice);
        state.textContent = result;

        resultImages.classList.add('show');

        // disable buttons
        buttons.forEach(b => b.disabled = true);
  });
});

resetBtn.addEventListener('click', () => {
    userImg.src = '';
    computerImg.src = '';
    state.textContent = 'Choose your move!';
    resultImages.classList.remove('show');
    buttons.forEach(b => b.disabled = false);
});

function getResult(user, comp) {
    if (user === comp) return "It's a Draw!";
    if (
        (user === 'stone' && comp === 'scissor') ||
        (user === 'paper' && comp === 'stone') ||
        (user === 'scissor' && comp === 'paper')
    ) {
        return "You Win!";
    }
    return "Computer Wins!";
}
