import express from "express";
import {register,login} from '../controllers/auth.js'
const router = express.Router();


//post request to create user
router.post('/register',register);

//post user to authenticate user
router.post('/login',login);

export default router;

