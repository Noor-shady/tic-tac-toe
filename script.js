class TicTacToe {
    constructor() {
        this.statusDisplay = document.querySelector('.game-status');
        this.cells = document.querySelectorAll('.cell');
        this.restartBtn = document.querySelector('.game-restart');

        // Game State
        this.gameActive = true;
        this.currentPlayer = "X";
        this.gameState = ["", "", "", "", "", "", "", "", ""]; 

        this.winningConditions = [
            // Rows
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],