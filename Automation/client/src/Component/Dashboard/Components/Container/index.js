import React, { Component } from 'react'

export default class Container extends Component {
    render() {
        return (


            <div className="row" style={{ "height": 200 + "px", "padding-top": 10 + "px" }}>
                <div className="col-xl-3 col-sm-6 mb-6">
                    <div className="card text-white bg-primary o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-fw fa-comments"></i>
                            </div>
                            <div className="mr-5" style={{ "font-size": 22 + "px" }}>Meeting Schedule and Comments! </div>
                        </div>
                        <a className="card-footer text-white clearfix small z-1" href=" MeetingMinutesStudent.html">
                            <span className="float-left" style={{ "font-size": 18 + "px" }}>View Details</span>
                            <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-6">
                    <div className="card text-white bg-warning o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-fw fa-list"></i>
                            </div>
                            <div className="mr-5" style={{ "font-size": 22 + "px" }}>List Of Approved Projects</div>
                        </div>
                        <a className="card-footer text-white clearfix small z-1" href="ListOfApprovedProjects.html">
                            <span className="float-left" style={{ "font-size": 18 + "px" }}>View Details</span>
                            <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                            </span>
                        </a>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-6">
                    <div className="card text-white bg-success o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-fw fa-search"></i>
                            </div>
                            <div className="mr-5" style={{ "font-size": 22 + "px" }}>Proposed Titles From University</div>
                        </div>
                        <a className="card-footer text-white clearfix small z-1" href="TitlesForProject.html">
                            <span className="float-left" style={{ "font-size": 18 + "px" }}>View Details</span>
                            <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-6">
                    <div className="card text-white bg-danger o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                            </div>
                            <div className="mr-5" style={{ "font-size": 22 + "px" }}> Groups's Progress for Project</div>
                        </div>
                        <a className="card-footer text-white clearfix small z-1" href="ProgressOfStudent.html">
                            <span className="float-left" style={{ "font-size": 18 + "px" }}>View Details</span>
                            <span className="float-right">
                                <i className="fas fa-angle-right"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
