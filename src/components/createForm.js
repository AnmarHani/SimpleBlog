import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { createBlogAsync } from '../redux/features/blogSlice';

const CreateForm = () => {

    const dispatch = useDispatch()

    const {register, watch ,handleSubmit, errors} = useForm({
        title: '',
        description: '',
    });


    const createBlog = async(data) =>{
        // const response = await axios.post(`/Blog-Create/`, data)
        // console.log(data)
        // console.log(response.data)
        dispatch(createBlogAsync(data))
        window.location.reload();
    }



    return (
        <>
            <form onSubmit={handleSubmit(createBlog)}>
                <input {...register('title')} type="text" name="title" placeholder="Title"/>
                <input {...register('description')} type="text" name="description" placeholder="Description"/>
                <br />
                <input type="submit"/>
            </form>
        </>
    )
}

export default CreateForm
