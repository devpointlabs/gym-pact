import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <>
      <img src={user.image ? user.image : styles.defaultImage} width="40px" />

      <h4>{user.first_name}</h4>

      <p>{comment.text_field}</p>
      {showButton ? (
        <button onClick={() => props.deleteComment(comment)}>Delete</button>
      ) : (
        <></>
      )}
    </>
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
