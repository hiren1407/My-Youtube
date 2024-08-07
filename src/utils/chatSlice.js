import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constants";

const chatSlice=createSlice({
    name:'chat',
    initialState:{
        messages:[]
    },
    reducers:{
        addMessage:(state,action)=>{
            state.messages.splice(LIVE_CHAT_COUNT,1)
            state.messages.push(action.payload)
        },
        clearMessages:(state,action)=>{
            state.messages=[]
        }
    }
})

export default chatSlice.reducer
export const {addMessage,clearMessages}=chatSlice.actions