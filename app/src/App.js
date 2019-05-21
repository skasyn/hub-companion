import React from 'react';
import cookie from 'react-cookie';
import logo from './wallit.png';

import './App.css';

require('dotenv').config();

const initialState = {
  logged: false,
  name: "",
  mail: "",
  id: ""
};

class IntraImg extends React.Component {
  render() {
    let name = this.props.mail.match(/^[^@]*/);
    return (
      <img src={process.env.REACT_APP_URLAUTO + "file/userprofil/profilview/" + name + ".jpg"} alt={name}></img>
    )
  }
}

class ListActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: []
    }
  }

  getInfos(id) {
    fetch(`api/infos`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": id
      })
    }).then(function(response) {
      return response.json();
    }).then((data) => {
      this.setState({
        infos: data,
      })
    })
  }

  render() {
    if (this.state.infos.length === 0)
      this.getInfos(this.props.id);
    return (
      <ul>
        {
          this.state.infos.map(function(elem, index) {
            return(<li>{elem.description + " : " + elem.present}</li>)
          })
        }
      </ul>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = initialState;
    this.disconnect = this.disconnect.bind(this);
  }

  login(code) {
    fetch(`api/login`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "code": code
      })
    }).then(function(response) {
      return response.json();
    }).then((data) => {
      if (!data.error) {
        this.setState({
          logged: true,
          name: data.name,
          mail: data.mail,
          id: data.id
        });
        let date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
        document.cookie = "id = " + data.id + "; expires = " + date.toString();
        window.history.pushState({}, document.title, "/");
      }
    }).catch(function(error) {
      console.log("Error during login");
    })
  }

  loginCookie(id) {
    fetch(`api/logincookie`, {
      accept: "application/json",
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "id": id
      })
    }).then(function(response) {
      return response.json();
    }).then((data) => {
      this.setState({
        logged: true,
        name: data.name,
        mail: data.mail,
        id: data.id
      });
  })
  }

  refresh() {
    fetch(`api/refresh`, {
      accept: "application/json",
      method: "post"
    });
  }

  disconnect() {
    this.setState(initialState);
    cookie.remove("id");
  }

  render() {
    console.log(process.env)
    if (!this.state.logged) {
      if (cookie.load("id") !== undefined && cookie.load("id") !== "")
        this.loginCookie(cookie.load("id"));
      var query = new URLSearchParams(window.location.search);
      if (query.get('code'))
        this.login(query.get('code'));
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a href={process.env.REACT_APP_OFFICELINK}>Login</a>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome, {this.state.name}</h1>
          <IntraImg mail={this.state.mail}></IntraImg>
          <h1 onClick={this.refresh}>Refresh</h1>
          <h1 onClick={this.disconnect}>Disconnect</h1>
          <ListActivities id={this.state.id}></ListActivities>
        </header>
        </div>
      )
    }
  }
}

export default App;
