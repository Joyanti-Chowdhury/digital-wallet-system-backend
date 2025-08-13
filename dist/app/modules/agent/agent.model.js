"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const mongoose_1 = require("mongoose");
const agent_interface_1 = require("./agent.interface");
const agentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    approvedStatus: {
        type: String,
        enum: Object.values(agent_interface_1.AdminApproveStatus),
        default: agent_interface_1.AdminApproveStatus.Approved,
    },
    balance: {
        type: Number,
        default: 50,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true, versionKey: false });
exports.Agent = (0, mongoose_1.model)("Agent", agentSchema);
