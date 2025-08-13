import express from 'express';
import {  withdraw,getTransactions, addMoney, transfer, WalletControllers } from './wallet.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';



const router = express.Router();

router.post('/add-money',checkAuth(Role.USER,Role.ADMIN), addMoney);
router.post('/withdraw', checkAuth(Role.USER,Role.ADMIN),withdraw );
router.post('/transfer',checkAuth(Role.USER,Role.ADMIN),transfer );
router.get('/transactions',checkAuth(Role.USER,Role.ADMIN), getTransactions );
router.get(
  "/view-transactions-history",
  checkAuth(Role.USER,Role.ADMIN),
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