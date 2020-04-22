import React, { Component } from "react";
import { Form, FormButton } from "semantic-ui-react";
import { WorkoutConsumer } from "../../providers/WorkoutProvider";
import { Link } from "react-router-dom";
import Dropzone from 'react-dropzone';

class WorkoutForm extends Component {
  state = { title: "", desc: "", image: "" };

  
  componentDidMount() {
    console.log(this.props.history.location.state.user.id);
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onDrop = (files) => {
    this.setState({ image: { ...this.state.image, file: files[0] } }); //adding file into state to store
  };

  handleSubmit = (e) => {
    const { title, desc, image } = this.state;
    const { createWorkout, history } = this.props;
    const wholeWorkout = { title: this.state.title, desc: this.state.desc, user_id: this.props.history.location.state.user.id }
    e.preventDefault();
    createWorkout(
      wholeWorkout,
      this.state.image.file,
      this.props.history.location.state.user.id,
      history
    );
  };

  render() {
    const { title, desc } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Dropzone onDrop={this.onDrop} multiple={false}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div {...getRootProps()} style={styles.dropzone}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drag Your Image Here! </p>
                  ) : (
                    <p> JPEG PDF </p>
                  )}
                </div>
              );
            }}
          </Dropzone>
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
const ConnectedWorkoutForm = (props) => (
  <WorkoutConsumer>
    {(value) => <WorkoutForm {...props} {...value} />}
  </WorkoutConsumer>
);
export default ConnectedWorkoutForm;

const styles = {
  dropzone: {
    height: "200px",
    width: "200px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
};