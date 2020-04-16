import React, { useState, useEffect } from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import styled from "styled-components";
import ropesImg from "../../imgs/ropes.jpg";
import axios from "axios";
import gymProfilePic from "../../imgs/gymProfPic.jpg";
import Comment from '../comments/Comment';
import CommentForm from '../comments/CommentForm';

const Modal = (props) => {
  const [users, setUsers] = useState([]);
  const response = [];
  const postUser = [];
  const id = props.workout.user_id;
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState([])

  
  // componentDidmount
  
  // useEffect(() => {
  // }, [])
  
  
  const getComments = () => {
    axios.get(`/api/workouts/${props.workout.id}/comments`)
    .then( res => {
      // this.setState({comments: res.data})
      setComments(res.data)
      })
         .catch( err => {
            console.log(err)
         })
    
}

  const addComment = () => {
    axios.post(`/api/workouts/${props.workout.id}/comments`)
    .then( res => {
       set
    })
 }

  const renderComments = () => {
     return comments.map(comment => (
        <Comment key={comment.id} {...comment}/>
     ))
   }

  const getPostUser = () => {
    axios
      .get("/api/all_users")
      .then((res) => {
        response.push(res.data);
        response.forEach((res) => {
          res.filter((user) => {
            return user.id === id ? setUsers(user) : null;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [display, setDisplay] = useState("none");
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
    <ModalDiv
      onClick={() => {
        getPostUser();
        getComments();
        show();
      }}
    >
      <Background onClick={hide} style={{ display: display }}></Background>
      <Container style={{ display: display }}>
        <Close onClick={hide}>X</Close>
        <Row>
          <Image src={ropesImg} />
          <Column style={{ paddingLeft: "1rem" }}>
            <Row style={{ width: "20rem" }}>
              <img
                src={gymProfilePic}
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
            <H1>{props.workout.title}</H1>
            <Desc>{props.workout.desc}</Desc>
            <CommentCounter>Be the first to leave a comment...</CommentCounter>
            <CommentsDiv>
              {renderComments()}
            </CommentsDiv>
                <CommentForm />
          </Column>
        </Row>
      </Container>
      {props.children}
    </ModalDiv>
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

const ModalDiv = styled.div`
  z-index: -1;
  color: #292b4d;
`;
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
const Container = styled.div`
  position: fixed;
  height: 70vh;
  width: 60vw;
  top: 15vh;
  left: 21vw;
  background-color: #eee;
  z-index: 3;
  border-radius: 5px;
`;
const Close = styled.span`
  position: fixed;
  top: 13vh;
  left: 80.2vw;
  height: 30px;
  width: 30px;
  background-color: #6cd3e0;
  text-align: center;
  padding-top: 4px;
  border-radius: 50%;
  cursor: pointer;
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
const Image = styled.img`
  width: 38vw;
  height: 70vh;
  z-index: 2;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const Input = styled.input`
  margin-top: 2rem;
  padding: 0.5rem;
  height: 25px;
  width: 80%;
  border-radius: 15px;
  outline: none;
  border-style: solid;
  border-color: #ddd;
`;