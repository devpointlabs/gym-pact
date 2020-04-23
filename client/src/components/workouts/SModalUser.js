import React, { useState, useEffect } from "react";
import { Modal } from "semantic-ui-react";
import axios from "axios";
import Comment from "../comments/CommentUserShow";
import CommentForm from "../comments/CommentForm";
import { device } from "../../mediaquery";
import styled from "styled-components";

const SModalUser = (props) => {
  const [users, setUsers] = useState([]);
  const response = [];
  const postUser = [];
  const id = props.workout.user_id;
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState("");
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

  useEffect(() => {
    axios
      .get(`/api/workouts/${props.workout.id}/comments`)
      .then((res) => {
        let count = res.data.length;
        return count;
      })
      .then((count) => {
        setCommentsCount(count);
      });
  });
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
    <Modal
      trigger={
        <Workout>
          <span>{props.workout.title}</span>
          <span style={{ color: "#6CD3E0" }}>{commentsCount} Comments</span>
        </Workout>
      }
      style={{ width: "60%" }}
      closeIcon
    >
      <Modal.Content style={{ padding: 0 }}>
        <ModalDiv>
          <Column>
            <HeaderAndImage>
              <HeaderRow style={{ width: "20rem" }}>
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
              </HeaderRow>
              <Image src={props.workout.image} />
            </HeaderAndImage>
            <WorkoutDetails>
              <H1>{props.workout.title}</H1>
              <Desc>{props.workout.desc}</Desc>
            </WorkoutDetails>
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
        </ModalDiv>
      </Modal.Content>
    </Modal>
  );
};
export default SModalUser;

const Workout = styled.div`
  background-color: #353765;
  color: #fbd878;
  padding: 0.4rem 1.4rem;
  margin: 0.4rem 0 0 4rem;
  min-height: 3rem;
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
  border-radius: 5px;
`;
const ModalDiv = styled.div`
  display: flex;
  /* @media ${device.mobileS} {
    border: 3px solid brown;
  }
  @media ${device.mobileM} {
    border: 3px solid purple;
  }
  @media ${device.mobileL} {
    border: 3px solid yellow;
  }
  @media ${device.tablet} {
    border: 1px solid red;
  }
  @media ${device.tablet} {
    border: 1px solid red;
  }
  @media ${device.laptop} {
    border: 1px solid green;
  }
  @media ${device.laptopL} {
    border: 1px solid blue;
  } */
`;
const Image = styled.img`
  width: 90%;
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.laptop} {
    width: 55%;
  }
  @media ${device.laptopL} {
    width: 60%;
  }
`;
const HeaderRow = styled.div`
  display: flex;
`;
const HeaderAndImage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    flex-direction: row-reverse;
  }
`;
const WorkoutDetails = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    position: relative;
    top: -20%;
    align-items: flex-end;
    padding-right: 2rem;
    margin-bottom: 1rem;
  }
  @media ${device.laptop} {
    top: -30%;
    margin-top: -5%;
  }
  @media ${device.laptopL} {
    margin-top: -10%;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  margin-left: 1rem;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  align-self: center;
  width: 90%;
`;
