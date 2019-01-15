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

  componentWillMount() {
    fetch('/getRequestList', {
      method: 'GET',
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(async response => {
        await this.setState({
          requestList: [...response.request_from]
        })
        console.log(this.state.requestList)
      })
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
                            <ListGroupItem onClick={() => this.toggle(index)} action active={this.state.activeTab === index} >{
                              request.student_name}</ListGroupItem>

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
                              <div className="row" style={{ justifyContent: 'center',}}>

                                <button className="btn btn-small btn-primary" style={{marginRight: 5 + 'px'}}>Accept</button>
                                <button className="btn btn-small btn-danger">Reject</button>
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

