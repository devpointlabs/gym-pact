import React, { useState, useEffect } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import ropesImg from "../../imgs/ropes.jpg";
import axios from "axios";
// import gymProfilePic from "../../imgs/gymProfPic.jpg";
import Comment from "../comments/CommentUserShow";
import CommentForm from "../comments/CommentForm";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SModalUser = (props) => {
  const [users, setUsers] = useState([]);
  const response = [];
  const postUser = [];
  const id = props.workout.user_id;
  const [comments, setComments] = useState([]);
  const [clear, setClear] = useState();

  // componentDidmount

  useEffect(() => {
    axios
      .get(`/api/workouts/${props.workout.id}/comments`)
      .then((res) => {
        // this.setState({comments: res.data})
        setComments(res.data);
        show();
      })
      .catch((err) => {
        console.log(err);
      });

    getPostUser();
  }, [props.workout.id]);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const deleteComment = (comment) => {
    axios
      .delete(`/api/workouts/${comment.workout_id}/comments/${comment.id}`)
      .then((res) => {
        console.log(res);
      });
    setComments(comments.filter((c) => c.id !== comment.id));
  };

  const renderComments = () => {
    // if (!comments) return null;
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        {...comment}
        deleteComment={deleteComment}
        workout={props.workout}
        currentUser={props.currentUser}
        user={users}
      />
    ));
  };

  // Carson and Harlan Commented this out because of conflicts with Comments
  // between Carson, Harlan and Jon we will need to test this.
  //
  const getPostUser = () => {
    axios
      .get("/api/all_users")
      .then((res) => {
        response.push(res.data);
        response.forEach((res) => {
          res.filter((user) => {
            // debugger;
            return user.id === id ? setUsers(user) : null;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [display, setDisplay] = useState("initial");

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
    <Modal trigger={<Workout>{props.workout.title}</Workout>} closeIcon>
      <Modal.Content style={{ padding: 0 }}>
        <Row>
          <Image src={props.workout.image} style={{ width: "70%" }} />
          <Column>
            <Row style={{ width: "20rem" }}>
              <img
                src={users.image}
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0.5rem",
                  borderRadius: "50%",
                }}
              />
              <Column style={{ paddingTop: "1rem" }}>
                <H2>{users.username}</H2>

                <p style={{ fontSize: "12px" }}>{props.workout.created_at}</p>
              </Column>
            </Row>

            <Column>
              <H1>{props.workout.title}</H1>
              <Desc>{props.workout.desc}</Desc>
              <CommentCounter>
                {comments.length === 0
                  ? "Be the first to leave a comment..."
                  : comments.length + " comments"}
              </CommentCounter>
              <CommentsDiv>
                {comments.length === 0
                  ? "There are no comments"
                  : renderComments()}
              </CommentsDiv>
              <CommentForm
                style={{ width: "100%" }}
                addComment={addComment}
                workout_id={props.workout.id}
              />
            </Column>
          </Column>
        </Row>
      </Modal.Content>
    </Modal>
  );
};
export default SModalUser;

const Workout = styled.div`
  background-color: #353765;
  color: #fbd878;
  padding-left: 1.4rem;
  padding-top: 0.5rem;
  margin: 0.4rem 0;
  height: 3rem;
  width: 70%;
  cursor: pointer;
  border-radius: 5px;
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
  width: 90%;
`;
