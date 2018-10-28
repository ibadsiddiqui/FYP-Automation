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
    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    async callLoginApi() {
        const data = this.state;
        const response = await fetch('/register', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data),
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    onRegister() {
        // this.callApi()
        //     .then(res => this.setState({ response: res.express }))
        //     .catch(err => console.log(err));
        console.log(this.state)
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
                            <Link className="btn btn-primary btn-block" to="/" onClick={this.onRegister}>Register</Link>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to="/">Already have an account? Click here.</Link>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
