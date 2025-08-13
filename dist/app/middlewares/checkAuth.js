"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// import { verifyToken } from "../utils/jwt";
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const user_interface_1 = require("../modules/user/user.interface");
const jwt_1 = require("../utils/jwt");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Access token is required");
        }
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        // console.log(verifiedToken)
        const isUserExist = yield user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "User dose not exist");
        }
        if (isUserExist.isActive === user_interface_1.isActive.BLOCKED || isUserExist.isActive === user_interface_1.isActive.INACTIVE) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `user  is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is deleted");
        }
        // console.log(accessToken)
        // if(!verifiedToken){
        //      console.log(verifiedToken)
        //      throw new AppError(httpStatus.BAD_REQUEST,`You are not authorized to access this route ${verifiedToken}`)
        // }
        // if (!authRoles.includes(verifiedToken.role)) {
        //   console.log(verifiedToken);
        //   throw new AppError(
        //     httpStatus.BAD_REQUEST,
        //     "You are not authorized to access this route"
        //   );
        // }
        if (!authRoles.includes(verifiedToken.role.toUpperCase())) {
            console.log("User role in token:", verifiedToken.role);
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not authorized to access this route");
        }
        //   todo: add user to request
        req.user = verifiedToken;
        // console.log(verifiedToken);
        next();
    }
    catch (error) {
        // console.log("JWT ERROR", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
