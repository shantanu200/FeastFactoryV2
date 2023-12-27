import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import {
  createUserModel,
  getUserByIdModel,
  getUserDetailsToken,
  loginUserModel,
  updateUserByIdModel,
} from "../controllers/User.controller";

const router = Router();

router
  .route("/")
  .post(createUserModel)
  .get(authMiddleware, getUserDetailsToken)
  .put(authMiddleware, updateUserByIdModel);

router.route("/login").post(loginUserModel);

router.route("/:id").get(getUserByIdModel);

export default router;
