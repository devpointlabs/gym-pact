import React, { Component } from "react";
import { Form, FormButton } from "semantic-ui-react";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";

class WorkoutForm extends Component {
  state = { title: "", desc: "" };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { title, desc } = this.state;
    const { createWorkout, history } = this.props;
    e.preventDefault();
    createWorkout(title, desc, history);
  };

  render() {
    const { title, desc } = this.state;
    return (
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
        <FormButton>Submit</FormButton>
      </Form>
    );
  }
}
const ConnectedWorkoutForm = (props) => (
  <WorkoutConsumer>
    {(value) => <WorkoutForm {...props} {...value} />}
  </WorkoutConsumer>
);
export default ConnectedWorkoutForm;
