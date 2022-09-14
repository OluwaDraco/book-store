import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import CourseDetails from './components/CourseDetail';

//context
import withContext from "./context/Context"
const HeaderWithContext = withContext(Header);


//Components



const App =() =>(
  <Router>
    <div>
    <h1>hello</h1>
      <HeaderWithContext />
      <Routes>
        <Route exact path='/' element={<Courses/>} />
      </Routes>
    </div>
  </Router>
)

export default App;