import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/features/userSlice';
import { Redirect } from 'react-router';

const UserLoginForm = () => {
    const [userIn, setUserIn] = useState(false)

    const dispatch = useDispatch()

    const {register ,handleSubmit} = useForm({
        username: '',
        password: '',
    });


    const registerUser = async(data) =>{
        // const response = await axios.post(`/Blog-Create/`, data)
        console.log(data)
        // console.log(response.data)
        dispatch(loginAsync(data))
        setUserIn(true)
    }



    return (
        <>
            <form onSubmit={handleSubmit(registerUser)}>
                <input {...register('username')} type="text" name="username" placeholder="username"/>
                <input {...register('password')} type="password" name="password" placeholder="password"/>
                <br />
                <input type="submit"/>
            </form>
            {userIn && <Redirect to="/"/>}
        </>
    )
}

export default UserLoginForm
