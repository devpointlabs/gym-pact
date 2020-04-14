import styled from 'styled-components';
import gym from '../../imgs/gym.jpg';


export const Landing = styled.div`
display: grid;
grid-template-columns: 50% 50%;
height: 100vh;
width: 100vw;
`

export const BackgroundLeft = styled.div`
background-color: #F0F1F8;
`
export const Right = styled.div`
background-image: url(${gym});
`
export const Left = styled.div`
background-color: #F0F1F8;
`
export const Container = styled.div`
padding-top: 10%;
text-align: center
`
export const MainFont = styled.h1`
color: #FBD878;
font-size: 5rem;
`
export const CallBtn = styled.button`

`
// import { 
//    Background,
//    Container,
//    MainFont,
//    CallBtn,
//  } from './styles/LandingStyles';

{/* <Background>
    <Container>
       <MainFont>GYM PACT</MainFont>
       <CallBtn>Register</CallBtn>
       <CallBtn>Login</CallBtn>
    </Container>
 </Background> */}