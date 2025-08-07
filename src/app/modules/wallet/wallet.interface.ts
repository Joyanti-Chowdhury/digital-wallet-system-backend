import mongoose, { Schema, Document } from 'mongoose';


export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
}
