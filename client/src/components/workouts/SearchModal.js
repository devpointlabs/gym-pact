import React, { useState, useEffect } from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import styled from "styled-components";
import axios from "axios";
import gymProfilePic from "../../imgs/ropes.jpg";
import { device } from "../../mediaquery";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";
import { Link } from "react-router-dom";

const SearchModal = (props) => {
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
        user={props.user}
        unToggle={props.unToggle}
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
                  props.clearSearch();
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
            <CommentsDiv
              onClick={() => {
                props.unToggle();
                props.clearSearch();
              }}
            >
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
        {(user) => <SearchModal {...this.props} user={user} />}
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
  opacity: 0.8;
  z-index: 1;
`;
const Close = styled.span`
  position: fixed;
  height: 30px;
  width: 30px;
  top: 5vh;
  left: 77vw;
  color: #353765;
  background-color: #6cd3e0;
  text-align: center;
  padding-top: 4px;
  border-radius: 50%;
  cursor: pointer;
  @media ${device.mobileL} {
    left: 79vw;
  }
  @media ${device.tablet} {
    top: 18vh;
    left: 83vw;
  }
  @media ${device.laptop} {
    top: 8vh;
    left: 83.4vw;
  }
  @media ${device.laptopL} {
    left: 84vw;
  }
`;
const Container = styled.div`
  position: fixed;
  width: 60%;
  top: 7vh;
  left: 21vw;
  background-color: #eee;
  z-index: 3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  @media ${device.mobileS} {
    /* border: 3px solid brown; */
  }
  @media ${device.mobileM} {
    /* border: 3px solid purple; */
  }
  @media ${device.mobileL} {
    /* border: 3px solid yellow; */
  }
  @media ${device.tablet} {
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    /* border: 3px solid red; */
    width: 70%;
    top: 20vh;
    left: 15vw;
  }
  @media ${device.laptop} {
    /* border: 3px solid green; */
    top: 10vh;
    max-height: 80vh;
  }
  @media ${device.laptopL} {
    /* border: 3px solid blue; */
    max-width: 1008px;
  }
`;
const ImageDiv = styled.div`
  width: 100%;
  /* height: 35vh; */
  height: 100%;
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.8); */
  @media ${device.mobileM} {
    height: 30vh;
  }
  @media ${device.mobileL} {
    height: 40vh;
  }
  @media ${device.tablet} {
    height: 100%;
  }
  @media ${device.laptop} {
    width: 80%;
    max-height: 80vh;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  align-self: center;
  @media ${device.mobileM} {
    max-width: 300px;
  }
  @media ${device.mobileL} {
    max-width: 300px;
  }
  @media ${device.tablet} {
    max-width: 90%;
  }
  @media ${device.laptop} {
    max-width: 90%;
    max-height: 80vh;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.tablet} {
    width: 40%;
  }
  @media ${device.laptop} {
    width: 50%;
  }
`;

const HeaderRow = styled.div`
  display: flex;
`;
const H2 = styled.h2`
  position: relative;
  font-size: 20px;
  margin: 0.4rem 1rem;
`;
const WorkoutDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  height: 100%;
  /* align-items: center; */
  @media ${device.tablet} {
    /* border: 1px solid red; */
    height: 40%;
  }
`;
const H1 = styled.h1`
  position: relative;
  margin-top: 1.5rem;
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 15px;
  color: #fbd878;
  background-color: #353765;
  width: fit-content;
`;
const Desc = styled.p`
  font-size: 12px;
  height: 7vh;
  overflow-y: scroll;
  @media ${device.mobileL} {
    height: initial;
  }
  @media ${device.tablet} {
    height: 10vh;
  }
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${device.tablet} {
    height: 100%;
  }
`;
const CommentsDiv = styled.div`
  height: 10vh;
  width: 100%;
  font-size: 12px;
  overflow-x: hidden;
  color: #000;
  @media ${device.mobileL} {
    height: 14vh;
  }
  @media ${device.tablet} {
    /* height: 100%; */
  }
  @media ${device.laptop} {
    height: 21vh;
    width: 100%;
  }
`;
const CommentCounter = styled.p`
  padding: 0.3rem 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 90%;
  color: grey;
  @media ${device.mobileL} {
    visibility: hidden;
    margin-bottom: -4vh;
  }
  @media ${device.tablet} {
    visibility: visible;
    margin-bottom: 0;
  }
`;
