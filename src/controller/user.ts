import { Request, Response, request } from 'express'
import  Jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { user } from '../model/user'
import { passwordUser } from '../model/passwordModel'
import { acessToken } from '../midlewere/auth.guard'


export const createUser = async (request:Request, response:Response) =>{
    const {firstName, lastName, email, password,photoprofile,city,} = request.body
    if (!firstName){
        return response.status(422).json({ msg: " name is required" });
    }

    if (!lastName){
        return response.status(422).json({ msg: " last is required" });
    }

    if (!email) {
        return response.status(422).json({ msg: " email is required" });
      }

      if (!password) {
        return response.status(422).json({ msg: " password is required" });
      }

      const doesExiste = await user.findOne({email})
      if(doesExiste){
        return response.status(401).json('user already exist, please login!')
      }
      console.log(password)
      const encryptedpasswordhash = await bcrypt.hash(password, 12);

    try {

        const {_id} = await user.create({
            displayName:{
                firstName,
                lastName,
            },
            email,
            photoprofile

        })

        const passwordF = await passwordUser.create({
            userID:_id,
            password:encryptedpasswordhash
        })

        return response.status(200).json('user created ')
    } catch (error) {
        console.log(error)
        return response.status(401).json(error)    
    }
   
}

export const loginUser = async(request:Request, response:Response) =>{
    const {email, password} = request.body
    
    if (!email) {
        return response.status(422).json({ msg: "email is required" });
      }
    
      if (!password) {
        return response.status(422).json({ msg: "a password is requiredrs" });
      }
      
      const utilizador = await user.findOne({ email });
      console.log(utilizador)
     
      if (!utilizador) {
        return response.status(404).json({ msg: "User not found" });
      }
      console.log(utilizador)
    
      const checkpassword = await bcrypt.compare(password, passwordUser.password);
      if (!checkpassword) {
        return response.status(404).json({ msg: "Invalid password" });
      }
    

    try {
       //const loginUserF = await loginFirebase(emailUser, passwordUser)

       const secret = process.env.TOKEN_KEY!
       const token = Jwt.sign({
        _id:utilizador._id,



    }, `${secret}`, {expiresIn: 1000})  
   return response.status(200).json(`autenticacao realizada com sucesso, ${token}`);
       
        //return response.status(200).json(loginUserF)
    } catch (error) {
        return response.status(401).json(error)
        
    }
}



export const getUser = async (request:Request, response:Response) =>{
    try {
        const getUserF = await user.find()
        return response.status(200).json(getUserF)
    } catch (error) {
        return response.status(200).json('nenhum usuário encontrado')
    }
}
