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
display: grid;
grid-template-columns: 20% auto 20%;
grid-template-rows: auto 15% 15% 30% 20%;
padding-top: 10%;
text-align: left;
height: 100%;
`
export const SubContainer = styled.div`
display: grid;
grid-column-start: 2;
grid-row-start: 4;
`

export const MainFont = styled.h1`
color: #FBD878;
font-size: 5rem;
`
export const CallBtn = styled.button`

`
export const SignUp = styled.div`
grid-column-start: 2;
grid-row-start: 5;
`
export const H2 = styled.h2`
`
export const Header = styled.h1`
grid-column-start: 2;
grid-row-start: 2;
`
export const Definition = styled.h4`
grid-column-start: 2;
grid-row-start: 3;

`