import { checkAuth } from "../../middlewares/checkAuth";
import express from 'express';
// import { addMoney,  } from "./agent.controller";
import { Role } from "../user/user.interface";
import { addMoney, agentControllers, withdraw } from "./agent.controller";


const router = express.Router();

router.post('/add-money',
     checkAuth(Role.AGENT),
      addMoney);
router.post('/withdraw', checkAuth(Role.AGENT),withdraw );
router.patch(
  "/approved-admin-status/:adminId",
  checkAuth(Role.ADMIN) ,
  agentControllers.adminApprovedStatus
);
router.patch(
  "/suspended-admin-status/:adminId",
  checkAuth(Role.ADMIN),agentControllers.adminSuspendStatus
);



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

export const agentRoutes = router;