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
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";

const defaultImage =
  "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

class Profile extends React.Component {
  state = {
    editing: false,
    formValues: { first_name: "", email: "", file: "" },
    workouts: [],
    currentUser: this.props.auth.user,
    user_id: this.props.auth.user.id,
    users: [],
    followersIndex: this.props.auth.user.followers,
    followingIndex: this.props.auth.user.following,
    followers: [],
    following: [],
  };

  componentDidMount() {
    const {
      auth: { user },
    } = this.props;
    this.setState({
      formValues: { first_name: user.first_name, email: user.email },
      user_id: user.id,
    });
    // get workouts for this user
    axios.get(`/api/users/${this.state.user_id}/workouts`).then((res) => {
      this.setState({ workouts: res.data });
    });
    // get user to compare to followers and followings
    axios
      .get("/api/all_users")
      .then((res) => {
        this.setState({ users: res.data });
        const { followersIndex, followingIndex, users } = this.state;
        const followerArr = [];
        const followingArr = [];
        users.forEach((user) => {
          if (followingIndex.indexOf(user.id) > -1) {
            followingArr.push(user);
          }
          if (followersIndex.indexOf(user.id) > -1) {
            followerArr.push(user);
          }
        });
        this.setState({ followers: followerArr, following: followingArr });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0] } }); //adding file into state to store
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
  // Update Workout
  updateWorkout = (work_id, workout) => {
    axios
      .put(`/api/users/${this.state.user_id}/workouts/${work_id}`, { workout })
      .then((res) => {
        const { workouts } = this.state.workouts.map((w) => {
          if (w.id === work_id) {
            return res.data;
          }
          return w;
        });
        this.setState({ workouts });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete Workout
  deleteWorkout = (workout_id) => {
    axios
      .delete(`/api/users/${this.state.user_id}/workouts/${workout_id}`)
      .then((res) => {
        const { workouts } = this.state;
        this.setState({
          workouts: workouts.filter((w) => w.id !== workout_id),
        });
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

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      formValues: { first_name, email, file },
    } = this.state;
    const { user, updateUser } = this.props.auth;
    updateUser(user.id, { first_name, email, file });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
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
            {this.state.workouts.map((w, ind) => (
              <div key={ind}>
                <p>
                  <u>{w.title}</u>: {w.desc}
                </p>
                <button onClick={() => this.deleteWorkout(w.id)}>Delete</button>
                <Link
                  to={{
                    pathname: "/editWorkout",
                    state: {
                      user: this.state.user_id,
                      title: w.title,
                      desc: w.desc,
                      workout_id: w.id,
                    },
                  }}
                >
                  <button>Edit</button>
                </Link>
              </div>
            ))}
          </div>
          <div>
            <h3>Your Followers</h3>
            {this.state.followers.map((user, ind) => (
              <div key={ind}>
                <Link
                  to={{
                    pathname: "/usershow",
                    state: {
                      currentUser: this.state.currentUser,
                      user: user,
                    },
                  }}
                >
                  <p>{user.username}</p>
                </Link>
              </div>
            ))}
          </div>
          <div>
            <h3>Following</h3>
            {this.state.following.map((user, ind) => (
              <div key={ind}>
                <Link
                  to={{
                    pathname: "/usershow",
                    state: {
                      currentUser: this.state.currentUser,
                      user: user,
                    },
                  }}
                >
                  <p>{user.username}</p>
                </Link>
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
