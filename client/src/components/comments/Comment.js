import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Comment = (props) => {
   const [user, setUser] = useState({})
   const [comments, setComments] = useState()
   const { ...comment } = props;
     

   useEffect(() => {
      // componentDidMount
      axios.get(`/api/users/${props.user_id}`)
         .then(res => {
            setUser(res.data)
         })

   }, []) 

   
      return(
         <>
            <img src={user.image ? user.image : styles.defaultImage}/>
         <h4>{user.first_name}</h4>
         <p>{comment.text_field}</p>    
         <button onClick={() => props.deleteComment(comment)}>Delete</button>
         </>     
      )
}



export default Comment;

const styles = {
   defaultImage: {
      backgroundColor: 'grey',
      borderRadius: '50%',
      fontSize: '1em'
   }
}