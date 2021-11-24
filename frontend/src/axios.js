import Axios from 'axios';
// import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {registerAsync, loginAsync, logoutAsync} from "./redux/features/userSlice"
// const [Token, setToken] = useState('')


const axios = Axios.create({
  baseURL: "HIDDEN"
})


export default axios
