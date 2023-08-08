import { Schema, model } from "mongoose";
//import {coment} from './comentSchema'
//import {user} from './schemaUser'

const tokenSchema = new Schema({
   userID:{
    type:Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  expiresIN:{
    type:Date,
    required:true,
},

tokenRef:{
  type:String,
  required:true,
}


}, {timestamps:true});

export const Refreshtoken = model('refreshToken', tokenSchema)