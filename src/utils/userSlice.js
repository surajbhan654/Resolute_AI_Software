import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,  
    reducers : {
        addUser : (state, action) => {
            return action.payload
            //first initial state is null, as soon as return action.payload then initial state became action.payload
        },
        removeUser:(state, action) =>{
            return null;
        },
    },   
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;