import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import multer from "multer"
import path  from 'path'
import swaggerUi from 'swagger-ui-express'
import { connectionDB } from './connection/bdConnetion'
import swaggerDocs from './swagger.json'
import {router} from './routers/router'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,  'medleware')))
app.use('/public',express.static(path.join(__dirname, 'config/public')))
app.use('/api', router)

connectionDB()

const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log(`The server is running on http://localhost:${port}`)
})
