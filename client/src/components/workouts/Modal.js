import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  bottom: 0vh;
  right: 0vw;
  height: 100vh;
  width: 100vw;
  background-color: black;
  overflow-y: hidden;
  opacity: 0.6;
`;
const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30%;
`;
const hide = {
  display: "none",
};
const Modal = (props) => {
  const [display, setDisplay] = useState("none");
  const toggle = () => {
    console.log(display);
    display == "none" ? setDisplay("block") : setDisplay("none");
    // hidden ? setHidden(false) : setHidden(true);
  };
  return (
    <ModalDiv onClick={toggle}>
      <div style={{ display: display }}>This is the Workout Info</div>
      <Background style={{ display: display }}></Background>
      This is the modal
      {props.children}
    </ModalDiv>
  );
};

export default Modal;
