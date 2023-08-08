import { Request, Response, request } from 'express'
import  Jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { Refreshtoken } from '../model/refreshModel'
import { user } from '../model/user'
import { PasswordUser } from '../model/passwordModel'
//mport { acessToken } from '../midlewere/auth.guard'
//import { genareteToken } from '../provider/refresh'


export const createUser = async (request:Request, response:Response) =>{
    const {firstName, lastName, email, password,photoprofile,city} = request.body
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

        const passwordF = await PasswordUser.create({
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
    const {email, password,tokenRef} = request.body
    
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





export const getUser = async (request:Request, response:Response) =>{
    try {
        const getUserF = await user.find()
        return response.status(200).json(getUserF)
    } catch (error) {
        return response.status(200).json('nenhum usuário encontrado')
    }
}

export const getUserID = async (request:Request, response:Response) =>{
    const {_id} = request.params
    try {
        const getUserF = await user.findById({_id})
        if (!getUserF){
            return response.status(401).json('nenhum usuário encontrado')
        }
        return response.status(200).json(getUserF)
    } catch (error) {
        return response.status(200).json('nenhum usuário encontrado')
    }
}

export const updateUser = async (request:Request, response:Response) =>{
    const {_id} = request.params
    const {firstName, lastName, email, password,photoprofile,city} = request.body
    try {
        const updateUserF = await user.findById({_id})
        if (!updateUserF){
            return response.status(401).json('nenhum usuário encontrado')
        }
        await user.updateOne({_id},{
            displayName:{
                firstName,
                lastName,
            },
            email,
            photoprofile
        })
        return response.status(200).json(updateUserF)

    } catch (error) {
        return response.status(401).json('erro ao actualizar usuário, tente novamente!')
        
    }
}
