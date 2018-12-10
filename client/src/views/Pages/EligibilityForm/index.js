import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class EligibilityForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn" style={{marginLeft: 32.5 + '%', marginTop: 5 + '%'}}> 
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
                      <Input type="text" id="fullname" name="fullname" placeholder="Enter Your full name" />
                      <FormText color="muted">Please enter your full name.</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="cms-Id">Enter Your CMS-ID </Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input type="email" id="cms-Id" name="cms-Id" placeholder="Enter Your CMS-ID " autoComplete="cms-Id"/>
                      <FormText className="help-block">Please Enter Your CMS-ID</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="current-semester">Enter Your Current Semester</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input type="text" id="current-semester" name="current-semester" placeholder="Enter your current semester" autoComplete="current-semester" />
                      <FormText className="help-block">Please Enter Your Current Semester</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="current-courses-cleared">Enter Your No. of Courses Cleared</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input type="text" id="current-courses-cleared" name="current-courses-cleared" placeholder="Enter Your No. of Courses Cleared" autoComplete="current-courses-cleared" />
                      <FormText className="help-block">Please Enter Your No. of Courses Cleared</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="current-CGPA">Enter Your Current CGPA</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <Input type="text" id="current-CGPA" name="current-CGPA" placeholder="Enter your current CGPA" autoComplete="new-password" />
                      <FormText className="help-block">Please Enter Your Current CGPA</FormText>
                    </Col>
                  </FormGroup>  
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" className="col-md-4 center-block"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default EligibilityForm;
