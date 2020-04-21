import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Button } from "semantic-ui-react";
import axios from "axios";

const UserShow = (props) => {
  const { currentUser } = props.location.state;
  const user = props.location.state.user;
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
  const [follow, setFollow] = useState(
    followers.indexOf(currentUser.id) > -1 ? "UnFollow" : "Follow"
  );
  const [currentUserFollowing, setCurrentUserFollowing] = useState(
    currentUser.following
  );

  const followUser = (currentUser) => {
    if (followers.indexOf(currentUser.id) === -1) {
      followers.push(currentUser.id);
      setFollow("UnFollow");
      setCurrentUserFollowing(
        currentUserFollowing.indexOf(id) === -1
          ? currentUserFollowing.push(id)
          : null
      );
      console.log("This users followers", followers);
      console.log("Logged in users following", currentUserFollowing);
      currentUser.following = currentUserFollowing;
      axios
        .put(`/api/user/${id}`, user)
        .then((res) => {
          res.data = user;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .put(`/api/userf/${currentUser.id}`, currentUser)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let ind = followers.indexOf(currentUser.id);
      let indCu = currentUser.following.indexOf(id);
      console.log(ind);
      followers.splice(ind, 1);
      setFollow("Follow");
      setCurrentUserFollowing(currentUser.following.splice(indCu, 1));
      currentUser.following = currentUserFollowing;
      console.log("this users followers", followers);
      console.log("Current users following", currentUser.following);
      console.log(user);
      axios
        .put(`/api/user/${id}`, user)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .put(`/api/userf/${currentUser.id}`, currentUser)
        .then((res) => {
          console.log(currentUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <span
        onClick={() => props.history.goBack()}
        style={{ cursor: "pointer", color: "skyblue" }}
      >
        Go Back
      </span>

      <Grid.Column width={4}></Grid.Column>
      <Grid.Column width={8}>
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
          <Button onClick={() => followUser(currentUser)}>{follow}</Button>
        </div>
      </Grid.Column>
    </>
  );
};

export default UserShow;
