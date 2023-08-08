import { NextFunction, Request, Response, request } from 'express'
import  Jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dayjs from "dayjs";
import { user } from '../model/user'
import { loginUser } from "../controller/user"
import { Refreshtoken } from '../model/refreshModel';
import { PasswordUser } from '../model/passwordModel'
//mport { acessToken } from '../midlewere/auth.guard'
//import { genareteToken } from '../provider/refresh'


export const refreshConroller = async(request:any, response:Response, next:NextFunction, refresh_token:string) =>{
          const {RefreshToken} = request.body
          const token = await 
         
  


}



   
