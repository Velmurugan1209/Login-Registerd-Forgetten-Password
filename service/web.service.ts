import {emailverifyDto,loginDto,registerDto,resetDto} from '../dto/webpagedto'
import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '../generated/prisma'
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export class Webpageservice{
    async getRegister (requestregisterdata : registerDto):Promise<registerDto>{
        try{
          const {name,email,password} = requestregisterdata as registerDto
          const encryptpassword : string = crypto.AES.encrypt(password , "12345").toString()
          
          const returnregisterdpagedetail = await prisma.adminLogin.create({
            data:{
             name:name,
             email:email,
             password:encryptpassword, 
            }
            })

          if(!returnregisterdpagedetail){
           throw new Error("No Registerd"); 
          }
           
          return returnregisterdpagedetail ;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }
    async getLogin (requestloginpage : loginDto):Promise<any>{
        try{
            const {email,password } = requestloginpage  as loginDto
            const returnloginpage = await prisma.adminLogin.findUnique({where:{email:email}})
            const decryptpassword = crypto.AES.decrypt(returnloginpage?.password! , "12345" ).toString(crypto.enc.Utf8)
            if(!returnloginpage){
                throw new Error("No Email Found You Need Register First");    
            }
            else if(decryptpassword === password){
                return returnloginpage ;
            }     
        }
        catch(err:any){
              throw new Error(err.message);          
        }
    }
    async  getEmailVerify  (requestemailverifypage : emailverifyDto):Promise<any >{
        try{
            const email = (requestemailverifypage as any).email ;
            const token = jwt.sign({email}, "12345", {expiresIn:"1hr"})
            const tokenlink = `http://localhost:3000/reset?${token}`;   
            console.log(email );
             
            const connect = nodemailer.createTransport({
                service : "gmail",
                auth : {
                    user : "velupvm1209@gmail.com",
                    pass : "bjwe zujv llwy izeq"
                }
            })
            console.log(email);
            
            const send = connect.sendMail({
                subject : "reste Your Password",
                to : email ,
                html : tokenlink ,
                text : tokenlink,
                sender : tokenlink
            })
            return {email , send}
            
         }
         catch(err:any){
            throw new Error(err.message);  
         }  
        }     
    

    async getResetpassword(requestresetpage:resetDto):Promise<any>{
        try{
            const {conformpassword,password,email} = requestresetpage as resetDto ;
            if(conformpassword === password){
              const encryptpassword : string = crypto.AES.encrypt(password , "12345").toString()
              console.log(encryptpassword , " hi");
              
            const updateresetpassword = await prisma.adminLogin.update({  
                where: { email:email },
                data:{password:encryptpassword},
            }) 
            if(!updateresetpassword){
                throw new Error("No Update Password");     
            } 
            return updateresetpassword ;  
        }
    }
    catch(err:any){
        throw new Error(err.message);
        
    }
}

}