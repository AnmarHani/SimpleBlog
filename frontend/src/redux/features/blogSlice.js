import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const getBlogsAsync = createAsyncThunk( //action contains a type and a payload
    "blogs/getBlogs", //type name
    async () => { //payload function
        const response = await axios.get(`/Blog-List/1/`)
        if(response){
            const blogsData = response.data.data //payload data
            return {blogsData}
        }
    }
)

export const createBlogAsync = createAsyncThunk( //action contains a type and a payload
    "blogs/createBlog", //type name
    async (data) => { //payload function
        const response = await axios.post(`/Blog-Create/`, data)
        if (response){
        return data
        }
    }
)

// export const updateBlogAsync = createAsyncThunk( //action contains a type and a payload
//     "blogs/createBlog", //type name
//     async (data) => { //payload function
//         const response = await axios.post(`/Blog-Create/`, data)
//         if (response){
//         return data
//         }
//     }
// )

export const deleteBlogAsync = createAsyncThunk( //action contains a type and a payload
    "blogs/deleteBlog", //type name
    async (id) => { //payload function
        console.log(id)
        const response = await axios.delete(`/Blog-Delete/${id}/`)
        if (response){
            return response
        }
    }
)

const blogSlice = createSlice({
    name: "blogs",
    initialState: [{title:'',description:''}],
    // reducers: {
    //     addBlog: (state, action) => {
    //         const newBlog = {
    //             title: action.payload.title,
    //             description: action.payload.description
    //         }
    //         state.push(newBlog)
    //     }
    // },
    extraReducers: {
        [getBlogsAsync.fulfilled]: (state, action) => {
            console.log(action)
            return action.payload.blogsData //put it to the initialstate which is the array
        },
        [createBlogAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
            return action.payload //put it to the initialstate which is the array
        },
        // [deleteBlogAsync.fulfilled]: (state, action) => {
        //     console.log("Deleted!")
        // },
    },
})


export const {
    addBlog
} = blogSlice.actions

export default blogSlice.reducer