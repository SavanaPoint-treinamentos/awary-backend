import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import multer from "multer"
import path  from 'path'
import { connectionDB } from './connection/bdConnetion'
import {router} from './routers/router'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,  'medleware')))
app.use('/public',express.static(path.join(__dirname, 'config/public')))
app.use('/api', router)

connectionDB()

const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log(`The server is running on http://localhost:${port}`)
})
