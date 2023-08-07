import { Router } from "express";
import multer from "multer"
import  express  from "express"
import { createUser, getUser, loginUser } from "../controller/user";

export const router = Router()
const uppload = express()


router.post ('/awary/createUser', createUser )
router.post ('/awary/getUser', getUser )
router.post ('/awary/loginUser', loginUser )