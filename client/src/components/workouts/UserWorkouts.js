import React, { Component } from 'react';
import { Container, Grid, Card } from 'semantic-ui-react';
import WorkoutCard from './WorkoutCard';

class UserWorkouts extends Component {

  
  render(){
    return(
      <>
        <Container>
          <Card.Group itemsPerRow='5'>
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />

          </Card.Group>
          </Container>
      </>
    )
  }
}

export default UserWorkouts;