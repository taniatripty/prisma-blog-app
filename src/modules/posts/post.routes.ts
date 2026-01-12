import express from "express";

import { postController } from "./post.controller";

import authmiddleware, { UserRoles } from "../../middleware/authmiddleware";

const router = express.Router();

router.get('/',postController.getPost)
router.get('/mypost',authmiddleware(UserRoles.USER,UserRoles.ADMIN),postController.getmypost)
router.get('/status',authmiddleware(UserRoles.ADMIN),postController.getstatas)
router.patch('/:postId',authmiddleware(UserRoles.USER,UserRoles.ADMIN),postController.updatePost)
router.delete('/:postId',authmiddleware(UserRoles.USER,UserRoles.ADMIN),postController.deletePost)
router.get('/:postId',postController.getpostById)
router.post("/", authmiddleware(UserRoles.USER,UserRoles.ADMIN), postController.createpost);

export const postRoutes = router;
