import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import FeedWorkouts from './components/workouts/FeedWorkouts';
import WorkoutShow from './components/workouts/WorkoutShow';
import WorkoutForm from './components/workouts/WorkoutForm';

const App = () => (
<Fragment>
  <Navbar />
  <FetchUser>
    {/* <Container> */}
      <Switch>
        <Route exact path='/' component={LandingPage} />
         <Route exact path='/login' component={Login} />
         <Route exact path='/register' component={Register} />
         <Route exact path='/feedWorkouts' component={FeedWorkouts} />
         <Route exact path='/workoutShow' component={WorkoutShow} />
         <Route exact path='/workoutForm' component={WorkoutForm} />
         <Route component={NoMatch} />
      </Switch>
    {/* </Container> */}
  </FetchUser>
</Fragment>

)

export default App;
