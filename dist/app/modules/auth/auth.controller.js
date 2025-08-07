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
exports.AuthControllers = void 0;
// import { catchAsync } from "../../utils/catchAsync";
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const catcjhAsync_1 = require("../../utils/catcjhAsync");
const setToken_1 = require("../../utils/setToken");
const credentialsLogin = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // credentialsLogin
    const loginInfo = yield auth_service_1.AuthServices.credentialsLogin(req.body);
    // google login with credentials
    //   passport.authenticate("local",async (err:any , user:any, info:any) => {
    //    if(err){
    //       console.log("from err")
    //     return next(new AppError(401,err))
    //      // next(err)
    //     // return new AppError(401,err)
    //    }
    //    if(!user){
    //        console.log("from not user")
    //     // return next(info)
    //       return next(new AppError(401,info.message))
    //     // return new AppError(401,info.message)
    //    }
    //   const userToken = await createUserToken(user)
    //   // delete user.toObject().password
    //   const {password:pass,...rest} = user.toObject()
    //     setAuthCookie(res,userToken)
    //     sendResponse(res,{
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "user Logged in successfully",
    //     data: {
    //       accessToken: userToken.accessToken,
    //       refreshToken : userToken.refreshToken,
    //       user: rest
    //     }
    //   })
    //   })(req,res,next)
    // credential login
    (0, setToken_1.setAuthCookie)(res, loginInfo);
    // credential login
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "user Logged in successfully",
        data: loginInfo
    });
}));
const getNewAccessToken = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "No refresh token found in cookies");
    }
    const tokenInfo = yield auth_service_1.AuthServices.getNewAccessToken(refreshToken);
    // res.cookie("accessToken",tokenInfo.accessToken,{
    //   httpOnly: true,
    //   secure: false
    // })
    // todo :  setAuthCookie(res,tokenInfo)
    (0, setToken_1.setAuthCookie)(res, tokenInfo.accessToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "New Access Token Retrieved in successfully",
        data: tokenInfo
    });
}));
const logout = (0, catcjhAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "user Logout in successfully",
        data: null
    });
}));
// const resetPassword  = catchAsync(async(req: Request, res: Response, next: NextFunction ) => {
//  const newPassword = req.body.newPassword
//    const oldPassword = req.body.oldPassword
// //    const decodedToken = req.user
// const decodedToken = req.user.decodedToken
// console.log(decodedToken)
// // todo
//    await AuthServices.resetPassword(oldPassword, newPassword,decodedToken as JwtPayload)
//   sendResponse(res,{
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Password Reset successfully",
//     data: null
//   })
// })
exports.AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    // resetPassword,
    logout,
};
