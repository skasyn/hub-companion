import React from 'react';
import { connect } from "react-redux";
import '../../App.css';
import SiderDemo from './NewApp'

const mapStateToProps = state => {
  return { name: state.name}
}

function CompPageLogged(state) {
  return (
    <SiderDemo state={state}/>
  )
}

const PageLogged = connect(mapStateToProps)(CompPageLogged);

export default PageLogged;