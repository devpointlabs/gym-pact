import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Image, Icon } from "semantic-ui-react";
import styled from "styled-components";

const Comment = (props) => {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState();
  const { ...comment } = props;
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // componentDidMount
    axios
      .get(`/api/users/${props.user_id}`)
      .then((res) => {
        setUser(res.data);
      })
      .then(checkDeleteComment());
    console.log(props);
  }, []);

  const checkDeleteComment = () => {
    if (props.user.user.id === comment.user_id) {
      console.log("user_id ->", props.user.user.id);
      console.log("comment user_id ->", comment.user_id);
      setShowButton(true);
    } else {
      console.log("user_id null ->", props.user.user.id);
      console.log("comment user_id null ->", comment.user_id);
    }
  };

  return (
    <CommentRow>
      <Image src={user.image} width="40px" height="40px" circular />
      <Link
        to={{
          pathname: "/usershow",
          state: {
            currentUser: props.user.user,
            user: user,
          },
        }}
      >
        <CommentName>{user.first_name}</CommentName>
      </Link>

      <CommentText>{comment.text_field}</CommentText>
      {showButton ? (
        <Icon
          name="delete"
          onClick={() => props.deleteComment(comment)}
          style={{ color: "red", cursor: "pointer" }}
        />
      ) : (
        <></>
      )}
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
  margin: 0.5rem 0;
`;
const CommentName = styled.h4`
  margin: 0 0.4rem;
  padding-top: 8px;
`;
const CommentText = styled.div`
  height: fit-content;
  width: 80%;
  padding-top: 12px;
`;
