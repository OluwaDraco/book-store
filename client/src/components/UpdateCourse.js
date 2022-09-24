import React, {useState,useEffect} from "react";
import Form from "./Form";
import { useParams,useHistory } from "react-router-dom";

const UpdateCourse =(props)=>{

  const {context} = props
  const history = useHistory();
  const authUser = context.authenticatedUser
  const password = authUser.password
  const emailAddress = authUser.emailAddress
  const {id} = useParams()

//states
  const [title, setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [materialsNeeded,setMaterialsNeeded] = useState('');
  const [estimatedTime,setEstimatedTime] = useState('');
  const [errors,setUpdateErrors] = useState([])

  useEffect(()=>{
    //get course from DB
    context.data.getCourse(id,password,emailAddress)
      .then(res=>{
        if(res){
          setTitle(res.title);
          setDescription(res.description);
          setMaterialsNeeded(res.materialsNeeded);
          setEstimatedTime(res.estimatedTime);
        } else {
          history.push('/error')
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  )}, [])

  const submit = ()=>{
    const courseData ={
        title,
        description,
        materialsNeeded,
        estimatedTime
    }
    context.data.updateCourse(courseData,id,emailAddress,password)
    .then(errors=>{
        if(errors.length){
            setUpdateErrors(errors);
        } else {
          history.push('/');
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

return (
    <div className="wrap course--update">
      <h2>Update Course</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Update Course"
        elements={() => (
          <div className="main--flex">
            <div>
              <label htmlFor="title">Course Title</label>
              <input id="title" name="title" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />

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