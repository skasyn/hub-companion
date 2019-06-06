import React from 'react';
import { connect } from "react-redux";
import { Avatar } from 'antd/lib/index';
import '../../App.css';

const mapStateToProps = state => {
  return {
    mail: state.mail
  }
}

class CompIntraImg extends React.Component {
  render() {
    let name = this.props.mail.match(/^[^@]*/);

    return (
      <Avatar src={process.env.REACT_APP_URLAUTO + "file/userprofil/profilview/" + name + ".jpg"} alt="user" shape="square"/>
    )
  }
}

const IntraImg = connect(mapStateToProps)(CompIntraImg);

export default IntraImg;
