import React, { Component } from "react";
import "./ProgressBar.css";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: this.props.progress + "%" }}
        />
      </div>
    );
  }
}

export default ProgressBar;
