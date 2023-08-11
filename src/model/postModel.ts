import { Schema, model } from "mongoose";
import {User} from './userModel'

const postSchema = new Schema({
   userID:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  postTitle: {
    type: String,
    required: true,
  },

  postPhoto: {
    type: String,
    required: true,
  },

  likesCouter:{
    type:Number,
    min:0,
    default:0,
    required:false
  }

}, {timestamps:true});

export const Post = model('Post', postSchema)