import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  rightNavItems = () => {
    const {
      auth: { user, handleLogout },
      location,
    } = this.props;

    if (user) {
      return (
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            onClick={() => handleLogout(this.props.history)}
          />
          <Link
            to={{
              pathname: "/workoutForm",
              state: { user: user },
            }}
          >
            <Menu.Item active={location.pathname === "/workoutForm"}>
              + New Workout
            </Menu.Item>
          </Link>
          <Link to="/profile">
            <Menu.Item
              name="profile"
              active={location.pathname === "/profile"}
            />
          </Link>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Link to="/login">
            <Menu.Item
              id="login"
              name="login"
              active={location.pathname === "/login"}
            />
          </Link>
          <Link to="/register">
            <Menu.Item
              id="register"
              name="register"
              active={location.pathname === "/register"}
            />
          </Link>
        </Menu.Menu>
      );
    }
  };

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item
              name="Feed"
              id="home"
              active={this.props.location.pathname === "/"}
            />
          </Link>
          {this.rightNavItems()}
        </Menu>
        <Menu>
          <Link to="/">
            <Menu.Item
              name="Recent"
              id="feed"
              active={this.props.location.pathname === "/"}
            />
          </Link>
          <Link to={{ pathname: "/subscriptions", user: this.props.auth.user }}>
            <Menu.Item
              name="Subscribed"
              id="subscribed"
              active={this.props.location.pathname === "/subscriptions"}
            />
          </Link>
        </Menu>
      </div>
    );
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {(auth) => <Navbar {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedNavbar);
