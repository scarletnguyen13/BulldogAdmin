import React, { Component, Fragment } from "react";
import "./SignIn.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: [e.target.value]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <img
            src={require("../../assets/images/churchill.jpg")}
            alt="Churchill Logo"
          />
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <button>Login</button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
