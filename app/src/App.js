import React from 'react';
import cookie from 'react-cookie';
import logo from './wallit.png';
import Chart from 'react-apexcharts';

import './App.css';

require('dotenv').config();

const initialState = {
  logged: false,
  name: "",
  mail: "",
  id: ""
};


class RadialChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
            dataLabels: {
              name: {
                show: false,
                color: "white",
                fontSize: "1.5em",
                offsetY: 150
              },
              value: {
                show: false
              }
            }
            },
        },
        stroke: {
          lineCap: "round"
        },
        labels: [this.props.name]
      },
      series: [this.props.percentage],
    }
  }

  render() {
    return (
      <div id="chart" style={{display: "inline-block"}}>
        <h2>{this.props.name}</h2>
        <h2>{this.props.number}</h2>
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height="350" />
      </div>
    );
  }
}

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
      infos: [],
      experimentation: 0,
      acculturation: 0,
      fruition: 0,
      sharing: 0,
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
      let state = this.state;
      state.infos = data.events;
      state.acculturation = data.acculturation;
      state.experimentation = data.experimentation;
      state.fruition = data.fruition;
      state.sharing = data.sharing;
      state.plan = data.plan;
      this.setState({state: state})
    })
  }

  render() {
    if (this.state.infos.length === 0) {
      this.getInfos(this.props.id);
      return (
        <div/>
      )
    } else {
      let acc_perc = this.state.acculturation * 100 / 4;
      let exp_perc = this.state.experimentation * 100 / 3;
      let fru_perc = this.state.fruition * 100 / 2;
      let sha_perc = this.state.sharing * 100 / 2;
      if (this.state.infos.length !== 0)
      return (
        <div>
          <RadialChart percentage={acc_perc} name="Acculturation" number={this.state.acculturation + "/4"}/>
          <RadialChart percentage={exp_perc} name="Experimentation" number={this.state.experimentation + "/3"}/>
          <RadialChart percentage={fru_perc} name="Fruition" number={this.state.fruition + "/2"}/>
          <RadialChart percentage={sha_perc} name="Sharing" number={this.state.sharing + "/2"}/>
          {
            this.state.infos.map(function(elem, index) {
            return(
              <div key={index} className="list-activities">
                <div className="description">
                  {elem.description + " : " + elem.present}
                </div>
                <div className="points">
                  {elem.type + " " + elem.points}
                </div>
              </div>
            )
            })
          }
        </div>
      )
    }
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = initialState;
    this.disconnect = this.disconnect.bind(this);
    this.refresh = this.refresh.bind(this);
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
    }).then(() => {
      window.location.reload();
    });
  }

  disconnect() {
    this.setState(initialState);
    cookie.remove("id");
  }

  render() {
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
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Welcome, {this.state.name}</h1>
          <IntraImg mail={this.state.mail}></IntraImg>
          <ListActivities id={this.state.id}></ListActivities>
          <h1 onClick={this.refresh}>Refresh</h1>
          <h1 onClick={this.disconnect}>Disconnect</h1>
        </header>
        </div>
      )
    }
  }
}

export default App;
