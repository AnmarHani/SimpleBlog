import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';


export const registerAsync = createAsyncThunk( //action contains a type and a payload
    "users/register", //type name
    async (data) => { //payload function
        const response = await axios.post(`/Register/`, data)
        if (response){
            return response.data
        }
    }
)
export const getUserAsync = createAsyncThunk( //action contains a type and a payload
    "users/getUser", //type name
    async (token) => { //payload function
        const response = await axios.get(`/GetUser/${token}/`)
        if (response){
            const data = response.data
            return data
        }
    }
)
export const loginAsync = createAsyncThunk( //action contains a type and a payload
    "users/login", //type name
    async (data) => { //payload function
        const response = await axios.post(`/Login/`, data)
        if (response){
            return response.data
        }
    }
)
export const logoutAsync = createAsyncThunk( //action contains a type and a payload
    "users/logout", //type name
    async (data) => { //payload function
        const response = await axios.post(`/Logout/`, data)
        if (response){
            return response.data
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {},
    extraReducers: {
        [registerAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
            return {"token":action.payload.token, "username":action.payload.username, "id":action.payload.user_id} //put it to the initialstate which is the array
        },
        [loginAsync.fulfilled]: (state, action) => {
            console.log(action.payload.token)
            return {"token":action.payload.token} //put it to the initialstate which is the array
        },
        [getUserAsync.fulfilled]: (state, action) => {
            console.log({"user is:" : action.payload})
            return {"token":action.payload.token,"username":action.payload.username, "id":action.payload.id} //put it to the initialstate which is the array
        },
    },
})


// export const {
    
// } = userSlice.actions

export default userSlice.reducer