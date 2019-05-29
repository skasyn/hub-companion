import React from 'react';
import { connect } from "react-redux";
import Disconnect from "./Disconnect";
import Refresh from "./Refresh";
import ListActivities from "./ListActivities";
import IntraImg from "./IntraImg";
import '../../App.css';

const mapStateToProps = state => {
  return { name: state.name}
}

function CompPageLogged(state) {
  return (
    <div>
      <h1>LOGGED !</h1>
      <IntraImg/>
      <h1>Welcome, {state.name}</h1>
      <ListActivities/>
      <Disconnect/>
      <Refresh/>
    </div>
  )
}

const PageLogged = connect(mapStateToProps)(CompPageLogged);

export default PageLogged;