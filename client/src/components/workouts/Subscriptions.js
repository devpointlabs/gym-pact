import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import Modal from "./Modal";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";

class Subscriptions extends Component {
  state = {
    workouts: this.props.workouts.workouts,
    subscriptions: [],
    following: this.props.location.user.following,
    toggleModal: false,
    workout: {},
  };

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
          {this.state.toggleModal === true ? (
            <Modal
              workout={this.state.workout}
              user={this.props.user}
              unToggle={this.unToggle}
            />
          ) : (
            <div>
              {this.state.subscriptions.map((workout) => (
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

export default class ConnectedSubscriptions extends Component {
  render() {
    return (
      <WorkoutConsumer>
        {(workout) => <Subscriptions {...this.props} workouts={workout} />}
      </WorkoutConsumer>
    );
  }
}
