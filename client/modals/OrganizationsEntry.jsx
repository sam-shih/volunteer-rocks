import React, {Component} from "react";
import {Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from "reactstrap";

class OrganizationsEntry extends Component{
  
  render(){
    return(
      <Col xs="3">
      <Card>
        <CardImg className="lightbox" top src={this.props.org.logo} />
        <CardBody>
          <CardTitle>{this.props.org.name}</CardTitle>
          <Button>Join</Button>
        </CardBody>
      </Card>
      </Col>
    )
  }

}

export default OrganizationsEntry;