import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.setUsername = this.setUsername.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.state = {
            username: '',
            password: '',
            doesUserNameExist: null
        }
    }

    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    onLogin() {
        console.log(this.state)
        // await fetch('/register', {
        //     method: "POST", // *GET, POST, PUT, DELETE, etc.
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //     },
        //     body: JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password,
        //     }),
        // })
        // .then(async res => await res.json())
        // .then(res => {
        //        this.setState({
        //             doesUserNameExist: res.response
        //         })
        //     } 
        // );

    }
    render() {
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">

                        <form>
                            {
                                this.state.doesUserNameExist === false
                                &&
                                <div class="alert alert-danger">
                                    <strong>Sorry!</strong> This username does not exist.
                                </div>
                            }
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input  type="text"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        required="required"
                                        autoFocus="autofocus"
                                        onChange={(event) => this.setUsername(event)} />
                                    <label htmlFor="inputEmail">Enter Username</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input  type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        placeholder="Password"
                                        required="required"
                                        onChange={(event) => this.setPassword(event)}/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" />
                                        {'\t'} Remember Password
                                    </label>
                                </div>
                            </div>
                            <a  className="btn btn-primary btn-block"
                                href="#"
                                onClick={this.onLogin}>Login</a>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to="/register">Register an Account</Link>
                            <a className="d-block small" data-toggle="modal" data-target="#exampleModal" href="#">Forgot Password?</a>

                            {/* Modal for forget password */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Did you forgot your password? </h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Please refer to the administration department for password issues.
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
