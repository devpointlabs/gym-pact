import React, { useEffect, useState } from "react";
import { Card, Image, CardContent } from "semantic-ui-react";
import axios from "axios";

const WorkoutCard = ({ workout, toggle }) => {
  const [commentsCount, setCommentsCount] = useState("");
  useEffect(() => {
    axios
      .get(`/api/workouts/${workout.id}/comments`)
      .then((res) => {
        let count = res.data.length;
        return count;
      })
      .then((count) => {
        setCommentsCount(count);
      });
  });
  // workoutShow
  return (
    <Card style={{ margin: "1rem" }} onClick={() => toggle(workout.id)}>
      <div>
        <Image src={workout.image} style={{ cursor: "pointer" }} />
      </div>
      <CardContent>
        <Card.Header>{workout.title}</Card.Header>
        <Card.Description>{workout.desc}</Card.Description>
        <Card.Meta>{commentsCount} Comments</Card.Meta>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
