import  {  Document, Types } from 'mongoose';


// export interface IWallet extends Document {
//   userId: Types.ObjectId;
//   balance: number;
// }
export interface IWallet extends Document {
 owner?: Types.ObjectId; // references User
  balance: number;       // store as integer paise? here we use float for simplicity
  blocked?: boolean;
  createdAt?: Date;
}