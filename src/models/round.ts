import { Schema, model, Types } from 'mongoose';
import { RoundDocument } from '../types/roundType';


const roundSchema = new Schema<RoundDocument>({
  game: { type: Types.ObjectId, ref: 'Game', required: true },
  moves: { type: [String], default: [] }, winner: { type: String, default: null },
  emptyCells: { type: Number, required: true },
  totalMoves: { type: Number, required: true },
}, {
  collection: 'rounds',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

const RoundModel = model<RoundDocument>('Round', roundSchema);

export { RoundModel, RoundDocument };
