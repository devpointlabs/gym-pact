import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import Modal from "./Modal";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { AuthConsumer } from "../../providers/AuthProvider";

class Subscriptions extends Component {
  state = {
    workouts: [],
    subscriptions: [],
    following: this.props.user.user.following,
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
    const { following, workouts } = this.state;
    axios
      .get("/api/all_workouts")
      .then((res) => {
        let tempArr = [];
        res.data.forEach((w) => {
          if (following.indexOf(w.user_id) > -1) {
            tempArr.push(w);
          }
        });
        this.setState({ subscriptions: tempArr });
      })
      .catch((err) => {
        console.log(err);
      });
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
      <AuthConsumer>
        {(user) => (
          <WorkoutConsumer>
            {(workout) => (
              <Subscriptions {...this.props} workouts={workout} user={user} />
            )}
          </WorkoutConsumer>
        )}
      </AuthConsumer>
    );
  }
}
