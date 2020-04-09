import React from "react";
import { Divider } from "semantic-ui-react";

const Modal = (props) => (
  <div>
    This is the modal
    {props.children}
  </div>
);

export default Modal;
