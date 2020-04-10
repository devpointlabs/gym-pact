import React, { useState } from "react";
import styled from "styled-components";
import ropesImg from "../../imgs/ropes.jpg";

const ModalDiv = styled.div`
  z-index: -1;
  cursor: pointer;
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
  /* width: 70vw; */
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
`;
const Row = styled.div`
  display: flex;
`;
const H1 = styled.h1`
  position: relative;
  text-align: center;
  font-size: 35px;
  z-index: 12;
`;
const H2 = styled.h2`
  position: relative;
  text-align: center;
  font-size: 25px;
  z-index: 12;
`;
const Desc = styled.p`
  position: relative;
  text-align: center;
  min-height: 10vh;
  font-size: 20px;
  z-index: 12;
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
            <H2>User Name</H2>
            <p>{props.workout.created_at}</p>
            <H1>Title: {props.workout.title}</H1>
            <Desc>Workout: {props.workout.desc}</Desc>
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
