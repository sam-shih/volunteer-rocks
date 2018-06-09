import React from 'react';
import Ops from './Ops.jsx';
import { Container } from 'reactstrap';

const OpsList = function(props) {
  return (
    <Container>
      {props.opportunities.map(function(opportunity, idx) {
        return <Ops enroll={props.enroll} opportunity={opportunity} key={idx} />
      })}
    </Container>
  );
};

export default OpsList;