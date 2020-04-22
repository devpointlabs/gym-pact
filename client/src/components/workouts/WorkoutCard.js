import React from "react";
import { Card, Image, CardContent } from "semantic-ui-react";
import ropesImg from "../../imgs/ropes.jpg";

const WorkoutCard = ({ workout, toggle }) => (
  // workoutShow
  <Card style={{ margin: "1rem" }} onClick={() => toggle(workout.id)}>
    <div>
      <Image src={workout.image} style={{ cursor: "pointer" }} />
    </div>
    <CardContent>
      <Card.Header>{workout.title}</Card.Header>
      <Card.Description>{workout.desc}</Card.Description>
      <Card.Meta>Comments</Card.Meta>
    </CardContent>
  </Card>
);

export default WorkoutCard;
