import React, { Component } from 'react';
import { Image, Comment, Button, Form, Header } from 'semantic-ui-react';
import ropesImg from '../../imgs/ropes.jpg';
import gymProfPic from '../../imgs/ropes.jpg';



class WorkoutShow extends Component {

  render(){
    return(
      <>
      <h1>Workout Title</h1>
        <Image src={ropesImg}></Image>
      <p>
        Workout Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet sodales orci non malesuada. Vivamus pharetra turpis nec nibh porta commodo. Praesent et luctus est. Etiam eleifend quis lorem vel.
      </p>

      <Comment.Group>
        <Header>
          Comments
        </Header>
        <Comment>
      <Comment.Avatar src={gymProfPic} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>Super hard workout Bruh!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>

      </Comment.Group>
      </>
    )
  }
}

export default WorkoutShow;