
import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { walletRoutes } from "../modules/wallet/wallet.route";


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
    }
]


moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})