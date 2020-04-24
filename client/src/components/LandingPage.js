import React from "react";
import {
  Container,
  MainFont,
  CallBtn,
  Left,
  Landing,
  Right,
  SignUp,
  H2,
  SubContainer,
  Header,
  Definition,
} from "./styles/LandingStyles";
import { List, ListContent, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LandingPage = () => (
  <Landing>
    <Left>
      <Container>
        <Header>GYM PACT</Header>
        <Definition>
          The social networking fitness tracker for sharing workouts across the
          planet.
        </Definition>
        <SubContainer>
          <List style={{ paddingTop: "1rem" }}>
            <List.Item>
              <List.Icon name="line graph" size="large" />
              <List.Content>Track your exercises and workouts</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="group" size="large" />
              <List.Content>Follow your friends and admirers</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="block layout" size="large" />
              <List.Content>
                Scroll through your workout feed for new ideas
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="dot circle outline" size="large" />
              <List.Content>Reflect your work in your profile</List.Content>
            </List.Item>
          </List>
        </SubContainer>
        <SignUp href="/register">
          <H2>Sign Up</H2>
          <Icon name="double angle right" size="massive" />
        </SignUp>
      </Container>
    </Left>
    <Right></Right>
  </Landing>
);

export default LandingPage;
