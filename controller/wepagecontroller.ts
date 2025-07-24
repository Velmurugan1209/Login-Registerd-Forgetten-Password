import {emailverifyDto,loginDto,registerDto,resetDto} from '../dto/webpagedto'
import { loginSchema,registerSchema,resetSchema, emailverifySchema } from '../validator/webpage.zod'
import { Response,Request, NextFunction } from 'express';
import {Webpageservice} from '../service/web.service'
import { register } from 'module';


const webpageservice = new Webpageservice();



export const RegisterPage = async(req:Request,res:Response)=>{
    try{
        
        
        const requestregisterdata = registerSchema.parse(req.body)
        
        const responseregisterdata = await webpageservice.getRegister(requestregisterdata)

        res.status(200).json({success:true , Regmessage : "Register Succesfull", data:responseregisterdata})
    }
    catch(err:any){
       res.status(500).json({success:false ,Regmessage : err.message})
    }
}

export const LoginPage = async(req:Request,res:Response)=>{
    try{
      const requestloginpage = loginSchema.parse(req.body)
      const responseloginpage = await webpageservice.getLogin(requestloginpage)
      res.status(200).json({success : true ,message : "Login Sucessfull" , data : responseloginpage})
    }
    catch(err:any){
        res.status(500).json( {success:false , message : "No Email Found try to register"})
        
    }
}

export const EmailVerifyPage = async(req:Request,res:Response)=>{
    try{

        const requestemailverifypage = emailverifySchema.parse(req.body)
        const resposnseemailverifypage = await webpageservice.getEmailVerify(requestemailverifypage)
        res.status(200).json({emailmessage : "Email Verify Success Check Your Email..." , success : true })

    }
    catch(err:any){
        res.status(500).json({emailmessage : "Email Verify Error" , data:err.message})

    }
}

export const ResetPage = async(req:Request,res:Response)=>{
    try{
        console.log(req.body); 
       const requestresetpage = resetSchema.parse(req.body)
       const responseresetpage = await webpageservice.getResetpassword(requestresetpage)
       res.status(200).json({message : "Reset Succesfull Login Your Page" , success:true })
    }
    catch(err:any){
        res.status(500).json({message : "Reset Failed" , data : err.message})
    }
}