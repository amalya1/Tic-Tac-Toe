import { Schema, model, Types } from 'mongoose';
import { GameDocument } from '../types/gameType';


const gameSchema = new Schema<GameDocument>({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  rounds: [{ type: Types.ObjectId, ref: 'Round' }],
  winner: { type: String, default: null },
}, {
  collection: 'games',
  timestamps: true,
});

const GameModel = model<GameDocument>('Game', gameSchema);

export { GameDocument, GameModel };
