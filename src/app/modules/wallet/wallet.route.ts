import express from 'express';
import {  withdraw,getTransactions, addMoney, transfer, WalletControllers } from './wallet.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
// import { checkAuth } from '../../middlewares/checkAuth';


const router = express.Router();

router.post('/add-money', addMoney);
router.post('/withdraw',withdraw );
router.post('/transfer',transfer );
router.get('/transactions', getTransactions );
router.get(
  "/view-transactions-history",
  checkAuth(Role.AGENT),
  WalletControllers.viewTransactions
);
router.patch(
  "/block-user/:id",
//   checkAuth(Role.ADMIN),
    WalletControllers.blockUser
);
// router.post('/withdraw', checkAuth(['user', 'agent']), withdraw);
// router.post('/transfer', checkAuth(['user', 'agent']), transfer);
// router.get('/transactions', checkAuth(['user', 'agent']), getTransactions);

export const walletRoutes = router;