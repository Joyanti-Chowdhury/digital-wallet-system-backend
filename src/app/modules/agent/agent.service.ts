import { StatusCodes } from "http-status-codes"
import AppError from "../../errorHelpers/appError"
import { User } from "../user/user.model"
import { AdminApproveStatus, IAgent } from "./agent.interface"
import { Agent } from "./agent.model"
import { Role } from "../user/user.interface"

const addMoney  = async (payload?: Partial<IAgent>,) => {
    const wallet = await Agent.create(payload)
    return wallet
}
export const adminApprovedStatus = async (adminId: string) => {
  const admin = await Agent.findById(adminId);
  const user = await User.findById(admin?.user);
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin Not Found");
  }
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }
  if (admin.approvedStatus === AdminApproveStatus.Approved) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Admin Already Approved");
  }

  admin.approvedStatus = AdminApproveStatus.Approved;
  user.role = Role.ADMIN;

  await admin.save();
  await user.save();
  return admin;
};
export const adminSuspendStatus = async (adminId: string) => {
  const admin = await Agent.findById(adminId);
  const user = await User.findById(admin?.user);
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin Not Found");
  }
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }
  if (admin.approvedStatus === AdminApproveStatus.Suspended) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Admin Already Suspended");
  }

  admin.approvedStatus = AdminApproveStatus.Suspended;
  user.role = Role.ADMIN;

  await admin.save();
  await user.save();
  return admin;
};


// const withdrawMoney = async ( Partial<IWallet>) => {
//     const wallet = await Wallet.findOne({owner : userId})
//     return wallet
// }



export  const agentServices = {
    addMoney,
    adminApprovedStatus,
    adminSuspendStatus
 
}