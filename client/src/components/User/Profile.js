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
import { Redirect } from "react-router-dom";
import "./UserStyle.css";
import { Card, Icon } from "semantic-ui-react";
import Ropes from "../../imgs/ropes.jpg";
const ProfileCard = () => {};
const defaultImage =
  "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

class Profile extends React.Component {
  state = {
    editing: false,
    formValues: { first_name: "", email: "", file: "" },
    workouts: [],
    currentUser: "",
    user_id: "",
    users: [],
    followersIndex: "",
    followingIndex: "",
    followers: [],
    following: [],
  };

  componentDidMount() {
    const { auth } = this.props;
    if (!this.props.auth.user) return <Redirect to="/" />;
    const {
      auth: { user },
    } = this.props;

    this.setState({
      formValues: { first_name: user.first_name, email: user.email },
      user_id: user.id,
    });
    // get workouts for this user
    console.log(`/api/users/${this.state.user_id}/workouts`);

    this.setState({
      currentUser: auth.user,
      user_id: auth.user.id,
      followersIndex: auth.user.followers,
      followingIndex: auth.user.following,
    });

    axios.get(`/api/users/${this.props.auth.user.id}/workouts`).then((res) => {
      console.log(res.data);
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

  showImage = () => {
    const {
      auth: { user },
    } = this.props;
    if (!user) return null;
    if (user.image) return user.image;
    return defaultImage;
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

  userWorkouts = () => {
    if (this.state.workouts.length === 0) {
      return <div>No Workouts</div>;
    } else {
      return (
        <Card.Group itemsPerRow={2}>
          {/* <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-around",
          }}
        > */}
          {this.state.workouts.map((w, ind) => (
            <Card key={ind}>
              <Image src={w.image || Ropes} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  <div style={styles.workoutRow}>{w.title}</div>
                </Card.Header>
                <Card.Description>{w.desc}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={() => this.deleteWorkout(w.id)}
                    style={{ backgroundColor: "#6CD3E0" }}
                  >
                    Delete
                  </Button>

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
                    <Button style={{ backgroundColor: "#FBD877" }}>Edit</Button>
                  </Link>
                </div>
              </Card.Content>
            </Card>
          ))}
          {/* </div> */}
        </Card.Group>
      );
    }
  };

  following = () => {
    const { following } = this.state;
    if (following.length === 0) {
      return <div>You are not following anyone!</div>;
    } else {
      return (
        <div>
          {following.map((user, ind) => (
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
                <div style={styles.userImage}>
                  <Image
                    src={user.image || defaultImage}
                    size="mini"
                    circular
                  />
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
  };

  followers = () => {
    const { followers } = this.state;
    if (followers.length !== 0) {
      return (
        <div>
          {followers.map((user, ind) => (
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
                <div style={styles.userImage}>
                  <Image
                    src={user.image || defaultImage}
                    size="mini"
                    circular
                  />
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No Followers</div>;
    }
  };

  // Profile View
  profileView = () => {
    const {
      auth: { user },
    } = this.props;
    return (
      <>
        <Grid.Row
          columns={2}
          // style={{ border: "solid 1em #353765", borderRadius: "4px" }}
        >
          {/* <div style={{ border: "solid 2em #353765" }}> */}
          <Grid.Column width={4}>
            <Image
              src={this.showImage()}
              circular
              size="tiny"
              style={{ height: "20em", width: "20em" }}
            />
          </Grid.Column>
          <Grid.Column width={4} verticalAlign="middle">
            <Header as="h1">
              {user.first_name} {user.last_name}
            </Header>
          </Grid.Column>
          {/* </div> */}
        </Grid.Row>
        <Grid.Column style={{ height: "100%", width: "30%" }}>
          <h3>Information</h3>
          <Grid.Row>

            <Card style={{ border: "solid 2px #353765", borderRadius: "4px" }}>
              <Card.Content>
                <Card.Description>
                  Name: {user.first_name} {user.last_name}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                Username: {user.username}
               
                <div
                  style={{
                    color: "black",
                    display: "flex",
                    flexWrap: "wrap",
                    // width: "100%",
                    justifyContent: "space-around",
                  }}
                ></div>


                Fitness Level: {user.fitness_level}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // width: "100%",
                    justifyContent: "space-around",
                  }}
                ></div>
                Gender: {user.gender}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // width: "100%",
                    justifyContent: "space-around",
                  }}
                ></div>
                DateofBirth: {user.date_of_birth}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // width: "100%",
                    justifyContent: "space-around",
                  }}
                ></div>
              </Card.Content>
            </Card>
            <Card style={{ border: "solid 2px #353765", borderRadius: "4px" }}>
              <Card.Content>
                <Card.Header>Followers</Card.Header>
                <Card.Description>{this.followers()}</Card.Description>
              </Card.Content>
            </Card>
            <Card style={{ border: "solid 2px #353765", borderRadius: "4px" }}>
              <Card.Content>
                <Card.Header>Following</Card.Header>
                <Card.Description>{this.following()}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a></a>
              </Card.Content>
            </Card>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={8}>
          <h3>Your Workouts</h3>

          {this.userWorkouts()}
          {/* <Grid.Row>col two</Grid.Row> */}
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
    if (!this.props.auth.user) return <Redirect to="/" />;
    const { editing } = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row textAlign="right">
            <Button onClick={this.toggleEdit}>
              {editing ? "Cancel" : "Edit"}
            </Button>
          </Grid.Row>
          {editing ? this.editView() : this.profileView()}
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
  userImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  workoutRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: ".5em 0em",
  },

};
// export default Profile;
