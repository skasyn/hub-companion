import React from 'react';
import { connect } from "react-redux";
import '../../App.css';
import UserPage from './UserPage'
import AdminPage from './AdminPage';

const mapStateToProps = state => {
  return {
    name: state.name,
    privilege: state.privilege,
  }
}

function CompPageLogged(state) {
  if (state.privilege === 0) {
    return (
      <UserPage state={state}/>
    )
  } else if (state.privilege === 1) {
    return (
      <AdminPage state={state}/>
    )
  }
}

const PageLogged = connect(mapStateToProps)(CompPageLogged);

export default PageLogged;