import { NextFunction, Request, Response, request } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { User } from "../model/userModel";
import { loginUser } from "./userControll";
import { PasswordUser } from "../model/passwordModel";
import { Refreshtoken } from "../model/refreshModel";


const secret = process.env.TOKEN_KEY!;

export const refreshConroller = async (
  request: Request,
  response: Response,
  next: NextFunction,
  
) => {
  const { tokenID } = request.body;

  try {
    const dataToken = await Refreshtoken.findOne({ tokenID });
    if (!dataToken) {
      return response.status(404).json({ message: "refreshtoken not found" });
    }

    const { tokenRef } = dataToken;
    const refToken: any = Jwt.verify(tokenRef, `${secret}`);

    const token = Jwt.sign(
      {
        _id: refToken._id,
      },
      `${secret}`,
      { expiresIn: "60min" }
    );

    return response.status(200).json(token)
  } catch (error) {
    return response.status(400).json(error)
  }
};
