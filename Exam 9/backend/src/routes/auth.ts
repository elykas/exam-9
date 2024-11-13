import  express, { Router }  from "express";
import { getUserByToken, insertMissiles } from "../controllers/authController";
import { verifyTokenAttack, verifyTokenForDefense } from "../middleware/authMiddleware";




const router:Router = express.Router();

//router.route("/").post(insertMissiles)
router.get('/auth/user/attack', verifyTokenAttack, getUserByToken);
router.get('/auth/user/defense', verifyTokenForDefense, getUserByToken);
router.route('/register').post();
router.route('/login').post();

export default router;