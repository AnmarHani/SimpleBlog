import Axios from 'axios';
// import { useState } from 'react';

// const [Token, setToken] = useState('')
const axios = Axios.create({
  baseURL: "http://localhost:8000/api",
  headers : {
    Authorization: `Token b91b9180ef04c15eda88b2f3ddf202b180509e00`
  }
})

export default axios