import { Request, Response } from "express";
import { postServices } from "./post.services";
import { PostStatus } from "../../../generated/prisma/enums";
import { number, parseAsync } from "better-auth/*";
import paginationSorting from "../../helpers/paginationsorting";

const createpost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await postServices.creatpost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "post is failed",
      details: e,
    });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const{search}=req.query;
    const searchString=typeof search=='string'?search:undefined

    const tags=req.query.tags? (req.query.tags as string).split(','):[]

    const isFeatured=req.query.isFeatured? 
    req.query.isFeatured==='true'?
     true:req.query.isFeatured==='false'?
     false:undefined
     :undefined

    const status=req.query.status as PostStatus |undefined

    const authorId=req.query.authorId as string | undefined
   
     const {page,limit,skip,sortBy,sortOrder}=paginationSorting(req.query)
     
    const result=await postServices.getPost({search:searchString,tags,isFeatured,status,authorId,page,limit,skip,sortBy,sortOrder})
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({
      error: "post is failed",
      details: e,
    });
  }
}
  
  const getpostById=async(req:Request,res:Response)=>{
    try {
      const {postId}=req.params;
      console.log({postId})
      if(!postId){
        throw new Error('post is failed')
      }
      const result=await postServices.getpostById(postId as string)
      res.status(200).json(result)
      
    } catch (e) {
    res.status(400).json({
      error: "post is failed",
      details: e,
    });
  }
  }

export const postController = {
  createpost,
  getPost,
  getpostById
};
