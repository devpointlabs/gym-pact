import React, { Component } from 'react';
import { Form, FormButton } from 'semantic-ui-react';

class WorkoutForm extends Component {
  state = {title: '', desc: ''}

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState = ({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

  }

  render(){
    const {title, desc} = this.state
    return(
      <Form>
        <Form.Input 
        label='Workout Title'
        required

        name='title'
        value={title}
        onChange={this.handleChange}
        />
        <Form.Input 
        label='Workout Description'
        required

        name='desc'
        value={desc}
        onChange={this.handleChange}
        />
        <Form.Button>
          Submit
        </Form.Button>
      </Form>
    )
  }
}

export default WorkoutForm;