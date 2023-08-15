import { NextFunction, Request, Response, request } from "express";
import { loginUser } from "../controller/userControll";

import { Refreshtoken } from "../model/refreshModel";
import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.TOKEN_KEY!
export const verifyToken = (request: any, response: Response, next:NextFunction) => {
  const token = request.body.token || request.query.token || request.headers.token;

  console.log(secret)

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = Jwt.verify(token, secret);
    request.loginUser = decoded;
    return next();
  } catch (err) {
    console.log(err)
    return response.status(401).send("Invalid Token");
  }
}



