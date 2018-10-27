import React, { Component } from 'react';

import Login from './Component/Login'

import './App.css';

class App extends Component {
  state = {
    response: ''
  };


  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Login/>
    );
  }
}

export default App;
