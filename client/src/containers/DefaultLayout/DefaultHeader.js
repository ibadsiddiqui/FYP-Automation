import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'

import { AppAsideToggler, AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this)
    this.state = {
      logout: false
    }
  }
  logOut() {
    localStorage.setItem('token', null);
    this.setState({
      logout: true
    })
  }
  render() {
    if (this.state.logout === true)
      return <Redirect to="login" from='/:id' />

    if (this.state.logout === false) {
      return (

        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppSidebarToggler className="d-md-down-none" display="lg" />

          <Nav className="ml-auto" navbar>

            <NavItem className="d-md-down-none">
              <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">1</Badge></NavLink>
            </NavItem>
            <AppHeaderDropdown direction="down">

              <DropdownToggle nav>
                <img src={'assets/img/avatars/user.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>

              <DropdownMenu right style={{ right: 'auto' }}>

                <DropdownItem onClick={this.logOut}><i className="fa fa-lock" ></i> Logout</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
          <AppAsideToggler className="d-md-down-none" />
          {/*<AppAsideToggler className="d-lg-none" mobile />*/}
        </React.Fragment>
      )
    }
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
