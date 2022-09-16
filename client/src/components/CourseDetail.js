import React, {useState,useEffect} from "react";
import { Link,useParams, useHistory } from "react-router-dom";
import axios from "axios";

const CourseDetails =(props)=>{
    const history = useHistory()
    const {context} = props
    const authUser = context.authenticatedUser
    const [courseDetails, setCourseDetails] = useState({
        courseDetails:[],
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        firstName:"",
    });

    const {id} = useParams()

   useEffect(()=>{
    fetch(`http://localhost:5000/api/courses/${id}`)
    .then((res)=>res.json())
    .then((res)=>console.log(res))
    .then((response,)=>(
        setCourseDetails({
            course:response,
            title:response.title,
            description:response.description,
            materialsNeeded:response.materialsNeeded,
            firstName:response.User.firstName,
        })
        
    ))
    .catch(err=>{
        console.log("error fetching data",err)
    })
   },[id,history])

   return(
    <div>
        <div className="actions--bar">
            <div className="wrap">
                <Link to="/update-course" className="button">Update</Link>
                <Link to="#" className="button">Delete Course</Link>
                <Link to="/" className="button">Return tp List</Link>
            </div>
        </div>

        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{courseDetails.title}</h4>
                        <p>By {courseDetails.firstName}</p>
                        <p>{courseDetails.description}</p>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{courseDetails.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                        {courseDetails.materialsNeeded}
                        </ul>

                    </div>
                </div>
            </form>
        </div>
    </div>

   )

}

export default CourseDetails