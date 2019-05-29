import React from 'react';
import { connect } from 'react-redux';
import { login, loginCookie } from '../actions/index';
import '../../App.css';
import cookie from 'react-cookie';

require('dotenv').config()

function mapDispatchToProps(dispatch) {
  return {
    loginOffice: code => dispatch(login(code)),
    loginCookie: id => dispatch(loginCookie(id))
  }
}

class CompPageNotLogged extends React.Component {
  render() {
    let coookieId = cookie.load("id");
    if (coookieId !== undefined && coookieId !== "")
      this.props.loginCookie(coookieId);

    let query = new URLSearchParams(window.location.search);
    if (query.get('code'))
      this.props.loginOffice(query.get('code'));

    return (
      <div>
        <h1>Not Logged !</h1>
        <a href={process.env.REACT_APP_OFFICELINK}>Login</a>
      </div>
    )
  }
}

const PageNotLogged = connect(null, mapDispatchToProps)(CompPageNotLogged);

export default PageNotLogged;