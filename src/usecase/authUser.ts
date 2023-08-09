import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import dayjs from "dayjs"
import Jwt  from "jsonwebtoken"
import { PasswordUser } from "../model/passwordModel"
import { user } from "../model/user"
import { Refreshtoken } from "../model/refreshModel"




export const AUTH_USER = async (request:Request, response:Response) =>{
    const {email, password} = request.body
    if (!email) {
        return response.status(422).json({ msg: "email is required" });
      }
    
      if (!password) {
        return response.status(422).json({ msg: "a password is required" });
      }
      
      const utilizador = await user.findOne({ email });
      console.log(utilizador)
     
      if (!utilizador) {
        return response.status(404).json({ msg: "User not found" });
      }
      console.log(utilizador)
      const pass = await PasswordUser.findOne({userID: utilizador._id})
    
      const checkpassword = await bcrypt.compare(password, pass?.password);
      if (!checkpassword) {
        return response.status(404).json({ msg: "Invalid password" });
      }
    
    try {
       //const loginUserF = await loginFirebase(emailUser, passwordUser)
       const secret = process.env.TOKEN_KEY!
       const token = Jwt.sign({
        _id:utilizador._id,
    }, `${secret}`, {expiresIn: '3min'})  

    //TESTE>>.......

    const newutilizador = await user.findOne({ email });
    console.log(newutilizador)
    const expiresDate = dayjs().add(15, "day").unix()
   
    if (!newutilizador) {
      return response.status(404).json({ msg: "User not found" });
    }

    const reftoken = Jwt.sign({
        _id:newutilizador._id,
    }, `${secret}`, {expiresIn: expiresDate}) 
     
    await Refreshtoken.create({
        userID: newutilizador?._id,
        tokenRef:reftoken,
        expiresIN: expiresDate,
      });

      console.log(reftoken)
   return response.status(200).json(`autenticacao realizada com sucesso, ${token}, RefreshToken: ${reftoken}`);

   //const refresh = await genareteToken.execute(utilizador?._id)
    } catch (error) {
        return response.status(401).json(error)
        
    }
    
}
