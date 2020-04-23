import React from "react";
import { Form, FormButton, Icon } from "semantic-ui-react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const CommentForm = (props) => {
  const [commentValue, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/workouts/${props.workout_id}/comments`, {
        comment: { text_field: commentValue, workout_id: props.workout_id },
      })
      .then((res) => {
        props.addComment(res.data);
      })
      .then(() => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ display: "flex", alignItems: "center", margin: "5px" }}>
        <Input
          placeholder="Leave a comment..."
          name="comment"
          value={commentValue}
          onChange={handleCommentChange}
          autoComplete="off"
        />
        <Icon
          onClick={handleSubmit}
          style={{ cursor: "pointer", color: "#353765" }}
          name="angle double right"
          size="big"
        />
      </div>
    </Form>
  );
};

export default CommentForm;

const Input = styled.input`
  &&::placeholder {
    color: black;
  }
  height: 2.5rem;
  margin: 1rem;
  padding: 0.5rem;
  width: 90%;
  background-color: #ddd;
`;
