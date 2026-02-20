import { apiFetch } from "../utils/apifetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Proposals } from '../../redux/types/index';

const initialState: {
    incomingProposals: Proposals[]
    myProposals: Proposals[]
    status: "pending" | "accepted" | "rejected" | "withdrawn",
    error: string | null
} = {
    incomingProposals: [],
    myProposals: [],
    status: "pending",
    error: null
}


export const proposalSlice = createSlice({
    name: "proposal",
    initialState,
    reducers: {},
    //API calls
    extraReducers: (builder) => {
        builder
            // .addCase()
    }
});



// export const {} = proposalSlice.actions

export default proposalSlice.reducer

// do i need a thunk here?? Lets work on the reducers for now, and adding to store