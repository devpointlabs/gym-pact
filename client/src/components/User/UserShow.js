import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Grid,
  Image,
  Container,
  Divider,
  Header,
  Button,
} from "semantic-ui-react";

const UserShow = (props) => {
  const [follow, setFollow] = useState("follow");

  const { currentUser } = props.location.state;
  const {
    username,
    first_name,
    last_name,
    gender,
    date_of_birth,
    email,
    fitness_level,
    followers,
    following,
    id,
    weight,
  } = props.location.state.user;

  const followUser = (currentUser) => {
    if (followers.indexOf(currentUser) === -1) {
      followers.push(currentUser);
      setFollow("UnFollow");
      console.log(followers);
    } else {
      let ind = followers.indexOf(currentUser);
      console.log(ind);
      followers.splice(ind, 1);
      setFollow("Follow");
      console.log(followers);
    }
  };
  return (
    <>
      <Link to="/profile">
        <span> Go Back </span>
      </Link>
      <Grid.Column width={4}></Grid.Column>
      <Grid.Column width={8}>
        <Header as="h1">Hello</Header>
        <Header as="h1">{username}</Header>{" "}
        <div>
          <p>First Name: {first_name}</p>
          <p>Last Name: {last_name}</p>
          <p>Email: {email}</p>
          <p>DOB: {date_of_birth}</p>
          <p>Gender: {gender}</p>
          <p>Weight: {weight}</p>
          <p>Fitness Level: {fitness_level}</p>
          <p>Followers: {followers.length}</p>{" "}
        </div>
        <div>
          <button onClick={() => followUser(currentUser)}>
            {followers.indexOf(currentUser) > -1 ? "UnFollow" : "Follow"}
          </button>
        </div>
      </Grid.Column>
    </>
  );
};

export default UserShow;
