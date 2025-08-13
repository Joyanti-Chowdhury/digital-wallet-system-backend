import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import httpStatus from "http-status-codes";
// import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { isActive } from "../modules/user/user.interface";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "Access token is required");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      // console.log(verifiedToken)

const isUserExist = await User.findOne({email : verifiedToken.email})

          if(!isUserExist){
              throw new AppError(httpStatus.BAD_REQUEST,"User dose not exist")
          }
          if(isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE){
              throw new AppError(httpStatus.BAD_REQUEST,`user  is ${isUserExist.isActive}`)
          }
          if(isUserExist.isDeleted){
              throw new AppError(httpStatus.BAD_REQUEST,"User is deleted")
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
  throw new AppError(
    httpStatus.BAD_REQUEST,
    "You are not authorized to access this route"
  );
}


    //   todo: add user to request
    //   req.user = verifiedToken;


      // console.log(verifiedToken);
      next();
    } catch (error) {
      // console.log("JWT ERROR", error);
      next(error);
    }
  };
