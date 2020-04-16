import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";

class FeedWorkouts extends Component {
  state = { workouts: [] };

  componentDidMount() {
    axios
      .get("/api/all_workouts")
      .then((res) => {
        this.setState({ workouts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { workouts } = this.state;
    return (
      <div>
        <h1>Subscriptions</h1>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {workouts.map((workout, ind) => (
            <WorkoutCard key={ind} workout={workout} />
          ))}
        </Container>
      </div>
    );
  }
}

export default class ConnectedSubscriptions extends Component {
  render() {
    return (
      <WorkoutConsumer>
        {(workout) => <FeedWorkouts {...this.props} workouts={workout} />}
      </WorkoutConsumer>
    );
  }
}
