import React from 'react';
import { connect } from "react-redux";
import { disconnect } from '../actions/index';
import '../../App.css';

function mapDispatchToProps(dispatch) {
  return {
    disconnectClick: code => dispatch(disconnect())
  }
}

class CompDisconnect extends React.Component {
  constructor() {
    super();

    this.disconnect = this.disconnect.bind(this);
  }

  disconnect() {
    this.props.disconnectClick()
  }

  render() {
    return (
      <h1 onClick={() => this.disconnect()}>Disconnect</h1>
    )
  }
}

const Disconnect = connect(null, mapDispatchToProps)(CompDisconnect);

export default Disconnect;