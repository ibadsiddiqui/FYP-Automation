import React, { Component } from 'react';
import { Route } from "react-router-dom";

//Component
import Login from './Component/Login'
import Register from './Component/Register'
import EligibilityCheckForm from './Component/EligibilityCheckForm'
import Dashboard from './Component/Dashboard'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={EligibilityCheckForm} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
