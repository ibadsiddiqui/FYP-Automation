import React, { Component } from 'react'

export default class BreadCrumbs extends Component {
    render() {
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a style={{ "font-size": 18 + "px" }} href="#">Actions</a>
                </li>
                <li className="breadcrumb-item active" style={{ "font-size": 18 + "px" }}>Overview for Students</li>
            </ol>
        )
    }
}
