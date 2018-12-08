import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      profession: '',
      professionValid: null,
      confirmPassword: null,
      hasUserBeenRegistered: false,
      doesUserNameExist: false,
      isEmailValid: null,
      isPasswordValid: null,
    };

  }

  async setProfession(event) {
    await this.setState({
      profession: event.target.value
    })
    if (this.state.profession === "student" || this.state.profession === "Student"
      || this.state.profession === "Teacher" || this.state.profession === "teacher") {
      this.setState({
        professionValid: true
      })
    } else if (this.state.profession.length === 0) {
      this.setState({
        profession: null
      })
    }
    else {
      this.setState({
        professionValid: false
      })
    }
  }

  setName(event) {
    this.setState({
      name: event.target.value
    })
  }

  setEmail(event) {

    if (/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/.test(event.target.value)) {

      this.setState({
        email: event.target.value,
        isEmailValid: true

      })
    } else {
      this.setState({
        email: event.target.value,
        isEmailValid: false
      })
    }

  }
  setPassword(event) {
    // var passwordRegex = event.target.value.replace(/^((?=(.*[A-Z]){1})(?=(.*[0-9]){1})(?=.*[a-zA-Z0-9])).{8,}$/, '');
    if (/^((?=(.*[A-Z]){1})(?=(.*[0-9]){1})(?=.*[a-zA-Z0-9])).{8,}$/.test(event.target.value)) {
      this.setState({
        password: event.target.value,
        isPasswordValid: true
      })

    } else {
      this.setState({
        password: event.target.value,
        isPasswordValid: false,
      })
    }

  }

  checkPassword(event) {
    if (this.state.password === event.target.value) {
      this.setState({
        confirmPassword: true
      })
    } else {
      this.setState({
        confirmPassword: false
      })
    }
  }


  setUsername(event) {
    this.setState({
      username: event.target.value
    });

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
      .then(res => this.setState({
        doesUserNameExist: res.response
      }))

  }


  onRegister() {
    fetch('/register', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name.toLowerCase(),
        email: this.state.email.toLowerCase(),
        username: this.state.username,
        password: this.state.password,
        profession: this.state.profession.toLowerCase()
      }),
    }).then(res => res.json())
      .then(res => this.setState({
        hasUserBeenRegistered: res.registration
      }))
      .catch(err => console.log(err));
    alert('Registration Successful. Now you can login.')
  }

  componentWillUnmount() {
    this.setState({
      ... null
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    {
                      this.state.doesUserNameExist === true
                      &&
                      <div className="alert alert-danger text-center">
                        <strong>Sorry!</strong> This username already exist.
                        </div>
                    }

                    {
                      this.state.professionValid === false

                      &&
                      <div className="alert alert-danger text-center">
                        <strong>Sorry!</strong>Profession can only be between Teacher and Student
                        </div>
                    }


                    {
                      this.state.isEmailValid === false
                      &&
                      <div className="alert alert-danger text-center">
                        <strong>Sorry!</strong> Please Enter Correct Email.
                        </div>
                    }

                    {
                      this.state.isPasswordValid === false
                      &&
                      <div className="alert alert-danger text-center">
                        <strong>Sorry!</strong> Please enter a password of 8-letters. It should have first 1 capital letter, then numbers and characters .
                        </div>
                    }
                    {
                      this.state.confirmPassword === false
                      &&
                      <div className="alert alert-danger text-center">
                        <strong>Sorry!</strong> Password does not match.
                        </div>
                    }

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                        placeholder="Enter Your Full Name"
                        required="required"
                        autoFocus="autofocus"
                        value={this.state.name}
                        onChange={(event) => this.setName(event)}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                        placeholder="Username - Your CMS-ID"
                        required="required"
                        value={this.state.username}
                        onChange={(event) => this.setUsername(event)} autoComplete="username"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                        placeholder="Enter Your Profession | Student | Teacher "
                        required="required"
                        autoFocus="autofocus"
                        value={this.state.profession}
                        onChange={(event) => this.setProfession(event)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                        placeholder="Email address"
                        required="required"
                        value={this.state.email}
                        onChange={(event) => this.setEmail(event)} autoComplete="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                        placeholder="Password"
                        required="required"
                        value={this.state.password}
                        onChange={(event) => this.setPassword(event)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                        placeholder="Confirm password"
                        required="required"
                        onChange={(event) => this.checkPassword(event)} autoComplete="new-password"
                      />
                    </InputGroup>
                    {
                      this.state.isEmailValid === true
                      && this.state.doesUserNameExist === false
                      && this.state.username !== ''
                      && this.state.isPasswordValid === true
                      && this.state.confirmPassword === true
                      && !this.state.doesUserNameExist
                      &&
                      <Link to="/login">
                        <Button color="success" block onClick={this.onRegister}>Create Account</Button>
                      </Link>
                    }
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="12">
                      <Link to="/login">
                        <Button className="btn-facebook" block><span>Already have an account? Click here.</span></Button>
                      </Link>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
