import React from 'react';
import { connect } from "react-redux";
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
      <img src={process.env.REACT_APP_URLAUTO + "file/userprofil/profilview/" + name + ".jpg"} alt={name}></img>
    )
  }
}

const IntraImg = connect(mapStateToProps)(CompIntraImg);

export default IntraImg;
