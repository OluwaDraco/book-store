import React from "react";
import { Link } from "react-router-dom";


export default class Header extends React.PureComponent {
    render() {
      const { context } = this.props;
    
      const authUser = context.authenticatedUser;
      console.log(authUser)
    return(    
           <div>
             <header>
                 <div className="wrap header--flex">
                <h1 className="header--logo">
                <Link to="/">Courses</Link>
                </h1>
                <nav>
                {
                    authUser ?
                    <React.Fragment>
                    <ul className="header--signedin">
                            <li>Welcome, {authUser.firstName}</li>
                            <Link to="/signOut">Sign Out</Link>
                        </ul>

                    </React.Fragment>
                    :(
                    <React.Fragment>

                    <ul className="header--signedout">
                    <li>
                    <Link to="/signUp">Sign Up</Link>
                    </li>
                    <li>
                    <Link to="/signIn">Sign In</Link>
                    </li>
                    </ul>

                    </React.Fragment>)
                }           
                </nav>
            </div>   
            </header>
           </div>
    );
}

}