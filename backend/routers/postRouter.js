import { Router } from "express";
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controllers/postController.js";

const postRouter = Router();

postRouter
    .route("/")
    .get(getAllPosts)

postRouter
    .route("/create")
    .post(createPost);

postRouter
    .route("/:id")
    .get(getOnePost)
    .delete(deletePost)

postRouter
    .route("/update/:id")
    .put(updatePost)

export default postRouter;