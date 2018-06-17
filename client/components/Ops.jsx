import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container,
  Row, Col
} from 'reactstrap';
import Rating from 'react-rating';
import Map from './Map.jsx';

class Ops extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rating: 2
    }

    this.handleRate = this.handleRate.bind(this);
  }

  handleRate(event){
    this.setState({rating: event.target.value})
  }

  render(){
    return (
      <Card className="opportunityEntry">
        <CardBody>
          <Row>
            <Col xs="6">
              <CardTitle>{this.props.opportunity.title}</CardTitle>
              <CardSubtitle>{this.props.opportunity.cause}</CardSubtitle>
              <CardText>{this.props.opportunity.description}</CardText>
              <CardText>{this.props.opportunity.formatted_address}</CardText>
              <CardText>
                {this.props.opportunity.volunteerers.includes(this.props.userId) ?
                <div>
                  <Rating {...this.props} initialRating={this.state.rating} />
                </div>
                :
                <div>
                  <Rating initialRating={this.state.rating} readonly/>
                </div>
                }
              </CardText>
            </Col>
            <Col xs="6">
              <Map op={this.props.opportunity} />
              {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            </Col>
          </Row>
          <Button outline color="primary" onClick={() => this.props.volunteerForOpp(this.props.opportunity)}>Volunteer</Button>
        </CardBody>
      </Card>
    );
  }
};

export default Ops;