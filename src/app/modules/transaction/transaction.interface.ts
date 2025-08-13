/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Types } from "mongoose";

// export interface ITransaction extends Document {
//   from?: Types.ObjectId;
//   to?: Types.ObjectId;
//   amount: number;
//   type: 'top-up' | 'withdraw' | 'transfer';
//   timestamp: Date;
// }


import  { Document, Types} from 'mongoose';

export type TxType = 'topup' | 'withdraw' | 'transfer' | 'cash_in' | 'cash_out' | 'commission' | 'admin_adjust';
export type TxStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface ITransaction extends Document {
  type: string;
  amount: number;
  fee: number;             // fee amount
  from?: Types.ObjectId;   // optional: wallet/user who sent (could be agent)
  to?: Types.ObjectId;     // optional: recipient wallet/user
  initiatedBy?: Types.ObjectId; // user/agent/admin who initiated
  status: TxStatus;
  meta?: any;
  createdAt: Date;
}
