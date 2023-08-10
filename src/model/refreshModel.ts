import { Schema, model } from "mongoose";
//import {coment} from './comentSchema'
//import {user} from './schemaUser'

const tokenSchema = new Schema({
   userID:{
    type:Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

 
tokenRef:{
  type:String,
  required:true,
},

tokenID: {
  type: String,
  required: true,
  unique: true
}

}, {timestamps:true});

export const Refreshtoken = model('refreshToken', tokenSchema)