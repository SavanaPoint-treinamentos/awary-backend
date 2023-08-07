import { NextFunction, Request, Response, request } from "express";
import { loginUser } from "../controller/user";
import { Jwt } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const tokenhash = process.env.TOKEN_KEY
export const verifyToken = (request: Request, response: Response, next:NextFunction) => {
  const token = request.body.token || request.query.token || request.headers["x-access-token"];

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = Jwt.verify(token, tokenhash);
    request.loginUser = decoded;
  } catch (err) {
    return response.status(401).send("Invalid Token");
  }
  return next();
};


// export const acessToken = async (request:Request, response:Response) =>{
//               const payload = {
//                 name : 'yours truly'

//               }

//               const secret = 'some super secret'
//               const options = {}
//               Jwt.sign(payload, secret, options,tokenhash)
// }
