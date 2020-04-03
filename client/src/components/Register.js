import React from 'react';
import { AuthConsumer } from "../providers/AuthProvider";
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import Axios from 'axios';

class Register extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', firstName: '', lastName: '', username: '',
   gender: '', dateOfBirth: '', weight: '', fitnessLevel: '' };
  // Pull in all the users - user index
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation, firstName, lastName, username, gender, dateOfBirth, weight, fitnessLevel } = this.state;
    const { auth: { handleRegister, }, history, } = this.props;
    
    // user.forEach(user => {
      // if (this.state.username !== user.username)
      // continue as normal
      // else alert('username already taken')
    // })
    // checkUserName()
    if (password === passwordConfirmation)
      handleRegister({ email, password, passwordConfirmation, firstName, lastName, username, gender, dateOfBirth, weight, fitnessLevel }, history);
    else
      alert('Passwords Do Not Match!')
  }

  // you'll need an axios call to get ALL the users nah we good

  // gets usernames from db to use for checkUserName uniqeness TODO
  // getUsernames = () => {
    // users = []
  //   axios.get()
  // return users
  // }

  // checkUserName = (this.state.username) => { TODO
  //   getUserNames
  //   let username = this.state.username
  //   users.forEach( user => {
  //     if username === user {console.log()}

  //   })
  // }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value, });
  }
  
  render() {
    const { email, password, passwordConfirmation, firstName, lastName, username, gender, dateOfBirth, weight, fitnessLevel } = this.state;
    
    
    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="First Name"
            required
            autoFocus
            name='firstName'
            value={firstName}
            placeholder='First Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Last Name"
            required
            name='lastName'
            value={lastName}
            placeholder='Last Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='Password Confirmation'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Username"
            required
            name='username'
            value={username}
            placeholder='User Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Gender"
            required
            name='gender'
            value={gender}
            placeholder='Gender'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Date of Birth"
            required
            name='dateOfBirth'
            value={dateOfBirth}
            placeholder='Date of Birth'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Weight"
            required
            name='weight'
            value={weight}
            placeholder='Weight'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Fitness Level"
            required
            name='fitnessLevel'
            value={fitnessLevel}
            placeholder='Fitness Level'
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

export default class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        { auth => <Register { ...this.props } auth={auth} /> }
      </AuthConsumer>
    )
  }
}
