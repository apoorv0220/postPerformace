import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, checkAuth } from "../apiServices/apiActions.js";

const initialState = {
    status: "idle",
    isAuthenticated: false,
    error: null,
    userId: null,
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUser(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await logoutUser(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userId = action.payload._id;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.isAuthenticated = true;
                state.userId = action.payload.data._id;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.status = "idle";
                state.isAuthenticated = false;
                state.userId = null;
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "idle";
                    state.error = action.payload.message;
                }
            );
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
