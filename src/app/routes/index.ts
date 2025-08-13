
import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { walletRoutes } from "../modules/wallet/wallet.route";
// import { transactionRoute } from "../modules/transaction/transaction.route";
import { agentRoutes } from "../modules/agent/agent.route";



export const router = Router()


const moduleRoutes = [
    {
        path:"/user",
        router: userRoutes
    },

    {
        path:"/auth",
        router: AuthRoutes
    },
    {
        path:"/wallet",
        router: walletRoutes
    },
    // {
    //     path: "/transactions",
    //     router: transactionRoute
    // },
    {
        path: "/agent",
        router: agentRoutes
    }
]


moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})