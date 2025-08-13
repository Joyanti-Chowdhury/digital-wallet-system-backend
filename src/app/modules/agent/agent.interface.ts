import { Types } from "mongoose";

export enum AdminApproveStatus {
  Approved = "APPROVED",
  Suspended = "SUSPENDED",
  Block = "BLOCKED",
  Unblock = "UNBLOCKED",
}

export interface IAgent extends Document {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  profileImage?: string;
  approvedStatus?: AdminApproveStatus;
  owner?: Types.ObjectId;
  balance: number;
  createdAt?: Date;
}
