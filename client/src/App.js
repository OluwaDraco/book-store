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

//context
import withContext from "./Context"
const HeaderWithContext = withContext(Header);
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);
const CourseDetailsWithContext = withContext(CourseDetails);



//Components



const App =() =>(
  <Router>
    <div>
      <HeaderWithContext />
      
      <Switch>
        <Route  exact path='/' component={Courses} />
        <Route  path='/courses/:id' component={CourseDetailsWithContext} />
        <Route path="/signin" component={SignInWithContext}/> 
        <Route path="/signup" component={SignUpWithContext}/> 
      </Switch>
    </div>
  </Router>
)

export default App;