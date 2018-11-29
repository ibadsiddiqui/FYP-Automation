import React, { Component } from 'react';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Col, 
    FormGroup,
    Input,
    CardFooter,
    Button
} from 'reactstrap';


export default class ProposalForm extends Component {

    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        // this.state = {
        //     activeTab: 0
        // };
    }

    render() {
        return (
            <Card>
              <CardHeader>
                <strong>Proposal</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <small htmlFor="company">Program of Study</small>
                  <Input type="text" id="programName" placeholder="Enter your program of study" />
                </FormGroup>
                <FormGroup row className="my-0">
                <Col xs="6">
                        <FormGroup>
                            <small htmlFor="city">Year Session</small>
                            <Input type="text" id="yearSession" placeholder="Enter your session: Fall or Spring" />
                        </FormGroup>
                    </Col>
                    <Col xs="6">
                        <FormGroup>
                        <small htmlFor="postal-code">Enrollment Year</small>
                        <Input type="text" id="postal-code" placeholder="Enter your year of Enrollment" />
                        </FormGroup>
                    </Col>
                </FormGroup>

                <FormGroup>
                  <small htmlFor="street">Project Name</small>
                  <Input type="text" id="projectName" placeholder="Enter Your Project Name" />
                </FormGroup>
                
                <strong>Students Details: (Minimum 1 is requried)</strong>

                <FormGroup row className="my-0">
                    <Col xs="8">
                        <FormGroup>
                            <small htmlFor="city">Student Full Name</small>
                            <Input type="text" id="city" placeholder="Enter your full name" />
                        </FormGroup>
                    </Col>
                    <Col xs="4">
                        <FormGroup>
                            <small htmlFor="postal-code">CMS ID</small>
                            <Input type="text" id="postal-code" placeholder="Enter your CMS ID" />
                        </FormGroup>
                    </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                    <Col xs="6">
                        <FormGroup>
                            <small htmlFor="city">Email</small>
                            <Input type="text" id="city" placeholder="Enter your full name" />
                        </FormGroup>
                    </Col>
                    <Col xs="6">
                        <FormGroup>
                            <small htmlFor="postal-code">CMS ID</small>
                            <Input type="text" id="postal-code" placeholder="Enter your CMS ID" />
                        </FormGroup>
                    </Col>
                </FormGroup>
              </CardBody>

              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
        );
    }
}

