import React from 'react';
import { connect } from "react-redux";
import { refresh } from '../actions/index';
import '../../App.css';

function mapDispatchToProps(dispatch) {
  return {
    refreshClick: code => dispatch(refresh())
  }
}

class CompRefresh extends React.Component {
  constructor() {
    super();

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.props.refreshClick()
  }

  render() {
    return (
      <h1 onClick={() => this.refresh()}>Refresh</h1>
    )
  }
}

const Refresh = connect(null, mapDispatchToProps)(CompRefresh);

export default Refresh;