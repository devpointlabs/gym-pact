import styled from 'styled-components';
import gym from '../../imgs/gym.jpg';


export const Landing = styled.div`
display: grid;
grid-template-columns: 50% 50%;
height: 100vh;
font-color: #292B4D !important;
`

export const BackgroundLeft = styled.div`
background-color: #F0F1F8;

`
export const Right = styled.div`
background-image: url(${gym});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 100%;
`
export const Left = styled.div`
background-color: #F0F1F8;
`
export const Container = styled.div`
padding-top: 10%;
text-align: left;
margin-left: 13%;
`
export const MainFont = styled.h1`
color: #FBD878;
font-size: 5rem;
`
export const CallBtn = styled.button`

`
export const SignUp = styled.div`
display: inline-block;
grid-template-columns: 50% 50%;
margin: 0 50px 0 50px;
font-color: red;
align-self: center;
`
export const H2 = styled.h2`
display: grid;
`