import { Router } from "express";
import { EmailVerifyPage, LoginPage, RegisterPage, ResetPage } from "../controller/wepagecontroller";
import { emailverifypagemidlleware, resetpasswordmidlleware } from "../middleware/webpagemiddleware";

export const router = Router();

router.get('/login', (req,res)=>{
    res.render('login',{message: " "})
})
router.post('/login',LoginPage,);

router.get('/registerpage',(req,res)=>{ 
    res.render('register', {message : " "})
})
router.post('/registerpage',RegisterPage)

router.get('/forgettenpage' , (req,res)=>{
    res.render('forgetten' , {message : " "})
})

router.post('/sendlink', emailverifypagemidlleware, EmailVerifyPage)

router.get('/reset' , (req,res)=>{
    res.render('resetpassword', {message: " "})
})

router.put('/resetss',
ResetPage)

router.get("/loginsucess",(req,res)=>{
    res.render('loginsucess', {message : req.query.msg})
})