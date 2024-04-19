import expressAsyncHandler from "express-async-handler";
import Post from "../models/Post.js"
import User from "../models/User.js"

//Create Post
const createPost = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.author);
    if(!user) {
        throw new Error("User does not exist");
    }
    const postCreated = await Post.create({
        ...req.body
    });
    user.posts.push(postCreated?._id);
    await user.save();
    res.status(201).send({
        status: "Success",
        message: "Post created successfully",
        postCreated
    });
});


//List Post
const getAllPosts = expressAsyncHandler(async (req, res) => {
    const {limit = 5, page = 1, user = null} = req.query;
    const queryFilter = {};

    if(user) {
        queryFilter.author = user;
    }
    
    const totalPosts = await Post.countDocuments(queryFilter);

    let query = Post.find(queryFilter).sort({views: -1});

    //Pagination
    if(limit) {
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit)
    }

    const posts = await query;

    res.send({
        status:"Success",
        message: "Posts fetched successfuly",
        posts,
        currentPage: page || 1,
        perPage: limit || 5,
        totalPages: Math.ceil(totalPosts / limit)
    })
});

//update Post
const updatePost = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
    if(!post) {
        throw new Error("Post not found")
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true});
    res.send({
        status: "Success",
        message: "Post updated successfully",
        updatedPost
    })
});

//Get Post
const getOnePost = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id);
    if(!post) {
        throw new Error("Post not found")
    }
    res.send({
        status: "Success",
        message: "Post fetched successfully",
        post
    })
});

//Delete Post
const deletePost = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).send({
        status: "Success",
        message: "Post deleted successfully",
        post
    })
});

export { createPost, getAllPosts, getOnePost, updatePost, deletePost}