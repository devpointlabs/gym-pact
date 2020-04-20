import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { AuthConsumer } from "../../providers/AuthProvider";
import Modal from "./Modal";

class FeedWorkouts extends Component {
  state = { workouts: [], toggleModal: false, workout: {} };

  componentDidMount() {
    console.log("componenet is moutned");
    this.setState({ workouts: this.props.workouts.workouts });
  }

  unToggle = () => {
    console.log("untoggle");
    this.setState({ toggleModal: false });
  };

  toggle = (id) => {
    axios
      .get(`/api/get_workout/${id}`)
      .then((res) => {
        console.log("toggle");
        console.log(res.data);
        this.setState({ workout: res.data });
      })
      .then(() => {
        this.setState({ toggleModal: true });
      })
      .catch(console.log("Didn't work"));
  };

  render() {
    const { workouts, workout } = this.state;
    return (
      <div>
        <h1>Gym Pact Workouts</h1>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.toggleModal === true ? (
            <Modal
              workout={workout}
              user={this.props.user}
              unToggle={this.unToggle}
            />
          ) : (
            <div>
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  toggle={this.toggle}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default class ConnectedFeedWorkouts extends Component {
  render() {
    return (
      <AuthConsumer>
        {(user) => (
          <WorkoutConsumer>
            {(workout) => (
              <FeedWorkouts {...this.props} workouts={workout} user={user} />
            )}
          </WorkoutConsumer>
        )}
      </AuthConsumer>
    );
  }
}
