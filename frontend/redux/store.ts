// Learning RTedux here so there initial 
// Comments are more for me to document my understanding and
// learning of redux

/**
 * Add reducers here to enforce type safety
 */
const reducer = {
    user: userSlice.reducer
}

//** This file is where the store is created */
import { configureStore, type StateFromReducersMapObject } from "@reduxjs/toolkit";
import userReducer, { userSlice } from "./slices/userSlice"

// This is something like declaring a type for the entire redux object
export type RootState = StateFromReducersMapObject<typeof reducer>

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
