/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { UserServices } from "../user/user.service";
import { AuthServices } from "./auth.service";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/appError";
// import { setAuthCookie } from '../../utils/setToken';
import { JwtPayload } from "jsonwebtoken";
// import { createUserToken } from "../../utils/userTokens";
import { envVars } from "../../config/env";

import { catchAsync } from "../../utils/catcjhAsync";
import { setAuthCookie } from "../../utils/setToken";

const credentialsLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  // credentialsLogin

  const loginInfo = await AuthServices.credentialsLogin(req.body)

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
 setAuthCookie(res,loginInfo)


  // credential login

  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "user Logged in successfully",
    data: loginInfo
  })

})

const getNewAccessToken  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.cookies.refreshToken


  if(!refreshToken) {
    throw  new AppError(httpStatus.BAD_REQUEST, "No refresh token found in cookies")
  }
  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)


// res.cookie("accessToken",tokenInfo.accessToken,{
//   httpOnly: true,
//   secure: false
// })

// todo :  setAuthCookie(res,tokenInfo)
 setAuthCookie(res, tokenInfo.accessToken )


  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "New Access Token Retrieved in successfully",
    data: tokenInfo
  })

})

const logout  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite:"lax"
  })
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite:"lax"
  })


  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "user Logout in successfully",
    data: null
  })

})
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



export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    // resetPassword,
    logout,
 
}