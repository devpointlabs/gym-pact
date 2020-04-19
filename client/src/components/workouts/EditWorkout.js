import React, { Component } from "react";
import { Form, FormButton } from "semantic-ui-react";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { Link } from "react-router-dom";

class EditWorkout extends Component {
  state = { title: "", desc: "" };

  componentDidMount() {
    this.setState({
      title: this.props.history.location.state.title,
      desc: this.props.history.location.state.desc,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { user, workout_id } = this.props.location.state;
    const { history } = this.props;
    e.preventDefault();
    this.props.updateWorkout(user, workout_id, this.state, history);
  };

  render() {
    const { title, desc } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>Edit Your workout name</h3>
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

        <FormButton onClick={() => this.props.history.goBack()}>
          Cancel
        </FormButton>
      </Form>
    );
  }
}
const ConnectedEditWorkout = (props) => (
  <WorkoutConsumer>
    {(value) => <EditWorkout {...props} {...value} />}
  </WorkoutConsumer>
);
export default ConnectedEditWorkout;
