import { io } from 'socket.io-client';
import { gameService } from '../services/gameService';

const socket = io('http://localhost:3000');


socket.on('connect', () => {
  console.log('o connected');
  socket.emit('joinGame', { player: 'o' });
});

socket.on('playMove', (game) => {
  console.log('o playMove');

  if (game.currentPlayer === 'o') {
    const move = findBestMove(game.board, 'o');
    if (move) {
      socket.emit('makeMove', { ...move, player: 'o' });
    }
  }
});

function findBestMove(board: string[][], player: string): { row: number, col: number } | null {
  gameService.board = board;
  return gameService.findBestMove(player);
}
