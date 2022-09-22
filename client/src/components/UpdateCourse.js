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

   const [title, setTitle] = useState('');
   const [description,setDescription] = useState('');
   const [materialsNeeded,setMaterialsNeeded] = useState('');
   const [estimatedTime,setEstimatedTime] = useState('');
   const [errors,setUpdateErrors] = useState([])

   useEffect(()=>{
    context.data.getCourse(id,password,emailAddress)
    .then(res=>{
        if(res.course){
            setTitle(res.courseDetails.title);
            setDescription(res.courseDetails.description);
            setMaterialsNeeded(res.courseDetails.materialsNeeded);
            setEstimatedTime(res.courseDetails.estimatedTime);


        }
        else{
            history.push('/error')

        }

    }
        
    )
   })



   const submit = ()=>{
    const courseData ={
        title,
        description,
        materialsNeeded,
        estimatedTime
    }
    context.data.updateCourse(id,courseData,emailAddress,password)
    .then(errors=>{
        if(errors.length){
            setUpdateErrors({errors});
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
    
   setTitle({
    [name]:value
   })

    setDescription({
        [name]:value
    })
    setEstimatedTime({
        [name]:value
    })

    setMaterialsNeeded({
        [name]:value
    })
}

const cancel =()=>{
    this.props.history.push('/')
}


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