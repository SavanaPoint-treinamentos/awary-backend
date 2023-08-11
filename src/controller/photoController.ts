import { Request, Response } from "express";
import { User } from "../model/userModel";
import { Photo } from "../model/photoModel";
import path from "path";

export const createPhoto = async (request:any, response:Response) =>{
    const usuario : any = await User.find({uid:request.userId})
    const {name, userID} = request.body
    const file = request.file


    try {
      
        const picture = await Photo.create({
            userID: usuario._id,
            name,
            src:file.path
        })

        return response.status(200).json({picture, massege: 'saved'})

    } catch (error) {
        console.log(error)
        return response.status(500).json(error)
    }
}