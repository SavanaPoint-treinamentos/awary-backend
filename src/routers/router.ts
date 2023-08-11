import { NextFunction, Router } from "express";
import multer from "multer"
import  express  from "express"
import {Request, Response} from 'express'
import { verifyToken } from "../midlewere/auth.guard";
import { createUser, deleteUser, getUser, getUserID, loginUser, updateUser} from "../controller/userControll";
import { refreshConroller } from "../controller/refreshController";
import { createPost, deletePost, getPost } from "../controller/postController";
import { upload } from "../config/multer";
import { createPhoto } from "../controller/photoController";
import { createComent, getComent } from "../controller/commentControl";


export const router = Router()
const uppload = express()

router.post ('/awary/uploadPhoto', upload.single('file'),createPhoto )

router.post ('/awary/createUser', createUser )
router.post ('/awary/loginUser', loginUser )
router.get ('/awary/getUser', verifyToken,getUser )
router.post ('/awary/refresh-token', refreshConroller )
router.get ('/awary/getUserID/:_id', verifyToken, getUserID)
router.put ('/awary/updateUser/:_id', verifyToken,  updateUser)
router.delete ('/awary/deleteUser/:_id',verifyToken, deleteUser)

router.post ('/awary/createPost',verifyToken, createPost )
router.get ('/awary/getPost', verifyToken, getPost)
router.get ('/awary/getPostID/:_id', verifyToken, getPost)
router.delete ('/awary/deletePost/:_id', verifyToken, deletePost)


router.post ('/awary/createComent',verifyToken, createComent )
router.post ('/awary/getComent',verifyToken, getComent )





