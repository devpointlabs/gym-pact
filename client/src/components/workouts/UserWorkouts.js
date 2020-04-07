import React, { Component } from 'react';
import { Container, Grid, Card, Button } from 'semantic-ui-react';
import WorkoutCard from './WorkoutCard';
import WorkoutForm from './WorkoutForm';
import { Link } from 'react-router-dom';
import axios from 'axios';



  
  render() {
    return(
      <>
      <h1>User Workouts</h1>
      
        {/* <Container>
          <Card.Group itemsPerRow='5'>

          </Card.Group>
          </Container>
          <Link to='./workoutForm'>
            <Button>New Workout</Button>
          </Link> */}
      </>
    )
  }


export default UserWorkouts;