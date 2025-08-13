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
exports.WalletControllers = exports.blockUser = exports.viewTransactions = exports.getTransactions = exports.transfer = exports.withdraw = exports.addMoney = void 0;
const transaction_model_1 = __importDefault(require("../transaction/transaction.model"));
const wallet_model_1 = require("./wallet.model");
const catcjhAsync_1 = require("../../utils/catcjhAsync");
const wallet_service_1 = require("./wallet.service");
const sendResponse_1 = require("../../utils/sendResponse");
const user_model_1 = require("../user/user.model");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const http_status_codes_1 = require("http-status-codes");
//  export const topUp = async (req: Request, res: Response) => {
//   const amount = req.body;
//   console.log(req.body);
//   const userId = (req as any).user.userId;
//   await walletModel.findOneAndUpdate({ userId }, { $inc: { balance: amount } });
//   await transactionModel.create({ to: userId, amount, type: 'top-up' });
//   res.json({ message: 'Top-up successful' });
// };
exports.addMoney = (0, catcjhAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.WalletServices.addMoney(req.body);
    // const latestMoney = await walletModel.findOne({ userId: (req as any).user.userId }).sort({ createdAt: -1 });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Money Added Successfully",
        data: result,
    });
}));
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, } = req.body;
    // console.log(amount)
    const userId = req.user.userId;
    // console.log(userId)
    const wallet = yield wallet_model_1.Wallet.findOne({ owner: userId });
    console.log(wallet);
    if (!wallet || wallet.balance < amount)
        return res.status(400).json({ error: 'Insufficient funds' });
    wallet.balance -= amount;
    yield wallet.save();
    yield transaction_model_1.default.create({ amount, type: 'withdraw' });
    res.json({ message: 'Withdrawal successful' });
});
exports.withdraw = withdraw;
const transfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { toEmail, amount } = req.body;
    const fromId = req.user.userId;
    // console.log(req)
    // const fromId = "6898d5b670ce589350c133ad";
    const toUser = yield user_model_1.User.findOne({ email: toEmail });
    if (!toUser)
        return res.status(404).json({ error: 'Recipient not found' });
    const fromWallet = yield wallet_model_1.Wallet.findOne({ owner: fromId });
    // console.log(fromWallet)
    const toWallet = yield wallet_model_1.Wallet.findOne({ owner: toUser._id });
    //  console.log(toWallet)
    if (!fromWallet || fromWallet.balance < amount)
        //  throw new AppError(StatusCodes.NOT_FOUND,"Transaction History Not Found")
        return res.status(400).json({ error: 'Insufficient funds' });
    fromWallet.balance -= amount;
    toWallet.balance += amount;
    yield fromWallet.save();
    yield toWallet.save();
    yield transaction_model_1.default.create({ from: fromId, to: toUser._id, amount, type: 'transfer' });
    res.json({ message: 'Transfer successful' });
});
exports.transfer = transfer;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.default.find({}).sort({ timestamp: -1 });
    res.json(transactions);
});
exports.getTransactions = getTransactions;
const viewTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.default.find({}).sort({ timestamp: -1 });
    res.json(transactions);
    if (!transactions) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Transaction History Not Found");
    }
    return transactions;
});
exports.viewTransactions = viewTransactions;
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await User.findById(userId)
    // const userId = (req as any).user.userId;
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Driver Not Found");
    }
    if (user.isDeleted) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User Already Blocked");
    }
    user.isDeleted = true;
    yield user.save();
    return user;
});
exports.blockUser = blockUser;
exports.WalletControllers = {
    addMoney: exports.addMoney,
    withdraw: exports.withdraw,
    transfer: exports.transfer,
    viewTransactions: exports.viewTransactions,
    getTransactions: exports.getTransactions,
    blockUser: exports.blockUser
};
// mehediimun.ph@gmail.com
