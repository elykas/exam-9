import  express, { Router }  from "express";
import { getUserByToken, insertMissiles, login, register} from "../controllers/authController";
import { verifyTokenAttack, verifyTokenForDefense } from "../middleware/authMiddleware";




const router:Router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route("/").get(insertMissiles)
router.get('/auth/user/attack', verifyTokenAttack, getUserByToken);
router.get('/auth/user/defense', verifyTokenForDefense, getUserByToken);

export default router;