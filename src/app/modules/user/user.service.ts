import { envVars } from "../../config/env"
import AppError from "../../errorHelpers/appError"
import { IAuthProvider, IUser } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs"
import httpStatus from 'http-status-codes';

const createUser = async (payload : Partial<IUser>) => {
          const {password,  email, ...rest} = payload


          const isUserExist = await User.findOne({email})
     

          if(isUserExist){
              throw new AppError(httpStatus.BAD_REQUEST,"User already exist")
          }


          const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
       

//   const isPassWordMatch = await  bycriptjs.compare("123Riya#", hashedPassword)


const authProvider : IAuthProvider = {
    provider: "credentials",
    providerId: email as string 
}


       
        const user = await User.create({
       auths: [authProvider],
       email,
       password: hashedPassword,
       ...rest
    })


    return user
}

export const UserServices = {
    createUser
}