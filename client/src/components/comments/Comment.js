import React, { Component } from 'react';
import axios from 'axios';


class Comment extends Component {
   state = {comments: {}, user: {}}

   componentDidMount(){
   //   getUser show
   }


   render(){
      const { ...comment } = this.props
      return(
         <>
         <h4>{comment.user_id}</h4>
         <p>{comment.text_field}</p>    
         </>     
      )
   }
}

export default Comment;