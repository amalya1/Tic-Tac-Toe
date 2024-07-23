import { GameModel } from '../models/game';
import { RoundModel } from '../models/round';
import { RoundDocument } from '../types/roundType';
import { GameDocument, GameWithRounds } from '../types/gameType';
import { Types } from 'mongoose';



class GameRepo {
  async createGame(player1: string, player2: string): Promise<GameDocument> {
    const game = new GameModel({ player1, player2 });
    await game.save();

    const initialRound = new RoundModel({
      game: game._id,
      moves: [],
      emptyCells: 9,
      totalMoves: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedRound = await initialRound.save();
    game.rounds.push(savedRound._id as Types.ObjectId);
    await game.save();

    return game;
  }

  async findGameById(gameId: string): Promise<GameWithRounds | null> {
    return await GameModel.findById(gameId).populate<{ rounds: RoundDocument[] }>('rounds');
  }

  async getGameResults():Promise<GameDocument[]> {
    return await GameModel.find();
  }
}

export const gameRepo = new GameRepo();
