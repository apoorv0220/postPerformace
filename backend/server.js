import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "./utils/passport-config.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";

dotenv.config();

const app = express();
const PORT = 5000;

const connectDB = async () => {
    try {
        const connection  = await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected')
    } catch(error) {
        console.log(`Error connecting to database: ${error.message}`)
        process.exit(1);
    }
}

connectDB();

app.use(express.json());
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true
};

app.use(cors(corsOptions))

app.use(passport.initialize());

app.use(cookieParser())

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter)
app.use("*", (req, res) => {
    res.status(404).send({
        status: "Failure",
        message: "Path doesn't exist"
    })
})
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`)
})