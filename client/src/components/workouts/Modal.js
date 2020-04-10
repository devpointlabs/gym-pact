import React, { useState } from "react";
import styled from "styled-components";
import ropesImg from "../../imgs/ropes.jpg";

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30%;
  z-index: -1;
  cursor: pointer;
`;
const Background = styled.div`
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
  display: flex;
  flex-direction: column;
`;
const Header = styled.h2`
  color: orange;
  position: fixed;
  text-align: center;
  top: 20vh;
  font-size: 35px;
  z-index: 12;
`;
const Text = styled.p`
  position: fixed;
  text-align: center;
  top: 40vh;
  font-size: 25px;
  color: orange;
  z-index: 12;
`;
const Image = styled.img`
  position: fixed;
  top: 0;
  width: 50vw;
  z-index: 2;
`;

const Modal = (props) => {
  const [display, setDisplay] = useState("none");
  const toggle = (e) => {
    if (display == "none") {
      setDisplay("block");
      document.body.style.overflowY = "hidden";
    } else {
      setDisplay("none");
      document.body.style.overflowY = "initial";
    }
  };
  return (
    <ModalDiv onClick={toggle}>
      <Background style={{ display: display }}></Background>
      <Image style={{ display: display }} src={ropesImg} />
      <Header style={{ display: display }}>{props.workout.title}</Header>
      <Text style={{ display: display }}>{props.workout.desc}</Text>
      {props.children}
    </ModalDiv>
  );
};

export default Modal;
