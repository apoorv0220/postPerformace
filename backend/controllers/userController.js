import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import passport from "passport";
import jwt from "jsonwebtoken";

// Registration
const createUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    //Check if username/email already exists
    const userExists = await User.findOne({$or:[{username}, {email}]});
    if(userExists) {
        throw new Error("User already exists");
    }
    
    //Check if password matches confirmPassword
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
    }

    //Hash Password
    const hashed = await bcrypt.hash(password, 10);

    //Register User
    const user = await User.create({
        username,
        email,
        password: hashed, 
    });

    res.status(201).send({
        status: "Success",
        user,
        message: "User registered successfully"
    });
})

//Login
const login = expressAsyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        //handle error
        if(err) {
            return next(err)
        }
        //handle no user
        if(!user) {
            return res.status(401).send({
                status: "Failure",
                message: info,
            });
        }
        //generate jwt token
        const token = jwt.sign({
            id: user?._id
        }, process.env.JWT_SECRET)
        //save token as cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 2*24*60*60*1000
        });
        //send response
        res.status(200).send({
            status: "Success",
            data: user,
            message: "User login successfull."
        })
    })(req, res, next)
})

//Logout
const logout = expressAsyncHandler(async (req, res) => {
    res.cookie('token', "", {maxAge: 1});
    res.status(200).send({
        status: "Success",
        message: "Logged out successfully"
    })
})

//Check user auth
const checkAuthenticated = expressAsyncHandler(async (req, res) => {
    const token = req.cookies.token;
    // if token is not present
    if(!token) {
        return res.status(401).send({
            status: "Failure",
            isAuthenticated: false
        });
    }
    // verify token
    try {
        const tokenUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(tokenUser.id);
        if(!user) {
            return res.status(401).send({
                status: "Failure",
                isAuthenticated: false    
            })
        } else {
            return res.status(200).send({
                status: "Success",
                isAuthenticated: true,
                _id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
            })
        }
    } catch (error) {
        console.log("There is an error")
        return res.status(401).send({
            status: "Failure",
            isAuthenticated: false,
            error
        })
    }
})

export { createUser, login, logout, checkAuthenticated}