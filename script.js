let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer, isComputerTurn, isSinglePlayer = true;
let playerScore = 0, computerScore = 0;

function startNewGame() {
    resetBoard();
    clearHighlights();
    currentPlayer = 'X';
    isComputerTurn = isSinglePlayer && currentPlayer === 'O';
    updateTurnDisplay();
    updateBoard();
    if (isComputerTurn) {
        setTimeout(makeComputerMove, 500);
    }
}

function resetBoard() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = '';
        }
    }
}

function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        handleTurn();
    }
}

function handleTurn() {
    updateBoard();
    const winningLine = checkWinner(currentPlayer);

    if (winningLine) {
        updateScore();
        highlightWinningCombination(winningLine);
        setTimeout(promptForNextRound, 200); 
    } else if (isBoardFull()) {
        setTimeout(promptForNextRound, 200);
    } else {
        switchPlayer();
    }
}


function updateScore() {
    if (currentPlayer === 'X') {
        playerScore++;
        document.getElementById('playerScore').innerText = playerScore.toString();
    } else {
        computerScore++;
        document.getElementById('computerScore').innerText = computerScore.toString();
    }
}

function highlightWinningCombination() {
    const winningLine = checkWinner(currentPlayer);
    if (winningLine) {
        winningLine.forEach(([row, col]) => {
            const cell = document.getElementById('row' + row).children[col];
            cell.classList.add('highlight'); 
         });
    }
}
function clearHighlights() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let cell = document.getElementById('row' + row).children[col];
            cell.classList.remove('highlight');
        }
    }
}



function promptForNextRound() {
    if(confirm('Play again?')) {
        startNewGame();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isComputerTurn = isSinglePlayer && currentPlayer === 'O';
    updateTurnDisplay();
    if (isComputerTurn) {
        setTimeout(makeComputerMove, 400);
    }
}

function makeComputerMove() {
    let moveMade = tryToWin('O'); 

    if(!isSinglePlayer) return;

    if (!moveMade) {
        moveMade = blockOpponentWin('X');
    }

    if (!moveMade) {
        let availableMoves = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    availableMoves.push({row, col});
                }
            }
        }
        if (availableMoves.length > 0) {
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[randomMove.row][randomMove.col] = currentPlayer;
        }
    }
    handleTurn();
}

document.getElementById('singlePlayerBtn').addEventListener('click', function() {
    isSinglePlayer = true;
    document.getElementById('difficultySelector').style.display = 'inline-block';
    document.getElementById('currentMode').textContent = 'Mode: Single Player';
    document.getElementById('currentDifficulty').textContent = 'Difficulty: ' + document.getElementById('difficultyLevel').value;
    startNewGame();
    highlightButton(this);
});

document.getElementById('twoPlayerBtn').addEventListener('click', function() {
    isSinglePlayer = false;
    document.getElementById('difficultySelector').style.display = 'none';
    document.getElementById('currentMode').textContent = 'Mode: Two Players';
    document.getElementById('currentDifficulty').textContent = '';
    startNewGame();
    highlightButton(this);
});

document.getElementById('difficultyLevel').addEventListener('change', function() {
    if(isSinglePlayer) {
        document.getElementById('currentDifficulty').textContent = 'Difficulty: ' + this.value;
    }
});

function highlightButton(activeButton) {
    document.querySelectorAll('.mode-selector button').forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}


function tryToWin(player) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                board[row][col] = player;
                let winningMove = checkWinner(player);
                board[row][col] = ''; 
                if (winningMove) {
                    board[row][col] = player; 
                    return true;
                }
            }
        }
    }
    return false;
}


function blockOpponentWin(player) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                board[row][col] = player; 
                let winningMove = checkWinner(player);
                board[row][col] = ''; 
                if (winningMove) {
                    board[row][col] = 'O'; 
                    return true;
                }
            }
        }
    }
    return false;
}

function updateBoard() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let cell = document.getElementById('row' + row).children[col];
            cell.innerText = board[row][col];
        }
    }
}

function checkWinner(player) {
    const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let line of lines) {
        if (line.every(([row, col]) => board[row][col] === player)) {
            return line;
        }
    }

    return null;
}


function isBoardFull() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}

function updateTurnDisplay() {
    document.getElementById('playerTurn').innerText = 'Player: ' + (isComputerTurn ? 'Computer' : currentPlayer) + "'s Turn";
}

startNewGame(); 


function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').innerText = '0';
    document.getElementById('computerScore').innerText = '0';
    startNewGame();
}