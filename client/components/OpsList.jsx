import React from 'react';

import Ops from './Ops.jsx';

import { Container, Row, Col } from 'reactstrap';
import Filter from './Filter.jsx';



const OpsList = function(props) {

  return (

    <Container>

      <Row>

        <Col xs="8">

          {props.opportunities.map(function(opportunity, idx) {

            return <Ops enroll={props.enroll} opportunity={opportunity} key={idx} />

          })}

        </Col>

        <Col xs="4">

        <Filter opp = {props.opportunities} />

        </Col>

        </Row>

    </Container>

  );

};



export default OpsList;