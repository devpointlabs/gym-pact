import React, { Component } from 'react';
import axios from 'axios';

const WorkoutContext = React.createContext();
export const WorkoutConsumer = WorkoutContext.Consumer;

class WorkoutProvider extends Component {
  state = {workouts: []}

  // call to get user workouts
  getWorkouts(){
    axios.get('/api/workouts')
      .then( res => {
        this.setState = ({workouts: res.data})
      })
      .catch( err => {
        console.log(err)
      })
  }

  showWorkout(user, id){
    axios.get(`/api/workouts/${id}`, { user })
      .then( res => {
        this.setState = ({workouts: res.data})
      })
      .catch( err => {
        console.log(err)
      })
  }

  // creates new workout
  createWorkout(workout){
    axios.post('/api/workouts',{workout})
      .then( res => {
        const { workouts } = this.setState
        this.setState({ workouts: [...workouts, res.data]})

      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteWorkout(id){
    axios.delete(`/api/workouts/${id}`)
      .then( res => {
        const workouts = this.setState
        console.log(res.data.message)
      })
        .catch( err => {
          console.log(err)
        })
  }

  globalWorkouts(){
    axios.get('/all_workouts')
      .then( res => {
        this.setState = ({workouts: res.data})
      })
      .catch( err => {
        console.log(err)
      })
  }

  render(){
    return(
      <WorkoutContext.Provider value={{
        ...this.setState,
          getWorkouts: this.getWorkouts,
          showWorkout: this.showWorkout,
          createWorkout: this.createWorkout,
          deleteWorkout: this.deleteWorkout,
      }}>
        {this.props.children}
      </WorkoutContext.Provider>
    )
  }
}