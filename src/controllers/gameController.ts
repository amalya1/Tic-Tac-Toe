import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { gameRepo } from '../repository/gameRepo';
import { roundRepo } from '../repository/roundRepo';
import { gameService } from '../services/gameService';
import { RoundDocument } from '../types/roundType';



export const startGame = async (req: Request, res: Response) => {
  const { player1, player2 } = req.body;

  try {
    const game = await gameRepo.createGame(player1, player2);
    gameService.resetBoard();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while starting the game' });
  }
};


export const playMove = async (req: Request, res: Response) => {
  const { gameId, row, col } = req.body;

  try {
    const game = await gameRepo.findGameById(gameId);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (game.winner !== null || game.rounds.length > 3) {
      return res.status(400).json({ error: 'The game is already over' });
    }

    let round = game.rounds[game.rounds.length - 1];

    if (round && round.winner !== null) {
      round = await roundRepo.createRound(game._id as Types.ObjectId);
      game.rounds.push(round._id as RoundDocument);
      await game.save();
      gameService.resetBoard();
    }

    const moveSuccessful = gameService.playMove(row, col);

    if (!moveSuccessful) {
      return res.status(400).json({ error: 'Invalid move' });
    }

    round.emptyCells -= 1;
    round.totalMoves += 1;
    round.moves.push(`Move at row ${row}, col ${col}`);
    await roundRepo.saveRound(round);

    const winner = gameService.checkWinner();
    if (winner) {
      round.winner = winner;
      await roundRepo.saveRound(round);

      if (game.rounds.filter(r => r.winner === winner).length === 2) {
        game.winner = winner;
        await game.save();
        return res.status(200).json({ message: `Player ${winner} wins!` });
      }

      return res.status(200).json({ message: `Player ${winner} wins this round!` });
    } else {
      if (gameService.isDraw()) {
        round.winner = 'draw';
        await roundRepo.saveRound(round);
        if (game.rounds.length === 3) {
          game.winner = 'draw';
          await game.save();
          return res.status(200).json({ message: 'The game is a draw!' });
        }
        return res.status(200).json({ message: 'The round is a draw. The game continues.' });
      }
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the move' });
  }
};
