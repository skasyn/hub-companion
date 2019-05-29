import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(login(user))
  }
}

class CompTest extends React.Component {
  constructor() {
    super();

    this.login = this.login.bind(this);
  }

  login(event) {
    this.props.login("meme big boy");
  }

  render() {
    return (
      <h1 onClick={this.login}>Click on me !</h1>
    )
  }
}

const Test = connect(null, mapDispatchToProps)(CompTest)

export default Test;