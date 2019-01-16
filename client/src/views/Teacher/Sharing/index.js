import React, { Component } from 'react';
import {
  Card,
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Table
} from 'reactstrap';

class Sharing extends Component {
  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Share
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Item:</th>
                      <th>Shared By:</th>
                      <th>Date of Sharing:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Vishnu Serghei</td>
                      <td>Member</td>
                      <td>2012/01/01</td>
                    </tr>
                    <tr>
                      <td>Zbyněk Phoibos</td>
                      <td>Staff</td>
                      <td>2012/02/01</td>
                    </tr>
                    <tr>
                      <td>Einar Randall</td>
                      <td>Admin</td>
                      <td>2012/02/01</td>
                    </tr>
                    <tr>
                      <td>Félix Troels</td>
                      <td>Member</td>
                      <td>2012/03/01</td>
                    </tr>
                    <tr>
                      <td>Aulus Agmundr</td>
                      <td>Staff</td>
                      <td>2012/01/21</td>
                    </tr>
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

export default Sharing;