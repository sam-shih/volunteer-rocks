import React, {Component} from "react";
import {Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from "reactstrap";

class OrganizationsEntry extends Component{
  constructor(){
    super()
    this.state = {

    }
  }

  handleJoin(orgId){
    this.props.joinOrganization(orgId, this.props.org.name)
  }

  render(){
    return(
      <Card className="orgEntry">
        <CardImg className="lightbox" top src={this.props.org.logo} />
        <CardBody>
          <CardTitle>{this.props.org.name}</CardTitle>
          <Button onClick={()=>
            {if(confirm(`Are you sure you want to join ${this.props.org.name}`))
            {this.handleJoin(this.props.org._id)}}}>Join</Button>
        </CardBody>
      </Card>
    )
  }

}

export default OrganizationsEntry;