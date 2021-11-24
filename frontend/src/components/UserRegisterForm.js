import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/features/userSlice';
import {Redirect} from 'react-router-dom'

const UserRegisterForm = () => {
    const [userIn, setUserIn] = useState(false)

    const dispatch = useDispatch()

    const {register ,handleSubmit} = useForm({
        username: '',
        password: '',
        password2: '',
    });


    const registerUser = async(data) =>{
        // const response = await axios.post(`/Blog-Create/`, data)
        console.log(data)
        // console.log(response.data)
        dispatch(registerAsync(data))
        setUserIn(true)
    }



    return (
        <>
            <form onSubmit={handleSubmit(registerUser)}>
                <input {...register('username')} type="text" name="username" placeholder="username"/>
                <input {...register('password')} type="password" name="password" placeholder="password"/>
                <input {...register('password2')} type="password" name="password2" placeholder="confirm password"/>
                <br />
                <input type="submit"/>
            </form>
            {userIn && <Redirect to="/"/>}
        </>
    )
}

export default UserRegisterForm
