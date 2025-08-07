import { model, Schema } from "mongoose";
import { IWallet } from "./wallet.interface";

const WalletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 50 },
});

export default model<IWallet>('Wallet', WalletSchema);