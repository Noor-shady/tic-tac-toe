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

        if (this.gameState[clickedCellIndex] !== "" || !this.gameActive) return;

        this.handleCellPlayed(clickedCell, clickedCellIndex);
        this.handleResultValidation();
    }

    handleCellPlayed(clickedCell, index) {
        this.gameState[index] = this.currentPlayer;
        clickedCell.innerHTML = this.currentPlayer;
        clickedCell.setAttribute('data-player', this.currentPlayer);
        
        clickedCell.setAttribute('aria-label', `${this.currentPlayer} in cell ${index + 1}`);
    }

    handleResultValidation() {
        let roundWon = false;
        let winningLine = [];

        for (let i = 0; i < this.winningConditions.length; i++) {
            const [a, b, c] = this.winningConditions[i];
            const cellA = this.gameState[a];
            const cellB = this.gameState[b];
            const cellC = this.gameState[c];

            if (cellA === '' || cellB === '' || cellC === '') continue;

            if (cellA === cellB && cellB === cellC) {
                roundWon = true;
                winningLine = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            this.statusDisplay.innerHTML = this.winningMessage();
            this.gameActive = false;