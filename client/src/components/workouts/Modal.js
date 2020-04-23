import React, { useState, useEffect } from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import styled from "styled-components";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";
import { Link } from "react-router-dom";
import { device } from "../../mediaquery";

const Modal = (props) => {
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
        user={props.user}
      />
    ));
  };

  const getPostUser = () => {
    axios
      .get("/api/all_users")
      .then((res) => {
        response.push(res.data);
        console.log(users);
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
    console.log(users);
  };

  const [display, setDisplay] = useState("initial");

  return (
    <div>
      <Background
        onClick={props.unToggle}
        style={{ display: display }}
      ></Background>
      <Container>
        <Close onClick={props.unToggle}>X</Close>
        <ImageDiv>
          <Image src={props.workout.image} />
        </ImageDiv>
        <Column>
          <HeaderRow style={{ width: "20rem" }}>
            <img
              src={users.image}
              style={{
                width: "40px",
                height: "40px",
                margin: "0.5rem",
                borderRadius: "50%",
              }}
            />
            <Column>
              <Link
                onClick={() => {
                  props.unToggle();
                }}
                to={{
                  pathname: "/usershow",
                  state: {
                    user: users,
                    currentUser: props.user.user,
                  },
                }}
              >
                <H2>{users.username}</H2>
              </Link>
              <p style={{ fontSize: "12px" }}>{props.workout.created_at}</p>
            </Column>
          </HeaderRow>
          <WorkoutDetails>
            <H1>{props.workout.title}</H1>
            <Desc>{props.workout.desc}</Desc>
          </WorkoutDetails>
          <ColumnFlex>
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
          </ColumnFlex>
        </Column>
      </Container>
    </div>
  );
};

export default class ConnectedModal extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(user) => <Modal {...this.props} user={user} />}
      </AuthConsumer>
    );
  }
}

const Background = styled.div`
  transition-duration: 1s;
  position: fixed;
  bottom: 0vh;
  right: 0vw;
  height: 100vh;
  width: 100vw;
  background-color: black;
  overflow-y: hidden;
  opacity: 0.8;
  z-index: 1;
`;
const Close = styled.span`
  position: fixed;
  height: 30px;
  width: 30px;
  background-color: #6cd3e0;
  text-align: center;
  padding-top: 4px;
  border-radius: 50%;
  cursor: pointer;
  @media ${device.tablet} {
    top: 18vh;
    left: 88vw;
  }
  @media ${device.laptop} {
    top: 8vh;
    left: 88.7vw;
  }
`;
const Container = styled.div`
  position: fixed;
  width: 60%;
  top: 10vh;
  left: 21vw;
  background-color: #eee;
  z-index: 3;
  border-radius: 5px;
  display: flex;
  @media ${device.mobileS} {
    border: 3px solid brown;
  }
  @media ${device.mobileM} {
    border: 3px solid purple;
  }
  @media ${device.mobileL} {
    border: 3px solid yellow;
  }
  @media ${device.tablet} {
    border: 3px solid red;
    width: 80%;
    top: 20vh;
    left: 10vw;
  }
  @media ${device.laptop} {
    border: 3px solid green;
    top: 10vh;
  }
  @media ${device.laptopL} {
    border: 3px solid blue;
  }
`;
const ImageDiv = styled.div`
  width: 100%;
  border: 2px solid red;
  @media ${device.laptop} {
    width: 80%;
    max-height: 80%;
  }
  @media ${device.laptopL} {
    width: 75%;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  align-self: center;
  @media ${device.mobileL} {
    /* width: 60%; */
  }
  @media ${device.tablet} {
    /* width: 100%; */
  }
  @media ${device.laptop} {
    /* width: 100%; */
  }
  @media ${device.laptopL} {
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  @media ${device.laptop} {
    width: 70%;
  }
`;
const ColumnFlex = styled.div`
  @media ${device.tablet} {
    border: 1px solid red;
  }
`;
const HeaderRow = styled.div`
  display: flex;
`;
const WorkoutDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  height: 100%;
  @media ${device.tablet} {
    border: 1px solid red;
  }
`;
const H1 = styled.h1`
  position: relative;
  text-align: center;
  margin-top: 1.5rem;
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 15px;
  color: #fbd878;
  background-color: #353765;
  width: fit-content;
`;
const H2 = styled.h2`
  position: relative;
  font-size: 20px;
  margin: 0.4rem 1rem;
`;
const Desc = styled.p`
  font-size: 12px;
  padding-bottom: 1rem;
  height: fit-content;
`;
const CommentsDiv = styled.div`
  height: 20vh;
  width: 100%;
  font-size: 12px;
  overflow-x: hidden;
  color: #000;
  @media ${device.mobileL} {
    height: 17vh;
  }
  @media ${device.tablet} {
    height: 31.5vh;
    width: 100%;
  }
  @media ${device.laptop} {
    height: 37.5vh;
    width: 100%;
  }
`;
const CommentCounter = styled.p`
  padding: 1rem 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 90%;
`;
