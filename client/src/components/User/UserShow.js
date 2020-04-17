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
import axios from "axios";

const UserShow = (props) => {
  const [follow, setFollow] = useState("follow");
  const [currentFollowers, setcurrentFollowers] = useState([
    props.location.state.user.followers,
  ]);
  const user = props.location.state.user;
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
      setcurrentFollowers(followers);
      console.log(followers);
      console.log(currentFollowers);
      axios
        .put(`/api/user/${id}`, user)
        .then((res) => {
          res.data = user;
          console.log(user);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let ind = followers.indexOf(currentUser);
      console.log(ind);
      followers.splice(ind, 1);
      setFollow("Follow");
      console.log(followers);
      axios
        .put(`/api/user/${id}`, user)
        .then((res) => {
          res.data = user;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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