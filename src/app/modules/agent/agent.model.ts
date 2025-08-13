import { model, Schema } from "mongoose";
import { AdminApproveStatus, IAgent } from "./agent.interface";


const agentSchema = new Schema<IAgent>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    approvedStatus: {
      type: String,
      enum: Object.values(AdminApproveStatus),
      default: AdminApproveStatus.Approved,
    },
    balance: {
      type: Number,
      default: 50,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },


  },
  { timestamps: true, versionKey: false }
);

export const Agent = model<IAgent>("Agent", agentSchema);
