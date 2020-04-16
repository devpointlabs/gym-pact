import React, { Component } from 'react';
import { Form, FormButton } from 'semantic-ui-react';
import Axios from 'axios';



class CommentForm extends Component{
state = {comment: ''}

      

      handleChange = (e) => {
         const { name, value } = e.target;
         this.setState({ [name]: value });
      }
      
      handleSubmit = (e) => {
         e.preventDefault()

         const {comment} = this.state

      }

   render(){
      return(
         <Form onSubmit={this.handleSubmit}>
            <Form.Input
               label="Leave a comment..."
               name="comment"
               value='comment'
               onChange={this.handleChange}
            />

         </Form>
      )
   }
}


export default CommentForm;