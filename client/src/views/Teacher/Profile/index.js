import React from 'react';
import {Link} from 'react-router-dom'
class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
        name: null,
        username: null,
        email: null,
        profession: null,
    }
    this.onSave = this.onSave.bind(this);
  }
  componentWillMount(){

    const token = localStorage.getItem('token');
    if(token !== null) {
      fetch('/getuserinfo', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": token
        },
      })
        .then( res => res.json())
        .then(res => {
          this.setState({
            name: res.user.name,
            username: res.user.username,
            email: res.user.email,
            profession: res.user.profession,

          })
        });
    }
  }

  onSave(){
    const token = localStorage.getItem('token');

    fetch('/updateuserprofile', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token
      },
      body:JSON.stringify({
        name: this.state.name,
        email: this.state.email
      })
    })
      .then( res => res.json())
      .then(res => {
        this.setState({
          name: res.user.name,
          email: res.user.email,

        })
      });
  }
  render() {
    return (
      <div className="container bootstrap snippet">
        <div className="row">
          <div className="col-sm-3">

            <div className="text-center">
              <img src={'assets/img/avatars/profile.png'} className="img-circle img-thumbnail" alt="avatar" />
            </div>
          </div>

          <div className="col-sm-9">
            <div className="tab-content">
              <div className="tab-pane active" id="home">
                <hr />
                <form className="form" action="##" method="post" id="registrationForm">
                  <div className="form-group">

                    <div className="col-xs-6">
                      <label htmlFor="first_name"><h4>Full Name</h4></label>
                      <input  type="text" 
                              className="form-control" 
                              title="enter your first name if any." 
                              value={this.state.name}
                              onChange={(event)=> this.setState({name: event.target.value})}
                              />
                      </div>
                    </div>

                  <div className="form-group">

                    <div className="col-xs-6">
                      <label htmlFor="email"><h4>Email</h4></label>
                      <input  type="email" 
                              className="form-control"  
                              title="enter your email." 
                              value={this.state.email}
                              onChange={(event)=> this.setState({email: event.target.value})}
                              />
                      </div>
                    </div>
                    <div className="form-group">

                    <div className="col-xs-6">
                      <label htmlFor="profession"><h4>Profession</h4></label>
                      <input  type="text" 
                              className="form-control" 
                              value={this.state.profession}/>
                      </div>
                    </div>

                    <div className="col-xs-6">
                      <label ><h4>CMS</h4></label>
                      <input  type="text" 
                              className="form-control" 
                              value={this.state.username}/>
                      </div>
                    <div className="form-group">

                    <div className="col-xs-12">
                      <br />
                      <Link to="/Dashboard">
                        <button className="btn btn-lg btn-success" type="submit" onClick={this.onSave}><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                      </Link>
                      </div>
                    </div>
                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Profile;
