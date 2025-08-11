import express from 'express';
import {  withdraw,getTransactions, addMoney } from './wallet.controller';


const router = express.Router();

router.post('/add-money', addMoney);
router.post('/withdraw',withdraw );
// router.post('/transfer', transfer );
router.get('/transactions', getTransactions );
// router.post('/withdraw', checkAuth(['user', 'agent']), withdraw);
// router.post('/transfer', checkAuth(['user', 'agent']), transfer);
// router.get('/transactions', checkAuth(['user', 'agent']), getTransactions);

export const walletRoutes = router;