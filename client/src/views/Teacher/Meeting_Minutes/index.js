import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';




class MeetingMinutes extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSuccessModal = this.toggleSuccessModal.bind(this)
        this.state = {
            successModal: false,
            list: [

            ],
            correctInput: true,
        }
        this.meetingTopic = "";
        this.meetingWith = "";
        this.meetingDate = ""
        this.form = (
            <div className="container">
                <div className="wrap">
                    <form className="contact-form validate-form">

                        {
                            !(this.meetingDate || this.meetingWith || this.meetingTopic)
                            &&
                            <span className='text-info'>Please enter complete detalis</span>
                        }

                        <div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Discussion Summery">
                            <span className="label-input100">Enter Topic:</span>
                            <input className="input100" name="Topic" placeholder="Add Topic for meeting: " onChange={(event) => this.meetingTopic = event.target.value} />
                        </div>
                        <div className="row">


                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Meeting Called By">
                                <span className="label-input100">Student Name:*</span>
                                <input className="input100" type="text" name="name" placeholder=" Enter Student name to meet with: " onChange={(event) => this.meetingWith = event.target.value} />
                            </div>


                            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Targetted Date" style={{ marginLeft: 5 + 'px' }}>
                                <span className="label-input100">Meeting Date: *</span>
                                <input className="input100" type="date" name="expected_date" placeholder="Enter Date: " onChange={event => this.meetingDate = event.target.value} />
                            </div>
                        </div>



                        <div className="container-contact100-form-btn">

                            <button className="contact100-form-btn" onClick={this.submitForm.bind(this)}>
                                <span> Submit <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i></span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )

        this.fetchList()
    }

    componentDidMount() {
        this.fetchMeetingList = setInterval(this.fetchList, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.fetchMeetingList)
    }
    fetchList() {
        fetch('/getMeetingList', {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('token'),
                // "Accept": "application/json",
            },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    list: [...res.list.Meetings]
                })
                console.log(this.state.list)
            })
    }
    guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4());
    }

    submitForm(ev) {
        ev.preventDefault();

        const { list } = this.state;
        const meetingDetails = {
            "meetingNumber": this.guidGenerator(),
            "meetingTopic": this.meetingTopic,
            'meetingWith': this.meetingWith,
            'meetingDate': this.meetingDate,

        }
        list.push(meetingDetails)
        if (this.meetingTopic && this.meetingWith && this.meetingDate) {
            this.setState({ list })
            this.submitMeeting()
            this.toggleSuccessModal()
        } else {
            this.setState({
                correctInput: false
            })
        }
    }

    toggleSuccessModal() {
        this.setState({
            successModal: !this.state.successModal
        })
    }

    submitMeeting() {
        fetch('/setMeeting', {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "meetingNumber": this.guidGenerator(),
                "meetingTopic": this.meetingTopic,
                'meetingWith': this.meetingWith,
                'meetingDate': this.meetingDate

            })
        }).then(res => res.json())
            .then(res => this.setState({ list: [...res.list.Meetings] }))
    }

    showCreateMeetingForm() {
        return (
            <Modal isOpen={this.state.successModal} toggle={this.toggleSuccessModal} className={'modal-success'}>
                <ModalHeader toggle={this.toggleSuccessModal}>Meeting Minute Form:</ModalHeader>
                <ModalBody>
                    {this.form}
                </ModalBody>
            </Modal>
        )
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> List of Meetings
                                <button className="btn btn-sm btn-success"
                                    type="submit" style={{ marginLeft: 74 + '%' }}
                                    onClick={this.toggleSuccessModal}
                                ><i className="glyphicon glyphicon-ok-sign"></i> Set up new meeting</button>
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Meeting #:</th>
                                            <th>Topic #:</th>
                                            <th>With:</th>
                                            <th>Date:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.list.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.meetingNumber}</td>
                                                    <td>{item.meetingTopic}</td>
                                                    <td>{item.meetingWith}</td>
                                                    <td>{item.meetingDate}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {this.showCreateMeetingForm()}
            </div>

        );
    }
}


export default MeetingMinutes;
