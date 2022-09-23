import React, {useState,useEffect} from "react";
import ReactMarkdown from 'react-markdown'
import { Link,useParams,useHistory } from "react-router-dom";

const CourseDetails =(props)=>{
    const {context} = props
    const history = useHistory()
    const authUser = context.authenticatedUser
    
    const [courseDetails, setCourseDetails] = useState([]);

    const {id} = useParams()

   useEffect(()=>{
    fetch(`http://localhost:5000/api/courses/${id}`)
    .then((res)=>res.json())
    .then((data)=>(setCourseDetails(data)  ))
    .catch(err=>{
        console.log("error fetching data",err)
    })
   },[])

   console.log( courseDetails)

   const toDelete = ()=>{
    const password = context.authenticatedUser.password
    const emailAddress = context.authenticatedUser.emailAddress
    context.data.deleteCourse(emailAddress,password,id)
    .then(errors =>{
        if(errors.length){
            console.error("Can't delete Course")
        }
        else{
           history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    .catch((err) =>{
        console.log(err)
    });

    console.log("deleted")
        




   }

   return(
    <div>
        <div className="actions--bar">
        {
            authUser && courseDetails.userId === authUser.userId ? 
        
        <React.Fragment>
        <div className="wrap">
                <Link to={`/courses/${courseDetails.id}/update`} className="button">Update</Link>
                <button onClick={toDelete}  className="button">Delete Course</button>
                <Link to="/" className="button">Return to List</Link>
            </div>
    
        </React.Fragment>
        :(
            <React.Fragment>
            <Link to="/" className="button">Return to List</Link>

            </React.Fragment>
        )}
        </div>
        
            

        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{courseDetails.title}</h4>
                        <p>By {courseDetails.User?.firstName}</p>
                        <ReactMarkdown>
                        {courseDetails.description}
                        </ReactMarkdown>
                        
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{courseDetails.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        
                        <ul className="course--detail--list">
                        <ReactMarkdown>{courseDetails.materialsNeeded}</ReactMarkdown>
                        
                        </ul>
                       
                        

                    </div>
                </div>
            </form>
        </div>
    </div>

   )

}

export default CourseDetails