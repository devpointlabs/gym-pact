import React, { Component } from 'react';
import { Container, Grid, Card, Button } from 'semantic-ui-react';
import WorkoutCard from './WorkoutCard';
import WorkoutForm from './WorkoutForm';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { WorkoutConsumer } from '../../providers/WorkoutProvider';


class FeedWorkouts extends Component {
  state = {workouts: []}
  

  componentDidMount(){
    axios.get('/api/all_workouts')
      .then( res => {
        this.setState({workouts: res.data})
      })
      .catch( err => {
        console.log(err)
      })
  }

  
  render() {
    const {workouts} = this.state
    return(

      <>
      <h1>User Workouts</h1>
      
        <Container>
          <Card.Group itemsPerRow='3'>
            <WorkoutCard workouts={workouts} />
          
          </Card.Group>
          </Container>
          <Link to='./workoutForm'>
          <Button>New Workout</Button>
        </Link>
      </>
    )
  }
}


export default class ConnectedFeedWorkouts extends Component{
  render(){
    return(
      <WorkoutConsumer>
        {workout => <FeedWorkouts {...this.props} workout={workout} /> }
      </WorkoutConsumer>
    )
  }
}