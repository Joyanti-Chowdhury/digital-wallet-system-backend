"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRoutes = void 0;
const checkAuth_1 = require("../../middlewares/checkAuth");
const express_1 = __importDefault(require("express"));
// import { addMoney,  } from "./agent.controller";
const user_interface_1 = require("../user/user.interface");
const agent_controller_1 = require("./agent.controller");
const router = express_1.default.Router();
router.post('/add-money', (0, checkAuth_1.checkAuth)(user_interface_1.Role.AGENT, user_interface_1.Role.ADMIN), agent_controller_1.addMoney);
router.post('/withdraw', (0, checkAuth_1.checkAuth)(user_interface_1.Role.AGENT, user_interface_1.Role.ADMIN), agent_controller_1.withdraw);
router.patch("/approved-admin-status/:adminId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), agent_controller_1.agentControllers.adminApprovedStatus);
router.patch("/suspended-admin-status/:adminId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), agent_controller_1.agentControllers.adminSuspendStatus);
// router.post('/transfer',transfer );
// router.get('/transactions', getTransactions );
// router.get(
//   "/view-transactions-history",
//   checkAuth(Role.AGENT),
// AgentControllers.viewTransactions
// );
// router.patch(
//   "/block-user/:id",
// //   checkAuth(Role.ADMIN),
//     WalletControllers.blockUser
// );
exports.agentRoutes = router;
