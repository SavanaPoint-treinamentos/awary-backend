import { Schema, model } from "mongoose";
//import {coment} from './comentSchema'
import { User } from "./userModel";





const photoSchema = new Schema({
   userID:{
    type:Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

src: {
  type: String,
  required: true,
}

}, {timestamps:true});

export const Photo = model('Photo', photoSchema)