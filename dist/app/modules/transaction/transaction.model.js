"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const TransactionSchema = new Schema({
//   from: { type: Schema.Types.ObjectId, ref: 'User' },
//   to: { type: Schema.Types.ObjectId, ref: 'User' },
//   amount: { type: Number, required: true },
//   type: { type: String, enum: ['top-up', 'withdraw', 'transfer'], required: true },
//   timestamp: { type: Date, default: Date.now }
// });
const TransactionSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    fee: { type: Number, default: 0 },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    initiatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'pending' },
    meta: { type: mongoose_1.Schema.Types.Mixed },
}, { timestamps: true });
// export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
exports.default = (0, mongoose_1.model)('Transaction', TransactionSchema);
