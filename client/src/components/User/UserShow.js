import React from "react";
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
  } = props.location.state.user.f;

  console.log(props.location.state.user.f);
  return (
    <>
      <Link to="/profile">
        <span> Go Back </span>
      </Link>
      <Grid.Column width={4}></Grid.Column>
      <Grid.Column width={8}>
        <Header as="h1">{username}</Header>
        <div>
          <p>First Name: {first_name}</p>
          <p>Last Name: {last_name}</p>
          <p>Email: {email}</p>
          <p>DOB: {date_of_birth}</p>
          <p>Gender: {gender}</p>
          <p>Weight: {weight}</p>
          <p>Fitness Level: {fitness_level}</p>
          <p>Followers: {followers.length}</p>
        </div>
      </Grid.Column>
    </>
  );
};

export default UserShow;
