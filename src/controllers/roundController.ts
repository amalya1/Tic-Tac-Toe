import { Request, Response } from 'express';
import { roundRepo } from '../repository/roundRepo';
import { gameRepo } from '../repository/gameRepo';



export const getAllRounds = async (_req: Request, res: Response) => {
  try {
    const rounds = await roundRepo.getAllRounds();
    const result = rounds
      .filter(round => round.winner === 'x' || round.winner === 'o')
      .map(round => ({
        winner: round.winner,
        emptyCells: round.emptyCells,
        totalMoves: round.totalMoves,
      }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching rounds' });
  }
};


export const getGameResults = async (_req: Request, res: Response) => {
  try {
    const games = await gameRepo.getGameResults();

    const result = games.reduce((acc, game) => {
      const winner = game.winner;

      if (winner === 'x' || winner === 'o') {
        if (!acc[winner]) {
          acc[winner] = 0;
        }
        acc[winner] += 1;
      }

      return acc;
    }, {} as { [key: string]: number });

    const response = Object.entries(result).map(([winner, count]) => ({
      winner,
      count,
    }));

    if (response.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching game results' });
  }
};
