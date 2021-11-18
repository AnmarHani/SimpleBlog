import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blogSlice"

export default configureStore({
    reducer:{
        blogs: blogReducer,
    },
})