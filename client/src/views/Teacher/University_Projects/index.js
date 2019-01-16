import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row, TabContent, TabPane } from 'reactstrap';

class Projects extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      listOfProject: []
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
    fetch('/getAllProject', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          listOfProject: [...response]
        })
        console.log(this.state.listOfProject)
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
                        this.state.listOfProject.map((item, index) => (
                          <ListGroupItem onClick={() => this.toggle(index)} action active={this.state.activeTab === index} >{item.project_details.project_name}</ListGroupItem>

                        ))
                      }
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      {
                        this.state.listOfProject.map((item, index) => (

                          <TabPane tabId={0}>
                            <p>
                              <strong>Abstract</strong>
                            </p>
                            <p>{item.project_details.abstract}</p>
                          </TabPane>

                        ))
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

export default Projects;
