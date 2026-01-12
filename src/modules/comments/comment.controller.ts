import { Request, Response } from "express";
import { commentServices } from "./comment.services";
import { prisma } from "../../lib/prisma";
import { error } from "node:console";

const createcomment=async(req:Request,res:Response)=>{
try {
    const user=req.user
    req.body.authorId=user?.id
const result=await commentServices.createcomment(req.body)

res.status(201).json(result)
}  catch (e) {
    res.status(400).json({
      error: "comment create failed",
      details: e,
    });
  }
}

const getcommentbyId=async(req:Request,res:Response)=>{
try {
    const {commentId}=req.params
   
const result=await commentServices.getcommentById(commentId as string)
 res.status(200).json(result)


}  catch (e) {
    res.status(400).json({
      error: "comment create failed",
      details: e,
    });
  }
}

const getcommentbyauthorId=async(req:Request,res:Response)=>{
try {
    const {authorId}=req.params
   
   
const result=await commentServices.getcommentByAuthorId(authorId as string)
 res.status(200).json(result)


}  catch (e) {
    res.status(400).json({
      error: "comment create failed",
      details: e,
    });
  }
}


const deletepostById=async(req:Request,res:Response)=>{
  try {
    const user=req.user
  const {commentId}=req.params
  const result =await commentServices.deletepostById(commentId as string, user?.id as string)
  res.status(200).json(result)
  } catch (e) {
    res.status(400).json({
      error: "comment create failed",
      details: e,
    });
  }
  
}

const modaratecomment=async(req:Request,res:Response)=>{
  try {

   const {commentId}=req.params
  const result =await commentServices.modaratecomment(commentId as string,req.body)
  res.status(200).json(result)
  } catch (e) {
    const errormeassage=(e instanceof Error)? e.message:"comment create failed"
    res.status(400).json({
      error: errormeassage,
      details: e,
    });
  }
  
}



export const commentController={
    createcomment,
    getcommentbyId,
    getcommentbyauthorId,
    deletepostById,
    modaratecomment
}