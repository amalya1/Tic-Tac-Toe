import { Document, Types } from 'mongoose';
import { RoundDocument } from './roundType';



export interface GameDocument extends Document {
    player1: string;
    player2: string;
    rounds: Types.ObjectId[];
    winner: string | null;
}

export interface GameWithRounds extends Document{
    player1: string;
    player2: string;
    rounds: RoundDocument[];
    winner: string | null;
}