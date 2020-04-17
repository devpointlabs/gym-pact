import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { AuthConsumer } from '../../providers/AuthProvider';
import Modal from './Modal';

class FeedWorkouts extends Component {
  state = { workouts: [], toggleModal: false, workout: {} };

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

  unToggle = () => {
    this.setState({ toggleModal: false })

  }

  toggle = (id) => {
    axios.get(`/api/workouts/${id}`)
    .then(res => {
      debugger
      this.setState({workout: res.data})
    })
      .then(() => { 
        this.setState({ toggleModal: true })
      }
        )
    }

  render() {
    const { workouts, workout } = this.state;
    return (
      <div>
        <h1>Gym Pact Workouts</h1>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.toggleModal === true ? (
            <Modal workout={workout} user={this.props.user} unToggle={this.unToggle}/>
            // <div>test</div>
          ): (
            <div>
            {workouts.map((workout, ind) => (
              <div onClick={this.toggle}>
              <WorkoutCard key={ind} workout={workout} toggle={this.toggle}/>
              </div>
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
        {user => (
          <WorkoutConsumer>
        {(workout) => <FeedWorkouts {...this.props} workouts={workout} user={user}/>}
      </WorkoutConsumer>
        )}
      </AuthConsumer>
    );
  }
}
