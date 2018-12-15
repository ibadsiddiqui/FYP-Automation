import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import student_navigation from '../../_student_nav';
import teacher_navigation from '../../_teacher_nav'
// routes config
import routes from '../../student_routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      token: null,
      user: []
    }
  }

  componentWillMount() {
    var token = localStorage.getItem('token')
    if (token !== null && token !== "null") {
      this.setState({
        token: token
      });
    }
  }
  async componentDidMount() {
    await fetch('/getuserinfo', {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': this.state.token
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.response === true) {
          this.setState({
            user: res.user,
            status: res.status
          })
        }
      })
  }

  render() {

    return (
      <div className="app">
        {
          this.state.token === null
          &&
          <Redirect to="login" from="/" />
        }
        {
          this.state.token !== null
          &&
          <div>
            <AppHeader fixed>
              <DefaultHeader username={this.state.user.name} />
            </AppHeader>
            <div className="app-body">
              <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                {
                  this.state.user.profession == 'student'
                  &&
                  <AppSidebarNav navConfig={student_navigation} {...this.props} />
                }
                {
                  this.state.user.profession == 'teacher'
                  &&
                  <AppSidebarNav navConfig={teacher_navigation} {...this.props} />
                }
                <AppSidebarFooter />
                <AppSidebarMinimizer />
              </AppSidebar>
              <main className="main">
                <AppBreadcrumb appRoutes={routes} />
                <Container fluid>
                  {
                    this.state.user.profession == 'student'
                    &&
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                            <route.component {...props} userDetail={this.state.user} />
                          )} />)
                          : (null);
                      },
                      )}
                      <Redirect from="/" to="/dashboard" />
                    </Switch>
                  }
                  {
                    this.state.user.profession == 'teacher'
                    &&
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                            <route.component {...props} userDetail={this.state.user} />
                          )} />)
                          : (null);
                      },
                      )}
                      <Redirect from="/" to="/dashboard" />
                    </Switch>
                  }
                </Container>
              </main>
              <AppAside fixed>
                <DefaultAside />
              </AppAside>
            </div>
            <AppFooter>
              <DefaultFooter />
            </AppFooter>
          </div>
        }
      </div>
    );
  }
}

export default DefaultLayout;
