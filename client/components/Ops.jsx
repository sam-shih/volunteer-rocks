import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, 
  Row, Col } from 'reactstrap';



const Ops = function(props) {
  console.log(props);
  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs="8">
            <CardTitle>{props.opportunity.title}</CardTitle>
            <CardSubtitle>{props.opportunity.cause}</CardSubtitle>
            <CardText>{props.opportunity.description}</CardText>
          </Col>
          <Col xs="4">
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          </Col>
        </Row>
        <Button>Volunteer</Button>
      </CardBody>
    </Card>
  );
};

export default Ops;