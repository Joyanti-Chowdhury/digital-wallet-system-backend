/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import transactionModel from "../transaction/transaction.model";
import { Wallet } from "./wallet.model";
import { catchAsync } from "../../utils/catcjhAsync";
import { WalletServices } from './wallet.service';
import { sendResponse } from '../../utils/sendResponse';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/appError';
import { StatusCodes } from 'http-status-codes';


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
      // const latestMoney = await walletModel.findOne({ userId: (req as any).user.userId }).sort({ createdAt: -1 });
   sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Money Added Successfully",
        data: result,
    });
});


 export const withdraw = async (req: Request, res: Response) => {
  const { amount ,} = req.body;
  // console.log(amount)
  const userId = (req as any).user.userId;
  // console.log(userId)
  const wallet = await Wallet.findOne({owner : userId});
  console.log(wallet)
  if (!wallet || wallet.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });
  wallet.balance -= amount;
  await wallet.save();
  await transactionModel.create({amount, type: 'withdraw' });
  res.json({ message: 'Withdrawal successful' });
};

export const transfer = async (req: Request, res: Response) => {
  const { toEmail, amount } = req.body;
  const fromId = req.user.userId;
  // console.log(req)
  // const fromId = "6898d5b670ce589350c133ad";

  const toUser = await User.findOne({ email: toEmail });
  if (!toUser) return res.status(404).json({ error: 'Recipient not found' });

  const fromWallet = await Wallet.findOne({ owner: fromId });

  // console.log(fromWallet)

  const toWallet = await Wallet.findOne({ owner: toUser._id }) as JwtPayload ;

  //  console.log(toWallet)
  if (!fromWallet || fromWallet.balance < amount)
    
  //  throw new AppError(StatusCodes.NOT_FOUND,"Transaction History Not Found")
    return res.status(400).json({ error: 'Insufficient funds' });

  fromWallet.balance -= amount; 
  toWallet.balance += amount 
  await fromWallet.save();
  await toWallet.save();



  await transactionModel.create({ from: fromId, to: toUser._id, amount, type: 'transfer' });
  res.json({ message: 'Transfer successful' });
};


 export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find({
  }).sort({ timestamp: -1 });
  res.json(transactions);
};


export  const viewTransactions = async (req: Request, res: Response) => {
  const transactions = await transactionModel.find({
  }).sort({ timestamp: -1 });
  res.json(transactions);

   if (!transactions) {
    throw new AppError(StatusCodes.NOT_FOUND, "Transaction History Not Found");
  }
  return transactions
};



export const blockUser = async (userId:string) => {

  // const user = await User.findById(userId)

  // const userId = (req as any).user.userId;
   const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "Driver Not Found");
  }
  if (user.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Blocked");
  }

  user.isDeleted = true as unknown as string;
  await user.save();
  return user;
};


export const WalletControllers = {
  addMoney,
   withdraw,
   transfer,
   viewTransactions,
   getTransactions,
   blockUser
}


// mehediimun.ph@gmail.com
