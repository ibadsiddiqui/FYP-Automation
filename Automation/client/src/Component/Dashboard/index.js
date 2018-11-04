import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

// Components
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import Container from './Components/Container';
import BreadCrumbs from './Components/BreadCrumbs';
import NavBar from './Components/NavBar';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar/>

                <div id="wrapper">

                    <SideBar/>
                    <div id="content-wrapper">

                        <div className="container-fluid">
                            <BreadCrumbs />
                            <Route exact route="/" component={Container}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
