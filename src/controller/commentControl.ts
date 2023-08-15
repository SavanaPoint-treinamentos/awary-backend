import { Request, Response, request } from 'express'
import { Coment } from '../model/comentModel'
import { User } from '../model/userModel'

export const createComent= async (request:any, response:Response) =>{
    const {comentt,postID} = request.body
    try {
        const usuario : any = await User.findOne({uid:request.userId})
        const createComentF = await Coment.create({
            comentt ,
            postID,
            userID:usuario?._id
        })
       
        return response.status(200).json(createComentF)

    } catch (error) {
        console.log(error)
        return response.status(401).json('error, try again')
        
    }
}

export const getComent = async (request:Request, response:Response) =>{
try {
    const getComentF = await Coment.find().populate('userID').populate('postID')
    return response.status(200).json({getComentF, commentCount: getComentF.length})
} catch (error) {
    return response.status(200).json('no posts found')
}
}

export const getComentID = async (request:Request, response:Response) =>{
    const {_id} = request.params
    try {
        const getComentIDF = await Coment.findOne({_id}).populate('userID').populate('postID')
        return response.status(200).json(getComentIDF)
    } catch (error) {
        return response.status(200).json('no posts found')
    }
    }

    export const getComentpostID = async (request:Request, response:Response) =>{
        const {postID} = request.params
        try {
            const getComentF = await Coment.find().populate('userID').populate('postID')
            return response.status(200).json(getComentF)
        } catch (error) {
            return response.status(200).json('no posts found')
        }
        }
    


export const updateComent = async (request:Request, response:Response) =>{
    const {_id} = request.params
    const {author,userID,comentt,postComent}  = request.body
    try {
        const updateComentF = await Coment.findById({_id})
        if (!updateComentF){
            return response.status(401).json('Comment not found')
        }
        await Coment.updateOne({_id},{
            comentt
        })
        return response.status(200).json(updateComentF)

    } catch (error) {
        return response.status(401).json(error)
        
    }
}


export const deleteComent = async (request:Request, response:Response) =>{
    const {_id} = request.params
    try {
        const deletePostF = await Coment.findById({_id})
        if(!deletePostF){
            return response.status(401).json('comment not found')
        }

        await Coment.deleteOne({_id})
        return response.status(200).json('comment deleted')
    } catch (error) {
        return response.status(401).json(error)
    }
}
