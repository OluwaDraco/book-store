import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';




import Header from './components/Header';
import Courses from './components/Courses';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import CourseDetails from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse'
import CreateCourse from './components/CreateCourse'
import PrivateRoute from './PrivateRoute'


//context
import withContext from "./Context"
const HeaderWithContext = withContext(Header);
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);
const SignOutWithContext = withContext(SignOut);
const CourseDetailsWithContext = withContext(CourseDetails);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);



//Components



const App =() =>(
  <Router>
    <div>
      <HeaderWithContext />
      
      <Switch>
        <Route  exact path='/' component={Courses} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
        <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
        <Route  path='/courses/:id' component={CourseDetailsWithContext} />
        <Route path="/signIn" component={SignInWithContext}/> 
        <Route path="/signUp" component={SignUpWithContext}/> 
        <Route path="/signOut" component={SignOutWithContext}/> 

      </Switch>
    </div>
  </Router>
)

export default App;