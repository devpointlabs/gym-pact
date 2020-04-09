import React from "react";
import { Header } from "semantic-ui-react";
import ConnectedFeedWorkouts from "./workouts/FeedWorkouts";

const Home = () => (
  <>
    <Header textAlign="center">Gym Pact Header</Header>
    <ConnectedFeedWorkouts />
  </>
);

export default Home;
