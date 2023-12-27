let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer;
let isComputerTurn;
let playerScore = 0;
let computerScore = 0;

function startNewGame() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = '';
        }
    }
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    isComputerTurn = currentPlayer === 'O'; 
    updateTurnDisplay();
    updateBoard();
    if (isComputerTurn) {
        setTimeout(makeComputerMove, 500); 
    }
}

function makeMove(row, col) {
    if (!isComputerTurn && board[row][col] === '') {
        board[row][col] = currentPlayer;
        handleTurn();
    }
}

function handleTurn() {
    updateBoard();
    if (checkWinner(currentPlayer)) {
        let winner = currentPlayer === 'X' ? 'Player' : 'Computer';
        document.getElementById('playerTurn').innerText = 'Player ' + currentPlayer + ' Wins!';
        alert(winner + ' Wins!');
        if (winner === 'Player') {
            playerScore++;
            document.getElementById('playerScore').textContent = playerScore;
        } else {
            computerScore++;
            document.getElementById('computerScore').textContent = computerScore;
        }
        startNewGame();
        return;
    } else if (isBoardFull()) {
        document.getElementById('playerTurn').innerText = 'Game is a Draw!';
        alert('Game is a Draw!');
        startNewGame();
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isComputerTurn = !isComputerTurn;
    updateTurnDisplay();
    if (isComputerTurn) {
        setTimeout(makeComputerMove, 500);
    }
}

function makeComputerMove() {
    let moveMade = tryToWin('O'); 

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

