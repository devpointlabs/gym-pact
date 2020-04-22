import styled from 'styled-components';
import gym from '../../imgs/gymDark.png';
 


export const Landing = styled.div`
display: grid;
grid-template-columns: 50% 50%;
height: calc(100vh - 38px);
color: #292B4D !important;
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
font-color: #292B4D;
`
export const Container = styled.div`
display: grid;
grid-template-columns: 20% auto 20%;
grid-template-rows: auto 20% 15% 30% 20%;
padding-top: 10%;
text-align: left;
height: 100%;
`
export const SubContainer = styled.div`
display: grid;
grid-column-start: 2;
grid-row-start: 4;
font-family: Roboto;
font-style: normal;
`

export const MainFont = styled.h1`
color: #FBD878;
font-size: 5rem;
`
export const CallBtn = styled.button`

`
export const SignUp = styled.a`
display: flex;
align-items: center;
grid-column-start: 2;
grid-row-start: 5;
font-family: Teko;
font-style: normal;
color: #292B4D;
`
export const H2 = styled.h2`
grid-column-start: 1;
grid-column-end: 2;
font-family: Teko, sans-serif;
font-style: normal;

`
export const Header = styled.h1`
grid-column-start: 2;
grid-row-start: 2;
font-family: Teko, sans-serif;
font-style: normal;
font-weight: 500;
font-size: 8em;
`
export const Definition = styled.h4`
grid-column-start: 2;
grid-row-start: 3;
font-family: Teko;
font-style: light;
font-size: 2em;

`