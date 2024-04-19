import { Router } from "express";
import { checkAuthenticated, createUser, login, logout} from "../controllers/userController.js";

const userRouter = Router();

userRouter
    .route("/register")
    .post(createUser);

userRouter
    .route("/login")
    .post(login);

userRouter
    .route("/logout")
    .post(logout);

userRouter
    .route("/auth")
    .get(checkAuthenticated)

export default userRouter;