import { Request, Response } from "express";
import { User } from "../model/userModel";
import { Photo } from "../model/photoModel";
import path from "path";

export const createPhoto = async (request:any, response:Response) =>{
    const usuario : any = await User.find({uid:request.userId})
    const {name, userID} = request.body
    const file = request.file
    let fullUrl = request.protocol + '://' + request.get('host') + '/public/'
    
    try {
      
        const picture = await Photo.create({
            userID: usuario[0]._id,
            name,
            src:fullUrl + file.filename
        })

        return response.status(200).json({picture, massege: 'saved'})

    } catch (error) {
        return response.status(500).json(error)
    }
}