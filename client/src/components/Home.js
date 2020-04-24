import React from "react";
import { Header } from "semantic-ui-react";
import ConnectedFeedWorkouts from "./workouts/FeedWorkouts";

const Home = () => (
  <>
    <div
      style={{ display: "flex", justifyContent: "center", padding: "2em 0em" }}
    >
      <Header textAlign="center" style={{ fontSize: "1.75em" }}>
        WORKOUTS
      </Header>
    </div>
    <ConnectedFeedWorkouts className="feed" />
  </>
);





export default Home;
