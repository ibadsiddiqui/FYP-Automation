import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Register extends Component {
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
            console.log(this.state)
        } else if(this.state.profession.length === 0){
            this.setState({
                profession:null
            })
        }
        else {
            this.setState({
                professionValid: false
            })
            console.log(this.state)
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

    async callLoginApi() {

        const response = await fetch('/register', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                profession: this.state.profession
            }),
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    onRegister() {
        this.callLoginApi()
            .then(res => this.setState({
                hasUserBeenRegistered: res.registration
            }))
            .catch(err => console.log(err));
        alert('Registration Successful. Now you can login.')
    }

    componentWillUnmount(){
        this.setState({
            ... null
        })
    }


    render() {
        return (

            <div className="container">
                <div className="card card-register mx-auto mt-5">
                    <div className="card-header text-center">Register an Account</div>
                    <div className="card-body">
                        <form>
                            <div className="alert alert-info text-center ">
                                <strong>Info!</strong> Your username is your CMS-ID.
                            </div>
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

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text"
                                        id="firstName"
                                        className="form-control"
                                        placeholder="Enter Your Full Name"
                                        required="required"
                                        autoFocus="autofocus"
                                        value={this.state.name}
                                        onChange={(event) => this.setName(event)} />
                                    <label htmlFor="firstName">Enter Your Full Name</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text"
                                        id="profession"
                                        className="form-control"
                                        placeholder="Enter Your Profession"
                                        required="required"
                                        autoFocus="autofocus"
                                        value={this.state.profession}
                                        onChange={(event) => this.setProfession(event)} />
                                    <label htmlFor="profession">Enter Your Profession | Student | Teacher</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">

                                    <div className="col-md-6">
                                        <div className="form-label-group">

                                            <input type="email"
                                                id="inputEmail"
                                                className="form-control"
                                                placeholder="Email address"
                                                required="required"
                                                value={this.state.email}
                                                onChange={(event) => this.setEmail(event)} />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Username - Your CMS-ID"
                                                required="required"
                                                value={this.state.username}
                                                onChange={(event) => this.setUsername(event)} />
                                            <label htmlFor="inputEmail">Username</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input type="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder="Password"
                                                required="required"
                                                value={this.state.password}
                                                onChange={(event) => this.setPassword(event)} />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input type="password"
                                                id="confirmPassword"
                                                className="form-control"
                                                placeholder="Confirm password"
                                                required="required"

                                                onChange={(event) => this.checkPassword(event)} />
                                            <label htmlFor="confirmPassword">Confirm password</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.isEmailValid === true
                                && this.state.doesUserNameExist === false
                                && this.state.username !== ''
                                && this.state.isPasswordValid === true
                                && this.state.confirmPassword === true
                                && !this.state.doesUserNameExist
                                &&

                                <Link className="btn btn-primary btn-block" to="/login"
                                    onClick={this.onRegister}
                                    data-toggle={(this.state.doesUserNameExist) ? "modal" : null}
                                    data-target={(this.state.doesUserNameExist) ? "#userExistModal" : "newUserModal"}>

                                    Register
                                </Link>

                            }

                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to="/login">Already have an account? Click here.</Link>
                        </div>
                    </div>
                </div>
    
                {

                }

                {/* Modal for existing user */}
                <div className="modal fade" id="userExistModal" tabIndex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    {
                        this.state.doesUserNameExist
                        &&
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">User Already Exist </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Please try again. A user by that username already exist.
                                    </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>

        )
    }
}
