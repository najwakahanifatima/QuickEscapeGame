const board = document.getElementById('ttt-board');
const state = document.getElementById('ttt-status');
const resetBtn = document.getElementById('reset');
const instruction = document.getElementById('ttt-instruction');

let currentPlayer = 'You';
let cells = Array(9).fill(null);
let cellElements = [];
let gameEnd = false;

const getImageSrc = (value) => {
    if (value === 'You') return '/assets/ttt-user.png';
    if (value === 'Computer') return '/assets/ttt-computer.png';
    return '/assets/ttt-base.png';
};

function createCell(index) {
    const btn = document.createElement('button');
    btn.classList.add('cell');
    const img = document.createElement('img');
    img.src = getImageSrc(null);
    btn.appendChild(img);

    btn.addEventListener('click', () => {
        if (cells[index] || gameEnd) return;

        // player move
        cells[index] = currentPlayer;
        img.src = getImageSrc(currentPlayer);
        
        if (checkWin(currentPlayer)) {
            state.textContent = `${currentPlayer} Wins!`;
            gameEnd = true;
            instruction.textContent =  `Click reset button below to replay`;
        } else if (cells.every(cell => cell)) {
            state.textContent = `It is a draw!`;
            gameEnd = true;
            instruction.textContent =  `Click reset button below to replay`;
        } else {
            currentPlayer = 'Computer';
            state.textContent = `Computer's Turn!`;
            instruction.textContent = `Please wait a moment ...`

            // short delay
            setTimeout(() => {
                computerMove();
            }, 500);
        }
    });

    return btn;
}

function renderBoard() {
    board.innerHTML = '';
    cellElements = [];
    for (let i = 0; i < 9; i++) {
        const cell = createCell(i);
        board.appendChild(cell);
        cellElements.push(cell.querySelector('img'));
    }
}

function checkWin(player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // columns
        [0,4,8],[2,4,6]          // diagonals
    ];
    return wins.some(comb => comb.every(i => cells[i] === player));
}

resetBtn.addEventListener('click', () => {
    currentPlayer = 'You';
    cells = Array(9).fill(null);
    gameEnd = false;
    state.textContent = 'Your Turn!';
    instruction.textContent = 'Choose your first move';
    renderBoard();
})

function computerMove() {
    if (gameEnd) return;

    const emptyIndices = cells
        .map((val, i) => val === null ? i : null)
        .filter(i => i !== null);
    
    if (emptyIndices.length === 0) return;

    // picking random cell
    const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    cells[randomIdx] = 'Computer';

    // update board
    cellElements[randomIdx].src = getImageSrc('Computer');

    if (checkWin('Computer')) {
        state.textContent = `Computer Wins!`;
        gameEnd = true;
        instruction.textContent =  `Click reset button below to replay`;
    } else if (cells.every(cell => cell)) {
        state.textContent = `It is a draw!`;
        gameEnd = true;
    } else {
        currentPlayer = 'You';
        state.textContent = `Your Turn!`;
        instruction.textContent = 'Choose your next move';
    }
}

renderBoard();