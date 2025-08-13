import { checkAuth } from "../../middlewares/checkAuth";
import express from 'express';
// import { addMoney,  } from "./agent.controller";
import { Role } from "../user/user.interface";
import { addMoney, withdraw } from "./agent.controller";
// import { adminApprovedStatus, adminSuspendStatus } from "./agent.service";

const router = express.Router();

router.post('/add-money',
     checkAuth(Role.AGENT),
      addMoney);
router.post('/withdraw', checkAuth(Role.AGENT),withdraw );
// router.patch(
//   "/approved-admin-status/:adminId",
//   checkAuth(Role.ADMIN) ,adminApprovedStatus
// );
// router.patch(
//   "/suspended-admin-status/:adminId",
//   checkAuth(Role.ADMIN),adminSuspendStatus
// );


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
// router.post('/withdraw', checkAuth(['user', 'agent']), withdraw);
// router.post('/transfer', checkAuth(['user', 'agent']), transfer);
// router.get('/transactions', checkAuth(['user', 'agent']), getTransactions);

export const agentRoutes = router;