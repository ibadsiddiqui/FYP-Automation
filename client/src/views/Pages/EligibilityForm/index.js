import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { Redirect } from 'react-router-dom'

class EligibilityForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      fullname: '',
      cmsID: '',
      currentsemester: 0,
      no_of_courses_cleared: 0,
      currentCGPA: 0,
      redirect: false
    };
  }


  setFullName(event) {
    this.setState({
      fullname: event.target.value
    })
  }

  setCMS_ID(event) {
    this.setState({
      cmsID: event.target.value
    })
  }

  setCurrentSemester(event) {
    this.setState({
      currentsemester: event.target.value
    })
  }

  setNo_Of_Courses(event) {
    this.setState({
      no_of_courses_cleared: event.target.value
    })
  }

  setCurrentCGPA(event) {
    this.setState({
      currentCGPA: event.target.value
    })
  }
  onSubmit() {
    const { cmsID, currentCGPA, no_of_courses_cleared, currentsemester, fullname } = this.state
    if (cmsID !== '' && fullname !== '') {
      if (currentCGPA !== 0 && currentCGPA <= 4 && currentCGPA > 1.5) {
        if (no_of_courses_cleared !== 0 && no_of_courses_cleared > 22 && no_of_courses_cleared < 38) {
          if (currentsemester !== 0 && currentsemester > 5 && currentsemester < 11) {
            fetch('/submiteligibilityform', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify(this.state)
            }).then(res => res.json())
              .then(response => {
                if (response.formSubmitted === true) {
                  this.setState({
                    redirect: true
                  })
                } else if(response.formSubmitted === false) {
                  alert('There was error in submitting the form')
                }
              })
          } else {
            alert('correct your current semester detail')
          }
        } else {
          alert('correct your no of courses cleared detail')
        }
      } else {
        alert('correct your current CGPA detail')
      }
    } else {
        alert('Please enter your full name and cms id correctly')
    }
  }

  render() {
    if (this.state.redirect === false) {

      return (
        <div className="animated fadeIn" style={{ marginLeft: 32.5 + '%', marginTop: 5 + '%' }}>
          <Row>
            <Col xs="6" md="8">
              <Card>
                <CardHeader>
                  <strong>Eligibility</strong> Form
              </CardHeader>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="5">
                        <Label htmlFor="fullname">Enter Your Full Name</Label>
                      </Col>
                      <Col xs="12" md="7">
                        <Input type="text" id="fullname" name="fullname" placeholder="Enter Your full name" value={this.state.fullname} onChange={(event) => this.setFullName(event)} />
                        <FormText color="muted">Please enter your full name.</FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="5">
                        <Label htmlFor="cms-Id">Enter Your CMS-ID </Label>
                      </Col>
                      <Col xs="12" md="7">
                        <Input type="text" id="cms-Id" name="cms-Id" placeholder="Enter Your CMS-ID "
                          value={this.state.cmsID} onChange={(event) => this.setCMS_ID(event)} />
                        <FormText className="help-block">Please Enter Your CMS-ID</FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="5">
                        <Label htmlFor="current-semester">Enter Your Current Semester</Label>
                      </Col>
                      <Col xs="12" md="7">
                        <Input type="number" id="current-semester" name="current-semester" placeholder="Enter your current semester"
                          value={this.state.setCurrentSemester} onChange={(event) => this.setCurrentSemester(event)} />
                        <FormText className="help-block">Please Enter Your Current Semester</FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="5">
                        <Label htmlFor="current-courses-cleared">Enter Your No. of Courses Cleared</Label>
                      </Col>
                      <Col xs="12" md="7">
                        <Input type="number" id="current-courses-cleared" name="current-courses-cleared" placeholder="Enter Your No. of Courses Cleared" value={this.state.no_of_courses_cleared} onChange={(event) => this.setNo_Of_Courses(event)} />
                        <FormText className="help-block">Please Enter Your No. of Courses Cleared</FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="5">
                        <Label htmlFor="current-CGPA">Enter Your Current CGPA</Label>
                      </Col>
                      <Col xs="12" md="7">
                        <Input type="number" id="current-CGPA" name="current-CGPA" placeholder="Enter your current CGPA" value={this.state.currentCGPA} onChange={(event) => this.setCurrentCGPA(event)} />
                        <FormText className="help-block">Please Enter Your Current CGPA</FormText>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" className="col-md-4 center-block" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </div>
      );
    } else {
      return <Redirect to="login" from='eligibitycheckup' />
    }
  }
}

export default EligibilityForm;
