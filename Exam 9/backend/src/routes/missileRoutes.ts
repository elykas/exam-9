import  express, { Router }  from "express";
import { verifyTokenAttack, verifyTokenForDefense } from "../middleware/authMiddleware";
import { launchController } from "../controllers/missileController";




const router:Router = express.Router();

router.route('/launchMissile').post(launchController);


export default router;