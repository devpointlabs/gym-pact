import React from "react";
import { Card, Image, CardContent } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ropesImg from "../../imgs/ropes.jpg";
import Modal from "./Modal";
import ConnectedModal from "./Modal";

const WorkoutCard = ({ workout, clearSearch }) => (
  // workoutShow
  <>
    <Card style={{ margin: "1rem" }}>
      <div>
        <ConnectedModal clearSearch={clearSearch} workout={workout}>
          <Image src={ropesImg} style={{ cursor: "pointer" }} />
        </ConnectedModal>
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
