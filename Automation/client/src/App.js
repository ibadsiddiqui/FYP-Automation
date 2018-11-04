import React, { Component } from 'react';
import { Route } from "react-router-dom";

//Component
import Login from './Component/Login'
import Register from './Component/Register'
import Main from './Component/Main'
import Dashboard from './Component/Dashboard'

class App extends Component {
  render() {
    return (
      <div>
        <Route  exact path="/" component={Login} />
        <Route  path="/register" component={Register} />
        <Route  path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
