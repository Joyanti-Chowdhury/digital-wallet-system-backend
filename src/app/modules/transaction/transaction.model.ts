import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

// const TransactionSchema = new Schema({
//   from: { type: Schema.Types.ObjectId, ref: 'User' },
//   to: { type: Schema.Types.ObjectId, ref: 'User' },
//   amount: { type: Number, required: true },
//   type: { type: String, enum: ['top-up', 'withdraw', 'transfer'], required: true },
//   timestamp: { type: Date, default: Date.now }
// });




const TransactionSchema: Schema = new Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  fee: { type: Number, default: 0 },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  initiatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' },
  meta: { type: Schema.Types.Mixed },
}, { timestamps: true });

// export default mongoose.model<ITransaction>('Transaction', TransactionSchema);





export default model<ITransaction>('Transaction', TransactionSchema);