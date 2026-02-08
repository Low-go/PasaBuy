//** Slices are individual pieces of state
// Such as User, Cart, Settings */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

const initialState: {
    user: User | null,
    status: "idle" | "loading" | "succeeded" | "failed";
} = {user: null, status: "idle"}



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = action.payload ? "succeeded" : "failed";
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
})

// export reducers over here
export const {setUser, clearUser} = userSlice.actions

export default userSlice.reducer;