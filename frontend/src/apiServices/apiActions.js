import axios from "axios";

const BASE_URL="https://postperformace.onrender.com/api/v1"
// User login
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, userData, {withCredentials: true});
        return response.data
    } catch(error) {
        console.error("An error occurred:",error)
    }
}

// User logout
export const logoutUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/logout`, {}, {withCredentials: true});
        return response.data
    } catch(error) {
        console.error("An error occurred:",error)
    }
}

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/auth`, {withCredentials: true});
        return response.data
    } catch (error) {
        console.error("An error occurred:",error)
    }
}

// Fetch all posts
export const fetchAllPosts = async (params) => {
    try {
        const posts = await axios.get(`${BASE_URL}/posts`, {
            params,
        })
        return posts.data;   
    } catch (error) {
        console.error("An error occurred:",error)
    }
}

// Fetch one post
export const fetchOnePost = async (id) => {
    try {
        const post = await axios.get(`${BASE_URL}/posts/${id}`);
        return post.data;   
    } catch (error) {
        console.error("An error occurred:", error)
    }
}