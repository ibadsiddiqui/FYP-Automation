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
        this.state = {
            meetings:[

            ]
        }
        this.submitMeeting()
    } 
    submitMeeting() {
        fetch('/getStudentMeeting', {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('token'),
            },
        }).then(res => res.json())
            .then(async res => {
                await this.setState({
                    meetings: [...res]
                })

                console.log(this.state.meetings)
            })
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Meeting #:</th>
                                            <th>Topic #:</th>
                                            <th>Date:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.meetings.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.meetingNumber}</td>
                                                    <td>{item.meetingTopic}</td>
                                                    {/* <td>{item.meetingWith}</td> */}
                                                    <td>{item.meetingDate}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}


export default MeetingMinutes;
