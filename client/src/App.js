import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedWorkouts from "./components/workouts/FeedWorkouts";
import WorkoutShow from "./components/workouts/WorkoutShow";
import WorkoutForm from "./components/workouts/WorkoutForm";
import EditWorkout from "./components/workouts/EditWorkout";
import WorkoutProvider from "./providers/WorkoutProvider";
import LandingPage from "./components/LandingPage";
import Profile from "./components/User/Profile";
import UserShow from "./components/User/UserShow";
import ConnectedSubscriptions from "./components/workouts/Subscriptions";

const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
      {/* <Follower/>  */}
      <WorkoutProvider>
        {/* <Container> */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/feedworkouts" component={FeedWorkouts} />
          <Route exact path="/workoutshow" component={WorkoutShow} />
          <Route exact path="/workoutform" component={WorkoutForm} />
          <Route exact path="/editworkout" component={EditWorkout} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/usershow" component={UserShow} />
          <Route
            exact
            path="/subscriptions"
            component={ConnectedSubscriptions}
          />
          <Route component={NoMatch} />
        </Switch>
        {/* </Container> */}
      </WorkoutProvider>
    </FetchUser>
  </Fragment>
);

export default App;
