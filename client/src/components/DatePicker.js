import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput,
} from "semantic-ui-calendar-react";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Form>
        <DateInput
          name="date"
          placeholder="Date of Birth"
          value={this.state.date}
          iconPosition="left"
          onChange={this.handleChange}
        />
      </Form>
    );
  }
}

export default DatePicker;
