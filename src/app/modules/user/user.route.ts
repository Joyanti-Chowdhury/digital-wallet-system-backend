import { Router } from "express";
import { validateRequest } from "../../middlewares/validateMiddleware";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./userValidation";

const router = Router()

router.post(
  "/register",  validateRequest(createUserZodSchema),
  UserControllers.createUser);




export const userRoutes = router;