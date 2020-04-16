import React, { Component } from 'react';
import { Form, FormButton } from 'semantic-ui-react';
import axios from 'axios';
import { useState } from 'react';


const CommentForm = (props) => {
   const [comment, setComment] = useState('')
   

   const handleCommentChange = (e) => {
      setComment(e.target.value)
   }
      
   const handleSubmit = (e) => {
         e.preventDefault()
         axios.post(`/api/workouts/${props.workout_id}/comments`, { comment })
         .then( res => {
            props.add(res.data)
         })
      }

      return(
         <>
         <Form onSubmit={handleSubmit}>
            <Form.Input
               label="Leave a comment..."
               name='comment'
               value={comment}
               onChange={handleCommentChange}
            />
            <Form.Button>Submit</Form.Button>
         </Form>
         </>
      )
}


export default CommentForm;