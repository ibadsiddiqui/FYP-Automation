import React, { Component, } from 'react'
import { Link } from 'react-router-dom'
export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header text-center">Welcome to FYP Automation Project</div>
                    <div className="card-body">

                        <Link className="btn btn-primary btn-block" to="/"> Fill eligibility form </Link>
                        <p className="text-center mt-2 mb-2">------------------------------ or ------------------------------</p>
                        <Link className="btn btn-primary btn-block" to="/"> Check status of eligibity form </Link>

                        <div className="text-center">
                            <Link className="d-block small mt-3" to="/login">Already filled the form? Click here.</Link>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}


const styles = {
    hr: {
        "border-top": "1px solid #8c8b8b",
    },
    rowView: {
        "flex-direction": "row"
    }
}