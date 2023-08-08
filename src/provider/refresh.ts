import { Request, Response, request, response } from "express";
import { Refreshtoken } from "../model/refreshModel";
import { user } from "../model/user";
import dayjs from "dayjs";
import   Jwt  from "jsonwebtoken";

class refreshUser{
  async excute(refresh_token:string){
    const {tokenRef} = request.body
    const refresh = await Refreshtoken.findOne({
            where:{
                token:tokenRef
            }       
    })

    if(!refresh){
        return response.json('token invalid')
    }

  }
}
export {refreshUser}
  

