import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import {
  Button,
  Form,
  Segment,
  Header,
  Select,
  Input,
  Icon,
} from "semantic-ui-react";
import DatePicker from "./DatePicker";
// import Axios from 'axios';
const genders = [
  { key: 1, text: "Male", value: "male" },
  { key: 2, text: "Female", value: "female" },
  { key: 3, text: "Other", value: "other" },
];
const fitnessLevels = [
  { key: 1, text: "Beginner", value: "beginner" },
  { key: 2, text: "Intermediate", value: "intermediate" },
  { key: 3, text: "Advanced", value: "advanced" },
  { key: 4, text: "Professional", value: "professional" },
];

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    date_of_birth: "",
    weight: "",
    fitness_level: "",
  };

  // Pull in all the users - user index

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      password,
      passwordConfirmation,
      first_name,
      last_name,
      username,
      gender,
      date_of_birth,
      weight,
      fitness_level,
    } = this.state;
    const {
      auth: { handleRegister },
      history,
    } = this.props;
    // [users]

    // user.forEach(user => {
    // if (this.state.username !== user.username)
    // continue as normal
    // else alert('username already taken')
    // })
    // checkUserName()
    if (password === passwordConfirmation)
      handleRegister(
        {
          email,
          password,
          first_name,
          last_name,
          username,
          gender,
          date_of_birth,
          weight,
          fitness_level,
        },
        history
      );
    else alert("Passwords Do Not Match!");
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleDateChange = (e) => {
    const { name, value } = e.target;
    this.setState({ date: value });
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
      first_name,
      last_name,
      username,
      gender,
      date_of_birth,
      weight,
      fitness_level,
    } = this.state;

    return (
      <Segment basic>
        <Header as="h1" textAlign="center">
          Register
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="First Name"
            required
            autoFocus
            name="first_name"
            value={first_name}
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Last Name"
            required
            name="last_name"
            value={last_name}
            placeholder="Last Name"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Username"
            required
            name="username"
            value={username}
            placeholder="User Name"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            required
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            required
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Password Confirmation"
            type="password"
            onChange={this.handleChange}
          />
          <Form.Input
            value={gender}
            label="Gender"
            required
            name="gender"
            placeholder="Gender"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Weight"
            required
            name="weight"
            value={weight}
            placeholder="Weight"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Date of Birth"
            required
            name="date_of_birth"
            value={date_of_birth}
            placeholder="Date of Birth"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Fitness Level"
            required
            name="fitness_level"
            value={fitness_level}
            placeholder="Fitness Level"
            onChange={this.handleChange}
          />
          <Segment textAlign="center" basic>
            <Button primary type="submit">
              Submit
            </Button>
          </Segment>
        </Form>
      </Segment>
    );
  }
}

class ConnectedRegister extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedRegister;
