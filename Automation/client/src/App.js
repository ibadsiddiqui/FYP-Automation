import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from './Component/Login'
import Register from './Component/Register'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
