import { Schema, model } from "mongoose";
import { Coment } from "./comentModel";
import { User } from "./userModel";


const likeSchema = new Schema({
   userID:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  postID:{
    type:Schema.Types.ObjectId,
    required:true,
    ref: 'Post'
}

}, {timestamps:true});

export const Like = model('Like', likeSchema)