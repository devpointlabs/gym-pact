import React, { Component } from 'react';
import { Card, Image, CardContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ropesImg from '../../imgs/ropes.jpg';

class WorkoutCard extends Component {


  render(){
    return(
      <Card>
        <Link to='workoutShow'>
        <Image src={ropesImg} />
        </Link>
        <CardContent>
          <Card.Header>Workout Title</Card.Header>
          <Card.Description>Workout Snipit</Card.Description>
          <Card.Meta>Comments</Card.Meta>

        </CardContent>
      </Card>
    )
  }


}

export default WorkoutCard;