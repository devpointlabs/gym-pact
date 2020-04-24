import React from "react";
import styled from "styled-components";
import diane from "../imgs/Diane.jpeg";
import carson from "../imgs/Carson.jpeg";
import jonathan from "../imgs/jonathan.jpg";
import { Icon } from "semantic-ui-react";

const About = () => {
  return (
    <div>
      <Container className="aboutpage">
        <Intro>
          <h2 style={{ fontSize: "3rem" }}>About Gym Pact</h2>
          <p>
            Gym pact is a web application that will allow users to interact with
            others through workouts. You can create workouts, follow other
            workouts, and have people follow you for the workouts you have
            created. On your user page, you can view your workouts, who your
            followers are and who you are following, as well as some information
            about yourself.
          </p>
        </Intro>
        <Column>
          <Container style={{ height: "4rem" }}>
            <h4 style={{ fontSize: "2.4rem" }}>Contributors:</h4>
          </Container>
          <Row>
            <Card>
              <h4 style={{ padding: "1rem" }}>Diane</h4>
              <ImgDiv>
                <Img src={diane} />
              </ImgDiv>
              <div>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <a href="https://www.linkedin.com/in/dianenguyen1999/">
                      <Icon name="linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/dianenguyen1999">
                      GitHub <Icon name="github" />
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
            <Card>
              <h4 style={{ padding: "1rem" }}>Carson</h4>
              <ImgDiv>
                <Img src={carson} />
              </ImgDiv>
              <div>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    {" "}
                    <a href="https://www.linkedin.com/feed/">
                      <Icon name="linkedin" /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/carsonmeiling">
                      GitHub <Icon name="github" />
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
            <Card>
              <h4 style={{ padding: "1rem" }}>Jon</h4>
              <ImgDiv>
                <Img src={jonathan} />
              </ImgDiv>
              <div>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <a href="https://www.linkedin.com/in/jonathancooperwebdeveloper/">
                      <Icon name="linkedin" /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/jcoops22">
                      GitHub <Icon name="github" />
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
          </Row>
        </Column>
      </Container>
    </div>
  );
};

export default About;
const Row = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 80vh;
  align-content: center;
  /* border: 1px solid yellow; */
  justify-content: space-around;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid blue; */
  width: fit-content;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 30vh;
  /* border: 1px solid black; */
  color: #6cd3e0;
  background-color: #353765;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #353765;
`;
const Img = styled.img`
  width: 15rem;
  /* height:; */
  border-radius: 50%;
  /* border: 1px solid black; */
`;
const Intro = styled.div`
  width: 25vw;
  height: 50vh;
  /* border: 1px solid red; */
`;
