import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import WorkoutCard from "./workouts/WorkoutCard";
import axios from "axios";
import Modal from "./workouts/Modal";

class SearchBar extends Component {
  state = {
    toggleModal: false,
    workout: {},
  };

  unToggle = () => {
    console.log("untoggle");
    this.setState({ toggleModal: false });
  };

  toggle = (id) => {
    axios
      .get(`/api/get_workout/${id}`)
      .then((res) => {
        console.log("toggle");
        console.log(res.data);
        this.setState({ workout: res.data });
      })
      .then(() => {
        this.setState({ toggleModal: true });
      })
      .catch(console.log("Didn't work"));
  };
  render() {
    return (
      <div
        style={{
          display: this.props.searchActive,
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "#ddd",
            height: "39vh",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              position: "fixed",
              padding: "0.5rem 2rem",
              justifyContent: "space-between",
            }}
          >
            <p>SearchResults</p>
            <p style={{ cursor: "pointer" }} onClick={this.props.clearSearch}>
              close
            </p>
          </div>
          <Container
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div>
              {this.state.toggleModal === true ? (
                <Modal
                  clearSearch={this.props.clearSearch}
                  workout={this.state.workout}
                  user={this.props.user}
                  unToggle={this.unToggle}
                />
              ) : (
                <div>
                  {this.props.searchResults.map((workout) => (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      toggle={this.toggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default SearchBar;
