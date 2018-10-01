import React, { Component } from 'react';
import './App.css';
import fetch from "isomorphic-fetch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      authenticated: false
    };
    this.setID = this.setID.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setID(event) {
    this.setState({
      id: event.target.value
    })
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    })
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state.id)
    console.log(this.state.password)


    fetch('http://localhost:4000/login', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        id: this.state.id,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',

      }
    }).then(response => { return response.json() })
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));


  }

  render() {
    return (
      <div className="App">
        <form method='POST' onSubmit={this.onSubmit}>
          <input type="text" onChange={this.setID} />
          <input type="" name="" id="" onChange={this.setPassword} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
