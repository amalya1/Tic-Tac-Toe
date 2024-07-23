import { Server as SocketIOServer } from 'socket.io';
import { gameService } from './services/gameService';
import { server } from './index';


const io = new SocketIOServer(server);

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.emit('playMove', { board: gameService.board, currentPlayer: gameService.currentPlayer });

  socket.on('joinGame', (data) => {
    console.log(`${data.player} joined the game`);
  });

  socket.on('makeMove', (move) => {
    console.log('Move received:', move);
    if (gameService.playMove(move.row, move.col)) {
      const winner = gameService.checkWinner();
      if (winner) {
        io.emit('gameOver', { message: `Player ${winner} wins!` });
        gameService.resetBoard();
      } else if (gameService.isDraw()) {
        io.emit('gameOver', { message: 'The game is a draw!' });
        gameService.resetBoard();
      } else {
        io.emit('playMove', { board: gameService.board, currentPlayer: gameService.currentPlayer });
      }
    } else {
      socket.emit('invalidMove', { message: 'Invalid move, try again.' });
    }
  });
});
