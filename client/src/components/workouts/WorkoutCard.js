import React from 'react';
import { Card, Image, CardContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ropesImg from '../../imgs/ropes.jpg';

const WorkoutCard = ({ workouts }) => (
  
  <>
  {
    workouts.map(w => (

        <Card>
          <Link to='workoutShow'>
          <Image src={ropesImg} />
          </Link>
          <CardContent>
            <Card.Header>{w.title}</Card.Header>
            <Card.Description>{w.desc}</Card.Description>
            <Card.Meta>Comments</Card.Meta>
    
          </CardContent>
        </Card>
    )
    )
  }
      </>
    )
  








export default WorkoutCard;