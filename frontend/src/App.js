import './index.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import CreateForm from './components/createForm';

import axios from './axios';

import {useDispatch, useSelector} from "react-redux"

import {addBlog} from "./redux/features/blogSlice"

import {getBlogsAsync, deleteBlogAsync} from "./redux/features/blogSlice"

function App() {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  
  useEffect(()=>{
    // dispatch(addBlog({title:"Worked",description:"Also Worked.."}))
    dispatch(getBlogsAsync())
  },[])
  
  
  const deleteBlogButton = (id) => {
    window.location.reload();
    console.log(id)
    dispatch(deleteBlogAsync(id))
  }

  return (
    <>
   <Router>
        <Switch>
          <Route path="/createblog">
            <Link to="/">Home</Link>
            <br />
            <CreateForm />
          </Route>
          <Route exact path="/" >
            <Link to="/createblog">Create blog</Link>
            {blogs.map((blog) =>{
              return (
                <div key={blog.id}>
                  {blog.title}
                  <br />
                  {blog.description}
                  <br />
                  <button onClick={() => {
                    deleteBlogButton(blog.id)
                  }}>Delete Blog</button>
                </div>
              )
            })}
          </Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
