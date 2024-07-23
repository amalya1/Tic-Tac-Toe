import { io } from 'socket.io-client';
import { gameService } from '../services/gameService';

const socket = io('http://localhost:3000');


socket.on('connect', () => {
  console.log('x connected');
  socket.emit('joinGame', { player: 'x' });
});

socket.on('playMove', (game) => {
  console.log('x playMove');

  if (game.currentPlayer === 'x') {
    const move = findBestMove(game.board, 'x');
    if (move) {
      socket.emit('makeMove', { ...move, player: 'x' });
    }
  }
});

socket.on('gameOver', (data) => {
  console.log(data.message);
});

function findBestMove(board: string[][], player: string): { row: number, col: number } | null {
  gameService.board = board;
  return gameService.findBestMove(player);
}