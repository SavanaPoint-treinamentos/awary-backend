import { Router } from "express";
import multer from "multer"
import  express  from "express"
import { verifyToken } from "../midlewere/auth.guard";
import { createUser, getUser, getUserID, loginUser, updateUser} from "../controller/userControll";
import { refreshConroller } from "../controller/refreshController";

export const router = Router()
const uppload = express()


router.post ('/awary/createUser', createUser )
router.post ('/awary/getUser', verifyToken, getUser )
router.post ('/awary/loginUser', loginUser )
router.post ('/awary/refresh-token', refreshConroller )
router.get ('/awary/getUserID/:_id',  verifyToken, getUserID)
router.put ('/awary/updateUser/:_id',  verifyToken ,updateUser)