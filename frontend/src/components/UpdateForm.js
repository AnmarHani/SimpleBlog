import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { createBlogAsync } from '../redux/features/blogSlice';
import axios from '../axios';


const UpdateForm = (props) => {
    
    const [blogid, setblogid] = useState()
    const [blogtitle, setblogtitle] = useState()
    const [blogdescription, setblogdescription] = useState()
    useEffect(()=>{
        setblogid(props.blog.id)
        document.getElementById("title").value = props.blog.title //none
        document.getElementById("description").value = props.blog.description //none
    },[])

    const handleChangeTitle = (e) => {
        setblogtitle(
          e.currentTarget.value
        )
      }
      const handleChangeDescription = (e) => {
        setblogdescription(
          e.currentTarget.value
        )
      }
  
    const handleUpdate = async() => {
      const data = {
        title: blogtitle,
        description: blogdescription
      }
      console.log(data)
      const response = await axios.put(`/Blog-Update/${blogid}/`, data).catch((err) => console.log(err))
  
      console.log(response.data)
    }



    return (
        <>
        <form onSubmit={handleUpdate}>
          <input id="title" name="title" placeholder="Title 2" onChange={handleChangeTitle}/> 
          <br />
          <textarea id="description" name="description" rows="3" cols="30" placeholder="Description 2" onChange={handleChangeDescription} />          
          <br />
          
          <input type="submit" value="Update!"/>
        </form>
        </>
    )
}

export default UpdateForm
