/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catcjhAsync";
import { sendResponse } from "../../utils/sendResponse";
import { agentServices } from './agent.service';
import { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { blockUser } from '../wallet/wallet.controller';
import { Agent } from "./agent.model";

// export const addMoney = catchAsync(async (req: Request, res: Response) => {
//   const result = await agentServices.addMoney(req.body);
//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: "Money Added Successfully",
//     data: result,
//   });
// });


export const addMoney = catchAsync(
  async (req: Request, res: Response, next: NextFunction ) => {
     const {  owner:userId} = req.body
    // const { userId } = req.user as JwtPayload;
    const payload = req.body;
    const newMoney = await agentServices.addMoney(req.body) 
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Money Added Successfully",
      data: newMoney,
    });
  }
);


//  export const withdraw = async (req: Request, res: Response) => {
//   const { amount,owner:userId} = req.body;
//   console.log(amount)
//   // const userId = (req as any).user.userId;
//   // console.log(userId)
//   const wallet = await Agent.findOne({owner : userId});
// //   console.log(wallet)
//   if (!wallet || wallet.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });
//   wallet.balance -= amount;
//   await wallet.save();
//   await Agent.create({amount, type: 'withdraw' });
//   res.json({ message: 'Withdrawal successful' });
// };



export const withdraw  = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const ride = await Agent.findById(userId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Money Withdraw Successfully",
      data: ride,
    });
  }
);



const adminApprovedStatus  = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { adminId } = req.params;
    console.log(adminId)
    const admin = await agentServices.adminApprovedStatus(adminId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Admin Status Approved successfully",
      data: admin,
    });
  }
);
const adminSuspendStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { adminId } = req.params;
    const admin = await agentServices.adminSuspendStatus(adminId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Admin Status Suspended",
      data: admin,
    });
  }
);


export const agentControllers = {
  addMoney,
  withdraw,
  adminApprovedStatus,
  adminSuspendStatus

};
