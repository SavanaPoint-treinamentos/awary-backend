import { Request, Response, request } from 'express'
import {Coment} from '../model/comentModel'
import { User } from '../model/userModel'
import { Like } from '../model/likeModel'
import { Post } from '../model/postModel'

export const createLike= async (request:any, response:Response) =>{
    const { _id } = request.loginUser
    const {postID} = request.body
    try {
        //const usuarioID : any = await User.findById({_id})
        const like : any = await Like.findOne({userID:_id, postID:postID})
        console.log(like)
        if(like){
            const deleting = await Like.deleteOne({userID:_id, postID:postID})
            return response.json('like deleted')

        }
        const createLikeF = await Like.create({
            postID,
            userID:_id,
        })
       
        return response.status(200).json(createLikeF)

    } catch (error) {
        console.log(error)
        return response.status(401).json(error)
        
    }
   
}

export const getLike = async (request:Request, response:Response) =>{
    try {
        const getLikeF = await Like.find().populate('userID').populate('postID')
        return response.status(200).json({likes:getLikeF,likesCount:getLikeF.length})
    } catch (error) {
        return response.status(4001).json(error)
    }
}
    
 export const getLikeID = async (request:Request, response:Response) =>{
        const {_id} = request.params
    try {
            const verify = await Coment.findById({_id})
            if(!verify){
                return response.json('error, try again')
            }
            const getLikeIDF = await Coment.findOne({_id}).populate('userID').populate('postID')
            console.log(getLikeIDF)
            return response.status(200).json(getLikeIDF)
    } catch (error) {
            return response.status(401).json(error)
    }
}
    