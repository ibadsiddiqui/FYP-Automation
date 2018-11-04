import React, { Component } from 'react'

export default class SideBar extends Component {
    render() {
        return (
            <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="sharingwithsupervisor.html">
                        <i className="fas fa-fw fa-envelope"></i>
                        <span>Sharing With Supervisor</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Over All Project List</span></a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Others</span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                        <h6 className="dropdown-header">Other Queries:</h6>
                        <a className="dropdown-item" href="forms.html">Forms</a>
                        <a className="dropdown-item" href="Templetes.html">Templetes</a>
                    </div>
                </li>


            </ul>

        )
    }
}
