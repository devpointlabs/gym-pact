import React from "react";
import { Card, Image, CardContent } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ropesImg from "../../imgs/ropes.jpg";
import Modal from "./Modal";

const WorkoutCard = ({ workout }) => (
  // workoutShow
  <>
    <Card>
      <div>
        <Modal workout={workout}>
          <Image src={ropesImg} />
        </Modal>
      </div>
      <CardContent>
        <Card.Header>{workout.title}</Card.Header>
        <Card.Description>{workout.desc}</Card.Description>
        <Card.Meta>Comments</Card.Meta>
      </CardContent>
    </Card>
  </>
);

export default WorkoutCard;
