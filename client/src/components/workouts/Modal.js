import React, { useState } from "react";
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
  opacity: 0.6;
  z-index: 1;
`;
const Container = styled.div`
  position: fixed;
  top: 15vh;
  left: 20vw;
  background-color: #eee;
  border-radius: 5px;
  z-index: 3;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 30vw; */
`;
const Row = styled.div`
  display: flex;
`;
const H1 = styled.h1`
  position: relative;
  text-align: center;
  padding: 0.5rem;
  margin-left: 1rem;
  border-radius: 5px;
  font-size: 20px;
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
  position: relative;
  text-align: center;
  min-height: 10vh;
  max-width: 80%;
  font-size: 16px;
  z-index: 12;
  color: #000;
`;
const Image = styled.img`
  width: 48vw;
  height: 70vh;
  z-index: 2;
`;

const Modal = (props) => {
  const [display, setDisplay] = useState("none");
  const show = (e) => {
    if (display == "none") {
      setDisplay("block");
      document.body.style.overflowY = "hidden";
    }
  };
  const hide = () => {
    if (display == "block") {
      setDisplay("none");
      document.body.style.overflowY = "initial";
    }
  };
  return (
    <ModalDiv onClick={show}>
      <Background onClick={hide} style={{ display: display }}></Background>
      <Container style={{ display: display }}>
        <Row>
          <Image src={ropesImg} />
          <Column>
            <Row>
              <img
                src={gymProfilePic}
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0.5rem",
                  borderRadius: "50%",
                }}
              />
              <Column>
                <H2>User Name</H2>
                <p style={{ fontSize: "12px" }}>{props.workout.created_at}</p>
              </Column>
            </Row>
            <H1>{props.workout.title}</H1>
            <Desc>{props.workout.desc}</Desc>
            <p>(number of) Comments</p>
            <Desc>
              <p>Enter Comments Here</p>
            </Desc>
          </Column>
        </Row>
      </Container>
      {props.children}
    </ModalDiv>
  );
};

export default Modal;
