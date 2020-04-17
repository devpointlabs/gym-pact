import React from "react";
import { Header } from "semantic-ui-react";
import ConnectedFeedWorkouts from "./workouts/FeedWorkouts";

const Home = () => (
  <>
    <ConnectedFeedWorkouts className="feed" />
  </>
);

export default Home;
