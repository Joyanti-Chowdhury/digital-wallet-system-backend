import express from 'express';
import {  withdraw,getTransactions, addMoney, transfer, WalletControllers } from './wallet.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';



const router = express.Router();

router.post('/add-money',checkAuth(Role.USER), addMoney);
router.post('/withdraw', checkAuth(Role.USER),withdraw );
router.post('/transfer',checkAuth(Role.USER),transfer );
router.get('/transactions', getTransactions );
router.get(
  "/view-transactions-history",
  checkAuth(Role.USER),
  WalletControllers.viewTransactions
);
router.patch(
  "/block-user/:id",
  checkAuth(Role.ADMIN),
    WalletControllers.blockUser
);
// router.post('/withdraw', checkAuth(['user', 'agent']), withdraw);
// router.post('/transfer', checkAuth(['user', 'agent']), transfer);
// router.get('/transactions', checkAuth(['user', 'agent']), getTransactions);

export const walletRoutes = router;