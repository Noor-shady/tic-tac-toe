class TicTacToe {
    constructor() {
        // Cache DOM elements
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
            // Diagonals
            [0, 4, 8], [2, 4, 6]
        ];

        this.init();
    }

    // --- Messages ---
    winningMessage = () => `Player ${this.currentPlayer} has won!`;
    drawMessage = () => `Game ended in a draw!`;
    currentPlayerTurn = () => `It's ${this.currentPlayer}'s turn`;

    init() {
        this.statusDisplay.innerHTML = this.currentPlayerTurn();

        this.cells.forEach(cell => {
            // Support mouse clicks
            cell.addEventListener('click', (e) => this.handleCellClick(e));
            // Support keyboard navigation (Accessibility)
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCellClick(e);
                }
            });
        });

        this.restartBtn.addEventListener('click', () => this.handleRestartGame());
    }

    handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));