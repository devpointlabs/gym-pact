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
    // THIS MIGHT BE IT
    axios
      .get(`/api/workouts/${id}`, { user })
      .then((res) => {
        this.setState = { workouts: res.data };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Update Workout
  updateWorkout = (user_id, work_id, workout, history) => {
    axios
      .put(`/api/users/${user_id}/workouts/${work_id}`, workout)
      .then((res) => {
        const newArray = [...this.state.workouts];
        console.log(newArray);
        this.state.workouts.map((w, ind) => {
          console.log(w.id, work_id);
          if (w.id === work_id) {
            console.log(workout);
            newArray[ind] = { ...workout };
            return res.data;
          }
          this.setState({ workouts: newArray });
        });
        console.log(this.state.workouts);
        history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // creates new workout
  createWorkout = (workout, file, id, history) => {
    let data = new FormData();
    data.append("file", file);
    // debugger
    axios
      .post(`/api/users/${id}/workouts?title=${workout.title}&desc=${workout.desc}`, data)
      .then((res) => {
        const { workouts } = this.state;
        res.data.title = workout.title;
        res.data.desc = workout.desc;
        console.log(res.data);
        this.setState({ workouts: [...workouts, res.data] });
        history.push("/profile");
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
