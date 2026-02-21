// Learning RTedux here so there initial 
// Comments are more for me to document my understanding and
// learning of redux

//** This file is where the store is created */
import { configureStore, type StateFromReducersMapObject } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { postSlice } from "./slices/postSlice";


/**
 * Add reducers here to enforce type safety
 */
const reducer = {
    user: userSlice.reducer,
    post: postSlice.reducer
}


// This is something like declaring a type for the entire redux object
export type RootState = StateFromReducersMapObject<typeof reducer>

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch

export default store;
