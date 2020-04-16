import React, { Component } from 'react';
import axios from 'axios';


class Comment extends Component {
   state = {comments: []}

   componentDidMount(comment, user_id, workout_id){
      axios.get(`/api/workouts/${id}/comments`, comment)
         .then( res => {
            const { comment } = this.state
            this.setState({...comments, [res.data]})
         })
         .catch( err => {
            console.log(err)
         })
   }


   render(){
      const { comments } = this.state
      return(

         <>
         
         </>
         
      )
   }
}

export default Comment;