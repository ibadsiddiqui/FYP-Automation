import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    CardFooter,
    Button,
} from 'reactstrap';


export default class ProposalForm extends Component {

    constructor(props) {

        super(props);
        this.state = {
            proposalSubmitted: '',
            program_of_study: '',
            student_year_session: '',
            student_enrollment_year: '',
            student_CMS_ID: '',
            project_name: '',
            problem_statement: '',
            motivation: '',
            objective: '',
            literature_review: '',
            scope: '',
            methodology: 'Agile',
            useCaseDiagram: '',
            raciChart: '',
            supervisor_fullname: '',
            supervisor_designation: '',
            co_supervisor_fullname: "",
            co_supervisor_designation: '',
            external_supervisor_fullname: '',
            external_supervisor_designation: '',
            proposal_submitted_At: ''
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            fetch('/checkProposalSubmission', {

                method: "GET", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": token
                },
            }
            ).then(res => res.json())
                .then(response => {
                    this.setState({
                        proposalSubmitted: response.proposalSubmitted
                    })
                })
        }
    }

    setProgramOfStudy(event) {
        this.setState({
            program_of_study: event.target.value
        })
    }

    setStudentEnrollmentYear(event) {
        this.setState({
            student_enrollment_year: event.target.value
        })
    }
    setStudentYearSession(event) {
        this.setState({
            student_year_session: event.target.value
        })
    }
    setStudentCMSID(event) {
        this.setState({
            student_CMS_ID: event.target.value
        })
    }

    setProjectName(event) {
        this.setState({
            project_name: event.target.value
        })
    }
    setProblemStatement(event) {
        this.setState({
            problem_statement: event.target.value
        })
    }
    setMotivation(event) {
        this.setState({
            motivation: event.target.value
        })
    }
    setObjective(event) {
        this.setState({
            objective: event.target.value
        })
    }
    setLiteratureReview(event) {
        this.setState({
            literature_review: event.target.value
        })
    }
    setScope(event) {
        this.setState({
            scope: event.target.value
        })
    }
    handleMethodology(event){
        this.setState({
            methodology: event.target.value
        })
    }

    uploadUserCase(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file)
        setTimeout(() => {
            if (reader.readyState === 2) {
                this.setState({
                    useCaseDiagram: reader.result
                });
            }
        }, 500)
    }
    uploadRACIChart(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file)
        setTimeout(() => {
            if (reader.readyState === 2) {
                this.setState({
                    raciChart: reader.result
                });
                console.log(this.state)
            }
        }, 500)
    }

    setSupervisorName(event) {
        this.setState({
            supervisor_fullname: event.target.value
        })
    }
    setSupervisorDesignation(event) {
        this.setState({
            supervisor_designation: event.target.value
        })
    }
    setCoSupervisorName(event) {
        this.setState({
            co_supervisor_fullname: event.target.value
        })
    }
    setCoSupervisorDesignation(event) {
        this.setState({
            co_supervisor_designation: event.target.value
        })
    }
    setExSupervisorName(event) {
        this.setState({
            external_supervisor_fullname: event.target.value
        })
    }
    setExSupervisorDesignation(event) {
        this.setState({
            external_supervisor_designation: event.target.value
        })
    }

    onSubmit() {
        if (this.state.program_of_study && this.state.student_year_session && this.state.student_enrollment_year
            && this.state.student_CMS_ID && this.state.project_name && this.state.problem_statement
            && this.state.motivation && this.state.objective && this.state.literature_review
            && this.state.scope && this.state.useCaseDiagram && this.state.methodology
            && this.state.raciChart && this.state.supervisor_designation && this.state.supervisor_fullname) {
            this.props.modal()
        }
    }

    render() {
        if (!this.state.proposalSubmitted) {

            return (
                <Card>
                    <CardHeader>
                        <strong>Proposal</strong>
                        <small> Form</small>

                    </CardHeader>
                    <CardBody>
                        <strong> This form should be filled only once and will only be available if the project gets rejected</strong>
                        <FormGroup>
                            <small htmlFor="programName">Program of Study</small>
                            <Input type="text" defaultValue={this.state.program_of_study} id="programName" onChange={(event) => this.setProgramOfStudy(event)} placeholder="Enter your program of study" />
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="city">Year Session</small>
                                    <Input type="text" defaultValue={this.state.student_year_session} id="yearSession" placeholder="Enter your session: Fall or Spring" onChange={(event) => this.setStudentYearSession(event)} />
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="postal-code">Enrollment Year</small>
                                    <Input type="text" value={this.state.student_enrollment_year} id="postal-code" placeholder="Enter your year of Enrollment" onChange={(event) => this.setStudentEnrollmentYear(event)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <small htmlFor="street">Project Name</small>
                            <Input type="text" value={this.state.project_name} id="projectName" placeholder="Enter Your Project Name" onChange={(event) => this.setProjectName(event)} />
                        </FormGroup>

                        <strong>Students Details</strong>

                        <FormGroup>
                            <small htmlFor="postal-code">CMS ID</small>
                            <Input type="text" value={this.state.student_CMS_ID} id="postal-code" placeholder="Enter your CMS ID" onChange={(event) => this.setStudentCMSID(event)} />
                        </FormGroup>

                        <strong>Project Details</strong>
                        <FormGroup>
                            <small htmlFor="problemStatement">Problem Statement</small>
                            <div className="form-group">
                                <textarea className="form-control" value={this.state.problem_statement} id="problemStatement" rows="5" placeholder="Enter your project's problem statement" onChange={(event) => this.setProblemStatement(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="motivation">Motivation</small>
                            <div className="form-group">
                                <textarea className="form-control" id="motivation" rows="5" value={this.state.motivation} placeholder="Enter your motivation for the project" onChange={(event) => this.setMotivation(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="objective">Objective</small>
                            <div className="form-group">
                                <textarea className="form-control" id="objective" rows="5" value={this.state.objective} placeholder="Enter your objectives of project" onChange={(event) => this.setObjective(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="literatureReview">Literature Review</small>
                            <div className="form-group">
                                <textarea className="form-control" id="literatureReview" rows="5" value={this.state.literature_review} placeholder="Enter your literature review on project" onChange={(event) => this.setLiteratureReview(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="scope">Scope of the Project</small>
                            <div className="form-group">
                                <textarea className="form-control" id="scope" rows="5" value={this.state.scope} placeholder="Enter your scope of the project" onChange={(event) => this.setScope(event)}></textarea>
                            </div>
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                <span className="label-input100">Upload Use Case or Process Flow Diagram:</span>
                                <div className="col-xs-3">
                                    <input type="file" name="usecaseORprocessflow" accept="image/*" onChange={(file) => this.uploadUserCase(file)} />
                                </div>
                            </div>

                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="methodology">Select Methodology</small>
                            <Input type="select" name="methodology" value={this.state.methodology} id="methodology" onChange={this.handleMethodology.bind(this)}>
                                <option value="Agile" >Agile</option>
                                <option value="Waterfall">Waterfall</option>
                                <option value="Evolutionary Prototype">Evolutionary Prototype</option>
                                <option value="Spiral">Spiral</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                <span className="label-input100">Upload RACI Chart Diagram:</span>
                                <div className="col-xs-3">
                                    <input type="file" name="RACIchart" accept="image/*" onChange={(event) => this.uploadRACIChart(event)} />
                                </div>
                            </div>
                        </FormGroup>
                        <strong>Supervisor Details</strong>
                        <FormGroup row className="my-0">
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="supervisorName">Supervisor Name</small>
                                    <Input type="text" value={this.state.supervisor_fullname} id="supervisorName" placeholder="Enter your supervisor's full name" onChange={(event) => this.setSupervisorName(event)} />
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="supervisorDesignation">Designation</small>
                                    <Input type="text" value={this.state.supervisor_designation} id="supervisorDesignation" placeholder="Enter supervisor's designation" onChange={(event) => this.setSupervisorDesignation(event)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <strong>Co-Supervisor (Otpional)</strong>
                        <FormGroup row className="my-0">
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="co-supervisorName">Co-Supervisor Name</small>
                                    <Input type="text" value={this.state.co_supervisor_fullname} id="co-supervisorName" placeholder="Enter your co-supervisor's full name" onChange={(event) => this.setCoSupervisorName(event)} />
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="co-supervisorDesignation">Designation</small>
                                    <Input type="text" value={this.state.co_supervisor_designation} id="co-supervisorDesignation" placeholder="Enter co-supervisor's designation" onChange={(event) => this.setCoSupervisorDesignation(event)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <strong>For External Supervisor: (optional)</strong>
                        <FormGroup row className="my-0">
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="Ex-supervisorName">External Supervisor Name</small>
                                    <Input type="text" value={this.state.external_supervisor_fullname} id="Ex-supervisorName" placeholder="Enter your external supervisor's full name" onChange={(event) => this.setExSupervisorName(event)} />
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <small htmlFor="co-supervisorDesignation">Designation</small>
                                    <Input type="text" value={this.state.external_supervisor_designation} id="co-supervisorDesignation" placeholder="Enter external supervisor's designation" onChange={(event) => this.setExSupervisorDesignation(event)} />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </CardBody>

                    <CardFooter>
                        <Button type="submit" size="sm" color="primary" onClick={this.onSubmit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    </CardFooter>
                </Card>
            );
        } else {
            return (
                <strong>You have submitted your the proposal for the Project. </strong>
            )
        }

    }
}

