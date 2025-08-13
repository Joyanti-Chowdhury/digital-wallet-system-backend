"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const env_1 = require("../../config/env");
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
const WalletSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: parseFloat(env_1.envVars.INITIAL_BALANCE || "50") },
    blocked: { type: Boolean, default: false },
}, { timestamps: true });
// export default model<IWallet>('Wallet', WalletSchema);
exports.Wallet = (0, mongoose_1.model)('Wallet', WalletSchema);
