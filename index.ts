import express from 'express'
import { Response,Request } from 'express';
import path from 'path';
import { router } from './routes/web.route';

const app = express ();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static( path.join(__dirname,'public')))

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))

app.use('/' , router)

app.get('/' , (req:Request,res:Response)=>{
    res.render('login', {message:" "})
})

app.listen(3000,()=>{
    console.log("Server Is running");    
})
