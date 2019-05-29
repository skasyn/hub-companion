import React from 'react';
import './App.css';
import { connect } from "react-redux";
import PageLogged from "./js/component/PageLogged";
import PageNotLogged from "./js/component/PageNotLogged"

const mapStateToProps = state => {
  return { logged: state.is_connected}
}

function CompApp(state) {
  return (
    <div className="App">
    {state.logged ? (
      <PageLogged/>
    ) : (
      <PageNotLogged/>
    )}
    </div>
  );
}

const App = connect(mapStateToProps)(CompApp);

export default App;
