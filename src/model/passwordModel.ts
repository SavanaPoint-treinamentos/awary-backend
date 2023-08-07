import { Schema, model } from "mongoose";
//import {coment} from './comentSchema'
//import {user} from './schemaUser'

const passwordSchema = new Schema({
   userID:{
    type:Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  password:{
    type:String,
    min:6,
    required:true,
}

}, {timestamps:true});

export const PasswordUser = model('password', passwordSchema)