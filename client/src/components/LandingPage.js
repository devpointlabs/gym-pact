import React from 'react';
import { 
   Container,
   MainFont,
   CallBtn,
   Left,
   Landing,
   Right
 } from './styles/LandingStyles';
 import { List, ListContent } from 'semantic-ui-react';

 

const LandingPage = () => (

 <Landing>
    <Left>
       <Container>
          <h1>GYM PACT</h1>
          <h4>The social networking fitness tracker for sharing workouts across the planet.</h4>
          <List>
             <List.Item>
                <List.Icon name='line graph' size='large' />
                <List.Content>Track your exercises and workouts</List.Content>
             </List.Item>
             <List.Item>
                <List.Icon name='group' size='large' />
                <List.Content>Follow your friends and admirers</List.Content>
             </List.Item>
             <List.Item>
                <List.Icon name='idea' size='large' />
                <List.Content>Scroll through your workout feed for new ideas</List.Content>
             </List.Item>
             <List.Item>
                <List.Icon name='balance' size='large' />
                <List.Content>Reflect your work in your profile</List.Content>
             </List.Item>
          </List>
       </Container>
    </Left>
    <Right></Right>
 </Landing>
 
)


export default LandingPage;