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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
// import { generateToken, verifyToken } from "../../utils/jwt";
const env_1 = require("../../config/env");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userTokens_1 = require("../../utils/userTokens");
const credentialsLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = payload;
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "User dose not exist");
    }
    const isPassWordMatch = yield bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPassWordMatch) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Password does not match");
    }
    // const jwtPayload = {
    //     userId:isUserExist._id,
    //     email:isUserExist.email,
    //     role:isUserExist.role
    // }
    // const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
    // const refreshToken = generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET , envVars.JWT_ACCESS_EXPIRES)
    const userToken = (0, userTokens_1.createUserToken)(isUserExist);
    // delete isUserExist.password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = isUserExist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    };
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = yield (0, userTokens_1.createNewAccessTokenWithRefreshToken)(refreshToken);
    //     const verifiedRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload;
    //    const isUserExist = await User.findOne({email : verifiedRefreshToken.email})
    //           if(!isUserExist){
    //               throw new AppError(httpStatus.BAD_REQUEST,"User dose not exist")
    //           }
    //           if(isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE){
    //               throw new AppError(httpStatus.BAD_REQUEST,`user  is ${isUserExist.isActive}`)
    //           }
    //           if(isUserExist.isDeleted){
    //               throw new AppError(httpStatus.BAD_REQUEST,"User is deleted")
    //           }
    // const jwtPayload = {
    //     userId:isUserExist._id,
    //     email:isUserExist.email,
    //     role:isUserExist.role
    // }
    // const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
    // return {
    //     accessToken 
    // }
    return {
        accessToken: newAccessToken
    };
});
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    const isPassWordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isPassWordMatch) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, " Old Password does not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    user.save();
    return true;
});
exports.AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
};
