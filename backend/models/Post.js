import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, unique: true},
    description: {type: String, required: true, trim: true},
    image: {type: String},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    shares: {type: Number, default: 0}
}, {
    timestamps: true
})

const model = mongoose.model("Post", postSchema);
export default model;