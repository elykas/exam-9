import  express, { Router }  from "express";
import {  } from "../controllers/authController";


const router:Router = express.Router();

router.route('/register').post();
router.route('/login').post();

export default router;