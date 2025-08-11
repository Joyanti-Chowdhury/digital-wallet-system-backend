/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import transactionModel from "../transaction/transaction.model";
import walletModel from "./wallet.model";
import { catchAsync } from "../../utils/catcjhAsync";
import { WalletServices } from './wallet.service';
import { sendResponse } from '../../utils/sendResponse';


//  export const topUp = async (req: Request, res: Response) => {
//   const amount = req.body;
//   console.log(req.body);
//   const userId = (req as any).user.userId;
//   await walletModel.findOneAndUpdate({ userId }, { $inc: { balance: amount } });
//   await transactionModel.create({ to: userId, amount, type: 'top-up' });
//   res.json({ message: 'Top-up successful' });
// };


export  const addMoney = catchAsync (async (req: Request, res: Response) => {
    
      const result = await  WalletServices.addMoney(req.body)
      // const latestmoney = await walletModel.findOne({ userId: (req as any).user.userId }).sort({ createdAt: -1 });
   sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Money Added Successfully",
        data: result,
    });
});


 export const withdraw = async (req: Request, res: Response) => {
  const { amount } = req.body;
  // const userId = (req as any).user.userId;
  const wallet = await walletModel.findOne(req.body);
  if (!wallet || wallet.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });
  wallet.balance -= amount;
  await wallet.save();
  await transactionModel.create({amount, type: 'withdraw' });
  res.json({ message: 'Withdrawal successful' });
};

// export const transfer = async (req: Request, res: Response) => {
//   const { toEmail, amount } = req.body;
//   const fromId = (req as any).user.userId;

//   const toUser = await User.findOne({ email: toEmail });
//   if (!toUser) return res.status(404).json({ error: 'Recipient not found' });

//   const fromWallet = await walletModel.findOne({ userId: fromId });
//   const toWallet = await walletModel.findOne({ userId: toUser._id });

//   if (!fromWallet || fromWallet.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });

//   fromWallet.balance -= amount; 
//   toWallet.balance += amount 
//   await fromWallet.save();
//   await toWallet.save();

//   await transactionModel.create({ from: fromId, to: toUser._id, amount, type: 'transfer' });
//   res.json({ message: 'Transfer successful' });
// };


 export const getTransactions = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const transactions = await transactionModel.find({
    $or: [{ from: userId }, { to: userId }]
  }).sort({ timestamp: -1 });
  res.json(transactions);
};



export const WalletControllers = {
  addMoney,
//    withdraw,
// //    transfer,
//    getTransactions
}