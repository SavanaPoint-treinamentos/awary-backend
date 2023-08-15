import { Schema, model } from "mongoose";
import { Post } from "./postModel";
import { User } from "./userModel";

const comentSchema= new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comentt:{
        type:String,
        required: false
    },

    postID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Post'
    },

}, {timestamps:true})

export const Coment = model('Comment', comentSchema)