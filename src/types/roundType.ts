import { Document, Types } from 'mongoose';
import { GameDocument } from './gameType';



export interface RoundDocument extends Document {
    game: Types.ObjectId | GameDocument;
    moves: string[];
    winner: string | null;
    emptyCells: number;
    totalMoves: number;
    createdAt: Date;
    updatedAt: Date;
}