"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const wallet_route_1 = require("../modules/wallet/wallet.route");
// import { transactionRoute } from "../modules/transaction/transaction.route";
const agent_route_1 = require("../modules/agent/agent.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        router: user_route_1.userRoutes
    },
    {
        path: "/auth",
        router: auth_route_1.AuthRoutes
    },
    {
        path: "/wallet",
        router: wallet_route_1.walletRoutes
    },
    // {
    //     path: "/transactions",
    //     router: transactionRoute
    // },
    {
        path: "/agent",
        router: agent_route_1.agentRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.router);
});
