import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider";
import {
  Form,
  Grid,
  Image,
  Container,
  Divider,
  Header,
  Button,
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import axios from "axios";

const defaultImage =
  "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

class Profile extends React.Component {
  state = {
    editing: false,
    formValues: { first_name: "", email: "", file: "" },
    workouts: [],
    user_id: this.props.auth.user.id,
  };

  componentDidMount() {
    const {
      auth: { user },
    } = this.props;
    this.setState({
      formValues: { first_name: user.first_name, email: user.email },
    });
    axios.get(`/api/users/${this.state.user_id}/workouts`).then((res) => {
      console.log(res.data);
      this.setState({ workouts: res.data });
    });
  }

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0] } });
  };

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      },
    });
  };
  deleteWorkout = (workout_id) => {
    axios
      .delete(`/api/users/${this.state.user_id}/workouts/${workout_id}`)
      .then((res) => {
        const { workouts } = this.state;
        this.setState({
          workouts: workouts.filter((w) => w.id !== workout_id),
        });
        console.log(this.state.workouts);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  profileView = () => {
    const {
      auth: { user },
    } = this.props;
    return (
      <>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{user.first_name}</Header>
          <Header as="h1">{user.email}</Header>
        </Grid.Column>
      </>
    );
  };

  editView = () => {
    // const { auth: { first_name }, } = this.props;
    const {
      formValues: { first_name, email, file },
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
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
        </Grid.Column>
        <Grid.Column width={8}>
          <Form.Input
            label="first_name"
            name="first_name"
            value={first_name}
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />
          <Button>Update</Button>
        </Grid.Column>
      </Form>
    );
  };

  render() {
    const { editing } = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            {editing ? this.editView() : this.profileView()}
            <Grid.Column>
              <Button onClick={this.toggleEdit}>
                {editing ? "Cancel" : "Edit"}
              </Button>
            </Grid.Column>
          </Grid.Row>
          <div>
            <h3>Your Workouts</h3>
            {this.state.workouts.map((w) => (
              <div>
                <p>
                  <u>{w.title}</u>: {w.desc} {w.id}
                </p>
                <button onClick={() => this.deleteWorkout(w.id)}>Delete</button>
              </div>
            ))}
          </div>
        </Grid>
      </Container>
    );
  }
}

export default class ConnectedProfile extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <Profile {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

// export default ConnectedProfile;

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

// export default Profile;
