import React from 'react';
import { Layout, Menu, Icon, Col, Avatar, Row } from 'antd/lib/index';
import { connect } from 'react-redux';
import { login, loginCookie } from '../actions/index';
import '../../App.css';
import cookie from 'react-cookie';
import { LoadingButton } from './WallitAssets';

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
      <div class="not-logged">
        <h1>Hub Companion</h1>
        <div>
          <Row>
            <Col span={4}>
              <Icon type="idcard" style={{fontSize: '1.7em'}}/>
            </Col>
            <Col span={20}>
              <LoadingButton url={process.env.REACT_APP_OFFICELINK} messageone="Login" messagetwo="Loading.."/>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const PageNotLogged = connect(null, mapDispatchToProps)(CompPageNotLogged);

export default PageNotLogged;