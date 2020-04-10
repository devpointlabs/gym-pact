import React, { Component } from "react";
import { Container, Grid, Card, Button } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import WorkoutForm from "./WorkoutForm";
import { Link } from "react-router-dom";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";

// WorkoutForm button
// <Link to="./workoutForm">
//   <Button>New Workout</Button>
// </Link>

class FeedWorkouts extends Component {
  state = { workouts: [] };

  render() {
    const {
      workouts: { workouts },
    } = this.props;
    return (
      <div>
        <h1>User Workouts</h1>
        <Container>
          {workouts.map((workout) => (
            <WorkoutCard workout={workout} />
          ))}
        </Container>
      </div>
    );
  }
}

export default class ConnectedFeedWorkouts extends Component {
  render() {
    return (
      <WorkoutConsumer>
        {(workout) => <FeedWorkouts {...this.props} workouts={workout} />}
      </WorkoutConsumer>
    );
  }
}
