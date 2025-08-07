"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
// import { Role } from "../user/user.interface";
// import { checkAuth } from "../../middlewares/checkAuth";
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthControllers.credentialsLogin);
router.post("/refresh-token", auth_controller_1.AuthControllers.getNewAccessToken);
router.post("/logout", auth_controller_1.AuthControllers.logout);
// router.post("/reset-password",checkAuth(...Object.values(Role)),AuthControllers.resetPassword)
exports.AuthRoutes = router;
