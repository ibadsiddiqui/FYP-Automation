import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    ListGroup,
    ListGroupItem,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap';
import ProposalForm from './ProposalForm'
import ToolTip from './../../components/ToolTip'

class Templates extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 0
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
                    ProgressReport: reader.result
                });
            }
        }, 500)
    }
    uploadFinalReport(event) {
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

    render() {
        return (
            <div className="animated fadeIn">
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
                                            <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >First Evaluation - Progress Report and Presentation</ListGroupItem>
                                            <ListGroupItem onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >Final Evaluation - Final Report and Presentation</ListGroupItem>
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
                                                    <p id="proposal-template">
                                                        <a href={'1-FYP-Propsl-Tmpl-03.docx'}>2 - Proposal Template</a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#proposal-template" />
                                                </Col>
                                                <Col>
                                                    <p id="proposal-ppt">
                                                        <a href={'2-FYP-Propsl-PPT-04.pptx'}>3 - Proposal Presentation Template </a>
                                                    </p>
                                                    <ToolTip position="left" text="Click on Right-Mouse button and save it" target="#proposal-ppt" />
                                                </Col>
                                                </Row>

                                                <ProposalForm />


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

                                                <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                                    <span className="label-input100">Upload Status or Progress Report Document:</span>
                                                    <div className="col-xs-3">
                                                        <input type="file" accept=".doc,.docx,application/msword,.pdf" name="profilepic" onChange={(file) => this.uploadProgressReport(file)} />
                                                    </div>
                                                </div>

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

                                                <div className="wrap-input100 validate-input bg1 rs1-wrap-input100">
                                                    <span className="label-input100">Upload Final Project Report Document:</span>
                                                    <div className="col-xs-3">
                                                        <input type="file" accept=".doc,.docx,application/msword,.pdf" name="FinalReport" onChange={(file) => this.uploadFinalReport(file)} />
                                                    </div>
                                                </div>

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
    }
}

export default Templates;
