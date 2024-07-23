import { RoundModel } from '../models/round';
import { RoundDocument } from '../types/roundType';
import { Types } from 'mongoose';



class RoundRepo {
  async saveRound(round: RoundDocument){
    return await round.save();
  }

  async createRound(gameId: Types.ObjectId): Promise<RoundDocument> {
    const round = new RoundModel({
      game: gameId,
      moves: [],
      emptyCells: 9,
      totalMoves: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return await round.save();
  }

  async getAllRounds(): Promise<RoundDocument[]> {
    return await RoundModel.find();
  }
}

export const roundRepo = new RoundRepo();
