import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";
import {envVars}  from "../../config/env";

// const WalletSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   balance: { type: Number, default: 50 },
// });


// import mongoose, {Schema, Document, Types} from 'mongoose';


// export interface IWallet extends Document {
//   owner: Types.ObjectId; // references User
//   balance: number;       // store as integer paise? here we use float for simplicity
//   blocked: boolean;
//   createdAt: Date;
// }

const WalletSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: parseFloat(envVars.INITIAL_BALANCE || "50") },
  blocked: { type: Boolean, default: false },
}, { timestamps: true });






// export default model<IWallet>('Wallet', WalletSchema);

export const Wallet = model<IWallet>('Wallet', WalletSchema);