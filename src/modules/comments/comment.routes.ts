import express from "express";
import { commentController } from "./comment.controller";
import authmiddleware, { UserRoles } from "../../middleware/authmiddleware";
const router=express.Router();
router.get('/:commentId',commentController.getcommentbyId)
router.get('/author/:authorId',commentController.getcommentbyauthorId)
router.delete('/:commentId', authmiddleware(UserRoles.USER,UserRoles.ADMIN) ,commentController.deletepostById)
  router.post('/',authmiddleware(UserRoles.USER,UserRoles.ADMIN) ,commentController.createcomment)
export  const commentRoutes=router;