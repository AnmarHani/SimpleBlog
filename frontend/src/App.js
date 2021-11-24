import './index.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import CreateForm from './components/createForm';
import UserRegisterForm from './components/UserRegisterForm';
import UserLoginForm from './components/UserLoginForm';

import {useDispatch, useSelector} from "react-redux"

// import {addBlog} from "./redux/features/blogSlice"

import {getBlogsAsync, deleteBlogAsync} from "./redux/features/blogSlice"
import { getUserAsync, logoutAsync } from './redux/features/userSlice';

import UpdateForm from './components/UpdateForm';
import axios from './axios';



function App() {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  
  const user = useSelector((state) => state.user)

  console.log(user)
  
  const [page, setPage] = useState(1)
  
  useEffect(()=>{
    // dispatch(addBlog({title:"Worked",description:"Also Worked.."}))
    dispatch(getBlogsAsync(page))
  },[page])
  
  
  const deleteBlogButton = (id) => {
    console.log(id)
    dispatch(deleteBlogAsync(id))
  }

  const getUserData = () => {
    axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
    dispatch(getUserAsync(user.token))
  }

  return (
    <>
   <Router>
        <Switch>
          <Route path="/register">
            <Link to="/">Home</Link>
            <br />
            <UserRegisterForm />
          </Route>
          <Route path="/login">
            <Link to="/">Home</Link>
            <br />
            <UserLoginForm />
          </Route>
          <Route path="/createblog">
            <Link to="/">Home</Link>
            <br />
            <CreateForm />
          </Route>
          <Route exact path="/" >
            {user.token ? (
              <>
              <h1> You Are Logged In With "{user.username}"</h1>
              <br />
              <button onClick={() => {
                getUserData()
              }}>Click This To Continue With Your Account.</button>
              <button onClick={() => {
                dispatch(logoutAsync(user.token))
                window.location.reload();
              }}>Logout</button>
              <br />
                <Link to="/createblog">Create blog</Link>
              <br />
            </>
            ) : ( <> 
                    <h1> You Are Not Logged In</h1>
                    <br />
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/register">Register</Link>
                    <br />
                  </>
                )
            }
            <hr />
            {blogs.map((blog) =>{
              return (
                <div key={blog.id}>
                  Blog Number: {blog.id}
                  <br />
                  User ID: {blog.author}
                  <br />
                  Title: {blog.title}
                  <br />
                  Description: {blog.description}
                  <br />
                  Likes: {blog.likes} 0
                  <br />
                  {user.id === blog.author && 
                  <>         
                    <button onClick={() => {
                      deleteBlogButton(blog.id)
                    }}>Delete Blog</button>
                    <button onClick={() => {
                      return(<UpdateForm props={blog}/>)
                    }}>Update Blog</button>
                  </>
                  }
                  <hr />
                </div>
              )
            })}
            <br />
            <button onClick={() => setPage(page-1)}> {page-1} Previous Page</button>
            <h4>Page Number:{page}</h4>
            <button onClick={() => setPage(page+1)}>Next Page {page+1}</button>
          </Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
