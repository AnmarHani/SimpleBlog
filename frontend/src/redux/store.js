import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blogSlice"
import userReducer from "./features/userSlice"

export default configureStore({
    reducer:{
        blogs: blogReducer,
        user: userReducer
    },
})