import React from "react";
import { Header } from "semantic-ui-react";
import ConnectedFeedWorkouts from "./workouts/FeedWorkouts";

const Home = () => (
  <>
    // these two headers were from merge conflict
    <Header textAlign="center">GYM PACT</Header>
    <ConnectedFeedWorkouts className="feed" />
  </>
);

export default Home;
