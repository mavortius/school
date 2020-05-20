import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CoursesList from "./CoursesList";
import CourseDetails from "./CourseDetails";
import TestPage from "./TestPage";

const Home = () => (
  <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
    <>
      <h1>Instructor Application</h1>
      <Switch>
        <Route path="/" exact render={(props) => <CoursesList {...props} />}/>
        <Route path="/courses" exact render={(props) => <CoursesList {...props} />}/>
        <Route path="/courses/:id" component={CourseDetails}/>
        <Route path="/test" component={TestPage} />
      </Switch>
    </>
  </Router>
);
export default Home;
