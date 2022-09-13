import React, {PureComponent} from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent{
    render(){
        const {context} = this.props
        const authUser = context.authenticatedUser;
    

    return(
        <div>
             <div className="wrap header--flex">
                <h1 className="header--logo">
                <Link to="index.html">Courses</Link>
                </h1>
                <nav>
                {
                    authUser ?
                    <React.Fragment>
                    <ul className="header--signedin">
                            <li>Welcome, {authUser.name}</li>
                            <Link to="/sign-out">Sign Out</Link>
                        </ul>

                    </React.Fragment>
                    :
                    <React.Fragment>

                    <ul className="header--signedout">
                    <li>
                    <Link to="/sign-up">Sign Up</Link>
                    </li>
                    <li>
                    <Link to="/sign-in">Sign In</Link>
                    </li>
                    </ul>

                    </React.Fragment>
                }           
                </nav>
            </div>
        </div>
   
    );
}
}