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
            hasUserBeenRegistered: false,
            doesUserNameExist: false
        };

    }


    setName(event) {
        this.setState({
            name: event.target.value
        })
    }
    setEmail(event) {
        this.setState({
            email: event.target.value
        })

    }
    setPassword(event) {
        this.setState({
            password: event.target.value
        })

    }

    checkPassword(event) {
        if (this.state.password === event.target.value) {
            return true
        } else {
            return false
        }
    }


    async setUsername(event) {
        await this.setState({
            username: event.target.value
        });

        await fetch('/getusername', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
            }),
        })
            .then(async res => await res.json())
            .then(res => this.setState({
                doesUserNameExist: res.response
            }));

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
            }),
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    onRegister() {
        if (this.state.doesUserNameExist) {
            return;
        } else {
            this.callLoginApi()
                .then(res => this.setState({
                    hasUserBeenRegistered: res.registration
                }))
                .catch(err => console.log(err));
        }

    }


    render() {
        return (

            <div className="container">
                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">Register an Account</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text"
                                        id="firstName"
                                        className="form-control"
                                        placeholder="Enter Your Full Name"
                                        required="required"
                                        autoFocus="autofocus"
                                        onChange={(event) => this.setName(event)} />
                                    <label htmlFor="firstName">Enter Your Full Name</label>
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
                                                onChange={(event) => this.setEmail(event)} />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                required="required"
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
                                this.state.email !== "" && this.state.name !== ""
                                && this.state.username && this.state.password !== ""
                                &&


                                <Link className="btn btn-primary btn-block"
                                    to="/"
                                    onClick={this.onRegister}
                                    data-toggle={(this.state.doesUserNameExist) ? "modal" : null}
                                    data-target={(this.state.doesUserNameExist) ? "#exampleModal" : null}>

                                    Register
                                    </Link>

                            }

                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to="/">Already have an account? Click here.</Link>
                        </div>
                    </div>
                </div>

                {

                }

                {/* Modal for existing user */}
                <div className="modal fade" id="exampleModal" tabIndex="1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    {
                        !this.state.doesUserNameExist
                        &&
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Welcome New User</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    You have been successfully registered.
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
