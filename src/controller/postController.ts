import { Request, Response, request } from 'express'
import { Post } from '../model/postModel'
import { User } from '../model/userModel'


export const createPost = async (request:any, response:Response) =>{
    const { _id } = request.loginUser
   
    const {postTitle, postPhoto} = request.body
    try {
        const usuario : any = await User.findById({_id})
        
        const createPostF = await Post.create({
            postTitle,
            postPhoto,
            userID:usuario._id
        })
        return response.status(200).json(createPostF)

    } catch (error) {
        console.log(error)
        return response.status(401).json('error, try again')
        
    }
   
}


export const getPost = async (request:Request, response:Response) =>{
    const {_id} = request.params
try {
    const getPostF = await Post.find().populate('userID')
    return response.status(200).json(getPostF)
} catch (error) {
    return response.status(200).json('Post not found')
}
}



export const getPostID = async (request:Request, response:Response) =>{
        const {_id} = request.params
    try {
        const getPostF = await Post.find({_id}).populate('userID')
        return response.status(200).json(getPostF)
    } catch (error) {
        return response.status(200).json('Post not found')
    }
}



export const updatePost = async (request:Request, response:Response) =>{
    const {_id} = request.params
    const {userID, postTitle, postPhoto, PostLike, coments, likesCouter} = request.body
    try {
        const updatePostF = await Post.findById({_id})
        if (!updatePostF){
            return response.status(401).json('post not found')
        }
        await Post.updateOne({_id},{
            postTitle,
            postPhoto
        })
        return response.status(200).json(updatePostF)

    } catch (error) {
        return response.status(401).json('error, try again!')
        
    }
}



export const deletePost = async (request:Request, response:Response) =>{
    const {_id} = request.params
    try {
        const deletePostF = await Post.findById({_id})
        if(!deletePostF){
            return response.status(401).json('post not found')
        }

        await Post.deleteOne({_id})
        return response.status(200).json('post deleted')
    } catch (error) {
        return response.status(401).json(error)
    }
}

