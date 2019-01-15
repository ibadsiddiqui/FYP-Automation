import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row, TabContent, TabPane } from 'reactstrap';

export default class ProposalRequest extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      requestList: []
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  fetchList() {
    fetch('/getRequestList', {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(async response => {
        await this.setState({
          requestList: [...response.request_from.reverse()]
        })
      })

  }
  componentDidMount() {
    // this.timerList = setInterval(this.fetchList(), 1000);
    this.fetchList()
  }
  accept(text) {
    const name = text

    fetch('/acceptRequest', {
      method: 'POST',
      headers: {
        "Authorization": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "student_name": name
      })
    })
    // .then(res => res.json())
    // .then(async response => {
    //   // await this.setState({
    //     requestList: [...response.request_from]
    //   })
    // })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>List of Projects</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      {
                        this.state.requestList.map((request, index) => {
                            return (
                              <ListGroupItem key={index} onClick={() => this.toggle(index)} action active={this.state.activeTab === index} >
                                {request.student_name}
                              </ListGroupItem>
                            )
                        })
                      }
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      {
                        this.state.requestList.map((request, index) => {
                          return (

                            <TabPane tabId={index}>
                              <p>
                                <strong>{request.student_id}</strong>
                              </p>
                              <p>
                                <strong>Abstract - {request.project_name}</strong>
                              </p>
                              <p>{request.project_abstract}</p>

                              <div className="row" style={{ justifyContent: 'center', }}>
                                {

                                  request.accepted === false
                                  &&

                                  <button className="btn btn-small btn-primary" style={{ marginRight: 5 + 'px' }} onClick={() => this.accept(request.student_name)}>Accept</button>
                                }
                                {
                                  request.accepted === false
                                  &&
                                  <button className="btn btn-small btn-danger">Reject</button>
                                }
                              </div>
                            </TabPane>

                          )
                        })
                      }

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

