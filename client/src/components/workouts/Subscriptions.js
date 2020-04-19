import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";

class Subscriptions extends Component {
  state = {
    workouts: this.props.workouts.workouts,
    subscriptions: [],
    following: this.props.location.user.following,
  };

  componentDidMount() {
    const { following } = this.state;
    const { workouts, subscriptions } = this.state;
    let tempArr = [];
    workouts.forEach((w) => {
      if (following.indexOf(w.user_id) > -1) {
        tempArr.push(w);
      }
    });
    this.setState({ subscriptions: tempArr });
  }

  render() {
    return (
      <div>
        <h1>Subscriptions</h1>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.subscriptions.map((workout, ind) => (
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
        {(workout) => <Subscriptions {...this.props} workouts={workout} />}
      </WorkoutConsumer>
    );
  }
}
