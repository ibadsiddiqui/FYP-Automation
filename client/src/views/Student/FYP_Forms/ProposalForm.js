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
import { Redirect } from 'react-router-dom'

export default class ProposalForm extends Component {

    constructor(props) {
        super(props);
        this.sendRequest = this.sendRequest.bind(this)
        this.state = {
            onSubmitClick: false,
            program_of_study: '',
            student_year_session: '',
            student_enrollment_year: '',
            project_name: '',
            abstract: '',
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
            supervisorNotFound: false,
            teachersList: [],
            coSupervisorNotFound: false,
        }
    }

    getList() {
        fetch('/getTeachersList', {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(res => {

                this.setState({
                    teachersList: [...res]
                })
                console.log(this.state.teachersList)
            })
    }
    componentDidMount() {
        this.getList()
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


    setProjectName(event) {
        this.setState({
            project_name: event.target.value
        })
    }

    setProjectAbstract(event) {
        this.setState({
            abstract: event.target.value
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

    handleMethodology(event) {
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
            }
        }, 500)
    }

    async setSupervisorName(event) {
        await this.setState({
            supervisor_fullname: event.target.value,

        });
        this.checkSupervisor()
    }
    checkSupervisor() {
        if (this.state.supervisor_fullname === '') {
            this.setState({
                supervisorNotFound: false

            })
            return;
        } else {

            this.state.teachersList.map((teacher) => {
                if (teacher.name.toLowerCase() == this.state.supervisor_fullname.toLowerCase()) {
                    this.setState({
                        supervisorNotFound: false
                    })
                } else {
                    this.setState({
                        supervisorNotFound: true
                    })
                }
            })
        }
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

    sendRequest() {
        fetch('/sendRequest', {
            method: "POST",
            headers: {
                // "Authorization": localStorage.get('token'),
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "supervisorName": this.state.supervisor_fullname,
                "student_id": localStorage.getItem('token'),
                "project_name": this.state.project_name,
                "project_abstract": this.state.abstract

            })
        }).then(res => res.json())
            .then(res => console.log(res))
    }
    onSubmit() {

        if (this.state.program_of_study && this.state.student_year_session && this.state.student_enrollment_year
            && this.state.project_name && this.state.problem_statement
            && this.state.motivation && this.state.objective && this.state.literature_review
            && this.state.scope && this.state.useCaseDiagram && this.state.methodology
            && this.state.raciChart && this.state.supervisor_designation && this.state.supervisor_fullname) {
            fetch('/submitProposal', {

                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify(this.state)
            }
            ).then(res => res.json())
                .then((response) => {
                    if (response.status === 'submitted') {

                        this.props.modal()
                        this.sendRequest()
                        setTimeout(() => {

                            this.setState({
                                onSubmitClick: true
                            })
                        }, 2500);
                    } else {
                        alert('try again please')
                        this.setState({
                            onSubmitClick: true
                        })
                    }
                })

        }
    }

    render() {
        if (!this.props.proposalStatus && !this.props.submissionStatus && !this.state.onSubmitClick) {

            return (
                <Card>
                    <CardHeader>
                        <strong>Proposal</strong>
                        <small> Form</small>

                    </CardHeader>
                    <CardBody>
                        <strong> This form should be filled carefully because, it will only be available if the project gets rejected</strong>
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

                        <strong>Project Details</strong>
                        <FormGroup>
                            <small htmlFor="abstract">Project Abstract</small>
                            <div className="form-group">
                                <textarea className="form-control" value={this.state.abstract} id="abstract" rows="10" placeholder="Enter your abstract for project" onChange={(event) => this.setProjectAbstract(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="problemStatement">Problem Statement</small>
                            <div className="form-group">
                                <textarea className="form-control" value={this.state.problem_statement} id="problemStatement" rows="10" placeholder="Enter your project's problem statement" onChange={(event) => this.setProblemStatement(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="motivation">Motivation</small>
                            <div className="form-group">
                                <textarea className="form-control" id="motivation" rows="10" value={this.state.motivation} placeholder="Enter your motivation for the project" onChange={(event) => this.setMotivation(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="objective">Objective</small>
                            <div className="form-group">
                                <textarea className="form-control" id="objective" rows="10" value={this.state.objective} placeholder="Enter your objectives of project" onChange={(event) => this.setObjective(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="literatureReview">Literature Review</small>
                            <div className="form-group">
                                <textarea className="form-control" id="literatureReview" rows="10" value={this.state.literature_review} placeholder="Enter your literature review on project" onChange={(event) => this.setLiteratureReview(event)}></textarea>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <small htmlFor="scope">Scope of the Project</small>
                            <div className="form-group">
                                <textarea className="form-control" id="scope" rows="10" value={this.state.scope} placeholder="Enter your scope of the project" onChange={(event) => this.setScope(event)}></textarea>
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
                                    <small htmlFor="supervisorName">
                                        Supervisor Name
                                        {
                                            this.state.supervisorNotFound &&

                                            <small className="text-danger" style={{ marginLeft: 15 + 'px' }}>Not Found</small>
                                        }
                                    </small>
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
                                    <small htmlFor="co-supervisorName">
                                        Co-Supervisor Name
                                        {
                                            this.state.coSupervisorNotFound &&

                                            <small className="text-danger" style={{ marginLeft: 15 + 'px' }}>Not Found</small>
                                        }
                                    </small>
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
        } else if (this.props.proposalStatus && !this.props.hasProposalBeenAcceptedBySupervisor) {
            return (
                <strong>Wait while supervisor accepts your proposal request for project. </strong>

            )
        }
        else if (this.props.proposalStatus && !this.state.onSubmitClick) {
            return (
                <strong>You have submitted your  proposal for the Project. Now wait while the committee accepts your project. </strong>
            )
        } else if (this.state.onSubmitClick) {
            return <Redirect to={{ pathname: "/" }} />
        }

    }
}

