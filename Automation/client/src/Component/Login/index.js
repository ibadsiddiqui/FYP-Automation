import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Login extends Component {
    render() {
        return (

            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="required" autoFocus="autofocus" />
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="required" />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" />
                                        Remember Password
                                    </label>
                                </div>
                            </div>
                            <a className="btn btn-primary btn-block" href="index.html">Login</a>
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
