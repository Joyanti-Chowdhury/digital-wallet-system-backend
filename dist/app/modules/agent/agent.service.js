"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentServices = exports.adminSuspendStatus = exports.adminApprovedStatus = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const user_model_1 = require("../user/user.model");
const agent_interface_1 = require("./agent.interface");
const agent_model_1 = require("./agent.model");
const user_interface_1 = require("../user/user.interface");
const addMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield agent_model_1.Agent.create(payload);
    return wallet;
});
const adminApprovedStatus = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield agent_model_1.Agent.findOne({ user: adminId });
    const user = yield user_model_1.User.findById(admin === null || admin === void 0 ? void 0 : admin.user);
    if (!admin) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Admin Not Found");
    }
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (admin.approvedStatus === agent_interface_1.AdminApproveStatus.Approved) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Admin Already Approved");
    }
    admin.approvedStatus = agent_interface_1.AdminApproveStatus.Approved;
    user.role = user_interface_1.Role.ADMIN;
    yield admin.save();
    yield user.save();
    return admin;
});
exports.adminApprovedStatus = adminApprovedStatus;
const adminSuspendStatus = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield agent_model_1.Agent.findOne({ user: adminId });
    const user = yield user_model_1.User.findById(admin === null || admin === void 0 ? void 0 : admin.user);
    if (!admin) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Admin Not Found");
    }
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (admin.approvedStatus === agent_interface_1.AdminApproveStatus.Suspended) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Admin Already Suspended");
    }
    admin.approvedStatus = agent_interface_1.AdminApproveStatus.Suspended;
    user.role = user_interface_1.Role.ADMIN;
    yield admin.save();
    yield user.save();
    return admin;
});
exports.adminSuspendStatus = adminSuspendStatus;
// const withdrawMoney = async ( Partial<IWallet>) => {
//     const wallet = await Wallet.findOne({owner : userId})
//     return wallet
// }
exports.agentServices = {
    addMoney,
    adminApprovedStatus: exports.adminApprovedStatus,
    adminSuspendStatus: exports.adminSuspendStatus
};
