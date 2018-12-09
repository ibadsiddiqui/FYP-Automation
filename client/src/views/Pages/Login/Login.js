import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor(props) {

    super(props);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      username: '',
      password: '',
      doesUserNameExist: null,
      auth: null,
      token: '',
      blocked: false,
    }
  }

  setUsername(event) {
    this.setState({
      username: event.target.value
    })
    fetch('/getusername', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        username: event.target.value,
      }),
    })
      .then(async res => await res.json())
      .then(res => {
        this.setState({
          doesUserNameExist: res.response
        })
      }
      );
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    });
    fetch('/login', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: event.target.value,
      }),
    })
      .then(async res => await res.json())
      .then(res => {
        this.setState({
          auth: res.auth,
          token: res.token,
          doesUserNameExist: true,
          blocked: res.blocked
        })
      });
  }

  onLogin() {
    localStorage.setItem('token', this.state.token)
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">  
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {
                        this.state.doesUserNameExist === false
                        &&
                        <div className="alert alert-danger">
                          <strong>Sorry!</strong> This username does not exist.
                                </div>
                      }
                      {
                        this.state.blocked === true
                        &&
                        <div className="alert alert-danger">
                          <strong>Sorry!</strong> This username is blocked.
                                </div>
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={(event) => this.setUsername(event)} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={(event) => this.setPassword(event)} />
                      </InputGroup>
                      <Row>
                        {
                          this.state.doesUserNameExist === true
                          && this.state.auth === true
                          && this.state.blocked === false
                          &&
                          <Col xs="6">
                            <Link to="/">
                              <Button color="primary" className="px-4" onClick={this.onLogin}>Login</Button>
                            </Link>
                          </Col>
                        }
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>

                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>If you are a new user, please register first. Then you can login into the application</p>
                      <Link to="register">
                        <Button color="primary" className="mt-3" active>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
