import { Request, Response } from "express"
import { postServices } from "./post.services"



const createpost=async(req:Request,res:Response)=>{
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized!",
            })
        }
        const result=await postServices.creatpost(req.body,user.id as string)
        res.status(201).json(result)
    } catch (e) {
            res.status(400).json({
                error:'post is failed',
            details:e})

        
    }
}

export const postController={
    createpost
}