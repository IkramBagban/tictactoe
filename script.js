let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer;
let isComputerTurn;
let isSinglePlayer = true; 
function startNewGame() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = '';
        }
    }
    currentPlayer = 'X';
    isComputerTurn = false;
    updateBoard();
    updateTurnDisplay();
    if (isSinglePlayer && currentPlayer === 'O') {
        setTimeout(makeComputerMove, 500);
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
    if (checkWinner(currentPlayer)) {
        alert(currentPlayer + ' Wins!');
        startNewGame();
        return;
    } else if (isBoardFull()) {
        alert('Draw!');
        startNewGame();
        return;
    }
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isComputerTurn = isSinglePlayer && currentPlayer === 'O';
    updateTurnDisplay();
    if (isComputerTurn) {
        setTimeout(makeComputerMove, 500);
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
    startNewGame();
});

document.getElementById('twoPlayerBtn').addEventListener('click', function() {
    isSinglePlayer = false;
    startNewGame();
});

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
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player ||
            board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            return true;
        }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player ||
        board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }
    return false;
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
