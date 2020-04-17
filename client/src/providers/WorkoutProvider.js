import React, { Component } from "react";
import axios from "axios";


const WorkoutContext = React.createContext();
export const WorkoutConsumer = WorkoutContext.Consumer;
class WorkoutProvider extends Component {
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
  // call to get user workouts
  getWorkouts() {
    axios
      .get("/api/workouts")
      .then((res) => {
        this.setState = { workouts: res.data };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  showWorkout(user, id) {
    axios
      .get(`/api/workouts/${id}`, { user })
      .then((res) => {
        this.setState = { workouts: res.data };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // creates new workout
  createWorkout = (workout, id, history) => {
    debugger
    axios
      .post(`/api/users/${id}/workouts`, workout)
      .then((res) => {
        const { workouts } = this.state;
        res.data.title = workout.title;
        res.data.desc = workout.desc;
        console.log(res.data);
        this.setState({ workouts: [...workouts, res.data] });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteWorkout = (id) => {
    axios
      .delete(`/api/workouts/${id}`)
      .then((res) => {
        const workouts = this.setState;
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  globalWorkouts() {}
  render() {
    return (
      <WorkoutContext.Provider
        value={{
          ...this.state,
          getWorkouts: this.getWorkouts,
          updateWorkout: this.updateWorkout,
          createWorkout: this.createWorkout,
          deleteWorkout: this.deleteWorkout,
        }}
      >
        {this.props.children}
      </WorkoutContext.Provider>
    );
  }
}
export default WorkoutProvider;