import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Icon, Header, Button } from "semantic-ui-react";
import axios from "axios";
import styled from "styled-components";
import SModalUser from "../workouts/SModalUser";
import { device } from "../../mediaquery";

const UserShow = (props) => {
  const prevState = props.location.state.currentUser;
  const [workouts, setWorkouts] = useState([]);
  const { currentUser } = props.location.state;
  const user = props.location.state.user;
  const [open, setOpen] = useState(false);
  const {
    image,
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
    followers.indexOf(currentUser.id) > -1 ? "Following" : "Follow"
  );
  const [currentUserFollowing, setCurrentUserFollowing] = useState(
    currentUser.following
  );

  const getWorkouts = () => {
    axios
      .get("/api/all_workouts")
      .then((res) => {
        let arr = res.data.filter((workout) => {
          return workout.user_id === id;
        });
        return arr;
      })
      .then((res) => {
        setOpen(true);
        setWorkouts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hideWorkouts = () => {
    setOpen(false);
    setWorkouts([]);
  };
  const followUser = (currentUser) => {
    if (followers.indexOf(currentUser.id) === -1) {
      followers.push(currentUser.id);
      setFollow("Following");
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
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginBottom: "4rem",
        }}
      >
        <span
          onClick={() => props.history.goBack()}
          style={{
            cursor: "pointer",
            backgroundColor: "#FBD878",
            color: "#353765",
            padding: "0.3rem",
            borderRadius: "8px",
          }}
        >
          <Icon name="double angle left" size="large" /> Go Back
        </span>
      </div>
      <IntroRow style={{ justifyContent: "space-evenly" }}>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            circular
            src={image}
            style={{ margin: "2rem", width: "25rem", height: "25rem" }}
          />
        </div>

        <Row>
          <Header as="h1">{username}</Header>
          <div>
            <Button
              onClick={() => followUser(currentUser)}
              style={{ backgroundColor: "#353765", color: "#6CD3E0" }}
            >
              <span style={{ marginRight: "0.5rem" }}>{follow}</span>
              <Icon name={follow === "Following" ? "check" : "plus"} />
            </Button>
          </div>
        </Row>
      </IntroRow>
      <WorkoutsInfoRow>
        <h3>
          <span style={{ color: "#6CD3E0" }}>
            <Icon name="universal access" />
          </span>
          About {username}
        </h3>

        <Column>
          <ul style={{ listStyle: "none" }}>
            <li>
              <ListSpan>First Name:</ListSpan> {first_name}
            </li>
            <li>
              <ListSpan>Last Name:</ListSpan> {last_name}
            </li>
            <li>
              <ListSpan>Date of Birth:</ListSpan> {date_of_birth}
            </li>
            <li>
              <ListSpan>Gender:</ListSpan> {gender}
            </li>
            <li>
              <ListSpan>Weight:</ListSpan> {weight}
            </li>
            <li>
              <ListSpan>Fitness Level:</ListSpan> {fitness_level}
            </li>
            <li>
              <ListSpan>Followers:</ListSpan> {followers.length}
            </li>
          </ul>
        </Column>

        <Column>
          <WorkoutsDiv>
            <h3>
              <span style={{ color: "#6CD3E0" }}>
                <Icon name="hand point right outline" />
              </span>
              Workouts
            </h3>
            <Button
              onClick={() => {
                open ? hideWorkouts() : getWorkouts();
              }}
            >
              {workouts.length ? "Hide Workouts" : "Show Workouts"}
              <Icon
                name={workouts.length ? "minus" : "plus"}
                style={{ marginLeft: "0.5rem" }}
              />
            </Button>
            {workouts.map((w, ind) => (
              <SModalUser
                workout={w}
                currentUser={props.location.state.currentUser}
              />
            ))}
          </WorkoutsDiv>
        </Column>
      </WorkoutsInfoRow>
    </Container>
  );
};

export default UserShow;

const Container = styled.div`
  width: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid red;
`;
const IntroRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
`;
const WorkoutsInfoRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  margin: 3.5rem 0;
  border: 1px solid red;
  @media ${device.tablet} {
    border: 1px solid blue;
  }
`;
const WorkoutsDiv = styled.div`
  width: 100%;
  border: 1px solid red;
`;
const ListSpan = styled.span`
  color: black;
  font-weight: bolder;
  margin-right: 0.3rem;
`;
