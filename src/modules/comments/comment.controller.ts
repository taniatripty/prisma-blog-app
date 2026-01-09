import { Request, Response } from "express";
import { commentServices } from "./comment.services";
import { prisma } from "../../lib/prisma";

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



export const commentController={
    createcomment,
    getcommentbyId,
    getcommentbyauthorId,
    deletepostById
}