import React, {useState,} from "react";
import Form from "./Form";
import { useHistory } from "react-router-dom";

const UpdateCourse =(props)=>{

    const {context} = props
    const history = useHistory();
    const authUser = context.authenticatedUser
    //authenticated user credentials 
    const password = authUser.password
    const emailAddress = authUser.emailAddress


//set State
   const [title, setTitle] = useState('');
   const [description,setDescription] = useState('');
   const [materialsNeeded,setMaterialsNeeded] = useState('');
   const [estimatedTime,setEstimatedTime] = useState('');
   const [errors,setUpdateErrors] = useState([])

   


   const submit = ()=>{
    const courseData ={
        title,
        description,
        materialsNeeded,
        estimatedTime,
        userId: authUser.userId

    }
    //creates the new course using the CourseData and auth
    context.data.createCourse(courseData,emailAddress,password)
    .then(errors=>{
        if(errors.length){
            setUpdateErrors(errors);
        }
        else{
            history.push('/')
        }
        
    })
    .catch(err =>{
        console.log(err)
       history.push("/error")
    })
   }



const cancel =()=>{
    history.push('/')
}


   return(
    <div className="wrap course--update">
    <h2>Create Course</h2>
    <Form
      cancel={cancel}
      errors={errors}
      submit={submit}
      submitButtonText="Create Course"
      elements={() => (
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input id="title" name="title" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <p>By {authUser.firstName} {authUser.lastName}</p>

            <label htmlFor="description">Course Description</label>
            <textarea id="description" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e)=>{setEstimatedTime(e.target.value)}} />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e)=>{setMaterialsNeeded(e.target.value)}} />
          </div>
        </div>
      )} 
    />
  </div>
   )

}



export default UpdateCourse