import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import axios from "axios";
import styled from "styled-components";

const Comment = (props) => {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState();
  const { ...comment } = props;
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/users/${props.user_id}`)
      .then((res) => {
        setUser(res.data);
      })
      .then(checkDeleteComment());
    console.log(props);
  }, []);

  const checkDeleteComment = () => {};

  return (
    <CommentRow>
      <Image src={user.image} width="40px" height="40px" circular />

      <CommentName>{user.first_name}</CommentName>

      <CommentText>{comment.text_field}</CommentText>
    </CommentRow>
  );
};

export default Comment;

const styles = {
  defaultImage: {
    backgroundColor: "grey",
    borderRadius: "50%",
    fontSize: "1em",
  },
};

const CommentRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;
const CommentName = styled.h4`
  margin: 0 0.4rem;
`;
const CommentText = styled.div`
  height: fit-content;
  width: 80%;
`;
