import React, { Component } from 'react';
import { Form, FormButton } from 'semantic-ui-react';
import axios from 'axios';
import { useState } from 'react';


const CommentForm = (props) => {
   const [commentValue, setComment] = useState('')
   

   const handleCommentChange = (e) => {
      setComment(e.target.value)
   }
      
   const handleSubmit = (e) => {
      e.preventDefault()
         axios.post(`/api/workouts/${props.workout_id}/comments`, { comment: {text_field: commentValue, workout_id: props.workout_id } })
         .then( res => {
            props.addComment(res.data)
         })
         .catch( err => {
            console.log(err)
         })
      }

      return(
         <>
         <Form onSubmit={handleSubmit}>
            <Form.Input
               label="Leave a comment..."
               name='comment'
               value={commentValue}
               onChange={handleCommentChange}
            />
            <Form.Button>Submit</Form.Button>
         </Form>
         </>
      )
}


export default CommentForm;