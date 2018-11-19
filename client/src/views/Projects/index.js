import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';

class Projects extends Component {

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
                      <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >DERMEST</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >Child Tracking Using Smart Watch</ListGroupItem>
                      <ListGroupItem onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >Autonomous Self-Driving Car</ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0}>
                        <p>
                          <strong>Abstract</strong>
                        </p>
                        <p>
                          It centers on the inherent need for the Deep Learning to possess an aesthetic sense and an ability to empathize with the audience in order to deliver an enhanced solution of skin disease detection. Expert System for dermatologist is promising, providing great opportunity of cancer detection at early stages. The project will help in fields of medical science.
                          It can help people identify cancers at early stage before it can led to sever condition.
                          It reduces the time of the biopsy report, which is expected to take 2 to 3 week.
                          The trained model will be able to classify between the malignant melanocytic lesions versus benign melanocytic lesions. The report will be generated by the model for the patient and update the database of the patient. The project will help in fields of skin cancer. The project can help people identify cancers at early stage before it can led to sever condition.
                        </p>
                      </TabPane>
                      <TabPane tabId={1}>
                        <p>
                          <strong>Abstract</strong>
                        </p>
                        <p>Smart watches have the potential to support health in everyday living by: 
                          enabling self-monitoring of personal activity; obtaining feedback based on activity measures; 
                          allowing for in-situ surveys to identify patterns of behavior; and supporting bi-directional communication with health care providers and family members. However, smart watches are an emerging technology and research with these devices is at a nascent stage.</p>
                      </TabPane>
                      <TabPane tabId={2}>
                        <p>
                          <strong>Abstract</strong>
                        </p>
                        <p>Self-driving cars are technologically a reality and in the next decade they are expected to reach the highest level of automation. While there is general agreement that an advanced human-autonomous vehicle (HAV) interaction is key to achieve the benefits of self-driving cars, it is less clear what role artificial intelligence (AI) should play in this context. While the scientific community is debating on the role and intersections of AI, autonomous vehicles and related issues, above all ethics, the automotive industry is already presenting AI-based products and services that may influence, in a direction or in another, our technological and societal futures. This paper focuses on virtual assistants, the personification of the car intelligence incorporating, among others, an algorithmic “brain”, a synthetic human “voice” and powerful sensor-based “senses”. Should virtual assistants just assist humans or replace them whenever necessary? Should their scope of action be limited to safety-related driving tasks or to any activity performed in the car or controlled from the car? Although at a very early stage of commercial development, the paper will review the state-of-the-art of in-car virtual assistants underlining their role and functions in the connected and automated driving ecosystem. By drawing from earlier reflections on automation, robots and intelligent agents, it will then identify a series of issues to be addressed by the scientific community, policy-makers and the automotive industry stakeholders.</p>
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

export default Projects;
