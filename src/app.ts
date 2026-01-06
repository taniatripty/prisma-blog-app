import express from 'express'
import { postRoutes } from './modules/posts/post.routes'
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors'


const app=express()
app.use(cors({
    origin:process.env.APP_URL,
    credentials:true
    
}))
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json())



app.use('/posts',postRoutes)

app.get('/',(req,res)=>{
res.send('hello')
})


export default app