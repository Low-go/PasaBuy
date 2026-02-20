import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from '../../redux/types/index';
import { apiFetch } from "../utils/apifetch";


const initialState: {
    runnerPosts: Post[],
    seekerPosts: Post[],
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
} = {
    runnerPosts: [],
    seekerPosts: [],
    status: "idle",
    error: null
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    // Clears post data, utilized probbaly when user logs out
    reducers: {
        clearPosts: (state) => {
            state.runnerPosts = [],
            state.seekerPosts = []
        }
    },
    // used for thunks/api async calls
    // action.payload is whatever my thunk returned
    extraReducers: (builder) => {
        builder 

            // GET REQUEST Stuff
            .addCase(fetchPostThunk.pending, (state) =>{
                state.status = "loading"
            })
            .addCase(fetchPostThunk.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.runnerPosts = action.payload.runnerPosts
                state.seekerPosts = action.payload.seekerPosts
            })
            .addCase(fetchPostThunk.rejected, (state) => {
                state.status = "failed"
            })



            //Delete
            .addCase(deletePostThunk.pending, (state) => {
                state.status = "loading"
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.runnerPosts = state.runnerPosts.filter(p => p.id !== action.payload)
                state.seekerPosts = state.seekerPosts.filter(p => p.id !== action.payload)
            })
            .addCase(deletePostThunk.rejected, (state) => {
                state.status = "failed"
            })
    }
});

// Uses our wrapper and makes a call to grab posts backend, returns it as json
export const fetchPostThunk = createAsyncThunk(
    // TODO change the urls listed as they must match our api endpoints
    "posts/fetchPosts",
    // page number for pagination
    async(page: number = 1) => {
        const response = await apiFetch(`/posts?page=${page}`);
        const json = await response.json();
        return json;
    }
)

export const createPostThunk = createAsyncThunk(
    "posts/createPosts",
    async(postData: {title: string, description: string, location: string, post_type: string }) => {
        const response = await apiFetch(`/posts`, {
            method: 'POST',
            body: JSON.stringify(postData)
        });
        const json = await response.json();
        return json
    }
)

export const deletePostThunk = createAsyncThunk(
    "posts/deletePosts",
    async(postId: number) => {
        const response = await apiFetch(`/posts/${postId}`, {
            method: 'DELETE'
        });
        return postId;
    }
)

// No update method for now will think on it


export const {clearPosts} = postSlice.actions

export default postSlice.reducer