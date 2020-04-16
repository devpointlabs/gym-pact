import React, { Component } from 'react';
import { Form, FormButton } from 'semantic-ui-react';
import axios from 'axios';



class CommentForm extends Component{
state = {comment: ''}

      

      handleChange = (e) => {
         const { name, value } = e.target;
         this.setState({ [name]: value });
      }
      
      handleSubmit = (e) => {
         e.preventDefault()
         axios.post(`/api/workouts/${this.props.workout_id}/comments`, {...this.state })
         .then( res => {
            this.props.add(res.data)
         })
         this.setState({comment: ''})
      }

   render(){
      const { comment } = this.state
      return(
         <Form onSubmit={this.handleSubmit}>
            <Form.Input
               label="Leave a comment..."
               name='comment'
               value={comment}
               onChange={this.handleChange}
            />
            <Form.Button>Submit</Form.Button>
         </Form>
      )
   }
}


export default CommentForm;