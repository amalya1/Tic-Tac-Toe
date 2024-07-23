class GameService {
  board: string[][];
  currentPlayer: string;

  constructor() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'x';
  }



  resetBoard() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'x';
  }


  playMove(row: number, col: number): boolean {
    if (row < 0 || row >= 3 || col < 0 || col >= 3) {
      throw new Error('Row or column out of bounds');
    }

    if (this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';

      console.log('board [');
      this.board.forEach(row => {
        console.log(`  [ '${row.join('\', \'')}' ],`);
      });
      console.log(']');

      return true;
    }

    return false;
  }


  checkWinner(): string | null {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
        return this.board[i][0];
      }
      if (this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
        return this.board[0][i];
      }
    }

    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return this.board[0][0];
    }

    if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      return this.board[0][2];
    }

    return null;
  }


  isDraw(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }


  findBestMove(player: string): { row: number, col: number } | null {
    // Check for winning move
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          this.board[i][j] = player;
          if (this.checkWinner() === player) {
            this.board[i][j] = '';
            console.log(`Winning move for ${player} found at (${i}, ${j})`);
            return { row: i, col: j };
          }
          this.board[i][j] = '';
        }
      }
    }

    // Block opponent's winning move
    const opponent = player === 'x' ? 'o' : 'x';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          this.board[i][j] = opponent;
          if (this.checkWinner() === opponent) {
            this.board[i][j] = '';
            console.log(`Blocking move found at (${i}, ${j})`);
            return { row: i, col: j };
          }
          this.board[i][j] = '';
        }
      }
    }

    // Take the center if available
    if (this.board[1][1] === '') {
      console.log('Taking center');
      return { row: 1, col: 1 };
    }

    // Take any corner if available
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 }];
    for (const corner of corners) {
      if (this.board[corner.row][corner.col] === '') {
        console.log(`Taking corner at (${corner.row}, ${corner.col})`);
        return corner;
      }
    }

    // Take any empty cell
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          console.log(`Taking any free cell at (${i}, ${j})`);
          return { row: i, col: j };
        }
      }
    }

    return null;
  }
}

export const gameService = new GameService();





