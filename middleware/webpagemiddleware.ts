import { NextFunction,Response,Request } from 'express';
import { emailverifySchema, resetSchema } from '../validator/webpage.zod';
import { PrismaClient } from '../generated/prisma'
import crypto from 'crypto-js'

const prisma = new PrismaClient();

 export const emailverifypagemidlleware  = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email} = emailverifySchema.parse(req.body)
        const responseemailverify = await prisma.adminLogin.findUnique({where:{email:email}})
        
        if(!responseemailverify){
            console.log("hi");
            
         res.status(404).json({emailmessage : "No Mail Id Found"})     
        }
    
            else{ 
            next(); }
            }
    catch(err:any){
        console.log("hiiii");
        
      res.status(500).json({emailmessage:"No Email Founded" , success : false})     
    }
}
export const resetpasswordmidlleware = async (req:Request,res:Response,next:NextFunction)=>{
    try{
            const {password,conformpassword} = resetSchema.parse(req.body)
            const encryptpassword :string = crypto.AES.encrypt(password , "12345").toString()
            const returnresetpage = await prisma.adminLogin.findUnique({where:{password:encryptpassword}})
            if(!returnresetpage){
                res.status(404).json({message : "No Password Found"})      
            }
            else{
                next();
            }
        } 
        catch(err:any){
           res.status(500).json({message : err.message})
           
        }
    }




