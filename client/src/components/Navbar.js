import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { Menu, Input } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";

class Navbar extends React.Component {
  state = {
    searchResults: [],
    searchInput: "",
    searchActive: "none",
  };
  filter = (e) => {
    const { searchInput, searchResults } = this.state;
    this.setState({ searchInput: e.target.value });
    if (e.which != 8 && e.which != 16) {
      this.setState({ searchActive: "block" });
      axios
        .get("/api/all_workouts")
        .then((res) => {
          this.setState({
            searchResults: res.data.filter((w) => {
              return w.title
                .toLowerCase()
                .includes(this.state.searchInput.toLowerCase());
            }),
          });
          console.log(this.state.searchResults, this.state.searchInput);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.which == 8) {
      this.setState({ searchActive: "none" });
      this.setState({ searchResults: [] });
    }
  };
  clearSearch = () => {
    this.setState({ searchActive: "none" });
    console.log("cleared");
  };
  searchSection = () => {
    const {
      auth: { user, handleLogout },
      location,
    } = this.props;
    if (user) {
      return (
        <Menu
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Link to="/home">
            <Menu.Item
              name="Recent"
              id="feed"
              active={this.props.location.pathname === "/home"}
            />
          </Link>
          <Link to={{ pathname: "/subscriptions", user: this.props.auth.user }}>
            <Menu.Item
              name="Subscribed"
              id="subscribed"
              active={this.props.location.pathname === "/subscriptions"}
            />
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Menu.Item>
              <Input onKeyDown={this.filter} placeholder="search" />
            </Menu.Item>
          </div>
        </Menu>
      );
    } else {
      return null;
    }
  };
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
              pathname: "/workoutform",
              state: { user: user },
            }}
          >
            <Menu.Item active={location.pathname === "/workoutform"}>
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
              name="GymPact"
              id="home"
              active={this.props.location.pathname === "/home"}
            />
          </Link>
          {this.rightNavItems()}
        </Menu>
        {this.searchSection()}
        <SearchBar
          searchActive={this.state.searchActive}
          searchResults={this.state.searchResults}
          clearSearch={this.clearSearch}
        />
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
