import express, { NextFunction, Request, Response } from "express";
import { auth } from "../../lib/auth";
import { postController } from "./post.controller";
import authmiddleware, { UserRoles } from "../../middleware/authmiddleware";

const router = express.Router();

router.post("/", authmiddleware(UserRoles.USER), postController.createpost);

export const postRoutes = router;
