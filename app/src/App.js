import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  testApi() {
    return fetch(`api/test`, {
      accept: "application/json"
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a href="officelink">Login</a>
          <h1 onClick={this.testApi}>Test</h1>
        </header>
      </div>
    );
  }
}

export default App;
