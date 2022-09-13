import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CourseDetails =()=>{
    const [CourseDetail, setCourseDetail] = useState(null);

    axios.get('http://localhost:5000/api/courses/:id')
   .then(res=> setCourseDetail(CourseDetail=res.data))

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
                        <h4 className="course--name">{CourseDetail.title}</h4>
                        <p>By {CourseDetail.User.firstName}</p>
                        <p>{CourseDetail.description}</p>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{CourseDetail.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                        {CourseDetail.map((material,i)=>{
                            <li key={i}>{material}</li>
                        })}
                        </ul>

                    </div>
                </div>
            </form>
        </div>
    </div>

   )

}

export default CourseDetails;