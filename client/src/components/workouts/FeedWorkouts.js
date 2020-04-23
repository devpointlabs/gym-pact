import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { AuthConsumer } from "../../providers/AuthProvider";
import Modal from "./Modal";

let position = 10;
let height = window.innerHeight;

class FeedWorkouts extends Component {
  state = { workouts: [], toggleModal: false, workout: {} };

  componentDidMount() {
    axios.get("/api/all_workouts").then((res) => {
      this.setState({ workouts: res.data.splice(0, position) });
    });
  }

  // dynamically load workouts
  dynamicLoad = () => {
    axios.get("/api/all_workouts").then((res) => {
      this.setState({ workouts: res.data.splice(0, position) });
      console.log("Height is", height);
    });
    height += window.innerHeight * 1.85;
  };

  unToggle = () => {
    console.log("untoggle");
    this.setState({ toggleModal: false });
    document.body.style.overflowY = "initial";
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
    document.body.style.overflowY = "hidden";
  };

  render() {
    // load more workouts on scroll
    window.addEventListener("scroll", () => {
      // console.log(window.scrollY, height);
      if (window.scrollY > height * 0.5) {
        // splice the array for more entries
        position += 5;
        this.dynamicLoad();
      }
    });
    const { workouts, workout } = this.state;
    return (
      <div>
        <h1>Gym Pact Workouts</h1>
        <Container>
          {this.state.toggleModal === true ? (
            <Modal
              workout={workout}
              user={this.props.user}
              unToggle={this.unToggle}
              toggle={this.state.toggleModal}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
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
