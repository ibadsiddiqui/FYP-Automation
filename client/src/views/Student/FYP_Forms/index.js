import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import ProposalForm from './ProposalForm'
import ToolTip from './../../../components/ToolTip'

export default class Templates extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleSuccessModal = this.toggleSuccessModal.bind(this);
        this.renderSuccessModal = this.renderSuccessModal.bind(this)
        this.state = {
            activeTab: 0,
            redirect: false,
            finalReport: "",
            progressReport: "",
            modal: false,
            successModal: false,
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    uploadProgressReport(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file)
        setTimeout(() => {
            if (reader.readyState === 2) {
                this.setState({
                    progressReport: reader.result
                });
            }
            fetch('/submitProgressReport', {

                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    progressReport: this.state.progressReport
                })
            })
                .then(res => res.json())
                .then((response) => {
                    this.setState({
                        redirect: response.redirect
                    })
                })

        }, 1000)
    }
    uploadFinalReport(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file)
        setTimeout(() => {
            if (reader.readyState === 2) {
                this.setState({
                    finalReport: reader.result
                });
                fetch('/submitFinalReport', {

                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        progressReport: this.state.progressReport
                    })
                })
                    .then(res => res.json())
                    .then((response) => {
                        this.setState({

                            redirect: response.redirect
                        })
                    })
            }
        }, 1000)
    }

    componentWillMount() {

        const token = localStorage.getItem('token');
        if (token !== null) {
            fetch('/checkStatus', {

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

                        hasSubmittedProposal: response.hasSubmittedProposal,
                        hasProposalBeenAccepted: response.hasProposalBeenAccepted,
                        hasSubmittedProgressReport: response.hasSubmittedProgressReport,
                        hasSubmittedFinalReport: response.hasSubmittedProgressReport,
                        hasProposalBeenAcceptedBySupervisor: response.hasProposalBeenAcceptedBySupervisor
                    })
                })
        }
    }
    componentDidMount() {
        this.setState({
            modal: !this.state.modal
        })
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-primary">
                <ModalHeader toggle={this.toggleModal}>Welcome to FYP Forms</ModalHeader>
                <ModalBody>
                    Here You can submit your proposal for FYP, submit status or progress report during your 1st evaluation or better;
                    you can submit your final report in document form for project.
                </ModalBody>
            </Modal>
        )
    }

    toggleSuccessModal() {
        this.setState({
            successModal: !this.state.successModal
        })
    }

    renderSuccessModal() {
        return (
            <Modal isOpen={this.state.successModal} toggle={this.toggleSuccessModal} className={'modal-success'}>
                <ModalHeader toggle={this.toggleSuccessModal}>Modal title</ModalHeader>
                <ModalBody>
                    You've successfully submitted the proposal. Please wait while the FYP committee
                    reviews your proposal and make decision.
                    <br />
                    <br />
                    <br />
                    <small>
                        The Page will be redirected to dashboard after successful submission of proposal.
                    </small>
                </ModalBody>
            </Modal>
        )
    }

    render() {
        if (this.state.redirect === false) {

            return (
                <div className="animated fadeIn">
                    {this.renderModal()}
                    {this.renderSuccessModal()}

                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i><strong>Available Document Templates For Your Final Year Project </strong>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="4">
                                            <ListGroup id="list-tab" role="tablist">
                                                <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >FYP checklist</ListGroupItem>
                                                <ListGroupItem onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >Project Proposal - Report Document and Presentation</ListGroupItem>

                                                {
                                                    this.state.hasProposalBeenAccepted === true
                                                    &&
                                                    <span>

                                                        <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >First Evaluation - Progress Report and Presentation</ListGroupItem>
                                                        <ListGroupItem onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >Final Evaluation - Final Report and Presentation</ListGroupItem>
                                                    </span>
                                                }

                                            </ListGroup>
                                        </Col>
                                        <Col xs="8">
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId={0}>
                                                    <p>
                                                        <em><strong>FYP checklist</strong></em> provides you the proper detailed guideline of duration, responsibilities and phases of your FYP from eligibility till final submission of project. Every participant should mandatory read it thoroughly and in case of any query, consult to your teacher.
                                                        Which form, template and reports are going to submit and used is also mentioned in this.
                                                </p>
                                                    <p>
                                                        <strong>Guidelines</strong> are mandatory for students to read thoroughly. It’s a guide helpful throughout the FYP duration.
                                                </p>
                                                    <p id="checklist">
                                                        <a href={'0-CS-FYP-Checklist-00.doc'}>1 - CS-FYP Checklist</a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#checklist" />

                                                    <p id="guidline">
                                                        <a href={'Guidelines-FYP-CS.pptx'}>2 - Guidelines for FYP</a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#guidline" />

                                                </TabPane>
                                                <TabPane tabId={1}>
                                                    <p>
                                                        <em><strong>Proposal Template</strong></em> is provided to describe the project details of student’s group briefly and will submitted before the dates announced by admin. One form will be submitted by one group,
                                                        each member of group is not allowed to submit it separately, only the group leader will submit it.
                                                </p>
                                                    <p>
                                                        <em><strong>Proposal PPT</strong></em> is provided so students can give FYP proposal presentation in this template and etiquette
                                                </p>
                                                    <p>
                                                        <em><strong>FYP Proposal Guidelines PPT</strong></em> is provided to students so they can resolve their queries with the proposal form, deliverables and could know the rules and regulations.
                                                </p>
                                                    <Row>
                                                        <Col>
                                                            <p id="proposal-guideline">
                                                                <a href={'3-FYP-Propsl-Guidline.pptx'}>1 - Proposal Guidlines</a>
                                                            </p>
                                                            <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#proposal-guideline" />
                                                        </Col>
                                                        <Col>
                                                            <p id="proposal-ppt">
                                                                <a href={'2-FYP-Propsl-PPT-04.pptx'}>2 - Proposal Presentation Template </a>
                                                            </p>
                                                            <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#proposal-ppt" />
                                                        </Col>
                                                    </Row>

                                                    <ProposalForm modal={this.toggleSuccessModal} proposalStatus={this.state.hasSubmittedProposal} submissionStatus={this.state.hasProposalBeenAccepted} />


                                                </TabPane>
                                                <TabPane tabId={2}>
                                                    <p>
                                                        <em><strong>1st Evaluation format Report</strong></em> is provided to students so they can mention their details and deliverables of their FYP in this report.
                                                </p>
                                                    <p>
                                                        <em><strong>FYP Compatibility Form</strong></em> will be given to students while evaluation time by admin or FYP committee head.
                                                </p>
                                                    <p id="progress-guidline">
                                                        <a href={'6-1st-evaluation-Progress-Evaluation-Guidline.pptx'}>1st evaluation Progress Evaluation Guidline</a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#progress-guidline" />
                                                    {
                                                        this.state.hasSubmittedProgressReport === false
                                                        &&
                                                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                                            <span className="label-input100">Upload Status or Progress Report Document:</span>
                                                            <div className="col-xs-3">
                                                                <input type="file" accept=".doc,.docx,application/msword,.pdf" name="profilepic" onChange={(file) => this.uploadProgressReport(file)} />
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        this.state.hasSubmittedProgressReport === true
                                                        &&
                                                        <strong>You have submitted your status report for the Project. </strong>

                                                    }

                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    <p><em><strong>FYP Final Report Format</strong></em> is provided to students so they can submit their complete detailed reports of their FYP with the project submission.</p>
                                                    <p><em><strong>FYP Final Presentation </strong></em>is given to students so they can present their final submission of FYP.</p>
                                                    <p id="final-report">
                                                        <a href={'7-FYP-Fnl-Rpt-Fmt-09.docx'}>1 - FYP Final Report Template</a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#final-report" />

                                                    <p id="final-ppt">
                                                        <a href={'8-FYP-Fnl-Rpt-PPT-10.pptx'}>2 - FYP Final Report Presentation Template</a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#final-ppt" />

                                                    {
                                                        this.state.hasSubmittedFinalReport === false
                                                        &&
                                                        <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                                            <span className="label-input100">Upload Final Project Report Document:</span>
                                                            <div className="col-xs-3">
                                                                <input type="file" accept=".doc,.docx,application/msword,.pdf" name="FinalReport" onChange={(file) => this.uploadFinalReport(file)} />
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        this.state.hasSubmittedFinalReport === true
                                                        &&
                                                        <strong>You have submitted your final report for the Project.</strong>
                                                    }


                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        } else if (this.state.redirect === true) {
            return <Redirect to={{ pathname: "/" }} />
        }


    }
}

