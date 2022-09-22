import React, {useState,useEffect} from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { use } from "express/lib/application";

const UpdateCourse =(props)=>{

    const {context} = props
    const authUser = context.authenticatedUser
    const password = authUser.password
    const emailAddress = authUser.emailAddress
    const [courseToUpdate, setCourseToUpdate] = useState([]);
    const [errors, setUpdateErrors] = useState([])

    const {id} = useParams()

   useEffect(()=>{
    fetch(`http://localhost:5000/api/courses/${id}`)
    .then((res)=>res.json())
    .then((data)=>(setCourseToUpdate(data)  ))
    .catch(err=>{
        console.log("error fetching data",err)
    })
   },[])

   const submit = ()=>{
    const courseUpdate ={
        title,
        description,
        materialsNeeded,
        estimatedTime
    }
    context.data.updateCourse(courseUpdate,id,emailAddress,password)
    .then(res =>{
        res.errors ? setUpdateErrors(res.errors) : setUpdateErrors('');

        if(!courseToUpdate.title || !courseToUpdate.description){
            console.error("Can't Update Course")
        }
        else{
            this.props.history.push('/')
        }
    })
    .catch(err =>{
        console.log(err)
        this.props.history.push("/error")
    })
   }


   const change=(event)=>{
    let name= event.target.name;
   let value = event.target.value;
    
    if(name === "courseTitle"){
        name= "title"

    }

    if(name==="courseDescription"){
        name= 'description'
    }

    setCourseToUpdate({
        ...courseToUpdate,
        [name]:value
    })
}

const cancel =()=>{
    this.props.history.push('/')
}

const{
    title,
    description,
    materialsNeeded,
    estimatedTime
} = courseToUpdate;

   return(
    <main>
        <div className="wrap">
        <h2>Update Course</h2>
            <Form 
                cancel={cancel}
                submit={submit}
                submitButtonText="Update"
                elements ={()=>(
                    <React.Fragment>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={title}
                            onChange={change}
                            placeholder="Course Title" />

                            <textarea 
                                id="courseDescription"
                                name="courseDescription"
                                onChange={change}
                                value={description}
                                placeholder="Course Description"
                            />

                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={estimatedTime}
                            onChange={change}
                            placeholder="estimatedTime" />

                        <textarea 
                                id="materialsNeeded"
                                name="materialsNeeded"
                                value={materialsNeeded}
                                onChange={change}
                                placeholder="Materials Needed"
                            />  

                    </React.Fragment>
                )}

            />
        </div>
    </main>
   )

}



export default UpdateCourse