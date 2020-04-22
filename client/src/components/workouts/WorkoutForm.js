import React, { Component } from "react";
import { Form, FormButton } from "semantic-ui-react";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { Link } from "react-router-dom";
import { 
  SubmitButton,
  Background,
  Inputs, 
  } from '../../components/styles/SharedStyles';

class WorkoutForm extends Component {
  state = { title: "", desc: "" };

  
  componentDidMount() {
    console.log(this.props.history.location.state.user.id);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    const { title, desc } = this.state;
    const { createWorkout, history } = this.props;
    const wholeWorkout = { title: this.state.title, desc: this.state.desc, user_id: this.props.history.location.state.user.id }
    e.preventDefault();
    createWorkout(
      wholeWorkout,
      this.props.history.location.state.user.id,
      history
    );
  };
  render() {
    const { title, desc } = this.state;
    return (
      <Background>
        <Inputs>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Workout Title"
            required
            name="title"
            value={title}
            onChange={this.handleChange}
            />
          <Form.Input
            label="Workout Description"
            required
            name="desc"
            value={desc}
            onChange={this.handleChange}
            />
          <SubmitButton>Submit</SubmitButton>
          <Link to="/">
            <SubmitButton>Cancel</SubmitButton>
          </Link>
        </Form>
        </Inputs>
      </Background>
    );
  }
}
const ConnectedWorkoutForm = (props) => (
  <WorkoutConsumer>
    {(value) => <WorkoutForm {...props} {...value} />}
  </WorkoutConsumer>
);
export default ConnectedWorkoutForm;