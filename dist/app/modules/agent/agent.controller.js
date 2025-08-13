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
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentControllers = exports.withdraw = exports.addMoney = void 0;
const catcjhAsync_1 = require("../../utils/catcjhAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const agent_service_1 = require("./agent.service");
const http_status_codes_1 = require("http-status-codes");
const agent_model_1 = require("./agent.model");
// export const addMoney = catchAsync(async (req: Request, res: Response) => {
//   const result = await agentServices.addMoney(req.body);
//   sendResponse(res, {
//     statusCode: 201,
//     success: true,
//     message: "Money Added Successfully",
//     data: result,
//   });
// });
exports.addMoney = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner: userId } = req.body;
    // const { userId } = req.user as JwtPayload;
    const payload = req.body;
    const newMoney = yield agent_service_1.agentServices.addMoney(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Money Added Successfully",
        data: newMoney,
    });
}));
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
exports.withdraw = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const ride = yield agent_model_1.Agent.findById(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Money Withdraw Successfully",
        data: ride,
    });
}));
const adminApprovedStatus = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    console.log(adminId);
    const admin = yield agent_service_1.agentServices.adminApprovedStatus(adminId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Admin Status Approved successfully",
        data: admin,
    });
}));
const adminSuspendStatus = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const admin = yield agent_service_1.agentServices.adminSuspendStatus(adminId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Admin Status Suspended",
        data: admin,
    });
}));
exports.agentControllers = {
    addMoney: exports.addMoney,
    withdraw: exports.withdraw,
    adminApprovedStatus,
    adminSuspendStatus
};
