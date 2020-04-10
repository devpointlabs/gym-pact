import React, { useState } from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import styled from "styled-components";
import ropesImg from "../../imgs/ropes.jpg";
import gymProfilePic from "../../imgs/gymProfPic.jpg";

const ModalDiv = styled.div`
  z-index: -1;
  color: #292b4d;
`;
const Background = styled.div`
  transition-duration: 1s;
  position: fixed;
  bottom: 0vh;
  right: 0vw;
  height: 100vh;
  width: 100vw;
  background-color: black;
  overflow-y: hidden;
  opacity: 0.8;
  z-index: 1;
`;
const Container = styled.div`
  position: fixed;
  height: 70vh;
  width: 70vw;
  top: 15vh;
  left: 15vw;
  background-color: #eee;
  z-index: 3;
  border-radius: 5px;
`;
const Close = styled.span`
  position: fixed;
  top: 13vh;
  left: 84.2vw;
  height: 30px;
  width: 30px;
  background-color: #6cd3e0;
  text-align: center;
  padding-top: 4px;
  border-radius: 50%;
  cursor: pointer;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: grey;
`;
const Row = styled.div`
  display: flex;
`;
const H1 = styled.h1`
  position: relative;
  text-align: center;
  padding: 0.5rem;
  /* margin-left: 1rem; */
  border-radius: 5px;
  font-size: 15px;
  color: #fbd878;
  background-color: #353765;
  z-index: 12;
  width: fit-content;
`;
const H2 = styled.h2`
  position: relative;
  font-size: 20px;
  margin: 0.4rem 1rem;
  z-index: 12;
`;
const Desc = styled.p`
  min-height: 10vh;
  max-width: 80%;
  font-size: 12px;
  color: #000;
`;
// May need to move to a seperate Component
const CommentsDiv = styled.div`
  height: 20vh;
  width: 100%;
  font-size: 12px;
  overflow-x: hidden;
  color: #000;
`;
const CommentCounter = styled.p`
  padding: 1rem 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 80%;
`;
const Image = styled.img`
  width: 38vw;
  height: 70vh;
  z-index: 2;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const Input = styled.input`
  margin-top: 2rem;
  padding: 0.5rem;
  height: 25px;
  width: 80%;
  border-radius: 15px;
  outline: none;
  border-style: solid;
  border-color: #ddd;
`;

const Modal = (props) => {
  // const { user } = this.props;
  const [display, setDisplay] = useState("none");
  const show = (e) => {
    if (display == "none") {
      setDisplay("block");
      document.body.style.overflowY = "hidden";
    }
  };
  const hide = (e) => {
    if (display == "block") {
      setDisplay("none");
      document.body.style.overflowY = "initial";
    }
  };
  return (
    <ModalDiv onClick={show}>
      <Background onClick={hide} style={{ display: display }}></Background>
      <Container style={{ display: display }}>
        <Close onClick={hide}>X</Close>
        <Row>
          <Image src={ropesImg} />
          <Column style={{ paddingLeft: "1rem" }}>
            <Row style={{ width: "20rem" }}>
              <img
                src={gymProfilePic}
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0.5rem",
                  borderRadius: "50%",
                }}
              />
              <Column style={{ paddingTop: "1rem" }}>
                <H2>{props.user.user.first_name}</H2>
                <p style={{ fontSize: "12px" }}>{props.workout.created_at}</p>
              </Column>
            </Row>
            <H1>{props.workout.title}</H1>
            <Desc>{props.workout.desc}</Desc>
            <CommentCounter>Be the first to leave a comment...</CommentCounter>
            <CommentsDiv></CommentsDiv>
            <Input type="text" placeholder="Write a comment..." />
          </Column>
        </Row>
      </Container>
      {props.children}
    </ModalDiv>
  );
};

export default class ConnectedModal extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(user) => <Modal {...this.props} user={user} />}
      </AuthConsumer>
    );
  }
}
