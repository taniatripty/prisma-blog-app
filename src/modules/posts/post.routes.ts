import express from "express";

import { postController } from "./post.controller";

import authmiddleware, { UserRoles } from "../../middleware/authmiddleware";

const router = express.Router();

router.get('/',postController.getPost)
router.get('/:postId',postController.getpostById)
router.post("/", authmiddleware(UserRoles.USER,UserRoles.ADMIN), postController.createpost);

export const postRoutes = router;
